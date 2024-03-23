import WithProtectedRoute from "../components/withProtectedRoute";
import DefaultLayout from "../components/defaultLayout";
import { roomsThemes, roomsTypes } from "@/data/data";
import { useEffect, useState } from "react";
import { getExploreImages, getUserImages } from "@/utils/api";
import { useUserData } from "../contexts/userDataContext";

import { AdjustmentsHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import useWindowSize from "@/hooks/useWindowSize";
import FullScreenLoader from "@/components/fullScreenLoader";
import FullScreenModal from "@/components/fullScreenModal";
import { FullScreenIcon } from "@/components/svgs";

export default function Home() {
  const { userData } = useUserData();
  const [roomsImages, setRoomsImages] = useState();
  const [selectedTypeFilter, setSelectedTypeFilter] = useState(null);
  const [selectedThemeFilter, setSelectedThemeFilter] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [imageToShow, setImageToShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const windowSize = useWindowSize();

  const getData = async () => {
    setIsLoading(true);

    const images = await getExploreImages();
    setRoomsImages(images);

    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const fullScreenHandler = (image) => {
    setImageToShow(image);
    setShowFullScreen(true);
  };

  if (isLoading) return <FullScreenLoader />;

  return (
    <>
      <div className="w-full max-w-[1600px] mx-auto py-16 px-8 md:px-4 md:py-8">
        <h1 className="text-5xl font-semibold w-full pb-8 lg:text-4xl">EXPLORE</h1>

        <div className="flex mt-6 gap-12 lg:gap-8 md:flex-col">
          <div className="flex-1">
            <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2">
              {roomsImages?.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square cursor-pointer"
                  onClick={() => fullScreenHandler(image)}
                >
                  <div className="absolute top-0 left-0 w-full h-full skeleton rounded-lg opacity-30"></div>
                  <img
                    src={JSON.parse(image.after)}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <FullScreenModal
        active={showFullScreen}
        closeModalHandler={() => setShowFullScreen(false)}
        imageAfter={imageToShow && JSON.parse(imageToShow?.after)}
        imageBefore={imageToShow && imageToShow.before}
      />
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
