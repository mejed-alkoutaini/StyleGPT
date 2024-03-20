import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/authContext";

const WithProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.replace("/login");
      return;
    }

    if (!currentUser.emailVerified) {
      router.push("/verify-email");
    }
  }, [currentUser, router]);

  if (!currentUser || !currentUser.emailVerified) {
    return null; // Or you can render a loading spinner or any other component
  }

  return <>{children}</>; // Render children components
};

export default WithProtectedRoute;
