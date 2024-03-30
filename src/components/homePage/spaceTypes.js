import React, { useState } from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

const tabData = [
  {
    id: "photo",
    label: "Photo",
    before:
      "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/Landing%20page%2Fvintage-before.png?alt=media",
    after:
      "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/Landing%20page%2Fvintage-after.png?alt=media",
  },
  {
    id: "sketch",
    label: "Sketch",
    before:
      "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2F2VkKFDFL3nbmybmMeq1MRl9PdZ92_23d28bb1-f965-4159-93c9-4e966b3e86bc?alt=media",
    after:
      "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/Landing%20page%2Fsketch-after.jpeg?alt=media",
  },
  {
    id: "3dModel",
    label: "3D Model",
    before:
      "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2F2VkKFDFL3nbmybmMeq1MRl9PdZ92_362020b1-5e8c-48a4-9460-342b4fe252d1?alt=media",
    after:
      "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/Landing%20page%2F3dmodel-after.jpeg?alt=media",
  },
  {
    id: "architecture",
    label: "Architecture",
    before:
      "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2F2VkKFDFL3nbmybmMeq1MRl9PdZ92_1d467ace-f609-403b-b31a-d17673d8b91a?alt=media",
    after:
      "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/Landing%20page%2Farch-after.jpeg?alt=media",
  },
];
const SpaceTypes = () => {
  const [selectedTab, setSelectedTab] = useState("photo");

  const renderTab = (tab) => (
    <h6
      key={tab.id}
      className={`flex items-center text-xl font-medium  px-6 rounded-lg cursor-pointer text-center transition-all duration-300 md:text-base md:px-4  xs:h-8 ${
        selectedTab === tab.id ? "bg-teal-500 text-white py-1" : "bg-none py-[-20px]"
      }`}
      onClick={() => setSelectedTab(tab.id)}
    >
      {tab.label}
    </h6>
  );

  const selectedTabData = tabData.find((tab) => tab.id === selectedTab);

  return (
    <>
      <div className="flex items-center justify-center w-full pt-16 pb-24 md:pt-16 md:pb overflow-hidden">
        <div className="flex flex-col items-center w-full max-w-[1060px] mx-auto lg:px-10 lg:flex-col md:px-0">
          <div className="flex flex-col items-center max-w-[612px] md:px-5">
            <h2 className="text-5xl font-semibold text-center md:text-3xl">
              Begin Your Design Journey from Any Starting Point
            </h2>
            <p className="mt-4 mb-8 text-lg text-center md:text-base">
              StyleGPT works with whatever you have: a photo, a sketch, a 3D model, or architectural drawings. Simply
              upload and select your style and let our AI handles the transformation, making your design dreams a
              reality with ease.
            </p>
          </div>

          <div className="hide-scrollbar flex items-center w-full bg-[#eff8f2] rounded-lg max-w-[650px] mt-4 h-9 md:w-[100%] md:gap-2 md:overflow-x-scroll md:overflow-y-hidden md:rounded-none md:px-4">
            <div className="w-full flex items-center justify-between min-w-[500px]"> {tabData.map(renderTab)}</div>
          </div>

          <div className="px-5 md:aspect-video">
            <ReactCompareSlider
              className="w-[768px] h-[512px] mt-8 max-w-[768px] md:aspect-video md:w-[unset] md:h-[unset] md:mt-4"
              itemOne={
                <ReactCompareSliderImage
                  key={selectedTabData.before}
                  src={selectedTabData.before}
                  alt="Image one"
                  className="rounded-lg w-full h-full object-contain"
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  key={selectedTabData.after}
                  src={selectedTabData.after}
                  alt="Image two"
                  className="rounded-lg w-full h-full object-contain"
                />
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SpaceTypes;
