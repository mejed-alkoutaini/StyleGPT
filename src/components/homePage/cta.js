const CTA = () => {
  return (
    <div className="flex items-center justify-center w-full pt-32 pb-24 md:pt-16 md:pb">
      <div className="flex flex-col items-center w-full max-w-[1060px] mx-auto lg:px-10 lg:flex-col md:px-5">
        <div className="flex flex-col items-center max-w-[612px]">
          <h2 className="text-5xl font-semibold text-center md:text-3xl">
            Lorem ipsum dolor sit amet, consectetur sit
          </h2>
          <p className="mt-4 mb-8 text-lg text-center md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <button className="btn btn-primary text-white w-32">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default CTA;
