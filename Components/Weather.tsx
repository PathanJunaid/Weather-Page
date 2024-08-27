import { Context } from "@/app/Context/StoreContext";
import Image from "next/image";
import React, { useContext, useEffect, useMemo, useState } from "react";

const Weather = () => {
  const { CurrentWeather, CurLocation, Forecast, setCurrentWeather } = useContext(Context);
  const [CurTimeTemp, setCurTimeTemp] = useState<any | undefined>(0);
  const [CurIndex, setCurIndex] = useState<number>(0);
  const [HourlyIndex,setHourlyIndex] = useState<number | null>(null);
  const [Date,setDate] = useState<number>(0)
  const HandleHourChange = (index:number) =>{
    setCurTimeTemp(CurrentWeather?.hour[index]);
    if(index === CurIndex){
      setHourlyIndex(null)
    }else{
      setHourlyIndex(index)
    }
  }
  const HandleDayChange = (index:number)=>{
    if(Forecast?.forecastday){
      setCurrentWeather(Forecast?.forecastday[index])
      setDate(index);
      setCurIndex(0);
      setHourlyIndex(0);
    }
  }
  useEffect(() => {
    const index = Number(CurLocation?.localtime.split(" ")[1].split(":")[0]);
    // Handling Hour rednering 
    if(HourlyIndex===null){
      const data = CurrentWeather?.hour[index];
      setCurTimeTemp(data);
      setCurIndex(index);
    }else{
      const data = CurrentWeather?.hour[HourlyIndex];
      setCurTimeTemp(data);
    }
    // handling day click  
    if(Date ===null ){
      
    }
  });
  useMemo(()=>{

  },[])
  return (
    <div className="grid gap-x-8 mt-12" id="weather">
      {/* left Container  */}
      <div>
        {/* Location */}
        <div className="Location-box">
          <i className="fa-solid fa-location-dot"></i>
          &nbsp; {CurLocation?.name}, {CurLocation?.region},{" "}
          {CurLocation?.country}
        </div>
        {/* Details  */}
        <div>
          {/* About  */}
          <div className="text-center my-6">
            <h2 className="text-5xl mb-4">
              {CurTimeTemp?.temp_c}
              {""}
              <sup>
                <sup>
                  <span className="text-lg">
                    <i className="fa-regular fa-circle fa-2xs "></i>
                  </span>
                </sup>
              </sup>
            </h2>

            <h3 className="text-3xl">{CurTimeTemp?.condition?.text}</h3>
          </div>
          {/* Indexs  */}
          <div className="grid grid-cols-2">
            {/* Feels Like  */}
            <div className="card-indexs">
              <div>
                <i className="fa-solid fa-temperature-three-quarters"></i>
                <span> Feels Like</span>
                <h3>{CurTimeTemp?.feelslike_c} C</h3>
              </div>
            </div>
            {/* Precipitation  */}
            <div className="card-indexs">
              <i className="fa-solid fa-droplet"></i>
              <span> Precipitation</span>
              <h3>{CurTimeTemp?.chance_of_rain}%</h3>
            </div>
            {/* Visibility */}
            <div className="card-indexs">
              <i className="fa-regular fa-eye"></i>
              <span> Visibility</span>
              <h3>{CurTimeTemp?.vis_km} Km</h3>
            </div>
            {/* Humidity  */}
            <div className="card-indexs">
              <sup>
                <i className="fa-solid fa-droplet"></i>
              </sup>
              <i className="fa-solid fa-droplet"></i>
              <span> Humidity</span>
              <h3>{CurTimeTemp?.humidity}%</h3>
            </div>
          </div>
        </div>
      </div>
      {/* Right Container  */}
      <div className="grid grid-rows-3">
        {/* Hourly Details  */}
        <div className="Hourly-box px-6 py-4">
          <h3 className="text-xl font-bold">Hourly Forecast</h3>
          <br />
          <hr />
          <br />
          <div className="grid gap-x-7 Hourly-Container overflow-x-scroll">
            {CurrentWeather?.hour.map((ele, index) => {
              if (index < CurIndex) {
                return "";
              } else if (index === CurIndex) {
                return (
                  <div key={index} className={HourlyIndex===null? "active-card Hourly-card px-2 py-3" : "Hourly-card px-2 py-3"} onClick={(e)=>{HandleHourChange(index)}}>
                    <h6>Now</h6>
                    <h3 className="text-2xl">
                      {ele.temp_c}
                      <sup>
                        <sup>
                          <span className="text-sm">
                            <i className="fa-regular fa-circle fa-2xs "></i>
                          </span>
                        </sup>
                      </sup>
                    </h3>
                    <Image
                      src={`https:${ele.condition.icon.slice(
                        2,
                        ele.condition.icon.length
                      )}`}
                      width={"100"}
                      height={"30"}
                      alt={"img"}
                    />
                  </div>
                );
              }
              return (
                <div key={index} className={HourlyIndex===index? "active-card Hourly-card px-2 py-3" : "Hourly-card px-2 py-3"} onClick={(e)=>{HandleHourChange(index)}}>
                  <h6 className="truncate">{ele.condition.text}</h6>
                  <h3 className="text-2xl">
                    {ele.temp_c}
                    <sup>
                      <sup>
                        <span className="text-sm">
                          <i className="fa-regular fa-circle fa-2xs "></i>
                        </span>
                      </sup>
                    </sup>
                  </h3>
                  <Image
                    src={`https:${ele.condition.icon.slice(
                      2,
                      ele.condition.icon.length
                    )}`}
                    width={"80"}
                    height={"30"}
                    alt={"img"}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {/* Forcast  */}
        <div className="Hourly-box px-6 py-4">
          <h3 className="text-xl font-bold">Forecast</h3>
          <br />
          <hr />
          <br />
          <div className="grid gap-x-7 Hourly-Container overflow-x-scroll">
            {Forecast?.forecastday?.map((ele, index) => {
              // console.log(ele)
              return (
                <div key={index} className={Date===index? "active-card Hourly-card px-2 py-3" : "Hourly-card px-2 py-3"} onClick={(e)=>{HandleDayChange(index)}}>
                  <h6 className="truncate">{ele.date.split('-').reverse().join('/').slice(0,5)}</h6>
                  <h3 className="text-2xl">
                    {ele?.day.avgtemp_c}
                    <sup>
                      <sup>
                        <span className="text-sm">
                          <i className="fa-regular fa-circle fa-2xs "></i>
                        </span>
                      </sup>
                    </sup>
                  </h3>
                  <Image
                    src={`https:${ele?.day.condition.icon.slice(
                      2,
                      ele?.day.condition.icon.length
                    )}`}
                    width={"80"}
                    height={"30"}
                    alt={"img"}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {/* Indexs  */}
        <div className="grid grid-cols-2">
          {/* UV Index  */}
          <div></div>
          {/* Wind  */}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
