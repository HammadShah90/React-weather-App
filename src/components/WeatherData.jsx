import React from "react";

const WeatherData = ({
  cityMainData,
  cityWeatherdata,
  city,
  language,
  cityWindData,
  imgSvg,
}) => {
  console.log(imgSvg);

  const currentTime = (time) => {
    return `${new Date(time * 1000).getHours()} : ${new Date(
      time * 1000
    ).getMinutes()}`;
  };

  const sideRight = () => {
    var slider = document.getElementById("scrolledItem");
    slider.scrollLeft = slider.scrollLeft + 300;
  };

  const sideLeft = () => {
    var slider = document.getElementById("scrolledItem");
    slider.scrollLeft = slider.scrollLeft - 300;
  };

  return (
    <div className="weatherData">
      <div className="currentTemp">
        <div className="tempAndLogo">
          <div>
            {imgSvg && <img src={`../assets/${imgSvg}.svg`} alt="icon" width={200}/>}
          </div>
          <div>
            {Math.round(cityMainData.temp)}&deg;C
            <p>{cityWeatherdata.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherData;
