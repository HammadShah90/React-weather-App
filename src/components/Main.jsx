import { useRef, useEffect, useState } from "react";
import linkIcon from "../../public/images/external-link.svg";
import searchIcon from "../../public/images/search.svg";
import WeatherData from "./WeatherData";

const Main = () => {
  const inputvalue = useRef(null);
  const [cityName, setCityName] = useState("karachi");
  const [cityDetails, setCityDetails] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(true);
  const [lang, setLang] = useState("en");
  const [mainData, setMainData] = useState([]);
  const [windData, setWindData] = useState([]);
  const APP_KEY = "5bcd16ffdbb74ee8a1ef8ea7d751016c";

  useEffect(() => {
    async function weather() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APP_KEY}&units=metric&lang=${
            lang ? "en" : "ur"
          }`
        );
        const data = await response.json();
        if (response.ok) {
          setCityName(data.name);
          setCityDetails(data.sys);
          setMainData(data.main);
          setWindData(data.wind);
          setWeatherData(data.weather[0]);
          setError(true);
        } else {
          setError(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    weather();
  }, [cityName, lang]);

  const onKeyPressHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      let value =
        e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
      setCityName(value);
      inputvalue.current.value = "";
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(inputvalue.current.value.charAt(0).toUpperCase() + inputvalue.current.value.slice(1));
    let value =
      inputvalue.current.value.charAt(0).toUpperCase() +
      inputvalue.current.value.slice(1);
    setCityName(value);
    inputvalue.current.value = "";
  };

  return (
    <div className="weatherBox">
      <div className="d-flex justify-content-between align-items-center cityName">
        <div>
          {error ? (
            <p className="d-flex position-relative fs-1 mb-2">
              {cityName}, {cityDetails.country}
              <a
                href={`https://en.wikipedia.org/wiki/${cityName}`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={linkIcon}
                  alt="link"
                  width={26}
                  className="position-absolute"
                />
              </a>
            </p>
          ) : (
            <p className="invalid">
              {lang ? "City Not Found" : "شہر نہیں ملا"}
            </p>
          )}
        </div>
        <div className="search">
          <input
            type="text"
            ref={inputvalue}
            onKeyDown={onKeyPressHandler}
            placeholder="City Name"
          />
          <img
            style={{ cursor: "pointer", paddingRight: 10 }}
            onClick={onSubmitHandler}
            src={searchIcon}
            alt="searchIcon"
          />
        </div>
        <p onClick={() => setLang(!lang)} className="translater mb-2">
          {lang ? "Urdu" : "Eng"}
        </p>
      </div>
      <WeatherData
        cityMainData={mainData}
        cityWeatherdata={weatherData}
        city={cityDetails}
        language={lang}
        cityWindData={windData}
      />
    </div>
  );
};

export default Main;
