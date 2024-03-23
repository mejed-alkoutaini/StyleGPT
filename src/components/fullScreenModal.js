import { XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

const FullScreenModal = ({ active, closeModalHandler, imageBefore, imageAfter }) => {
  const [comparison, setComparison] = useState(true);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen flex items-center justify-center transition-all ${
        active ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="flex items-center gap-8 absolute top-4 right-8 cursor-pointer z-50">
        <div className="form-control">
          <label className="label cursor-pointer justify-end gap-4">
            <span className="label-text text-white text-right">Side by Side Comparison</span>
            <input
              type="checkbox"
              className="toggle"
              checked={comparison}
              onChange={() => setComparison(!comparison)}
            />
          </label>
        </div>
        <XCircleIcon width={30} height={30} color="white" onClick={closeModalHandler} />
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
