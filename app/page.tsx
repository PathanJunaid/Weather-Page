"use client";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "./Context/StoreContext";
import HeroSection from "@/Components/HeroSection";
import Weather from "@/Components/Weather";
export default function Home() {
  const {
    getcurrentlocation,
    getweatherdata,
    position,
  } = useContext(Context);
  const [load, setload] = useState(true);
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
    }
  }, [load, position]);
  if (load) {
    return <p>Loading</p>;
  } else {
    return (
      <>
        <HeroSection />
        <Weather />
      </>
    );
  }
}
