import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";
import hoverEffect from "hover-effect";
import { useEffect, useState } from "react";

const Convert = () => {
  const [imageAnimation, setImageAnimation] = useState();
  const [selectedImage, setSelectedImage] = useState("before");

  useEffect(() => {
    if (imageAnimation) return;
    setImageAnimation(
      new hoverEffect({
        parent: document.querySelector(".distortion-room"),
        intensity: 0.4,
        speedIn: 1.5,
        speedOut: 1.5,
        angle1: 20,
        angle2: 4,
        image1:
          "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2FN0jmEKhC8OM5rbkllmK03WfWjm83_1daf0134-fc98-46b5-a643-43f81e870840?alt=media&token=8fb10e12-f048-4cc1-91e3-fe3da96ba317",
        image2:
          "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2FN0jmEKhC8OM5rbkllmK03WfWjm83_f9e9f029-6f53-4a1c-a5b1-76f9112f264d?alt=media",
        displacementImage: "/distortion.png",
        hover: false,
        imagesRatio: 1 / 1.5,
      })
    );
  }, []);

  useEffect(() => {
    if (selectedImage === "after") {
      imageAnimation?.next();
    } else if (selectedImage === "before") {
      imageAnimation?.previous();
    }
  }, [selectedImage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImage(selectedImage === "before" ? "after" : "before");
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedImage]);

  return (
    <div className="flex items-center justify-center w-full pt-16 pb-32 md:pt-16 md:pb">
      <div className="flex items-center justify-between w-full max-w-[1200px] px-10 mx-auto lg:px-10 lg:flex-col md:px-5">
        <div className="flex-1 flex flex-col mr-16 lg:mr-0 lg:mb-16 lg:items-center lg:max-w-[712px] md:mb-10">
          <h2 className="text-5xl font-semibold md:text-3xl lg:text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </h2>
          <p className="mt-4 mb-8 text-lg md:text-base lg:text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          </p>
          <button className="btn btn-primary text-white w-32">Get Started</button>
        </div>

        <div className="relative flex-1 flex flex-col items-center w-full  mx-auto lg:flex-col rounded-xl overflow-hidden shadow-lg md:max-w-[500px]">
          <div className="distortion-room w-full h-[500px]  md:h-[300px] xs:h-[200px]"></div>
          <div className="absolute bottom-0 w-full h-full bg-[#00000015]"></div>

          <p
            className="capitalize absolute top-4 right-4 text-white bg-[#0000007b] px-4 py-1 rounded-lg cursor-pointer select-none"
            onClick={() => setSelectedImage(selectedImage === "after" ? "before" : "after")}
          >
            {selectedImage}
          </p>
          <div className="absolute bottom-4 right-4 flex items-center">
            <ArrowLongLeftIcon
              width={30}
              height={30}
              color="white"
              className="cursor-pointer mr-2"
              onClick={() => setSelectedImage(selectedImage === "after" ? "before" : "after")}
            />

            <ArrowLongRightIcon
              width={30}
              height={30}
              color="white"
              className="cursor-pointer"
              onClick={() => setSelectedImage(selectedImage === "after" ? "before" : "after")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Convert;
