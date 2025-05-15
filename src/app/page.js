"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/livros");
  }, [router]);

  return null;
}
