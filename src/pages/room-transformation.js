import WithProtectedRoute from "../components/withProtectedRoute";
import DefaultLayout from "../components/defaultLayout";
import RoomDesigner from "@/components/roomDesigner";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Room Designer | StyleGPT</title>
      </Head>
      <RoomDesigner title="Redesign Your Room" />
    </>
  );
}

Page.getLayout = function getLayout(page) {
  return (
    <WithProtectedRoute>
      <DefaultLayout>{page}</DefaultLayout>
    </WithProtectedRoute>
  );
};