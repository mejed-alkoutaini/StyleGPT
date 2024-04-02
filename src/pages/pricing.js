import DefaultLayout from "@/components/defaultLayout";
import Footer from "@/components/footer";
import Testimonials from "@/components/homePage/testimonials";
import { useUserData } from "@/contexts/userDataContext";
import { createTransaction } from "@/utils/api";
import { CheckIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";

const plans = [
  {
    id: 4,
    name: "Free",
    cost: "0$",
    description: "Basic access with essential credits. Ideal for starters.",
    features: ["3 Credits", "+10 Room Types", "+40 Room Themes", "Coming Soon: Search by Product"],
  },
  {
    id: 1,
    name: "Trail",
    cost: "4.98$",
    taxInfo: "Exc. tax",
    priceId: "pri_01htg55xtjq9kf7vf97sjr3f87",
    description: "Extended credits for full exploration. No risk.",
    features: [
      "30 Credits",
      "+10 Room Types",
      "+40 Room Themes",
      "Support by Email",
      "Commercial Usage",
      "Coming Soon: Search by Product",
    ],
  },
  {
    id: 2,
    name: "Pro",
    cost: "9.98$",
    taxInfo: "Exc. tax",
    priceId: "pri_01htg57x397dvx3v52t04zww6t",
    description: "Increased credits for professional needs. Enhanced scope.",
    features: [
      "100 Credits",
      "+10 Room Types",
      "+40 Room Themes",
      "Support by Email",
      "Commercial Usage",
      "Coming Soon: Search by Product",
    ],
  },
  {
    id: 3,
    name: "Premium",
    cost: "14.98$",
    taxInfo: "Exc. tax",
    priceId: "pri_01htg59arh4c16g42hmw1gvgkj",
    description: "Maximum credits and support. Ultimate access.",
    features: [
      "200 Credits",
      "+10 Room Types",
      "+40 Room Themes",
      "Support by Email",
      "Commercial Usage",
      "Coming Soon: Search by Product",
    ],
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

    if (planId === 4) {
      router.push("/explore");
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
      <Head>
        <title>Pricing | StyleGPT</title>
      </Head>

      <div className="flex items-center justify-center w-full pt-16 pb-24 md:pt-16 md:pb overflow-hidden">
        <div className="flex flex-col items-center w-full max-w-[1400px] mx-auto lg:px-10 lg:flex-col md:px-0">
          <div className="flex flex-col items-center max-w-[612px] md:px-5">
            <h1 className="text-5xl font-semibold text-center md:text-3xl">Pricing</h1>
            <p className="mt-4 mb-8 text-lg text-center md:text-base">
              Choose the plan that's right for you with our clear, competitive pricing. Perfect for individuals and
              businesses alike.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <div className="flex items-start justify-center gap-4 mt-8 flex-wrap md:px-4">
              {plans.map((plan) => (
                <div key={plan.id} className={`flex flex-col w-[300px] border-[1px] rounded-xl pt-6 pb-4 px-4`}>
                  <div>
                    <h4 className={`text-2xl font-semibold ${plan.id === 2 && "text-teal-600"}`}>{plan.name}</h4>
                  </div>

                  <p className="text-sm mt-4 mb-8">{plan.description}</p>

                  <div>
                    <span className="text-3xl font-semibold">{plan.cost}</span>
                    <span className="ml-2 text-sm">{plan.taxInfo}</span>
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
                    {(!isLoading || selectedPlanId !== plan.id) && "Get Started"}
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
