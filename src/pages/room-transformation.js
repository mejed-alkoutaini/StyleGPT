import DefaultLayout from "../components/defaultLayout";
import RoomDesigner from "@/components/roomDesigner";
import Head from "next/head";
import { roomsThemes, roomsTypes } from "@/data/data";

export default function Page() {
  return (
    <>
      <Head>
        <title>Room Designer | StyleGPT</title>
      </Head>
      <RoomDesigner title="Redesign Your Room" types={roomsTypes} themes={roomsThemes} />
    </>
  );
}

Page.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
