import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Layout from "./Layout";
import { sendProps } from "../App";
import { toast } from "react-toastify";
const WeatherData = (props: { originalData: sendProps[] }) => {
  const { weatherId } = useParams();
  let navigate = useNavigate();
  const weatherIds = weatherId;
  const findOneData: any = props.originalData.find((curelem) => {
    return curelem.id.toString() === weatherIds;
  });
  //console.log(findOneData);
  const index = props.originalData.indexOf(findOneData);
  //console.log(index);
  const [inpuField, setInputField] = useState<any>({
    id: findOneData!.id,
    cityName: findOneData!.cityName,
    dates: findOneData!.dates,
    foreCasting: findOneData!.foreCasting,
    icon: findOneData!.icon,
    tempUnits: findOneData!.tempUnits,
    tempeature: findOneData!.tempeature,
    times: findOneData!.times,
  });
  const [originalDatas, setOriginalDatas] = useState<sendProps[]>(
    props.originalData
  );
  const cityNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputField((preval: any) => {
      return { ...preval, cityName: event.target.value };
    });
  };
  const dateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputField((preval: any) => {
      return { ...preval, dates: event.target.value };
    });
  };
  const timeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputField((preval: any) => {
      return { ...preval, times: event.target.value };
    });
  };
  const temperatureHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputField((preval: any) => {
      return { ...preval, tempeature: event.target.value };
    });
  };
  const tempUnitHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInputField((preval: any) => {
      return { ...preval, tempUnits: event.target.value };
    });
  };
  const foreCastingHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInputField((preval: any) => {
      return { ...preval, foreCasting: event.target.value };
    });
    //console.log(inpuField.foreCasting);

    if (inpuField.foreCasting !== "") {
      switch (inpuField.foreCasting) {
        case "sunny":
          setInputField((preval: any) => {
            return { ...preval, icon: "wi-day-sunny" };
          });
          break;
        case "mist":
          setInputField((preval: any) => {
            return { ...preval, icon: "wi-day-fog" };
          });

          break;
        case "cloudy":
          setInputField((preval: any) => {
            return { ...preval, icon: "wi-day-cloudy" };
          });

          break;
        case "snowy":
          setInputField((preval: any) => {
            return { ...preval, icon: "wi-day-snow" };
          });

          break;
        case "rainy":
          setInputField((preval: any) => {
            return { ...preval, icon: "wi-day-rain" };
          });

          break;

        default:
          setInputField((preval: any) => {
            return { ...preval, icon: "wi-day-sunny" };
          });

          break;
      }
    }
  };
  console.log(inpuField);
  const editDataHandler = (event: React.FormEvent) => {
    event.preventDefault();

    toast.configure();
    if (inpuField.cityName === "") {
      toast.error("City Name Must Be Filled", { autoClose: 3000 });
    } else if (inpuField.dates === "") {
      toast.error("Date Must Be Filled", { autoClose: 3000 });
    } else if (inpuField.times === "") {
      toast.error("Time Must Be Filled", { autoClose: 3000 });
    } else if (inpuField.tempeature === "") {
      toast.error("Temperature Must Be Filled", { autoClose: 3000 });
    } else if (inpuField.tempUnits === "") {
      toast.error("Temperature Unit Must Be Filled", { autoClose: 3000 });
    } else if (inpuField.foreCasting === "") {
      toast.error("ForeCasting Must Be Filled", { autoClose: 3000 });
    }
    setOriginalDatas((originalDatas[index] = inpuField));
    navigate("/allweather");
    toast.success("Edit Successfully", { autoClose: 3000 });
  };
  //console.log(originalDatas);
  return (
    <>
      <Layout />
      <div>
        <div className="wrapper">
          <div className="title">Weather Info Edit</div>
          <form onSubmit={editDataHandler}>
            <div className="form">
              <div className="inputfield">
                <label>City Name</label>
                <input
                  type="text"
                  className="input"
                  onChange={cityNameHandler}
                  value={inpuField.cityName}
                />
              </div>
              <div className="inputfield">
                <label>Date</label>
                <input
                  type="date"
                  className="input"
                  value={inpuField.dates}
                  onChange={dateHandler}
                />
              </div>
              <div className="inputfield">
                <label>Time</label>

                <input
                  type="time"
                  className="input"
                  value={inpuField.times}
                  onChange={timeHandler}
                />
              </div>
              <div className="inputfield">
                <label>Tempature</label>
                <input
                  type="number"
                  className="inputs"
                  value={inpuField.tempeature}
                  onChange={temperatureHandler}
                />
                <div className="custom_selects">
                  <select
                    value={inpuField.tempUnits}
                    onChange={tempUnitHandler}
                  >
                    <option value="">Select Unit</option>
                    <option value="fahrenheit">Fahrenheit (°F)</option>
                    <option value="celsius">Celsius (°C)</option>
                  </select>
                </div>
              </div>
              <div className="inputfield">
                <label>ForeCasting</label>
                <div className="custom_select">
                  <select
                    value={inpuField.foreCasting}
                    onChange={foreCastingHandler}
                  >
                    <option value="">Select ForeCasting</option>
                    <option value="sunny">Sunny</option>
                    <option value="cloudy">Cloudy</option>
                    <option value="snowy">Snowy</option>
                    <option value="rainy">Rainy</option>
                    <option value="mist">Mist</option>
                  </select>
                </div>
              </div>

              <div className="inputfield">
                <button type="submit" className="btn">
                  Edit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default WeatherData;
