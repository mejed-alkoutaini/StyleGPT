import DefaultLayout from "../components/defaultLayout";
import RoomDesigner from "@/components/roomDesigner";
import Head from "next/head";
import { roomsThemes, roomsTypes, sourcesTypes } from "@/data/data";

export default function Page() {
  return (
    <>
      <Head>
        <title>Design | StyleGPT</title>
      </Head>
      <RoomDesigner title="Redesign Your Space" types={roomsTypes} themes={roomsThemes} sources={sourcesTypes}/>
    </>
  );
}

Page.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
