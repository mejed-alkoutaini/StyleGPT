import DefaultLayout from "@/components/defaultLayout";
import Footer from "@/components/footer";
import Head from "next/head";

export default function RefundPolicy() {
  return (
    <>
      <Head>
        <title>Refund Policy | StyleGPT</title>
      </Head>

      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg">
            <h1 className="mt-4 font-semibold text-4xl">Refund Policy</h1>

            <p className="mt-4">Last updated: March 25, 2024</p>

            <p className="mt-4">
              We understand that sometimes circumstances may arise that require a refund for your purchase of credits.
              Please read this policy carefully to understand your rights and options.
            </p>

            <h2 className="mt-6 font-semibold text-xl">1. Refund Eligibility:</h2>

            <p className="mt-4">
              Refunds are only available for purchases of credits made directly through our platform. To be eligible for
              a refund, you must request it within 30 days from the date of your purchase.
            </p>

            <h2 className="mt-6 font-semibold text-xl">2. Refund Process:</h2>

            <p className="mt-4">
              To request a refund, please contact our customer support team at Contact@StyleGPT.io with your purchase
              details. Our team will review your request and assess your eligibility for a refund based on the criteria
              outlined in this policy. If your request is approved, the refund will be issued to the original payment
              method used for the purchase. Refunds may take 14 business days to process, depending on your payment
              provider's policies.
            </p>
            <h2 className="mt-6 font-semibold text-xl">3. Non-Refundable Items:</h2>
            <p className="mt-4">
              Once credits have been used or redeemed for services provided by StyleGPT, they are not eligible for a
              refund. Subscription fees or charges for ongoing services are non-refundable, except where required by
              law.
            </p>
            <h2 className="mt-6 font-semibold text-xl">4. Disputed Charges:</h2>
            <p className="mt-4">
              If you believe there has been an error in the charges applied to your account, please contact our customer
              support team immediately for assistance. We reserve the right to decline refund requests if we determine
              that the charges were valid and in accordance with our terms of service.
            </p>
            <h2 className="mt-6 font-semibold text-xl">5. Changes to Refund Policy:</h2>
            <p className="mt-4">
              We reserve the right to update or modify this refund policy at any time, without prior notice. Any changes
              to the refund policy will be effective immediately upon posting on this page. Contact Us: If you have any
              questions about our refund policy, please contact us at Contact@StyleGPT.io.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

RefundPolicy.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
