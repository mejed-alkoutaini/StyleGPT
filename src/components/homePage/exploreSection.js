import useWindowSize from "@/hooks/useWindowSize";
import Link from "next/link";

const images = [
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/Landing%20page%2Fexplore-1.jpeg?alt=media",
    theme: "Modern",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/Landing%20page%2Fvintage-after.png?alt=media",
    theme: "Minimalist",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/Landing%20page%2Fexplore-3.jpeg?alt=media",
    theme: "Vintage",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/Landing%20page%2Ftypes-original.png?alt=media",
    theme: "Japanese",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/Landing%20page%2Fexplore-2.jpeg?alt=media",
    theme: "Coastal",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/Landing%20page%2Ftypes-modern.jpeg?alt=media",
    theme: "Theme6",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/Landing%20page%2Ftypes-vintage.jpeg?alt=media",
    theme: "Theme7",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/Landing%20page%2Ftypes-coastal.jpeg?alt=media",
    theme: "Theme8",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/Landing%20page%2Fexplore-4.jpeg?alt=media",
    theme: "Theme9",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/Landing%20page%2Ftypes-japanese.jpeg?alt=media",
    theme: "Theme10",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/Landing%20page%2Fexplore-5.jpeg?alt=media",
    theme: "Theme11",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/Landing%20page%2Fexplore-7.jpeg?alt=media",
    theme: "Theme12",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/Landing%20page%2Fexplore-6.jpeg?alt=media",
    theme: "Theme13",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/Landing%20page%2Fexplore-8.jpeg?alt=media",
    theme: "Theme14",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/Landing%20page%2Fexplore-9.jpeg?alt=media",
    theme: "Theme15",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/Landing%20page%2Fexplore-1.jpeg?alt=media",
    theme: "Theme15",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/Landing%20page%2Fvintage-after.png?alt=media",
    theme: "Theme15",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/Landing%20page%2Ftypes-original.png?alt=media",
    theme: "Theme15",
  },
];

const GalleryImage = ({ src }) => (
  <div>
    <img key={src} src={src} className="h-full max-w-full rounded-lg object-cover object-center"></img>
  </div>
);

const GalleryColumn = ({ images, className }) => (
  <div className={`grid gap-4 ${className}`}>
    {images.map((image, index) => (
      <GalleryImage key={index} src={image.src} />
    ))}
  </div>
);

const ExploreSection = () => {
  return (
    <div className="w-full h-[700px] relative overflow-hidden bg-black lg:h-[550px] md:h-[450px]">
      <div className="absolute top-0 left-0 w-full h-full bg-[#0000007a]"></div>
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{ background: "radial-gradient(rgba(22, 22, 33, 0.70), rgba(22, 22, 33, 0.1))" }}
      ></div>
      <div className="grid grid-cols-6 gap-4 lg:grid-cols-4 md:grid-cols-3 h-full">
        <GalleryColumn images={images.slice(0, 4)} />
        <GalleryColumn images={images.slice(4, 7)} />
        <GalleryColumn images={images.slice(7, 9)} className={`md:hidden`} />
        <GalleryColumn images={images.slice(9, 12)} />
        <GalleryColumn images={images.slice(12, 16)} className={`md:hidden`} />
        <GalleryColumn images={images.slice(16, 18)} className={`md:hidden`} />
      </div>

      <div className=" w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center px-4">
        <h2 className="text-5xl font-semibold text-white text-center mb-2 md:text-3xl">
          Explore User Creations <br />
          and Share Yours
        </h2>
        <p className="mt-4 mb-8 text-lg text-white text-center max-w-[650px] md:text-base">
          Browse a gallery of user transformations and add your own. It's a quick glimpse into varied styles and a
          chance to inspire others with your design.
        </p>
        <Link href={"/explore"} className="btn btn-primary text-white w-32">
          Explore
        </Link>
      </div>
    </div>
  );
};

export default ExploreSection;
