import DefaultLayout from "@/components/defaultLayout";
import Link from "next/link";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

export default function Home() {
  return (
    <>
      <div className="hero py-24 pb-44 md:py-12 md:pb-24">
        <div className="hero-content flex flex-col text-center">
          <div className="max-w-lg">
            <h1 className="text-6xl md:text-5xl font-bold">StyleGPT</h1>
            <p className="text-lg py-6">
              Transform your space with ease. Upload your image, 3D model, or sketch, and watch your room come to life.
            </p>
            <button className="btn btn-primary text-white">Get Started</button>
          </div>

          <ReactCompareSlider
            className=" w-full max-w-[1080px] mt-8"
            itemOne={
              <ReactCompareSliderImage
                src="https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2FN0jmEKhC8OM5rbkllmK03WfWjm83_1daf0134-fc98-46b5-a643-43f81e870840?alt=media&token=8fb10e12-f048-4cc1-91e3-fe3da96ba317"
                alt="Image one"
                className="rounded-lg w-full h-full object-cover"
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src="https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2FN0jmEKhC8OM5rbkllmK03WfWjm83_f9e9f029-6f53-4a1c-a5b1-76f9112f264d?alt=media"
                alt="Image two"
                className="rounded-lg w-full h-full object-cover"
              />
            }
          />
        </div>
      </div>

      <div className="flex flex-col items-center bg-slate-100">
        <footer className="footer p-10 text-base-content max-w-[1200px]">
          <nav>
            <h6 className="footer-title">Services</h6>
            <Link href={"/"} className="link link-hover">
              Home
            </Link>
            <Link href={"/explore"} className="link link-hover">
              Explore
            </Link>
          </nav>
          <nav>
            <h6 className="footer-title">Legal</h6>
            <Link href={"/terms-of-user"} className="link link-hover">
              Terms of use
            </Link>
            <Link href={"/privacy-policy"} className="link link-hover">
              Privacy policy
            </Link>
            <Link href={"/refund-policy"} className="link link-hover">
              Refund Policy
            </Link>
          </nav>
        </footer>
        <footer className="footer px-10 py-4 border-t text-base-content border-base-300 max-w-[1200px]">
          <aside className="items-center grid-flow-col">
            <p>SytleGPT</p>
          </aside>
        </footer>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
