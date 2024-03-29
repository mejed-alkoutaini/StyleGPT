import { useEffect, useRef, useState } from "react";
import { initializePaddle } from "@paddle/paddle-js";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useUserData } from "@/contexts/userDataContext";
import { useAuth } from "@/contexts/authContext";
import { getUser } from "@/utils/api";

const paddleToken = process.env.NEXT_PUBLIC_PADDLE_KEY;

export default function Checkout() {
  const { currentUser } = useAuth();
  const { setUserData } = useUserData();
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("txn");
  const router = useRouter();

  const [instance, setInstance] = useState();

  const completedCheckoutHandler = async () => {
    setTimeout(async () => {
      const userData = await getUser(currentUser?.uid);
      setUserData(userData);
      router.push("/explore");
      document.querySelector(".paddle-frame-overlay").remove();
    }, 1000);
    toast.success("Your Credits Have Been Added 🎉");
  };
  useEffect(() => {
    if (!transactionId) {
      router.push("/");
      return;
    }

    initializePaddle({
      environment: "sandbox",
      token: paddleToken,
      eventCallback: async function (data) {
        if (data.name == "checkout.completed") {
          completedCheckoutHandler();
        }
      },
    }).then((paddleInstance) => {
      if (paddleInstance) {
        setInstance(paddleInstance);
        paddleInstance?.Checkout.open({
          transactionId: transactionId,
        });
      }
    });
  }, []);

  return <div className="checkout"></div>;
}
