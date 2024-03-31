import WithProtectedRoute from "../components/withProtectedRoute";
import DefaultLayout from "../components/defaultLayout";
import RoomDesigner from "@/components/roomDesigner";
import Head from "next/head";
import { roomsThemes, roomsTypes } from "@/data/data";

export default function Page() {
  return (
    <>
      <Head>
        <title>Transform Your Sketch | StyleGPT</title>
      </Head>
      <RoomDesigner title="Transform Your Sketch" types={roomsTypes} themes={roomsThemes}/>
    </>
  );
}

Page.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
