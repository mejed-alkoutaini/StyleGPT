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
          <Link href={"/room-transformation"} className="link link-hover">
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
        <aside className="items-center grid-flow-col">
          <p>SytleGPT</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
