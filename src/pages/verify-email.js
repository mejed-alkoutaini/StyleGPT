import { EnvelopeOpenIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/authContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import firebase from "../utils/firebase";
import { toast } from "react-hot-toast";
import Navbar from "../components/navbar";

const VerifyEmail = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }

    if (currentUser?.emailVerified) {
      router.push("/");
    }
  }, [currentUser]);

  const handleResendVerificationEmail = async () => {
    if (isSendingEmail) return;

    try {
      setIsSendingEmail(true);
      await firebase.auth().currentUser.sendEmailVerification();

      toast.success("Email sent successfully");
      setIsSendingEmail(false);
    } catch (error) {
      toast.error("Error sending verification email, Please try again.");
      setIsSendingEmail(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-screen flex md:h-full md:py-16">
        <div className="w-[40%] md:hidden bg-red-500 relative overflow-hidden bg-no-repeat bg-cover bg-[url('https://img.freepik.com/free-photo/japandi-living-room-interior-design_53876-145502.jpg')]"></div>

        <div className="flex justify-center items-center flex-1 px-8 md:px-4">
          <div className="w-full max-w-[480px] flex flex-col items-center justify-center">
            <EnvelopeOpenIcon width={120} height={120} color="#6A65FF" />
            <h1 className="text-4xl font-semibold text-center mt-12 mb-6">Verify Your Email Address</h1>
            <p className="text-gray-500 text-center">
              We've sent an email to <span className="text-primary">{currentUser?.email}</span> with a verification
              link. Please check your inbox and follow the instructions in the email to verify your email address. If
              you don't see the email in your inbox, please check your spam or junk folder.
            </p>
            <button className="btn btn-primary mt-8 text-white w-56" onClick={handleResendVerificationEmail}>
              {!isSendingEmail && "Resend Verification Email"}
              {isSendingEmail && <span className="loading loading-spinner"></span>}
            </button>
            <p className="text-sm mt-4 text-center text-primary">
              Already verified? <a href="/verify-email">Refresh</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
