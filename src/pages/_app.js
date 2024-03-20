import initAuth from "../../initAuth";
import { AuthProvider } from "../contexts/authContext";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { UserDataProvider } from "../contexts/userDataContext";

initAuth();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AuthProvider>
      <UserDataProvider>
        {getLayout(<Component {...pageProps} />)}
        <Toaster position="top-right" />
      </UserDataProvider>
    </AuthProvider>
  );
}

export default MyApp;
