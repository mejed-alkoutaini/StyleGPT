import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { FullScreenIcon } from "../svgs";

const Hero = () => {
  return (
    <>
      <div className="flex items-center justify-center w-full py-24 md:py-16">
        <div className="flex items-center justify-between w-full max-w-[1400px] px-10 mx-auto lg:px-10 lg:flex-col md:px-5">
          <div className="w-full mr-12 lg:flex lg:flex-col lg:items-center lg:justify-center lg:max-w-[512px] lg:mr-0">
            <h1 className="text-6xl font-semibold lg:text-center md:text-4xl">
              Transform Your Space with AI in Seconds
            </h1>
            <p className="mt-4 mb-8 text-lg lg:text-center md:text-base">
              Upload a photo or sketch, pick your desired style, and watch the AI recreates your room with stunning
              accuracy.
            </p>

            <div className="flex items-center gap-4">
              <Link href={"/signup"}>
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

          <div className="relative w-full h-[600px] flex items-center lg:mt-12 lg:h-auto">
            <img src="https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/Landing%20page%2Ftree.jpg?alt=media" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
