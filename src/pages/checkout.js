import { useEffect, useRef } from "react";
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
  const timeoutRef = useRef();

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
          // Clear any existing timeout to ensure we don't have duplicate calls
          clearTimeout(timeoutRef.current);

          // Set a new timeout
          timeoutRef.current = setTimeout(async () => {
            // Assuming getUser is an async function that fetches user data
            const userData = await getUser(currentUser?.uid);
            setUserData(userData);
            router.push("/explore");
            toast.success("Your Credits Have Been Added 🎉");
          }, 2000); // 2000 milliseconds = 2 seconds
        }
      },
    }).then((paddleInstance) => {
      if (paddleInstance) {
        paddleInstance?.Checkout.open({
          transactionId: transactionId,
          // settings: {
          //   displayMode: "inline",
          //   frameTarget: "checkout",
          // },
        });
      }
    });
  }, []);

  return <div className="checkout"></div>;
}
