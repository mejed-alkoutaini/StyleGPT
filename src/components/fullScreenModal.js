import { XCircleIcon } from "@heroicons/react/24/outline";

const FullScreenModal = ({ active, closeModalHandler, image }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen flex items-center justify-center transition-all ${
        active ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <XCircleIcon
        width={30}
        height={30}
        className="absolute top-8 right-8 cursor-pointer"
        color="white"
        onClick={closeModalHandler}
      />
      <img src={image} className="h-[90vh] md:w-[100vw] md:h-auto object-contain" />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-[-1]" onClick={closeModalHandler}></div>
    </div>
  );
};

export default FullScreenModal;
