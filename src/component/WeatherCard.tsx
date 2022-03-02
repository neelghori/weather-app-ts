import React, { useState } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { sendProps } from "../App";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import "react-confirm-alert/src/react-confirm-alert.css";

const WeatherCard = (props: {
  weatherData: sendProps[];
  sendOriginalarray: Function;
}) => {
  const [updateData, setUpdateData] = useState(props.weatherData);
  const [city, setCity] = useState("");
  const getData = (event: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(event.target.value);
    setCity(event.target.value);
  };
  toast.configure();
  const showWeatherId = (index: number) => {
    confirmAlert({
      title: "Are you sure you want to Delete this Weather",

      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const findIndex = props.weatherData.findIndex(
              (curelem: sendProps) => {
                return curelem.id === index;
              }
            );
            const updateDatas = props.weatherData.splice(findIndex, 1);
            const filterData = props.weatherData.filter(
              (curelems: sendProps) => {
                return updateDatas[0].id !== curelems.id;
              }
            );
            console.log(filterData);
            setUpdateData(filterData);
            props.sendOriginalarray(filterData);
            toast.success("Weather Is Deleted", { autoClose: 2000 });
          },
        },
        {
          label: "No",
          onClick: () => {
            return false;
          },
        },
      ],
    });
  };

  return (
    <div>
      <Layout />

      <h1
        style={{
          textAlign: "center",
          marginTop: "30px",
          fontSize: "50px",
        }}
      >
        Weather Infomation
      </h1>
      <div style={{ textAlign: "center" }}>
        <input
          type="text"
          style={{
            textAlign: "center",
            marginTop: "30px",

            padding: "20px 100px 20px 100px",
            border: "none",
            outline: "none",
            borderRadius: "50px",
            fontSize: "20px",
            backgroundColor: "#fff",
            color: "#000",
          }}
          onChange={getData}
          placeholder="Search City..."
        />
      </div>

      {updateData.length === 0 ? (
        <h3 style={{ textAlign: "center", margin: "90px", fontSize: "60px" }}>
          No Data Found
        </h3>
      ) : (
        <ul>
          {updateData
            .filter((val: sendProps) => {
              //console.log(val.cityName);
              if (city === "") {
                return val;
              } else if (
                val.cityName.toLowerCase().includes(city.toLowerCase())
              ) {
                // console.log(val.cityName);
                return val;
              } else {
                return "";
              }
            })
            .slice(0)
            .reverse()

            .map((curelem: sendProps) => {
              return (
                <Card
                  key={curelem.id}
                  id={curelem.id}
                  cityName={curelem.cityName}
                  dates={curelem.dates}
                  foreCasting={curelem.foreCasting}
                  tempUnits={curelem.tempUnits}
                  tempeature={curelem.tempeature}
                  times={curelem.times}
                  icons={curelem.icon}
                  sendWeatherId={showWeatherId}
                />
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default WeatherCard;
