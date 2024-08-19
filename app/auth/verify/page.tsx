"use client";
import { OtpPage } from "@/components/mfa/OtpPage";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OtpHome() {
  const params = useSearchParams();
  const [response, setResponse] = useState("");

  useEffect(() => {
    const responseParam = params.get("email");
    if (responseParam) {
      const decodedResponse = decodeURIComponent(responseParam);
      setResponse(decodedResponse);
    }
  }, [params]);

  
  return <OtpPage email={response} />;
}
