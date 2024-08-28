import { Context } from "@/app/Context/StoreContext";
import Image from "next/image";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Hour } from "@/app/Context/Interface_file";
type UVCategory = "Low" | "Modarate" | "High" | "Very_High" | "Extreme";
const Weather = () => {
  const { UV_Text, CurrentWeather, CurLocation, Forecast, setCurrentWeather } =
    useContext(Context);
  const [CurTimeTemp, setCurTimeTemp] = useState<Hour | undefined>(undefined);
  const [CurIndex, setCurIndex] = useState<number>(0);
  const [HourlyIndex, setHourlyIndex] = useState<number | null>(null);
  const [Date, setDate] = useState<number>(0);
  const [UV_Index, setUV_Index] = useState<UVCategory>("Low");
  const HandleHourChange = (index: number) => {
    setCurTimeTemp(CurrentWeather?.hour[index]);
    if (index === CurIndex) {
      setHourlyIndex(null);
    } else {
      setHourlyIndex(index);
    }
  };
  const HandleDayChange = (index: number) => {
    if (Forecast?.forecastday) {
      setCurrentWeather(Forecast?.forecastday[index]);
      setDate(index);
      if (index === 0) {
        setHourlyIndex(CurIndex);
      } else {
        // setCurIndex(0);
        setHourlyIndex(0);
      }
    }
  };
  const getUvCategory = (uvIndex: number): void => {
    if (uvIndex <= 2) {
      setUV_Index("Low");
    } else if (uvIndex >= 3 && uvIndex <= 5) {
      setUV_Index("Modarate");
    } else if (uvIndex >= 6 && uvIndex <= 7) {
      setUV_Index("High");
    } else if (uvIndex >= 8 && uvIndex <= 10) {
      setUV_Index("Very_High");
    } else {
      setUV_Index("Extreme");
    }
  };
  useEffect(() => {
    const index = Number(CurLocation?.localtime.split(" ")[1].split(":")[0]);
    // Handling Hour rednering
    if (HourlyIndex === null) {
      const data = CurrentWeather?.hour[index];
      setCurTimeTemp(data);
      setCurIndex(index);
      getUvCategory(data?.uv === undefined ? 0 : data?.uv);
    } else {
      const data = CurrentWeather?.hour[HourlyIndex];
      setCurTimeTemp(data);
    }
  });
  useMemo(() => {}, []);
  return (
    <div className="grid gap-x-8 my-12" id="weather">
      {/* left Container  */}
      <div className="grid left-container">
        {/* Location */}
        <div>
          <div className="Location-box">
            <i className="fa-solid fa-location-dot"></i>
            &nbsp; {CurLocation?.name}, {CurLocation?.region},{" "}
            {CurLocation?.country}
          </div>
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
            {/* UV Index  */}
            <div className="card-indexs">
              <i className="fa-solid fa-temperature-three-quarters"></i>
              <span> UV Index</span>
              <h3 className="mt-2">{CurTimeTemp?.uv}</h3>
              <h6 className="text-sm">{UV_Index}</h6>
              <input
                type="range"
                name=""
                id=""
                className="uv-range"
                value={CurTimeTemp?.uv === undefined ? 0 : CurTimeTemp?.uv}
                min={0}
                max={13}
                readOnly
              />
              <h5 className="text-sm">
                Precautions : &nbsp;
                {UV_Text[UV_Index]}
              </h5>
            </div>
            {/* Wind  */}
            <div className="card-indexs grid grid-rows-1 lg:grid-cols-2">
              <div>
                <h5 className="">
                  <i className="fa-solid fa-wind"></i>
                  <span>&nbsp;Wind</span>
                </h5>
                <div className="flex items-center gap-x-2 my-2">
                  <h3 className="text-2xl">
                    {Math.floor(
                      CurTimeTemp?.wind_mph === undefined
                        ? 0.1
                        : CurTimeTemp?.wind_mph
                    )}
                  </h3>
                  <div className="text-sm">
                    <h5>MPH</h5>
                    {/* <hr /> */}
                    <h5>Wind</h5>
                  </div>
                </div>
                <hr />
                <div className="flex items-center gap-x-2 mt-2">
                  <h3 className="text-2xl">
                    {Math.floor(
                      CurTimeTemp?.gust_mph === undefined
                        ? 0.1
                        : CurTimeTemp?.gust_mph
                    )}
                  </h3>
                  <div className="text-sm">
                    <h5>MPH </h5>
                    {/* <hr /> */}
                    <h5>Gusts</h5>
                  </div>
                </div>
              </div>
              <div className="lg:px-2 py-2 lg:py-0">
                <h3>
                  <i className="fa-regular fa-compass"></i>
                  <span>&nbsp;Direction</span>
                </h3>
                <h2 className="text-lg">
                  {CurTimeTemp?.wind_dir}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Right Container  */}
      <div className="right-container gap-y-7">
        {/* Hourly Details  */}
        <div className="Hourly-box flex flex-col gap-y-4 px-6 py-4">
          <h3 className="text-xl font-bold">Hourly Forecast</h3>
          {/* <br /> */}
          <hr />
          {/* <br /> */}
          <div className="gap-x-7 Hourly-Container overflow-x-scroll">
            {CurrentWeather?.hour.map((ele, index) => {
              const variable =
                Date !== 0 && HourlyIndex != null ? HourlyIndex : CurIndex;
              if (index < variable && Date === 0) {
                return "";
              }
              // else if (index === variable) {
              //   return (
              //     <div
              //       key={index}
              //       className={
              //         HourlyIndex === null
              //           ? "active-card Hourly-card px-2 py-3"
              //           : "Hourly-card px-2 py-3"
              //       }
              //       onClick={(e) => {
              //         HandleHourChange(index);
              //       }}
              //     >
              //       <h6>{index===CurIndex && Date===0? "Now" : ele.time.split(" ")[1]}</h6>
              //       <h3 className="text-2xl">
              //         {ele.temp_c}
              //         <sup>
              //           <sup>
              //             <span className="text-sm">
              //               <i className="fa-regular fa-circle fa-2xs "></i>
              //             </span>
              //           </sup>
              //         </sup>
              //       </h3>
              //       <div>
              //         <Image
              //           src={`https:${ele.condition.icon.slice(
              //             2,
              //             ele.condition.icon.length
              //           )}`}
              //           width={"80"}
              //           height={"30"}
              //           alt={"img"}
              //         />
              //       </div>
              //     </div>
              //   );
              // }
              return (
                <div
                  key={index}
                  className={
                    HourlyIndex === index
                      ? "active-card Hourly-card px-2 py-3"
                      : "Hourly-card px-2 py-3"
                  }
                  onClick={(e) => {
                    HandleHourChange(index);
                  }}
                >
                  <h6 className="truncate">
                    {index === CurIndex && Date === 0
                      ? "Now"
                      : ele.time.split(" ")[1]}
                  </h6>
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
                  <div>
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
                <div
                  key={index}
                  className={
                    Date === index
                      ? "active-card Hourly-card px-2 py-3"
                      : "Hourly-card px-2 py-3"
                  }
                  onClick={(e) => {
                    HandleDayChange(index);
                  }}
                >
                  <h6 className="truncate">
                    {ele.date.split("-").reverse().join("/").slice(0, 5)}
                  </h6>
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
                  <div className="w-fit">
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
