"use client";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "./Context/StoreContext";
import HeroSection from "@/Components/HeroSection";
import Weather from "@/Components/Weather";
import Loading from "@/Components/Loading";
import "./globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  const {
    getcurrentlocation,
    getweatherdata,
    position,
    Pageload,
  } = useContext(Context);
  const [load, setload] = useState(true);
  useEffect(() => {
    const handleLocationFetch = async () => {
      const success = await getcurrentlocation();
      if (success) {
        console.log("Location fetched successfully");
      } else {
        // setload(false);
        console.log("Failed to fetch location");
      }
    };
    if (load) {
      handleLocationFetch();
      setload(false);
    } else {
      getweatherdata();
      setload(false);
    }
  }, [load, position]);
  // notify();
  if (load || Pageload) {
    return (
      <>
        <Loading />;
        <ToastContainer />
      </>
    );
  } else {
    return (
      <>
        <HeroSection />
        <Weather />
        <ToastContainer />
      </>
    );
  }
}
