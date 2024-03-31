import DefaultLayout from "@/components/defaultLayout";
import Footer from "@/components/footer";
import CTA from "@/components/homePage/cta";
import ExploreSection from "@/components/homePage/exploreSection";
import SpaceTypes from "@/components/homePage/spaceTypes";
import Hero from "@/components/homePage/hero";
import SpaceThemes from "@/components/homePage/spaceThemes";
import Testimonials from "@/components/homePage/testimonials";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>StyleGPT</title>
      </Head>

      <Hero />
      <SpaceTypes />
      <SpaceThemes />
      <Testimonials />
      <ExploreSection />
      <CTA />

      <Footer />
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
