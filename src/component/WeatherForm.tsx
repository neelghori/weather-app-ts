import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./weather.css";
export const weather_app = [
  {
    id: 72,
    cityName: "surat",
    dates: "2020-05-15",
    times: "09:22",
    tempeature: "25",
    tempUnits: "fahrenheit",
    foreCasting: "cloudy",
    icon: "wi-day-rain",
  },
  {
    id: 73,
    cityName: "mumbai",
    dates: "2020-06-15",
    times: "23:22",
    tempeature: "55",
    tempUnits: "fahrenheit",
    foreCasting: "mist",
    icon: "wi-day-fog",
  },
];

const WeatherForm = (props: { addHandler: Function }) => {
  const [tempUnits, setTempUnit] = useState("");
  const [foreCasting, setForeCasting] = useState("");
  let icon: string;
  const cityname = useRef<HTMLInputElement | null>(null);
  const date = useRef<HTMLInputElement | null>(null);
  const time = useRef<HTMLInputElement | null>(null);
  const temp = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  toast.configure();
  const tempUnit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTempUnit(event.target.value);
  };
  const forecasting = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setForeCasting(event.target.value);
  };

  const weatherHandler = (event: React.FormEvent): void => {
    event.preventDefault();
    const cityName = cityname.current!.value;
    const dates = date.current!.value;
    const times = time.current!.value;
    const tempeature = temp.current!.value;

    if (foreCasting !== "") {
      switch (foreCasting) {
        case "sunny":
          icon = "wi-day-sunny";
          break;
        case "mist":
          icon = "wi-day-fog ";
          break;
        case "cloudy":
          icon = "wi-day-cloudy";
          break;
        case "snowy":
          icon = "wi-day-snow";
          break;
        case "rainy":
          icon = "wi-day-rain";
          break;

        default:
          icon = "wi-day-sunny";
          break;
      }
    }

    //console.log(icon);

    const weatherInfo = {
      id: Math.floor(Math.random() * 1000),
      cityName,
      dates,
      times,
      tempeature,
      tempUnits,
      foreCasting,
      icon,
    };
    console.log(weatherInfo);
    weather_app.push(weatherInfo);

    props.addHandler(weather_app);

    if (
      cityName.trim() &&
      dates &&
      times &&
      tempeature.trim() &&
      tempUnits &&
      foreCasting
    ) {
      toast.success("Form Is Submitted", { autoClose: 2000 });
      navigate("/");
      cityname.current!.value = "";
      date.current!.value = "";
      time.current!.value = "";
      temp.current!.value = "";

      setTempUnit("");
      setForeCasting("");
    }
  };
  return (
    <div>
      <div className="wrapper">
        <div className="title">Weather Info</div>
        <form onSubmit={weatherHandler}>
          <div className="form">
            <div className="inputfield">
              <label>City Name</label>
              <input type="text" className="input" ref={cityname} required />
            </div>
            <div className="inputfield">
              <label>Date</label>
              <input type="date" className="input" ref={date} required />
            </div>
            <div className="inputfield">
              <label>Time</label>

              <input type="time" className="input" ref={time} required />
            </div>
            <div className="inputfield">
              <label>Tempature</label>
              <input type="number" className="inputs" ref={temp} required />
              <div className="custom_selects">
                <select onChange={tempUnit} value={tempUnits} required>
                  <option value="">Select Unit</option>
                  <option value="fahrenheit">Fahrenheit (°F)</option>
                  <option value="celsius">Celsius (°C)</option>
                </select>
              </div>
            </div>
            <div className="inputfield">
              <label>ForeCasting</label>
              <div className="custom_select">
                <select onChange={forecasting} value={foreCasting} required>
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
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WeatherForm;
