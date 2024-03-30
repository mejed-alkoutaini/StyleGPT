import Link from "next/link";

const CTA = () => {
  return (
    <div className="flex items-center justify-center w-full pt-32 pb-24 md:pt-16 md:pb">
      <div className="flex flex-col items-center w-full max-w-[1060px] mx-auto lg:px-10 lg:flex-col md:px-5">
        <div className="flex flex-col items-center max-w-[612px]">
          <h2 className="text-5xl font-semibold text-center md:text-3xl">Begin Your Space Transformation</h2>
          <p className="mt-4 mb-8 text-lg text-center md:text-base">
            Take the first step towards your dream space. Start designing with our easy-to-use platform, and join a
            community where creativity meets innovation.
          </p>
          <Link href={'/signup'} className="btn btn-primary text-white w-32">Get Started</Link>
        </div>
      </div>
    </div>
  );
};

export default CTA;
