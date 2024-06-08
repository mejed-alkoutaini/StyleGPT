import useWindowSize from "@/hooks/useWindowSize";
import {
  XCircleIcon,
  ArrowDownCircleIcon,
  CloudArrowUpIcon,
  ArrowsRightLeftIcon,
  ScissorsIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { uuidGenerator } from "@/utils/utils";
import { storage } from "@/utils/firebase";
import toast from "react-hot-toast";
import { useUserData } from "@/contexts/userDataContext";
import { useAuth } from "@/contexts/authContext";
import { getProductSearch } from "@/utils/api";

const FullScreenModal = (props) => {
  const {
    active,
    closeModalHandler,
    imageBefore,
    imageAfter,
    disableDownloading,
    disablePublishing,
    onPublish,
    isPublished,
    onDownload,
  } = props;
  const user = useAuth();
  const [comparison, setComparison] = useState(false);
  const [cropperActive, setCropperActive] = useState(false);
  const [cropData, setCropData] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef();
  const cropperRef = useRef();
  const windowSize = useWindowSize();
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  console.log(props);

  // Handles image load and sets dimensions
  const handleImageLoad = (event) => {
    setDimensions({ width: imageRef.current.offsetWidth, height: imageRef.current.offsetHeight });
  };

  // Gets cropped data and performs a product search
  const getCropData = async () => {
    setIsSearching(true);

    if (typeof cropperRef.current?.cropper !== "undefined") {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      if (!croppedCanvas) {
        toast.error("Cropping failed. Please try again.");
        setIsSearching(false);
        return;
      }
      croppedCanvas.toBlob(async (blob) => {
        const url = await uploadImageToFirebase(blob);

        const productSearches = await getProductSearch(encodeURIComponent(url));
        console.log(productSearches);

        setIsSearching(false);
        setSearchResults([...productSearches]);
        setShowSearchResults(true);
      }, "image/jpeg");
    }
  };

  // Uploads image to Firebase storage
  const uploadImageToFirebase = async (file) => {
    const fileName = `${user.currentUser.uid}_${uuidGenerator()}`;
    const uploadTask = storage.ref(`croppedImages/${fileName}`).put(file);

    try {
      // Wait for the upload to complete
      await uploadTask;

      // Get the download URL
      const url = await storage.ref("croppedImages").child(fileName).getDownloadURL();

      return url;
    } catch (error) {
      toast.error("Failed to upload image. Please check your file and try again.");
    }
  };

  // Updates image dimensions when the modal is active
  useEffect(() => {
    if (!active) return;
    handleImageLoad();
  }, [imageRef, imageAfter, imageBefore, comparison, cropperActive, windowSize]);

  return (
    <>
      {active && (
        <div
          className={`fixed top-0 left-0 w-full h-screen flex items-center justify-center transition-all z-50 ${
            active ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="flex items-center gap-6 absolute top-0 right-0 py-2 px-6 z-50 bg-teal-600 rounded-bl-lg">
            <div className="tooltip tooltip-bottom cursor-pointer" data-tip="Crop Image">
              <ScissorsIcon width={24} height={24} color="white" onClick={() => setCropperActive(!cropperActive)} />
            </div>

            {!disablePublishing && (
              <div className="tooltip tooltip-bottom cursor-pointer" data-tip={isPublished ? "UnPublish" : "Publish"}>
                <CloudArrowUpIcon width={30} height={30} color="white" onClick={onPublish} />
              </div>
            )}

            <div className="tooltip tooltip-bottom cursor-pointer" data-tip="Side by Side Comparison">
              <ArrowsRightLeftIcon width={24} height={24} color="white" onClick={() => setComparison(!comparison)} />
            </div>

            {!disableDownloading && (
              <div className="tooltip tooltip-bottom cursor-pointer" data-tip="Download">
                <ArrowDownCircleIcon width={30} height={30} color="white" onClick={onDownload} />
              </div>
            )}

            <div className="tooltip tooltip-bottom cursor-pointer" data-tip="Close">
              <XCircleIcon width={30} height={30} color="white" onClick={closeModalHandler} />
            </div>
          </div>

          <div
            className={`${
              !comparison && !cropperActive ? "relative opacity-100 visible" : "absolute opacity-0 invisible"
            } select-none`}
          >
            <img src={imageAfter} className="fullScreenImage" ref={imageRef} />
          </div>

          {comparison && (
            <ReactCompareSlider
              className={`bg-rd select-none w-[${dimensions.width}px] h-[${dimensions.height}px]`}
              style={{ overflow: "visible", width: dimensions.width, height: dimensions.height }}
              itemOne={
                <ReactCompareSliderImage
                  src={imageBefore}
                  key={imageBefore}
                  alt="Image one"
                  className={`fullScreenImage `}
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src={imageAfter}
                  key={imageAfter}
                  alt="Image two"
                  className="fullScreenImage"
                />
              }
            />
          )}

          {cropperActive && (
            <div className="flex flex-col gap-2">
              <Cropper
                ref={cropperRef}
                style={{ height: dimensions.height, width: dimensions.width }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={imageAfter}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                guides={true}
                zoomable={false}
                dragMode={"none"}
                scalable={false}
              />
              <button className="btn btn-primary text-white px-6" onClick={getCropData}>
                {!isSearching && "Search"}
                {isSearching && <span className="loading loading-spinner"></span>}
              </button>
            </div>
          )}

          {searchResults && (
            <div
              className={`absolute h-screen w-[420px] top-0 right-0 z-50 transition-all duration-300 md:w-[100%] ${
                showSearchResults ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full bg-primary py-6 rounded-s-lg  cursor-pointer ${
                  showSearchResults ? "md:translate-x-0 md:rounded-r-lg md:rounded-l-none" : ""
                }`}
                onClick={() => setShowSearchResults(!showSearchResults)}
              >
                <ChevronLeftIcon
                  className={`w-8 h-8 transition-all duration-300 text-white ${
                    showSearchResults ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>

              <div className={`h-full py-4 overflow-visible overflow-y-scroll px-4 bg-white`}>
                <h4 className="text-2xl font-semibold">Search Results</h4>
                <div className="flex flex-wrap gap-8 items-center justify-center mt-4">
                  {searchResults?.map((result) => (
                    <a
                      key={result?.link}
                      href={result?.link}
                      target="_blank"
                      className="border flex flex-col items-center rounded-lg"
                    >
                      <img src={result?.thumbnail} alt="" className="w-40 h-40 object-cover" />
                      <h6 className="mt-2 max-w-40 text-center break-words">{result?.source}</h6>
                      <p className="mb-1">
                        {result?.price?.currency}
                        {result?.price?.extracted_value}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div
            className="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-[-1]"
            onClick={closeModalHandler}
          ></div>
        </div>
      )}
    </>
  );
};

export default FullScreenModal;
