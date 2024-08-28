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
  UV_Text : Uv_Interface
}

const defaultContextValue: PropsInterface = {
  position: { lat: 0, long: 0 },
  setposition: () => {}, // No-op function
  setCurrentWeather: () => {},
  getcurrentlocation: async () => false, // Updated to return a promise
  getweatherdata: () => {},
  CurLocation: null,
  Forecast: null,
  CurrentWeather: null,
  UV_Text: {
    Low: "sunglasses recommended.",
    Modarate: "wear sunscreen and sunglasses.",
    High: "use sunscreen, sunglasses, and a hat.",
    Very_High: "seek shade and limit sun exposure.",
    Extreme: "avoid sun, use high SPF sunscreen, and cover up.",
  },
};

// Create the context with a default value
export const Context = createContext<PropsInterface>(defaultContextValue);

interface StoreContextProps {
  children: ReactNode;
}

// StoreContext component
const StoreContext: React.FC<StoreContextProps> = ({ children }) => {
  const [position, setposition] = useState<Posi>({ lat: 0, long: 0 });
  const [CurrentWeather, setCurrentWeather] = useState<ForecastDay | null>(
    null
  );
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
    UV_Text
  };

  return <Context.Provider value={props}>{children}</Context.Provider>;
};

export default StoreContext;
