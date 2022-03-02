import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Weather from "./component/Weather";
import WeatherCard from "./component/WeatherCard";
import { weather_app } from "./component/WeatherForm";
import WeatherData from "./component/WeatherData";
import "react-toastify/dist/ReactToastify.css";

export type sendProps = {
  id: number;
  cityName: string;
  dates: string;
  times: string;
  tempeature: string;
  tempUnits: string;
  foreCasting: string;
  icon: string;
};
const App = () => {
  const [Datas, setDatas] = useState(weather_app);
  const [originalArray, setOriginalArray] = useState<sendProps[]>(Datas);

  const originalArr = (arry: []) => {
    setOriginalArray(arry);
  };

  const setOrginalArray = (element: []) => {
    setDatas(element);
  };
  //console.log(originalArray);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <WeatherCard
              weatherData={originalArray}
              sendOriginalarray={setOrginalArray}
            />
          }
        />
        <Route
          path="/addWeather"
          element={<Weather onHandArray={originalArr} />}
        />
        <Route
          path="/allweather"
          element={
            <WeatherCard
              weatherData={originalArray}
              sendOriginalarray={setOrginalArray}
            />
          }
        />
        <Route
          path="/WeatherData/:weatherId"
          element={<WeatherData originalData={originalArray} />}
        />

        <Route path="/" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
