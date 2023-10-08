import { useRef, useEffect, useState } from "react";
import linkIcon from "../../public/images/external-link.svg"
import searchIcon from "../../public/images/search.svg"
import WeatherData from "./WeatherData";
import React from "react";


const Main = () => {
  const inputvalue = useRef(null);
  const [cityName, setCityName] = useState("karachi");
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);
  const [lang, setLang] = useState("en");
  const [mainData, setMainData] = useState([]);
  const [cityDetails, setCityDetails] = useState([]);
  const [windData, setWindData] = useState([]);
  const APP_KEY = "5bcd16ffdbb74ee8a1ef8ea7d751016c";

  useEffect(() => {
    async function weather() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APP_KEY}&units=metric&lang=${
            lang ? "en" : "ur"
          }`
        );
        const data = await response.json();
        if (response.ok) {
          setCityDetails(data.city);
          setMainData(data.list[0].main);
          setWindData(data.list[0].wind);
          setWeatherData(data.list[0].weather[0]);
          setError(true);
        } else {
          setError(false);
        }
  
        console.log(data);
        
      } catch (error) {
        console.log(error);
      }
    }
    weather();
  }, [cityName, lang]);

  const onKeyPressHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setCityName(e.target.value);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setCityName(e.target.value);
  };

  return (
    <div className="flex flex-col justify-around items-center text-center bg-sky-950 rounded-xl relative w-4/5 h-3/5 weatherBox	">
      <div className="flex text-2xl font-bold items-center justify-between w-full cityName">
        {error ? (
          <p className="flex">
            {cityDetails.name}, {cityDetails.country}
            <a
              href={`https://en.wikipedia.org/wiki/${cityDetails.name}`}
              target="_blank"
            >
              <img src={linkIcon} alt="link" />
            </a>
          </p>
        ) : (
          <p className="invalid">{lang ? "City Not Found" : "شہر نہیں ملا"}</p>
        )}
        <div className="flex items-center justify-between bg-white w-80 rounded-3xl px-3 search">
          <input
            type="text"
            ref={inputvalue}
            onKeyDown={onKeyPressHandler}
            placeholder="City Name"
            className="bg-transparent outline-none border-none w-11/12 px-3 py-3 text-xl text-cyan-900"
          />
          <img
            style={{ cursor: "pointer", paddingRight: 10 }}
            onClick={onSubmitHandler}
            src={searchIcon}
            alt="searchIcon"
          />
        </div>
        <p onClick={() => setLang(!lang)} className="translater">
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
