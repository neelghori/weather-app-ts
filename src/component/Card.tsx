import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./weatherCard.css";
import "./card.css";

type weatherCardProps = {
  id: number;
  cityName: string;
  dates: string;
  foreCasting: string;
  tempUnits: string;
  tempeature: string;
  times: string;
  icons: string;
  sendWeatherId: Function;
};
const Card = (props: weatherCardProps) => {
  let color: string;

  const convertDate = new Date(props.dates);
  const ResultDate = convertDate.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timeConver: {}[] = props.times.split(":");

  const time = `${props.times}`;
  if (timeConver[0] >= 1 && timeConver[0] <= 7) {
    color = "night";
  } else if (timeConver[0] > 7 && timeConver[0] <= 12) {
    color = "white";
  } else if (timeConver[0] > 12 && timeConver[0] <= 19) {
    color = "yellow";
  } else if (timeConver[0] > 19 && timeConver[0] <= 23) {
    color = "night";
  } else {
    color = "night";
  }
  toast.configure();
  const deleteWeatherData = (id: number) => {
    props.sendWeatherId(id);
  };

  return (
    <>
      <div className={`widget ${color}`}>
        <div className="icons">
          <Link to={`/WeatherData/${props.id}`}>
            <button className="edit-btn">
              <i className="bi bi-pencil"></i>
            </button>
          </Link>

          <button
            className="edit-btn"
            onClick={() => {
              deleteWeatherData(props.id);
            }}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
        <div className="left-panel panel">
          <div className="date">
            {time}/{ResultDate}
          </div>
          <div className="city">{props.cityName}</div>
          <div className="forecast">{props.foreCasting}</div>
          <div className="temp">
            {props.tempeature}&deg;
            {props.tempUnits === "fahrenheit" ? "F" : "C"}
          </div>
        </div>
        <div className="right-panel panel">
          <h1>
            <span className={`wi ${props.icons}`}></span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default Card;
