import { publishImage } from "@/utils/api";
import { XCircleIcon, ArrowDownCircleIcon, CloudArrowUpIcon, ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { toast } from "react-hot-toast";

const FullScreenModal = (props) => {
  const { active, closeModalHandler, imageBefore, imageAfter, imageId, disableDownloading, disablePublishing } = props;
  const [comparison, setComparison] = useState(true);

  const publishHandler = async () => {
    try {
      await publishImage(imageId);
      toast.success("Image published to Explore.");
    } catch ({ error }) {
      toast.error(error);
    }
  };

  const downloadHandler = async () => {
    try {
      const response = await axios.get(imageAfter, { responseType: "blob" });
      const blob = response.data;

      const blobUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = `Room Image`;
      anchor.click();

      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      toast.error("Error downloading image");
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen flex items-center justify-center transition-all ${
        active ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="flex items-center gap-6 absolute top-0 right-0 py-2 px-6 z-50 bg-teal-600 rounded-bl-lg">
        {!disablePublishing && (
          <div className="tooltip tooltip-bottom cursor-pointer" data-tip="Publish">
            <CloudArrowUpIcon width={30} height={30} color="white" onClick={publishHandler} />
          </div>
        )}

        <div className="tooltip tooltip-bottom cursor-pointer" data-tip="Side by Side Comparison">
          <ArrowsRightLeftIcon width={24} height={24} color="white" onClick={() => setComparison(!comparison)} />
        </div>

        {!disableDownloading && (
          <div className="tooltip tooltip-bottom cursor-pointer" data-tip="Download">
            <ArrowDownCircleIcon width={30} height={30} color="white" onClick={downloadHandler} />
          </div>
        )}

        <div className="tooltip tooltip-bottom cursor-pointer" data-tip="Close">
          <XCircleIcon width={30} height={30} color="white" onClick={closeModalHandler} />
        </div>
      </div>

      {!comparison && (
        <div>
          <img src={imageAfter} className="fullScreenImage" />
        </div>
      )}

      {comparison && (
        <ReactCompareSlider
          style={{ overflow: "visible" }}
          itemOne={<ReactCompareSliderImage src={imageBefore} alt="Image one" className="fullScreenImage" />}
          itemTwo={<ReactCompareSliderImage src={imageAfter} alt="Image two" className="fullScreenImage" />}
        />
      )}

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-[-1]" onClick={closeModalHandler}></div>
    </div>
  );
};

export default FullScreenModal;
