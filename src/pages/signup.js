import firebase, { googleProvider } from "../utils/firebase";
import { useRouter } from "next/router";
import { GoogleIcon } from "../components/svgs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { isValidEmail, isValidPassword } from "@/utils/utils";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import { createUser, isUserExist } from "@/utils/api";
import Navbar from "../components/navbar";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/authContext";

export default function Signup() {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [nameHasError, setNameHasError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailHasError, setEmailHasError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordHasError, setPasswordHasError] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordHasError, setRepeatPasswordHasError] = useState(false);
  const [checkErrors, setCheckErrors] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParams = searchParams.get("redirect");

  // Handles changes in the name input field
  const nameChangeHandler = (e) => {
    const value = e.target.value;
    setName(value);

    if (checkErrors) {
      name.trim().length >= 3 ? setNameHasError(false) : setNameHasError(true);
    }
  };

  // Handles changes in the email input field
  const emailChangeHandler = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (checkErrors) {
      isValidEmail(value) ? setEmailHasError(false) : setEmailHasError(true);
    }
  };

  // Handles changes in the password input field
  const passwordChangeHandler = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (checkErrors) {
      isValidPassword(value) ? setPasswordHasError(false) : setPasswordHasError(true);
    }
  };

  // Handles changes in the repeat password input field
  const repeatPasswordChangeHandler = (e) => {
    const value = e.target.value;
    setRepeatPassword(value);

    if (checkErrors) {
      password === value ? setRepeatPasswordHasError(false) : setRepeatPasswordHasError(true);
    }
  };

  // Toggles the visibility of the password input fields
  const togglePasswordVisibility = (field) => {
    field === "password" ? setShowPassword(!showPassword) : setShowRepeatPassword(!showRepeatPassword);
  };

  // Handles the signup process when the form is submitted
  const signupHandler = (e) => {
    e.preventDefault();
    if (isButtonLoading) return;

    setCheckErrors(true);
    let hasError = false;

    if (name.trim().length < 3) {
      setNameHasError(true);
      hasError = true;
    }

    if (!isValidEmail(email)) {
      setEmailHasError(true);
      hasError = true;
    }

    if (!isValidPassword(password)) {
      setPasswordHasError(true);
      hasError = true;
    }

    if (password !== repeatPassword) {
      setRepeatPasswordHasError(true);
      hasError = true;
    }

    if (!hasError) {
      setIsButtonLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
          const { uid, email, photoURL } = user;
          createUser(uid, email, photoURL, name)
            .then(async () => {
              await firebase.auth().currentUser.sendEmailVerification();
              router.push(`/verify-email?${redirectParams ? `redirect=${redirectParams}` : ""}`);
            })
            .catch((e) => {
              toast.error("Oops! Something went wrong during sign up. Please try again.");
            })
            .finally(() => {
              setIsButtonLoading(false);
            });
        })
        .catch((e) => {
          toast.error("Oops! Something went wrong during sign up. Please try again.");
          setIsButtonLoading(false);
        });
    }
  };

  // Handles Google authentication
  const googleAuthHandler = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(async ({ user }) => {
        setIsButtonLoading(true);
        const { uid, email, photoURL, displayName } = user;

        const userExist = await isUserExist(uid).then((userData) => {
          return userData;
        });

        if (userExist) {
          console.log("user exist");
          router.push(redirectParams || "/explore");
          setIsButtonLoading(false);
          return;
        }

        createUser(uid, email, photoURL, displayName)
          .then(() => {
            console.log("user Created");
            router.push(redirectParams || "/explore");
          })
          .catch((e) => {
            toast.error("Oops! Something went wrong during sign up. Please try again.");
            setIsButtonLoading(false);
          });
      })
      .catch((e) => {
        if (e.code === "auth/cancelled-popup-request" || e.code === "auth/popup-closed-by-user") return;
        toast.error("Oops! Something went wrong during sign up. Please try again.");
      })
      .finally(() => {
        setIsButtonLoading(false);
      });
  };

  // Redirects user if they are already logged in
  useEffect(() => {
    if (isButtonLoading) return;

    if (currentUser && currentUser.emailVerified) {
      router.push("/explore");
    } else if (currentUser && !currentUser.emailVerified) {
      router.push("/verify-email");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Sign Up | StyleGPT</title>
      </Head>

      <Navbar />
      <div className="w-full h-screen flex md:h-full md:py-16">
        <div className="w-[40%] md:hidden relative overflow-hidden bg-no-repeat bg-cover bg-[url('https://firebasestorage.googleapis.com/v0/b/roomai-af76d.appspot.com/o/rooms%2F2VkKFDFL3nbmybmMeq1MRl9PdZ92_a4a54dc5-a360-46e7-ae26-55a25256b01d?alt=media')]"></div>

        <div className="flex justify-center items-center flex-1 px-8 md:px-4">
          <div className="w-full max-w-[480px]">
            <h1 className="text-4xl font-semibold text-center">Sign Up</h1>
            <p className="text-gray-500 text-center my-4">
              Hello! Let's get you signed up. Please create your account.
            </p>

            <div>
              <button className="btn bg-white text-black mt-8 w-full text-base" onClick={googleAuthHandler}>
                <GoogleIcon />
                Sign up with Google
              </button>

              <div className="flex items-center justify-center my-8">
                <span className="flex-1 h-[1px] bg-gray-200"></span>
                <span className="mx-4 text-gray-400">OR</span>
                <span className="flex-1 h-[1px] bg-gray-200"></span>
              </div>

              <form className="flex flex-col" onSubmit={signupHandler}>
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={nameChangeHandler}
                    className={`input input-bordered w-full ${nameHasError && "input-error	"}`}
                    required={false}
                  />

                  {nameHasError && <span className="text-error text-sm">Please enter a valid username.</span>}
                </div>
                <div className="mt-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={emailChangeHandler}
                    className={`input input-bordered w-full ${emailHasError && "input-error	"}`}
                    required={false}
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
                    onClick={() => togglePasswordVisibility("password")}
                  >
                    {showPassword ? <EyeSlashIcon width={20} height={20} /> : <EyeIcon width={20} height={20} />}
                  </div>
                </div>
                {passwordHasError && (
                  <span className="text-error text-sm">Password must be at least 8 characters long.</span>
                )}

                <div className="relative mt-4">
                  <input
                    type={showRepeatPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={repeatPassword}
                    onChange={repeatPasswordChangeHandler}
                    className="input input-bordered w-full"
                  />
                  <div
                    type="button"
                    className="absolute top-[50%] right-4 -translate-y-1/2 cursor-pointer"
                    onClick={() => togglePasswordVisibility("repeatPassword")}
                  >
                    {showRepeatPassword ? <EyeSlashIcon width={20} height={20} /> : <EyeIcon width={20} height={20} />}
                  </div>
                </div>
                {repeatPasswordHasError && (
                  <span className="text-error text-sm">Passwords do not match. Please try again.</span>
                )}

                <p className="text-sm text-gray-500 mt-8">
                  By registering you agree to the{" "}
                  <Link href={"/terms-of-service"} className="text-primary">
                    Terms of Service
                  </Link>
                </p>
                <button className="btn btn-primary text-white mt-2 w-full">
                  {!isButtonLoading && "Sign Up"}
                  {isButtonLoading && <span className="loading loading-spinner"></span>}
                </button>
              </form>
              <p className="mt-8 text-center">
                Already have an account?
                <br />
                <Link href={`/login?${redirectParams ? `redirect=${redirectParams}` : ""}`} className="text-primary">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
