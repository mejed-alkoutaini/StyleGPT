import WithProtectedRoute from "../components/withProtectedRoute";
import DefaultLayout from "../components/defaultLayout";
import RoomDesigner from "@/components/roomDesigner";

export default function Page() {
  return <RoomDesigner title="Redesign Your Room" />;
}

Page.getLayout = function getLayout(page) {
  return (
    <WithProtectedRoute>
      <DefaultLayout>{page}</DefaultLayout>
    </WithProtectedRoute>
  );
};
