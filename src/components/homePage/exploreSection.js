import useWindowSize from "@/hooks/useWindowSize";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";

const images = [
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2F2VkKFDFL3nbmybmMeq1MRl9PdZ92_70c83dbf-e850-40e1-9dc4-d88d23eef830?alt=media",
    theme: "Modern",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2F2VkKFDFL3nbmybmMeq1MRl9PdZ92_87ba22cd-234d-412a-b44c-d5dad7813fb9?alt=media",
    theme: "Minimalist",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2FN0jmEKhC8OM5rbkllmK03WfWjm83_f9e9f029-6f53-4a1c-a5b1-76f9112f264d?alt=media",
    theme: "Vintage",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2F2VkKFDFL3nbmybmMeq1MRl9PdZ92_03304544-8506-4f1c-8d07-56637bd9bb91?alt=media",
    theme: "Japanese",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2F2VkKFDFL3nbmybmMeq1MRl9PdZ92_f55addb7-b743-4108-a15a-554b3569916a?alt=media",
    theme: "Coastal",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2F2VkKFDFL3nbmybmMeq1MRl9PdZ92_a4a54dc5-a360-46e7-ae26-55a25256b01d?alt=media",
    theme: "Theme6",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2FnNUzcjLrFTaZLheM1kkjMzMUrJu2_b412247f-e7d2-4058-90ca-4d0e203b4aaa?alt=media",
    theme: "Theme7",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2FnNUzcjLrFTaZLheM1kkjMzMUrJu2_9ade4a48-6b7b-43ae-ac02-027715259128?alt=media",
    theme: "Theme8",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2F2VkKFDFL3nbmybmMeq1MRl9PdZ92_3c9ebad9-eefa-4e78-bf0b-f7e36b2a9ab4?alt=media",
    theme: "Theme9",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2FNRnkYSIjPwgCRHVuw1qLcgoTiAf2_7e508ac3-3f3d-457d-a6e5-389db54ee935?alt=media",
    theme: "Theme10",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2F2VkKFDFL3nbmybmMeq1MRl9PdZ92_8820694a-a8ad-4f39-a71d-1cde45e3cc06?alt=media",
    theme: "Theme11",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2F2VkKFDFL3nbmybmMeq1MRl9PdZ92_53c460d9-bc21-4325-ad71-cb7d6afb162f?alt=media",
    theme: "Theme12",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2F2VkKFDFL3nbmybmMeq1MRl9PdZ92_48f81de1-d292-429b-9284-6ab15e61100b?alt=media",
    theme: "Theme13",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2F2VkKFDFL3nbmybmMeq1MRl9PdZ92_6f9fca7f-a3ec-4445-acc8-d375723ab4b4?alt=media",
    theme: "Theme14",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2F2VkKFDFL3nbmybmMeq1MRl9PdZ92_c479b405-f5c0-471e-8015-9fc1646abb2b?alt=media",
    theme: "Theme15",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2F2VkKFDFL3nbmybmMeq1MRl9PdZ92_f8ddede4-0fa9-4450-8c4d-6fefceee548f?alt=media",
    theme: "Theme15",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2F2VkKFDFL3nbmybmMeq1MRl9PdZ92_74baa6dc-d79e-4707-bf25-1a8ff0fdbd0a?alt=media",
    theme: "Theme15",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2F2VkKFDFL3nbmybmMeq1MRl9PdZ92_f66c60c5-9572-4387-879d-de09ca3a8a88?alt=media",
    theme: "Theme15",
  },
];

const GalleryImage = ({ src }) => (
  <div>
    <LazyLoadImage
      key={src}
      src={src}
      className="h-full max-w-full rounded-lg object-cover object-center"
    ></LazyLoadImage>
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
  const windowSize = useWindowSize();

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
