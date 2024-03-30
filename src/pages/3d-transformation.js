import WithProtectedRoute from "../components/withProtectedRoute";
import DefaultLayout from "../components/defaultLayout";
import RoomDesigner from "@/components/roomDesigner";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Transform Your 3D Model | StyleGPT</title>
      </Head>
      <RoomDesigner title="Transform Your 3D Model" />
    </>
  );
}

Page.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
