import firebase, { googleProvider } from "../utils/firebase";
import { useRouter } from "next/router";
import { GoogleIcon } from "../components/svgs";
import Link from "next/link";
import { useState } from "react";
import { isValidEmail, isValidPassword } from "@/utils/utils";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import { createUser, isUserExist } from "@/utils/api";
import DefaultLayout from "@/components/defaultLayout";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailHasError, setEmailHasError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordHasError, setPasswordHasError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParams = searchParams.get("redirect");

  const emailChangeHandler = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailHasError(false); // Reset error on change
  };

  const passwordChangeHandler = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordHasError(false); // Reset error on change
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    if (isButtonLoading) return;

    let hasError = false;

    if (!isValidEmail(email)) {
      setEmailHasError(true);
      hasError = true;
    }

    if (!isValidPassword(password)) {
      setPasswordHasError(true);
      hasError = true;
    }

    if (!hasError) {
      setIsButtonLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(({ user }) => {
          if (user.emailVerified) {
            router.push(redirectParams || "/explore");
          } else {
            router.push(`/verify-email?${redirectParams ? `redirect=${redirectParams}` : ""}`);
          }
        })
        .catch((e) => {
          toast.error("Oops! Something went wrong during sign in. Please try again.");
        })
        .finally(() => {
          setIsButtonLoading(false);
        });
    }
  };

  const googleAuthHandler = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(async ({ user }) => {
        const { uid, email, photoURL, displayName } = user;

        const userExist = await isUserExist(uid).then((userData) => {
          return userData;
        });

        if (userExist) {
          router.push(redirectParams || "/explore");

          return;
        }

        createUser(uid, email, photoURL, displayName)
          .then(() => {
            router.push(redirectParams || "/explore");
          })
          .catch((e) => {
            toast.error("Oops! Something went wrong during sign up. Please try again.");
          });
      })
      .catch((e) => {
        if (e.code !== "auth/cancelled-popup-request") {
          toast.error("Oops! Something went wrong during sign up. Please try again.");
        }
      });
  };

  return (
    <>
      <Head>
        <title>Login | StyleGPT</title>
      </Head>

      <Navbar />
      <div className="w-full h-screen flex md:h-full md:py-16">
        <div className="w-[40%] md:hidden relative overflow-hidden bg-no-repeat bg-cover bg-[url('https://img.freepik.com/free-photo/japandi-living-room-interior-design_53876-145502.jpg')]"></div>

        <div className="flex justify-center items-center flex-1 px-8 md:px-4">
          <div className="w-full max-w-[480px]">
            <h1 className="text-4xl font-semibold text-center">Login</h1>
            <p className="text-gray-500 text-center my-4">Welcome back! Please log in to your account.</p>

            <div>
              <button className="btn bg-white text-black mt-8 w-full text-base" onClick={googleAuthHandler}>
                <GoogleIcon />
                Login with Google
              </button>

              <div className="flex items-center justify-center my-8">
                <span className="flex-1 h-[1px] bg-gray-200"></span>
                <span className="mx-4 text-gray-400">OR</span>
                <span className="flex-1 h-[1px] bg-gray-200"></span>
              </div>

              <form className="flex flex-col" onSubmit={loginHandler}>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={emailChangeHandler}
                    className={`input input-bordered w-full ${emailHasError && "input-error"}`}
                  />

                  {emailHasError && <span className="text-error text-sm">Please enter a valid email address.</span>}
                </div>

                <div className="relative mt-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={passwordChangeHandler}
                    className="input input-bordered w-full"
                  />
                  <div
                    type="button"
                    className="absolute top-[50%] right-4 -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeSlashIcon width={20} height={20} /> : <EyeIcon width={20} height={20} />}
                  </div>
                </div>
                {passwordHasError && (
                  <span className="text-error text-sm">Password must be at least 8 characters long.</span>
                )}

                <button className="btn btn-primary text-white mt-8 w-full">
                  {!isButtonLoading && "Login"}
                  {isButtonLoading && <span className="loading loading-spinner"></span>}
                </button>
              </form>
              <p className="mt-8 text-center">
                Don't have an account yet?
                <br />{" "}
                <Link href={`/signup?${redirectParams ? `redirect=${redirectParams}` : ""}`} className="text-primary">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
