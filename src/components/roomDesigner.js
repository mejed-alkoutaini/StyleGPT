import { roomsThemes, roomsTypes } from "@/data/data";
import Dropdown from "./dropdown";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { generateRoomImage } from "@/utils/api";
import { TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import WithProtectedRoute from "./withProtectedRoute";
import FullScreenModal from "./fullScreenModal";
import { FullScreenIcon } from "./svgs";
import { storage } from "@/utils/firebase";
import { uuidGenerator } from "@/utils/utils";
import { toast } from "react-hot-toast";
import DefaultLayout from "./defaultLayout";
import { useUserData } from "../contexts/userDataContext";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

export default function RoomDesigner(props) {
  const { userData } = useUserData();
  const [selectedRoomType, setSelectedRoomType] = useState(roomsTypes[0]);
  const [selectedTheme, setSelectedTheme] = useState(roomsThemes[0]);
  const [selectedFile, setSelectedFile] = useState();
  const [previewImage, setPreviewImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [comparison, setComparison] = useState(false);
  const [showFullScreen, setShowFullScreen] = useState(false);

  const selectImageHandler = (file) => {
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();

      reader.onload = (event) => {
        const blob = new Blob([event.target.result], { type: file.type });
        const imageURL = URL.createObjectURL(blob);
        setPreviewImage(imageURL);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const uploadImageToFirebase = async (file) => {
    const fileName = `${userData.uid}_${uuidGenerator()}`;
    const uploadTask = storage.ref(`rooms/${fileName}`).put(file);

    try {
      // Wait for the upload to complete
      await uploadTask;

      // Get the download URL
      const url = await storage.ref("rooms").child(fileName).getDownloadURL();
      return url;
    } catch (error) {
      toast.error("Failed to upload image. Please check your file and try again.");
    }
  };

  const generateHandler = async () => {
    if (!selectedFile) {
      toast("Please select an image", {
        icon: "⚠️",
      });
      return;
    }

    if (isGenerating) return;

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      // Get the URL of the uploaded image
      const imageUrl = await uploadImageToFirebase(selectedFile);

      // Generate new room image
      const result = await generateRoomImage(userData.uid, selectedRoomType.id, selectedTheme.id, imageUrl);

      toast.success("Image saved to your rooms");
      setGeneratedImage(result.image);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsGenerating(false);
      setComparison(false);
    }
  };

  const downloadHandler = async () => {
    try {
      const response = await axios.get(generatedImage, { responseType: "blob" });
      const blob = response.data;

      const blobUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = `A ${selectedTheme.text} ${selectedRoomType.text}`;
      anchor.click();

      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      toast.error("Error downloading image");
    }
  };

  return (
    <>
      <div className="flex justify-center w-full min-h-screen bg-[#F6F6F6] px-8 pt-16 pb-28 lg:p-4 lg:pb-14">
        <div className="w-full flex justify-center">
          <div className="max-w-[1400px] flex justify-between items-center gap-0 lg:gap-10 flex-1 lg:flex-col">
            <div className="flex flex-col bg-white px-5 py-8 w-full max-w-96 rounded-xl lg:max-w-full">
              <h1 className="text-3xl font-semibold lg:text-2xl md:text-xl">{props.title}</h1>

              <div className="mt-12 lg:mt-6">
                <h4 className="mb-1 lg:text-sm">Room Type</h4>
                <Dropdown
                  options={roomsTypes}
                  selectedOption={selectedRoomType}
                  setSelectedOption={setSelectedRoomType}
                />
              </div>

              <div className="mt-8">
                <h4 className="mb-2 lg:text-sm">Room Theme</h4>
                <div className="flex items-center flex-wrap gap-3">
                  {roomsThemes.map((theme) => (
                    <div
                      key={theme.id}
                      className="flex flex-col items-center justify-center cursor-pointer"
                      onClick={() => setSelectedTheme(theme)}
                    >
                      <img
                        src={theme.imageUrl}
                        className={`w-[100px] h-20 lg:w-[80px] lg:h-16 md:w-[60px] md:h-12 object-cover rounded-lg border-2 transition-all duration-150 ${
                          selectedTheme.id === theme.id && "border-teal-600"
                        }`}
                      />
                      <h6
                        className={`text-sm md:text-xs transition-all ${
                          selectedTheme.id === theme.id && "text-teal-600 font-semibold"
                        }`}
                      >
                        {theme.text}
                      </h6>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-32 lg:pt-16">
                <button className="btn btn-primary text-white w-full" onClick={generateHandler}>
                  {!isGenerating && "Generate"}
                  {isGenerating && <span className="loading loading-spinner"></span>}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center w-full">
              <div
                className={`border-dashed border-black w-[600px] md:w-full overflow-visible ${
                  selectedFile ? "border-0" : "border-2"
                }`}
              >
                {/* Image uploader */}
                {!selectedFile && (
                  <Dropzone onDrop={(acceptedFiles) => selectImageHandler(acceptedFiles[0])}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div
                          {...getRootProps()}
                          className="h-52 p-12 bg-gray-100 flex items-center justify-center cursor-pointer"
                        >
                          <input {...getInputProps()} accept="image/png, image/gif, image/jpeg" />
                          <p className="text-center">Drag 'n' drop some files here, or click to select files</p>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                )}

                {/* Preview Image */}
                {selectedFile && !generatedImage && (
                  <div className="relative overflow-visible aspect-[16/9]">
                    <img src={previewImage} className="rounded-lg w-full" />
                    {isGenerating && (
                      <div className="skeleton absolute top-0 w-full h-full rounded-lg opacity-60"></div>
                    )}
                    {!isGenerating && (
                      <TrashIcon
                        className="absolute top-[-12px] right-5 bg-black p-2 rounded-xl cursor-pointer"
                        fill="white"
                        width={36}
                        height={36}
                        onClick={() => setSelectedFile(null)}
                      />
                    )}
                  </div>
                )}

                {/* Result */}
                {generatedImage && !isGenerating && (
                  <>
                    {/* Generated Image */}
                    {!comparison && (
                      <div className="relative overflow-visible aspect-[16/11]">
                        <div
                          className="flex items-center gap-2 absolute top-3 left-3 px-2 py-2 bg-[#00000099] cursor-pointer text-white text-xs rounded-lg"
                          onClick={() => setShowFullScreen(true)}
                        >
                          <FullScreenIcon /> Fullscreen
                        </div>
                        <img src={generatedImage} className="rounded-lg w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Side by Side comparison */}
                    {comparison && (
                      <ReactCompareSlider
                        className="aspect-[16/11]"
                        itemOne={
                          <ReactCompareSliderImage
                            src={generatedImage}
                            alt="Image one"
                            className="rounded-lg w-full h-full object-cover"
                          />
                        }
                        itemTwo={
                          <ReactCompareSliderImage
                            src={previewImage}
                            alt="Image two"
                            className="rounded-lg w-full h-full object-cover"
                          />
                        }
                      />
                    )}

                    <div className="mt-4 flex justify-end gap-4">
                      <button
                        className="btn btn-primary text-white px-6"
                        onClick={() => {
                          setSelectedFile(null);
                          setGeneratedImage(null);
                        }}
                      >
                        New Room
                      </button>
                      <button className="btn btn-primary text-white px-6" onClick={downloadHandler}>
                        Download
                      </button>
                    </div>

                    <div className="form-control mt-2">
                      <label className="label cursor-pointer justify-end gap-4">
                        <span className="label-text">Side by Side Comparison</span>
                        <input
                          type="checkbox"
                          className="toggle"
                          checked={comparison}
                          onChange={() => setComparison(!comparison)}
                        />
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <FullScreenModal
        active={showFullScreen}
        closeModalHandler={() => setShowFullScreen(false)}
        imageAfter={generatedImage}
        imageBefore={previewImage}
      />
    </>
  );
}
