import initAuth from "../../initAuth";
import { AuthProvider } from "../contexts/authContext";
import "../styles/globals.css";
import { ToastBar, Toaster, toast } from "react-hot-toast";
import { UserDataProvider } from "../contexts/userDataContext";
import Head from "next/head";

initAuth();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-32x32.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/favicon-32x32.png" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <AuthProvider>
        <UserDataProvider>
          {getLayout(<Component {...pageProps} />)}

          <Toaster containerClassName="toaster-wrapper" position="top-right" containerStyle={{ top: "70px" }}>
            {(t) => (
              <ToastBar toast={t}>
                {({ icon, message }) => (
                  <div onClick={() => toast.dismiss(t.id)} className="flex items-center cursor-pointer">
                    {icon}
                    {message}
                  </div>
                )}
              </ToastBar>
            )}
          </Toaster>
        </UserDataProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
