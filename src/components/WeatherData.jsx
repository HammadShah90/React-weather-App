
const WeatherData = ({
  cityMainData,
  cityWeatherdata,
  city,
  language,
  cityWindData,
}) => {


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
            {cityWeatherdata && (
              <img
                src={`../images/${cityWeatherdata.icon}.svg`}
                alt="icon"
                width={200}
              />
            )}
          </div>
          <div>
            {Math.round(cityMainData.temp)}&deg;C
            <p>{cityWeatherdata.description}</p>
          </div>
        </div>
        <div className="windData">
          <p className="d-flex">
            {language ? "Wind :" : "ہوا:"}
            <span className="mx-2">{cityWindData.speed}&nbsp;mph</span>
          </p>
          <p className="d-flex">
            {language ? "Min Temp:" : "کم سے کم درجہ حرارت:"}
            <span>{Math.round(cityMainData.temp_min)}&deg;C</span>
          </p>
          <p className="d-flex">
            {language ? "Max Temp:" : "زیادہ سے زیادہ درجہ حرارت:"}
            <span>{Math.round(cityMainData.temp_max)}&deg;C</span>
          </p>
        </div>
      </div>
      <div id="scrolledItem" className="forcastdata">
        <div>
          <p>{language ? "SUNRISE" : "طلوع آفتاب"}</p>
          <img src={'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/sunrise.svg'} width={100} alt="Sunrise Icon" />
          <p>{currentTime(city.sunrise)}</p>
        </div>
        <div>
          <p>{language ? "HUMIDITY" : "نمی"}</p>
          <img src={'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/humidity.svg'} width={100} alt="Sunrise Icon" />
          <p>{cityMainData.humidity}&nbsp;mm</p>
        </div>
        <div>
          <p>{language ? "WIND" : "ہوا"}</p>
          <img src={'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind.svg'} width={100} alt="Sunrise Icon" />
          <p>{cityWindData.speed}&nbsp;mph</p>
        </div>
        <div>
          <p>{language ? "PRESSURE" : "دباؤ"}</p>
          <img src={'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/pressure-low.svg'} width={100} alt="Sunrise Icon" />
          <p>{cityMainData.pressure}&nbsp;mb</p>
        </div>
        <div>
          <p>{language ? "SUNSET" : "غروب آفتاب"}</p>
          <img src={'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/sunset.svg'} width={100} alt="Sunrise Icon" />
          <p>{currentTime(city.sunset)}</p>
        </div>
      </div>
      <p className="copyRightText text-white">&copy; Muhammad Hammad 2023</p>
      <p onClick={sideRight} style={{ cursor: "pointer" }} className="rightArrow">&gt;</p>
      <p onClick={sideLeft} style={{ cursor: "pointer" }} className="leftArrow">&lt;</p>
    </div>
  );
};

export default WeatherData;
