import WithProtectedRoute from "../components/withProtectedRoute";
import firebase from "../utils/firebase";
import DefaultLayout from "../components/defaultLayout";

export default function Home() {
  return (
    <div>
      <h1>Protected Index Page</h1>
      <p>This page is protected!</p>
      <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <WithProtectedRoute>
      <DefaultLayout>{page}</DefaultLayout>
    </WithProtectedRoute>
  );
};
