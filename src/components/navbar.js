import Link from "next/link";
import { useAuth } from "../contexts/authContext";
import firebase from "../utils/firebase";
import { useUserData } from "../contexts/userDataContext";
import { Bars2Icon, PlusCircleIcon, UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();
  const { userData, setUserData } = useUserData();

  const logoutHandler = () => {
    setUserData(null);
    firebase.auth().signOut();
  };

  return (
    <>
      <div className="navbar bg-base-100 flex justify-center items-center shadow-sm z-[999]">
        <div className="flex-1 max-w-[1600px] flex justify-between items-center px-8 md:px-2">
          <div className="fmd:flex">
            <Link href={"/"} className="text-xl font-semibold flex items-center gap-4">
              <img src="/logo.png" alt="logo" className="w-12 h-7 object-contain" />
              <h4 className="md:hidden">StyleGPT</h4>
            </Link>
          </div>

          <div className="flex-none flex items-center gap-8 md:gap-4">
            <div
              className={`flex items-center gap-8 md:absolute md:left-1/2 md:-translate-x-1/2 md:w-[90%] md:border md:bg-white md:rounded-lg md:z-40 md:flex-col md:items-start md:gap-0 md:transition-all md:duration-300 ${
                isOpen ? "md:top-20 md:opacity-100 md:visible" : "md:top-[70px] md:opacity-0 md:invisible"
              }`}
            >
              {currentUser ? (
                <>
                  <Link
                    href={"/explore"}
                    className=" text-base md:px-4 md:py-3 md:border-b-[1px] md:w-full md:block"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Explore
                  </Link>
                  <Link
                    href={"/my-rooms"}
                    className="text-base md:px-4 md:py-3 md:border-b-[1px] md:w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    My Rooms
                  </Link>
                  <Link
                    href={"/design"}
                    className="text-base md:px-4 md:py-3 md:border-b-[1px] md:w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Design
                  </Link>

                  <Link
                    href={"/pricing"}
                    className="text-base hidden md:px-4 md:py-3 md:border-b-[1px] md:w-full md:block"
                    onClick={() => setIsOpen(false)}
                  >
                    Billing
                  </Link>

                  <Link
                    href={""}
                    className=" text-base md:px-4 md:py-3  md:w-full hidden md:block"
                    onClick={() => {
                      logoutHandler();
                      setIsOpen(false);
                    }}
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={"/explore"}
                    className="text-base md:px-4 md:py-3 md:border-b-[1px] md:w-full hidden md:block"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Explore
                  </Link>
                  <Link
                    href={"/pricing"}
                    className="text-base md:px-4 md:py-3 md:border-b-[1px] md:w-full hidden md:block"
                    onClick={() => setIsOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link
                    href={"/design"}
                    className="text-base md:px-4 md:py-3 md:border-b-[1px] md:w-full hidden md:block"
                    onClick={() => setIsOpen(false)}
                  >
                    Design
                  </Link>

                  <Link
                    href={"/login"}
                    className="text-base md:px-4 md:py-3  md:w-full hidden md:block"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {currentUser && (
              <>
                {/* <Link
                  href={"/pricing"}
                  className="border-[1px] rounded-md py-2 px-4 font-medium text-primary text-sm flex items-center gap-2 md:px-2"
                >
                  {userData?.credit} Credits
                  {userData?.credit <= 0 && <PlusCircleIcon width={24} height={24} />}
                </Link> */}

                <div className="dropdown dropdown-end ">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      {userData?.image ? (
                        <img alt="Avatar" src={userData?.image} />
                      ) : (
                        <UserCircleIcon width={40} height={40} />
                      )}
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                  >
                    {/* <li>
                      <Link href={"/pricing"} className="py-2 text-base">
                        Billing
                      </Link>
                    </li> */}
                    <li>
                      <a className="py-2 text-base" onClick={logoutHandler}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            )}

            {!currentUser && (
              <>
                <Link href={"/explore"} className="text-base md:hidden" onClick={() => setIsOpen(false)}>
                  Explore
                </Link>
                <Link href={"/pricing"} className="text-base md:hidden" onClick={() => setIsOpen(false)}>
                  Pricing
                </Link>
                <Link href={"/design"} className="text-base md:hidden" onClick={() => setIsOpen(false)}>
                  Design
                </Link>

                <Link href={"/login"} className="btn btn-primary text-white w-32 md:hidden">
                  Get Started
                </Link>
              </>
            )}

            <div className="cursor-pointer hidden md:block">
              {isOpen ? (
                <XMarkIcon width={24} height={24} onClick={() => setIsOpen(false)} />
              ) : (
                <Bars2Icon width={24} height={24} onClick={() => setIsOpen(true)} />
              )}
            </div>
          </div>
        </div>
      </div>

      {isOpen && <div className="fixed top-0 left-0 w-full h-screen z-30" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default Navbar;
