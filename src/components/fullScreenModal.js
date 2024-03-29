import useWindowSize from "@/hooks/useWindowSize";
import { XCircleIcon, ArrowDownCircleIcon, CloudArrowUpIcon, ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

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
  const [comparison, setComparison] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef();
  const windowSize = useWindowSize();

  // Handle the image load event to capture and set dimensions
  const handleImageLoad = (event) => {
    // Access the target from the event, which is the image element here
    // const { naturalWidth, naturalHeight } = event.target;

    console.log(imageRef.current.offsetWidth, imageRef.current.offsetHeight);
    // Update the state with the image's dimensions
    setDimensions({ width: imageRef.current.offsetWidth, height: imageRef.current.offsetHeight });
  };

  useEffect(() => {
    handleImageLoad();
  }, [imageRef, imageAfter, imageBefore, comparison, windowSize]);
  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen flex items-center justify-center transition-all ${
        active ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="flex items-center gap-6 absolute top-0 right-0 py-2 px-6 z-50 bg-teal-600 rounded-bl-lg">
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

      <div className={`${!comparison ? "relative opacity-100 visible" : "absolute opacity-0 invisible"} select-none`}>
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
            <ReactCompareSliderImage src={imageAfter} key={imageAfter} alt="Image two" className="fullScreenImage" />
          }
        />
      )}

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-[-1]" onClick={closeModalHandler}></div>
    </div>
  );
};

export default FullScreenModal;
