import { CheckCircleIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";

const SpaceThemes = () => {
  const images = [
    {
      src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2F3McaMIG508QbLFVPHwMniCMIRQE3_00ae504e-f6b6-4829-bf09-6d71c8cf2794?alt=media",
      theme: "Modern",
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2F3McaMIG508QbLFVPHwMniCMIRQE3_00ac81cd-51e4-4dfd-9408-3cf53d680b92?alt=media",
      theme: "Minimalist",
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2FN0jmEKhC8OM5rbkllmK03WfWjm83_f9e9f029-6f53-4a1c-a5b1-76f9112f264d?alt=media",
      theme: "Vintage",
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2F3McaMIG508QbLFVPHwMniCMIRQE3_073f0731-3fae-4e51-b8a1-f1a07f40651c?alt=media",
      theme: "Japanese",
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2F3McaMIG508QbLFVPHwMniCMIRQE3_1c03bb3d-5622-4298-a2ab-a8e417e63031?alt=media",
      theme: "Coastal",
    },
  ];

  const themes = [
    "Modern",
    "Minimalist",
    "Industrial",
    "Coastal",
    "Tropical",
    "Futuristic",
    "Zen",
    "Vintage",
    "Airbnb",
    "Japanese",
    "Cyberpunk",
    "+20 More",
  ];

  const middleIndex = Math.floor(images.length / 2);

  const [focusedImageIndex, setFocusedImageIndex] = useState(middleIndex);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (focusedImageIndex + 1) % images.length;
      setFocusedImageIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [focusedImageIndex, images.length]);

  return (
    <div className="flex items-center justify-center w-full py-24 md:py-16">
      <div className="flex flex-col items-center justify-between w-full max-w-[1200px] px-10 mx-auto lg:px-10 lg:flex-col md:px-5">
        <div className="flex justify-between mb-14 lg:flex-col lg:items-center ">
          <div className="w-full max-w-[50%] lg:max-w-[612px] lg:mb-8">
            <h2 className="text-5xl font-semibold md:text-3xl lg:text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-x-14 gap-y-2 lg:grid-cols-4 md:grid-cols-2">
            {themes.map((theme) => (
              <div key={theme} className="flex items-center">
                <CheckCircleIcon width={20} height={20} className="text-teal-600 mr-2" />
                {theme}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center overflow-hidden rounded-xl">
          {images.map((image, index) => (
            <div
              key={index}
              className={`${
                focusedImageIndex === index ? "w-[60%] md:w-[68%]" : "w-[10%] md:w-[8%]"
              } h-[500px] object-cover transition-all duration-500 relative lg:h-[400px] md:h-[300px] xs:h-[200px]`}
              onMouseEnter={() => setFocusedImageIndex(index)}
            >
              <img
                src={image.src}
                alt={`Room Image ${index + 1}`}
                className={`w-full h-full object-cover transition-all duration-500`}
                onMouseEnter={() => setFocusedImageIndex(index)}
              />

              <div
                className={`absolute top-0 left-0 right-0  h-full  flex justify-center items-start pt-4 transition-all duration-500 md:pt-2 ${
                  focusedImageIndex !== index ? "bg-[#00000084]" : "bg-[#00000000]"
                }`}
              >
                <div
                  className={`text-white px-3 py-1 mx-1 text-sm rounded-lg bg-teal-600 md:text-xs transition-opacity duration-500 ${
                    focusedImageIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {image.theme}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpaceThemes;
