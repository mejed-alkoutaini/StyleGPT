import React, { useState } from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

const tabData = [
  {
    id: "photo",
    label: "Photo",
    before:
      "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2FN0jmEKhC8OM5rbkllmK03WfWjm83_1daf0134-fc98-46b5-a643-43f81e870840?alt=media&token=8fb10e12-f048-4cc1-91e3-fe3da96ba317",
    after:
      "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2FN0jmEKhC8OM5rbkllmK03WfWjm83_f9e9f029-6f53-4a1c-a5b1-76f9112f264d?alt=media",
  },
  {
    id: "sketch",
    label: "Sketch",
    before:
      "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2FN0jmEKhC8OM5rbkllmK03WfWjm83_1daf0134-fc98-46b5-a643-43f81e870840?alt=media&token=8fb10e12-f048-4cc1-91e3-fe3da96ba317",
    after:
      "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2FN0jmEKhC8OM5rbkllmK03WfWjm83_f9e9f029-6f53-4a1c-a5b1-76f9112f264d?alt=media",
  },
  {
    id: "3dModel",
    label: "3D Model",
    before:
      "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2FN0jmEKhC8OM5rbkllmK03WfWjm83_1daf0134-fc98-46b5-a643-43f81e870840?alt=media&token=8fb10e12-f048-4cc1-91e3-fe3da96ba317",
    after:
      "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2FN0jmEKhC8OM5rbkllmK03WfWjm83_f9e9f029-6f53-4a1c-a5b1-76f9112f264d?alt=media",
  },
  {
    id: "architecture",
    label: "Architecture",
    before:
      "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2FN0jmEKhC8OM5rbkllmK03WfWjm83_1daf0134-fc98-46b5-a643-43f81e870840?alt=media&token=8fb10e12-f048-4cc1-91e3-fe3da96ba317",
    after:
      "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2FN0jmEKhC8OM5rbkllmK03WfWjm83_f9e9f029-6f53-4a1c-a5b1-76f9112f264d?alt=media",
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

          <div className="px-5">
            <ReactCompareSlider
              className="h-[512px] mt-8 w-full max-w-[768px] md:aspect-video md:h-[unset] md:mt-4"
              itemOne={
                <ReactCompareSliderImage
                  src={selectedTabData.before} // Use selected tab data
                  alt="Image one"
                  className="rounded-lg w-full h-full object-contain"
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src={selectedTabData.after} // Use selected tab data
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
