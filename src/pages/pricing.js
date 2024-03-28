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
    monthlyCost: "5$",
    monthlyId: "pri_01ht14y95ghmd8p4dbw8zsk937",
    yearlyCost: "50$",
    yearlyId: "pri_01ht168x4kvjeswyy89d9cpjmf",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    features: [
      "Lorem ipsum dolor sit amet1",
      "Lorem ipsum dolor sit amet2",
      "Lorem ipsum dolor sit amet3",
      "Lorem ipsum dolor sit amet4",
      "Lorem ipsum dolor sit amet5",
    ],
  },
  {
    id: 2,
    name: "Standart",
    monthlyCost: "10$",
    monthlyId: "pri_01ht0te0q14r6ev80jbqzvjn18",
    yearlyCost: "100$",
    yearlyId: "pri_01ht1698v22ekn1y0qz2wq4s35",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    features: [
      "Lorem ipsum dolor sit amet1",
      "Lorem ipsum dolor sit amet2",
      "Lorem ipsum dolor sit amet3",
      "Lorem ipsum dolor sit amet4",
      "Lorem ipsum dolor sit amet5",
    ],
  },
  {
    id: 3,
    name: "Standart",
    monthlyCost: "20$",
    monthlyId: "pri_01ht14z3262tg4b15g5r08n2yy",
    yearlyCost: "200$",
    yearlyId: "pri_01ht16a23bvh8jphfp8xzqvtch",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    features: [
      "Lorem ipsum dolor sit amet1",
      "Lorem ipsum dolor sit amet2",
      "Lorem ipsum dolor sit amet3",
      "Lorem ipsum dolor sit amet4",
      "Lorem ipsum dolor sit amet5",
    ],
  },
];

export default function Pricing() {
  const { userData } = useUserData();
  const [monthlyBilling, setMonthlyBilling] = useState(true);
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
    const priceId = selectedPlan[monthlyBilling ? "monthlyId" : "yearlyId"];

    const transaction = await createTransaction(priceId, userData.email)
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

          <div className="flex flex-col items-center justify-center mt-8">
            <div className="flex items-center justify-center">
              <span className="mr-8">Monthly</span>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-lg"
                checked={!monthlyBilling}
                onChange={() => setMonthlyBilling(!monthlyBilling)}
              />
              <span className="ml-8">Yearly</span>
            </div>

            <div className="flex items-start justify-center gap-4 mt-8 lg:flex-wrap md:px-4">
              {plans.map((plan) => (
                <div key={plan.id} className={`flex flex-col border-[1px] rounded-xl pt-6 pb-4 px-4`}>
                  <div>
                    <h4 className={`text-2xl font-semibold ${plan.id === 2 && "text-teal-600"}`}>{plan.name}</h4>
                  </div>

                  <p className="text-sm mt-4 mb-8">{plan.description}</p>

                  <div>
                    <span className="text-3xl font-semibold">
                      {plan[monthlyBilling ? "monthlyCost" : "yearlyCost"]}
                    </span>
                    /{monthlyBilling ? "month" : "year"}
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
