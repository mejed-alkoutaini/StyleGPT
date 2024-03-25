import { getUser } from "@/utils/api";
import { useAuth } from "../contexts/authContext";
import { useUserData } from "../contexts/userDataContext";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Loader from "./loader";
import FullScreenLoader from "./fullScreenLoader";
import Navbar from "./navbar";

const DefaultLayout = (props) => {
  const { children } = props;
  const { currentUser } = useAuth();
  const { userData, setUserData } = useUserData();
  const [isLoading, setIsLoading] = useState(true);

  const getUserData = async () => {
    try {
      setIsLoading(true);

      const userData = await getUser(currentUser?.uid)
        .then((userData) => {
          setUserData(userData);
        })
        .catch((e) => {
          toast.error(e.message || "Error getting user data");
        });

      setIsLoading(false);
    } catch (e) {
      toast.error(e);
    }
  };

  useEffect(() => {
    if (!currentUser || currentUser?.email === userData?.email) {
      setIsLoading(false);
      return;
    }
    console.log("sending");
    getUserData();
  }, []);

  if (isLoading) return <FullScreenLoader />;

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DefaultLayout;
