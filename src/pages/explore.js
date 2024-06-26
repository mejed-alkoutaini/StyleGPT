import DefaultLayout from "../components/defaultLayout";
import { useEffect, useState } from "react";
import { getExploreImages } from "@/utils/api";
import FullScreenLoader from "@/components/fullScreenLoader";
import FullScreenModal from "@/components/fullScreenModal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Head from "next/head";

export default function Explore() {
  const [roomsImages, setRoomsImages] = useState();
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [imageToShow, setImageToShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetches the explore images from the API and updates the state
  const getData = async () => {
    setIsLoading(true);

    const images = await getExploreImages();
    setRoomsImages(images);

    setIsLoading(false);
  };

  // Calls getData when the component mounts to fetch images
  useEffect(() => {
    getData();
  }, []);

  // Handles the event when an image is clicked to show it in full screen
  const fullScreenHandler = (image) => {
    setImageToShow(image);
    setShowFullScreen(true);
  };

  // Shows a full screen loader while the data is loading
  if (isLoading) return <FullScreenLoader />;

  return (
    <>
      <Head>
        <title>Explore | StyleGPT</title>
      </Head>

      <div className="w-full max-w-[1600px] mx-auto py-16 px-8 md:px-4 md:py-8">
        <h1 className="text-5xl font-semibold w-full pb-8 lg:text-4xl">EXPLORE</h1>

        <div className="flex mt-6 gap-12 lg:gap-8 md:flex-col">
          <div className="flex-1">
            <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-1 gap-2">
              {roomsImages?.map((image, index) => (
                <div
                  key={image.after}
                  className="relative aspect-square cursor-pointer"
                  onClick={() => fullScreenHandler(image)}
                >
                  <div className="absolute top-0 left-0 w-full h-full skeleton rounded-lg opacity-30"></div>
                  <LazyLoadImage
                    key={image.after}
                    src={image.after}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  ></LazyLoadImage>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <FullScreenModal
        active={showFullScreen}
        closeModalHandler={() => setShowFullScreen(false)}
        imageAfter={imageToShow && imageToShow?.after}
        imageBefore={imageToShow && imageToShow.before}
        disablePublishing
        disableDownloading
      />
    </>
  );
}

Explore.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
