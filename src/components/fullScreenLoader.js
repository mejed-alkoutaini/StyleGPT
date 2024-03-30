const FullScreenLoader = () => (
  <div className="fixed w-full h-screen top-[67px] left-0 flex items-center justify-center">
    <span className="loading loading-infinity w-28 bg-teal-600 mt-[-67px]"></span>
    <span className="fixed bottom-4 left-1/2 -translate-x-1/2 text-primary text-xl font-medium">RoomAI</span>
  </div>
);

export default FullScreenLoader;
