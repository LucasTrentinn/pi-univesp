"use client";

import { useEffect } from "react";
import "../../styles/globals.css";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

export default function Layout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("login="))
        ?.split("=")[1] === "true";

    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);

  return <div>{children}</div>;
}
