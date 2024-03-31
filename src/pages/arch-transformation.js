import DefaultLayout from "../components/defaultLayout";
import RoomDesigner from "@/components/roomDesigner";
import { architectureTypes, roomsThemes } from "@/data/data";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Transform Your Architecture | StyleGPT</title>
      </Head>
      <RoomDesigner title="Transform Your Architecture" types={architectureTypes} themes={roomsThemes} />
    </>
  );
}

Page.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
