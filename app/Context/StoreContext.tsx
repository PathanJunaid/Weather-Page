"use client";
import axios from "axios";
import React, { createContext, ReactNode, useState } from "react";
import {
  ForecastDay,
  Interface_CurLocation,
  Interface_CurrentWeather,
  Interface_Forecast,
  Uv_Interface,
} from "./Interface_file";

// Define types
interface Posi {
  lat: number;
  long: number;
}

interface PropsInterface {
  position: Posi;
  setposition: React.Dispatch<React.SetStateAction<Posi>>;
  setCurrentWeather: React.Dispatch<React.SetStateAction<ForecastDay | null>>;
  getcurrentlocation: () => Promise<boolean>; // Changed from React.Dispatch<boolean> to Promise<boolean>
  getweatherdata: () => void;
  CurrentWeather: ForecastDay | null;
  Forecast: Interface_Forecast | null;
  CurLocation: Interface_CurLocation | null;
  UV_Text: Uv_Interface;
  InputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  getCitydata: () => void;
  error : string;
  seterror : React.Dispatch<React.SetStateAction<string>>;
  Pageload:boolean;
  setPageload : React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContextValue: PropsInterface = {
  position: { lat: 0, long: 0 },
  setposition: () => {}, // No-op function
  setCurrentWeather: () => {},
  getcurrentlocation: async () => false, // Updated to return a promise
  getweatherdata: () => {},
  getCitydata: () => {},
  CurLocation: null,
  Forecast: null,
  CurrentWeather: null,
  InputValue: "",
  setInputValue: () => {},
  UV_Text: {
    Low: "sunglasses recommended.",
    Modarate: "wear sunscreen and sunglasses.",
    High: "use sunscreen, sunglasses, and a hat.",
    Very_High: "seek shade and limit sun exposure.",
    Extreme: "avoid sun, use high SPF sunscreen, and cover up.",
  },
  error : "",
  seterror : ()=>{},
  Pageload : false,
  setPageload : ()=>{}
};

// Create the context with a default value
export const Context = createContext<PropsInterface>(defaultContextValue);

interface StoreContextProps {
  children: ReactNode;
}

// StoreContext component
const StoreContext: React.FC<StoreContextProps> = ({ children }) => {
  const [error,seterror] = useState<string>("")
  const [position, setposition] = useState<Posi>({ lat: 0, long: 0 });
  const [CurrentWeather, setCurrentWeather] = useState<ForecastDay | null>(
    null
  );
  const [Pageload, setPageload] = useState<boolean>(false);
  const [InputValue, setInputValue] = useState<string>("");
  const [Forecast, setForecast] = useState<Interface_Forecast | null>(null);
  const [CurLocation, setCurLocation] = useState<Interface_CurLocation | null>(
    null
  );
  const UV_Text: Uv_Interface = {
    Low: "sunglasses recommended.",
    Modarate: "wear sunscreen and sunglasses.",
    High: "use sunscreen, sunglasses, and a hat.",
    Very_High: "seek shade and limit sun exposure.",
    Extreme: "avoid sun, use high SPF sunscreen, and cover up.",
  };

  const getweatherdata = async (): Promise<void> => {
    await axios
      .post(
        `http://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_Weather_API}&q=${position.lat},${position.long}&days=10&aqi=yes&alerts=yes`
      )
      .then((res) => {
        setCurrentWeather(res.data.forecast.forecastday[0]);
        setForecast(res.data.forecast);
        setCurLocation(res.data.location);
      })
      .catch((e) => {
        console.log("Unable to fetch Weather data" + e);
      });
  };
  const getCitydata = async (): Promise<void> => {
    if(InputValue === ""){
      // console.log("Blank")
      setPageload(false)
      return
    }
    let response ;
    try {
      response = await axios.post(
        `http://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_Weather_API}&q=${InputValue}&days=10&aqi=yes&alerts=yes`
      );
      
        setCurrentWeather(response.data.forecast.forecastday[0]);
        setForecast(response.data.forecast);
        setCurLocation(response.data.location);
        setPageload(false)
      
    } catch (e) {

      alert(`City with name ${InputValue} not found. Please try with exact name or refresh page to automatically detect you location.`)
      setInputValue("")
    }
    
  };
  const getcurrentlocation = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Success callback function
            const lati = position.coords.latitude;
            const longi = position.coords.longitude;
            setposition({ lat: lati, long: longi });
            resolve(true); // Successfully retrieved position
          },
          (error) => {
            // Error callback function
            console.error("Error getting location: ", error);
            resolve(false); // Failed to retrieve position
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        resolve(false); // Geolocation not supported
      }
    });
  };

  const props: PropsInterface = {
    position,
    setposition,
    getcurrentlocation,
    getweatherdata,
    CurrentWeather,
    setCurrentWeather,
    Forecast,
    CurLocation,
    UV_Text,
    InputValue,
    setInputValue,
    getCitydata,
    error,seterror,
    Pageload, setPageload,
  };

  return <Context.Provider value={props}>{children}</Context.Provider>;
};

export default StoreContext;
