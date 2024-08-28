import { Context } from "@/app/Context/StoreContext";
import React, { FormEvent, useContext, useState } from "react";
import Image from "next/image";

const HeroSection = () => {
  const { CurrentWeather,InputValue, setInputValue,getCitydata, error,seterror } = useContext(Context);
  const regex = /^[A-Za-z\s]*$/
  const HandleInputChange = (Value: string) => {
    if(regex.test(Value)){
      setInputValue(Value);
    }else{
      seterror("Only Alphabets are allowed")
      setTimeout(() => {
        seterror("")
      }, 1000);
    }
  };
  const HandleSearchSubmit = (e : FormEvent) =>{
    e.preventDefault();
    getCitydata();
  }
  return (
    <div className="pt-8 Hero-Section flex flex-col justify-center items-center gap-6">
      <div>
        <h3 className="text-5xl text-center font-bold leading-relaxed">
          Discover the weather in <br />
          every city you go
        </h3>
      </div>
      <div>
        <form action="" onSubmit={(e)=>HandleSearchSubmit(e)}>
          <input
            type="text"
            name="City"
            id=""
            className="w-96 rounded-lg px-4 py-2 text-center text-black Search-box"
            value={InputValue}
            placeholder="Enter City name you want to search"
            onChange={(e) => {
              HandleInputChange(e.target.value);
            }}
            autoComplete="off"
          />
          <button type="submit" className="relative end-7 text-black z-1">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <p className="color-red">{error}</p>
      </div>
      <div className="flex justify-center overflow-y-hidden cards-container">
        {/* Mini Temparature  */}
        <div id="Hero-card-1" className="hero-card">
          <div className="">
            {CurrentWeather?.day.condition.icon !== undefined ? (
              <Image
                alt={"no img"}
                src={`https:${CurrentWeather?.day.condition.icon.slice(
                  2,
                  CurrentWeather?.day.condition.icon.length
                )}`}
                width={80}
                height={30}
              />
            ) : (
              ""
            )}
          </div>
          <h1 className="text-3xl">
            {CurrentWeather?.day.mintemp_c}
            {""}
            <sup>
              {""}
              <sup>
                <i className="fa-regular fa-circle fa-2xs text-xs"></i>
              </sup>
              C
            </sup>
          </h1>
        </div>
        {/* avg temp  */}
        <div id="Hero-card-2" className="hero-card">
          <div className="">
            {CurrentWeather?.day.condition.icon !== undefined ? (
              <Image
                alt={"no img"}
                src={`https:${CurrentWeather?.day.condition.icon.slice(
                  2,
                  CurrentWeather?.day.condition.icon.length
                )}`}
                width={80}
                height={30}
              />
            ) : (
              ""
            )}
          </div>
          <h1 className="text-3xl">
            {CurrentWeather?.day.avgtemp_c}
            {""}
            <sup>
              {""}
              <sup>
                <i className="fa-regular fa-circle fa-2xs text-xs"></i>
              </sup>
              C
            </sup>
          </h1>
        </div>
        {/* maximum temp  */}
        <div id="Hero-card-3" className="hero-card">
          <div className="">
            {CurrentWeather?.day.condition.icon !== undefined ? (
              <Image
                alt={"no img"}
                src={`https:${CurrentWeather?.day.condition.icon.slice(
                  2,
                  CurrentWeather?.day.condition.icon.length
                )}`}
                width={80}
                height={30}
              />
            ) : (
              ""
            )}
          </div>
          <h1 className="text-3xl">
            {CurrentWeather?.day.maxtemp_c}
            {""}
            <sup>
              {""}
              <sup>
                <i className="fa-regular fa-circle fa-2xs text-xs"></i>
              </sup>
              C
            </sup>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
