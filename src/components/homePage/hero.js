import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { FullScreenIcon } from "../svgs";
import { useState } from "react";
import FullScreenModal from "../fullScreenModal";

const Hero = () => {
  const [showFullScreen, setShowFullScreen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center w-full py-24 md:py-16">
        <div className="flex items-center justify-between w-full max-w-[1200px] px-10 mx-auto lg:px-10 lg:flex-col md:px-5">
          <div className="w-full mr-12 lg:flex lg:flex-col lg:items-center lg:justify-center lg:max-w-[512px] lg:mr-0">
            <h1 className="text-6xl font-semibold lg:text-center md:text-4xl">
              Transform Your Space with AI in Seconds
            </h1>
            <p className="mt-4 mb-8 text-lg lg:text-center md:text-base">
              Upload a photo or sketch, pick your desired style, and watch the AI recreates your room with stunning
              accuracy.
            </p>

            <div className="flex items-center gap-4">
              <Link href={'/signup'}>
                <button className="btn btn-primary text-white w-32">Get Started</button>
              </Link>

              <Link href={"/login"} className="text-black font-semibold hover:text-primary">
                Login
              </Link>
            </div>

            <div className="mt-8 flex items-center md:flex-col">
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-11 h-11 rounded-full object-cover border-2 border-teal-600"
                />
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-11 h-11 rounded-full object-cover border-2 border-teal-600 ml-[-12px]"
                />
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-11 h-11 rounded-full object-cover border-2 border-teal-600 ml-[-12px]"
                />
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-11 h-11 rounded-full object-cover border-2 border-teal-600 ml-[-12px]"
                />
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-11 h-11 rounded-full object-cover border-2 border-teal-600 ml-[-12px]"
                />
              </div>

              <div className="ml-4 md:flex md:flex-col md:items-center">
                <div className="flex items-center gap-[2px] md:mt-3">
                  <StarIcon width={20} height={20} color="#facc15" />
                  <StarIcon width={20} height={20} color="#facc15" />
                  <StarIcon width={20} height={20} color="#facc15" />
                  <StarIcon width={20} height={20} color="#facc15" />
                  <StarIcon width={20} height={20} color="#facc15" />
                </div>
                <p className="text-center">from 1,500+ happy customers</p>
              </div>
            </div>
          </div>

          <div className="relative w-full h-[600px] lg:flex lg:flex-col lg:items-center lg:mt-12 lg:h-auto">
            <div className="w-[430px] object-contain absolute top-0 left-0 lg:w-full lg:max-w-[500px] lg:relative lg:mr-[200px] md:mr-5">
              <div
                className="flex items-center gap-2 absolute top-3 left-3 px-2 py-2 bg-[#00000099] cursor-pointer text-white text-xs rounded-lg"
                onClick={() => setShowFullScreen(true)}
              >
                <FullScreenIcon />
              </div>

              <img
                src="https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2FN0jmEKhC8OM5rbkllmK03WfWjm83_1daf0134-fc98-46b5-a643-43f81e870840?alt=media&token=8fb10e12-f048-4cc1-91e3-fe3da96ba317"
                alt="Room Image"
                className="rounded-xl "
              />
            </div>

            <div className="w-[430px] object-contain absolute top-[240px] right-0 lg:w-full lg:max-w-[500px] lg:relative lg:top-[unset] lg:ml-[200px] lg:mt-[-90px] md:ml-5">
              <div
                className="flex items-center gap-2 absolute top-3 right-3 px-2 py-2 bg-[#00000099] cursor-pointer text-white text-xs rounded-lg"
                onClick={() => setShowFullScreen(true)}
              >
                <FullScreenIcon />
              </div>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2FN0jmEKhC8OM5rbkllmK03WfWjm83_f9e9f029-6f53-4a1c-a5b1-76f9112f264d?alt=media"
                alt="Room Image"
                className="rounded-xl "
              />
            </div>
          </div>
        </div>
      </div>

      <FullScreenModal
        active={showFullScreen}
        closeModalHandler={() => setShowFullScreen(false)}
        imageAfter={
          "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2FN0jmEKhC8OM5rbkllmK03WfWjm83_f9e9f029-6f53-4a1c-a5b1-76f9112f264d?alt=media"
        }
        imageBefore={
          "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2FN0jmEKhC8OM5rbkllmK03WfWjm83_1daf0134-fc98-46b5-a643-43f81e870840?alt=media&token=8fb10e12-f048-4cc1-91e3-fe3da96ba317"
        }
        disableDownloading
        disablePublishing
      />
    </>
  );
};

export default Hero;
