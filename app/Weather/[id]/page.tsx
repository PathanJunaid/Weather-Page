// app/Weather/[id]/page.tsx
"use client";
import { Context } from "@/app/Context/StoreContext";
import React, { useContext, useEffect, useState } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  // const route = useRouter();
  const { Forecast } = useContext(Context);
  const { id } = params;
  const [load, setload] = useState(true);
  const [ForecastData, setForecastData] = useState<any>(null);
  useEffect(() => {
    if (Forecast != null) {
      setForecastData(Forecast.forecastday[Number(id)]);
      setload(false)
    }
  },[load]);
if(load){
  return <p>Loading</p>
}
  return <div>Weather for ID: {ForecastData.date}</div>;
};

export default Page;
