import DefaultLayout from "@/components/defaultLayout";
import Footer from "@/components/footer";
import Testimonials from "@/components/homePage/testimonials";
import { useUserData } from "@/contexts/userDataContext";
import { createTransaction } from "@/utils/api";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";

const plans = [
  {
    id: 1,
    name: "Standart",
    cost: "4.98$",
    priceId: "pri_01ht3zpg2fcnrd2fgg09fm4w5r",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    features: ["30 Credits", "+30 Room Types", "+30 Room Themes", "Support by Email", "Commercial Usage"],
  },
  {
    id: 2,
    name: "Standart",
    cost: "9.98$",
    priceId: "pri_01ht3zq7wbx6aywfx5gp98gqxa",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    features: ["100 Credits", "+30 Room Types", "+30 Room Themes", "Support by Email", "Commercial Usage"],
  },
  {
    id: 3,
    name: "Standart",
    cost: "14.98$",
    priceId: "pri_01ht432c7j1hv2hsegab17r34w",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    features: ["200 Credits", "+30 Room Types", "+30 Room Themes", "Support by Email", "Commercial Usage"],
  },
];

export default function Pricing() {
  const { userData } = useUserData();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const router = useRouter();

  const selectingPlanHandler = async (planId) => {
    setSelectedPlanId(planId);
    if (!userData) {
      router.push("/login?redirect=/pricing");
      return;
    }
    setIsLoading(true);

    const selectedPlan = plans.find((p) => p.id === planId);

    const transaction = await createTransaction(selectedPlan.priceId, userData.email)
      .then(({ transactionsId }) => {
        router.push(`/checkout?txn=${transactionsId}`);
      })
      .catch(() => toast.error("Failed"));

    setIsLoading(false);
  };

  return (
    <>
      <div className="flex items-center justify-center w-full pt-16 pb-24 md:pt-16 md:pb overflow-hidden">
        <div className="flex flex-col items-center w-full max-w-[1060px] mx-auto lg:px-10 lg:flex-col md:px-0">
          <div className="flex flex-col items-center max-w-[612px] md:px-5">
            <h2 className="text-5xl font-semibold text-center md:text-3xl">Pricing</h2>
            <p className="mt-4 mb-8 text-lg text-center md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <div className="flex items-start justify-center gap-4 mt-8 lg:flex-wrap md:px-4">
              {plans.map((plan) => (
                <div key={plan.id} className={`flex flex-col border-[1px] rounded-xl pt-6 pb-4 px-4`}>
                  <div>
                    <h4 className={`text-2xl font-semibold ${plan.id === 2 && "text-teal-600"}`}>{plan.name}</h4>
                  </div>

                  <p className="text-sm mt-4 mb-8">{plan.description}</p>

                  <div>
                    <span className="text-3xl font-semibold">{plan.cost}</span>
                    <span className="ml-2 text-sm">Exc. tax</span>
                  </div>

                  <div className="flex flex-col mt-8 gap-4">
                    {plan.features.map((i) => (
                      <div key={i} className="text-sm flex items-center">
                        <CheckIcon width={20} height={20} className="text-teal-600 mr-2" /> {i}
                      </div>
                    ))}
                  </div>

                  <button
                    className={`btn mt-20 ${
                      plan.id === 2
                        ? "btn-primary bg-teal-600 text-white "
                        : " border-[1px] border-teal-600 bg-white text-teal-600 hover:bg-teal-600 hover:text-white "
                    }  `}
                    onClick={() => selectingPlanHandler(plan.id)}
                  >
                    {isLoading && selectedPlanId === plan.id && <span class="loading loading-spinner"></span>}
                    {(!isLoading || selectedPlanId !== plan.id) && "Pay Now"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Testimonials />
      <Footer />
    </>
  );
}

Pricing.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
