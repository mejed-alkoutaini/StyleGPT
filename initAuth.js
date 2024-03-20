import { init } from "next-firebase-auth";

const initAuth = () => {
  init({
    authPageURL: "/auth",
    appPageURL: "/",
    loginAPIEndpoint: "/api/login",
    logoutAPIEndpoint: "/api/logout",
    onLoginError: (err) => {
      console.error(err);
    },
    onLogoutError: (err) => {
      console.error(err);
    },

    firebaseClientInitConfig: {
      apiKey: "AIzaSyBh97c6YZnl0gA0erRTwlc3eZTBsKsCFqY", // required
      authDomain: "roomai-af76d.firebaseapp.com",
      projectId: "roomai-af76d",
    },
    cookies: {
      name: "ExampleApp", // required
      keys: [process.env.COOKIE_SECRET_CURRENT, process.env.COOKIE_SECRET_PREVIOUS],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: "/",
      sameSite: "strict",
      secure: true, // set this to false in local (non-HTTPS) development
      signed: false,
    },
    onTokenError: (err) => {
      console.error(err);
    },
    onTokenRefreshError: (err) => {
      console.error(err);
    },
  });
};

export default initAuth;
