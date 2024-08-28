"use client";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "./Context/StoreContext";
import HeroSection from "@/Components/HeroSection";
import Weather from "@/Components/Weather";
import Loading from '@/Components/Loading';
import './globals.css';
export default function Home() {
  const {
    getcurrentlocation,
    getweatherdata,
    position,
    Pageload
  } = useContext(Context);
  const [load,setload] = useState(true)
  useEffect(() => {
    const handleLocationFetch = async () => {
      const success = await getcurrentlocation();
      if (success) {
        setload(false);
        console.log("Location fetched successfully");
      } else {
        setload(true);
        console.log("Failed to fetch location");
      }
    };
    if (load) {
      handleLocationFetch();
    } else {
      getweatherdata();
      setload(false)
    }
  }, [load, position]);
  if (load || Pageload) {
    return <Loading/>;
  } else {
    return (
      <>
        <HeroSection />
        <Weather />
      </>
    );
  }
}
