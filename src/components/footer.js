import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100">
      <footer className="footer p-10 text-base-content max-w-[1400px]">
        <nav>
          <h6 className="footer-title">Services</h6>
          <Link href={"/"} className="link link-hover">
            Home
          </Link>
          <Link href={"/explore"} className="link link-hover">
            Explore
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Design</h6>
          <Link href={"/design"} className="link link-hover">
            Room
          </Link>
          <Link href={"/sketch-transformation"} className="link link-hover">
            Sketch
          </Link>
          <Link href={"/3d-transformation"} className="link link-hover">
            3D Model
          </Link>
          <Link href={"/arch-transformation"} className="link link-hover">
            Architecture
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link href={"/terms-of-service"} className="link link-hover">
            Terms of Service
          </Link>
          <Link href={"/privacy-policy"} className="link link-hover">
            Privacy policy
          </Link>
          <Link href={"/refund-policy"} className="link link-hover">
            Refund Policy
          </Link>
        </nav>
      </footer>
      <footer className="footer px-10 py-4 border-t text-base-content border-base-300 max-w-[1400px]">
        <aside className="flex items-center justify-between w-full">
          <p>SytleGPT</p>

          <a href="https://www.instagram.com/stylegpt.io/" target="_blank">
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width={24}
              height={24}
              viewBox="0 0 56.7 56.7"
              enableBackground="new 0 0 56.7 56.7"
              xmlSpace="preserve"
            >
              <g>
                <path
                  d="M28.2,16.7c-7,0-12.8,5.7-12.8,12.8s5.7,12.8,12.8,12.8S41,36.5,41,29.5S35.2,16.7,28.2,16.7z M28.2,37.7
          c-4.5,0-8.2-3.7-8.2-8.2s3.7-8.2,8.2-8.2s8.2,3.7,8.2,8.2S32.7,37.7,28.2,37.7z"
                />
                <circle cx="41.5" cy="16.4" r="2.9" />
                <path
                  d="M49,8.9c-2.6-2.7-6.3-4.1-10.5-4.1H17.9c-8.7,0-14.5,5.8-14.5,14.5v20.5c0,4.3,1.4,8,4.2,10.7c2.7,2.6,6.3,3.9,10.4,3.9
          h20.4c4.3,0,7.9-1.4,10.5-3.9c2.7-2.6,4.1-6.3,4.1-10.6V19.3C53,15.1,51.6,11.5,49,8.9z M48.6,39.9c0,3.1-1.1,5.6-2.9,7.3
          s-4.3,2.6-7.3,2.6H18c-3,0-5.5-0.9-7.3-2.6C8.9,45.4,8,42.9,8,39.8V19.3c0-3,0.9-5.5,2.7-7.3c1.7-1.7,4.3-2.6,7.3-2.6h20.6
          c3,0,5.5,0.9,7.3,2.7c1.7,1.8,2.7,4.3,2.7,7.2V39.9L48.6,39.9z"
                />
              </g>
            </svg>
          </a>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
