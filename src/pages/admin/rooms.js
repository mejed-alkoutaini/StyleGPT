import WithProtectedRoute from "../../components/withProtectedRoute";
import DefaultLayout from "../../components/defaultLayout";
import { roomsThemes, roomsTypes } from "@/data/data";
import { useEffect, useState } from "react";
import { adminPublishImage, getAdminExploreImages, getUserImages, publishImage } from "@/utils/api";
import { useUserData } from "../../contexts/userDataContext";
import { AdjustmentsHorizontalIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import useWindowSize from "@/hooks/useWindowSize";
import FullScreenLoader from "@/components/fullScreenLoader";
import FullScreenModal from "@/components/fullScreenModal";
import Link from "next/link";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";

export default function MyRooms() {
  const { userData } = useUserData();
  const [roomsImages, setRoomsImages] = useState([]);
  const [filteredRoomsImages, setFilteredRoomsImages] = useState([]);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState(null);
  const [selectedThemeFilter, setSelectedThemeFilter] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [imageToShow, setImageToShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const windowSize = useWindowSize();
  const router = useRouter();

  const getData = async () => {
    setIsLoading(true);

    const images = await getAdminExploreImages();
    setRoomsImages(images);

    setIsLoading(false);
  };

  useEffect(() => {
    if (userData.email !== "majedkot0@gmail.com" && userData.email !== "mehmetkado9@gmail.com") {
      router.push("/");
      return;
    }
    getData();
  }, []);

  useEffect(() => {
    if (windowSize.width > 767) {
      setShowMobileFilters(true);
    } else {
      setShowMobileFilters(false);
    }
  }, [windowSize]);

  const fullScreenHandler = (image) => {
    setImageToShow(image);
    setShowFullScreen(true);
  };

  useEffect(() => {
    const filterImages = () => {
      const filteredImages = roomsImages.filter(
        (image) =>
          (!selectedThemeFilter || image.theme === selectedThemeFilter) &&
          (!selectedTypeFilter || image.type === selectedTypeFilter)
      );

      setFilteredRoomsImages(filteredImages);
    };

    filterImages();
  }, [roomsImages, selectedThemeFilter, selectedTypeFilter]);

  const publishHandler = async () => {
    try {
      await adminPublishImage(imageToShow.id, !imageToShow.explore);
      toast.success(!imageToShow.explore ? "Image published to Explore." : "Image unpublished to Explore.");
      let updatedRoomsImages = [...roomsImages];

      const index = roomsImages.findIndex((room) => room.id === imageToShow.id);
      updatedRoomsImages[index] = { ...updatedRoomsImages[index], published: !imageToShow.explore };
      setRoomsImages(updatedRoomsImages);
      setImageToShow({ ...imageToShow, explore: !imageToShow.explore });
    } catch ({ message }) {
      toast.error(message || "Error publishing image");
    }
  };

  const downloadHandler = async () => {
    try {
      const response = await axios.get(imageToShow.after, { responseType: "blob" });
      const blob = response.data;

      const blobUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = `Room Image - StyleGPT`;
      anchor.click();

      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      toast.error("Error downloading image");
    }
  };

  if (isLoading) return <FullScreenLoader />;

  return (
    <>
      <div className="w-full max-w-[1600px] mx-auto py-16 px-8 md:px-4 md:py-8">
        <h1 className="text-5xl font-semibold w-full pb-8 border-b-[1px] lg:text-4xl">Admin - ROOMS</h1>

        <div className="flex mt-6 gap-12 lg:gap-8 md:flex-col">
          <h2
            className="font-medium hidden md:flex md:items-center max-w-20"
            onClick={() => setShowMobileFilters(true)}
          >
            <AdjustmentsHorizontalIcon width={20} height={20} className="mr-2" />
            Filters
          </h2>

          <div
            className={`flex flex-col border-r-[1px] w-56 transition-all lg:w-44 pr-4 md:fixed md:z-10 md:bg-white md:w-full md:min-h-screen md:top-0 md:left-0 md:px-4 md:pt-7 ${
              showMobileFilters ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <div className="flex items-center justify-between border-b-[1px] mb-4 pb-4">
              <h2 className="flex items-center font-medium">
                <AdjustmentsHorizontalIcon width={20} height={20} className="mr-2" />
                Filters
              </h2>

              <XMarkIcon
                width={24}
                height={24}
                onClick={() => setShowMobileFilters(false)}
                className="hidden md:block"
              />
            </div>

            <ul className="menu gap-1 border-b-[1px] p-0 pb-4 mb-4 pr-4">
              <li className="menu-title text-primary font-semibold text-sm py-[6px] px-[12px] lg:text-[14px]">
                Room Type
              </li>
              {roomsTypes.map((type) => (
                <li key={type.id}>
                  <a
                    className={` lg:text-[14px] py-[6px] px-[12px] ${
                      selectedTypeFilter === type.id ? "bg-primary hover:bg-primary text-white" : ""
                    }`}
                    onClick={() => setSelectedTypeFilter(selectedTypeFilter === type.id ? null : type.id)}
                  >
                    {type.text}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="menu gap-1 p-0 pb-4 mb-4 pr-4">
              <li className="menu-title text-primary font-semibold text-sm py-[6px] px-[12px] lg:text-[14px]">
                Room Theme
              </li>
              {roomsThemes.map((theme) => (
                <li key={theme.id}>
                  <a
                    className={`lg:text-[14px] py-[6px] px-[12px] ${
                      selectedThemeFilter === theme.id ? "bg-primary hover:bg-primary text-white" : ""
                    }`}
                    onClick={() => setSelectedThemeFilter(selectedThemeFilter === theme.id ? null : theme.id)}
                  >
                    {theme.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-2">
              {filteredRoomsImages?.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square cursor-pointer"
                  onClick={() => fullScreenHandler(image)}
                >
                  <div className="absolute top-0 left-0 w-full h-full skeleton rounded-lg opacity-30"></div>
                  <img src={image.after} className="absolute inset-0 w-full h-full object-cover rounded-lg" />
                </div>
              ))}
            </div>

            {roomsImages.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center py-16">
                <PhotoIcon color="#0d9488" width={60} height={60} />
                <h4 className="text-3xl font-medium my-3 text-center">No images created yet.</h4>
                <p className="mb-6 text-center">
                  Looks like you haven't created any images yet. Start creating to see them here!
                </p>
                <Link href={"/room-designer"}>
                  <button className="btn btn-primary text-white px-6">Start Now</button>
                </Link>
              </div>
            )}
            {roomsImages.length > 0 && filteredRoomsImages.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center py-16">
                <PhotoIcon color="#0d9488" width={90} height={90} />
                <h4 className="text-3xl font-medium my-3 text-center">No images match your filters.</h4>
                <p className="mb-6 max-w-xl text-center">
                  We couldn't find any images matching your filters. Try adjusting your filters or create something new!
                </p>
                <Link href={"/room-designer"}>
                  <button className="btn btn-primary text-white px-6">Start Now</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <FullScreenModal
        active={showFullScreen}
        closeModalHandler={() => setShowFullScreen(false)}
        imageAfter={imageToShow && imageToShow?.after}
        imageBefore={imageToShow && imageToShow.before}
        onPublish={publishHandler}
        isPublished={imageToShow?.explore}
        onDownload={downloadHandler}
      />
    </>
  );
}

MyRooms.getLayout = function getLayout(page) {
  return (
    <WithProtectedRoute>
      <DefaultLayout>{page}</DefaultLayout>
    </WithProtectedRoute>
  );
};
