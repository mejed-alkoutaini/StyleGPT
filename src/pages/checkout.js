import { useEffect } from "react";
import { initializePaddle } from "@paddle/paddle-js";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const paddleToken = process.env.NEXT_PUBLIC_PADDLE_KEY;

export default function Checkout() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("txn");
  const router = useRouter();

  useEffect(() => {
    if (!transactionId) {
      router.push("/");
      return;
    }

    initializePaddle({
      environment: "sandbox",
      token: paddleToken,
      eventCallback: function (data) {
        if (data.name == "checkout.completed") {
          toast.success("Your Credits Have Been Added 🎉");
          router.push("/explore");
        }
      },
    }).then((paddleInstance) => {
      if (paddleInstance) {
        paddleInstance?.Checkout.open({
          transactionId: transactionId,
          settings: {
            displayMode: "inline",
            frameTarget: "checkout",
          },
        });
      }
    });
  }, []);

  return <div className="checkout"></div>;
}
