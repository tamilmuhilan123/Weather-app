import { useEffect, useState } from "react";
import searchIcon from "./assets/search.png";
import locationIcon from "./assets/location.png";
import stromIcon from "./assets/weathericons/thunderstorms.svg";
import rainIcon from "./assets/rain.gif";
import uvIcon from "./assets/uv.gif";
import windIcon from "./assets/wind.gif";
import humiIcon from "./assets/humidity.gif";
import sunSetIcon from "./assets/weathericons/sunset.svg";
import sunRiseIcon from "./assets/weathericons/sunrise.svg";
import notfound from "./assets/notfound.jpg";

const Myweather = () => {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [day, setDay] = useState("Monday");
  const [date, setDate] = useState("12");
  const [month, setMonth] = useState("May");
  const [year, setYear] = useState(2025);
  const [temp, setTemp] = useState("23");
  const [highTemp, setHighTemp] = useState(27);
  const [lowTemp, setLowTemp] = useState(10);
  const [weatherName, setWeatherName] = useState("thunder");
  const [feelsLike, setFeelsLike] = useState(26);
  const [chanceOfRain, setChanceOfRain] = useState("");
  const [uvIndex, setUvIndex] = useState("");
  const [windStatus, setWindStatus] = useState("");
  const [humidity, setHumidity] = useState("");
  const [sunRise, setSunRise] = useState("7:50 am");
  const [sunSet, setSunSet] = useState("6:45 pm");
  const [days1Temp, setDays1Temp] = useState("");
  const [days2Temp, setDays2Temp] = useState("");
  const [days3Temp, setDays3Temp] = useState("");
  const [days4Temp, setDays4Temp] = useState("");
  const [days5Temp, setDays5Temp] = useState("");
  const [days6Temp, setDays6Temp] = useState("");
  const [days7Temp, setDays7Temp] = useState("");
  const [loading, setLoading] = useState(false);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [mainIcon, setMainIcon] = useState(stromIcon);
  const [recentCities, setRecentCities] = useState([]);
  const [forecastDays, setForecastDays] = useState([]);


  function searchInput(e) {
    setSearch(e.target.value);
  }

  function enter(e) {
    if (e.key === "Enter") {
      searchWeather();
      setSearch("");
    }
  }

  async function searchWeather() {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=b8377ca2009046778cc62013251205&q=${search}&days=7`
      );
      const data = await res.json();
      console.log(data);

      if (data.error) {
        setCityNotFound(true);
        setLoading(false);
        return;
      } else {
        setCityNotFound(false);

        const cityName = data.location.name;
        const cityTemp = Math.floor(data.current.temp_c);
        const cityIcon = "https:" + data.current.condition.icon;

        setRecentCities((prev) => {
          const filtered = prev.filter((c) => c.name !== cityName);
          const updated = [{ name: cityName, temp: cityTemp, icon: cityIcon }, ...filtered];
         return updated.slice(0, 5);
        });
        setCity(cityName);
        setRegion(data.location.region);
        setCountry(data.location.country);
        setTemp(Math.floor(data.current.temp_c));
        setWeatherName(data.current.condition.text);
        setFeelsLike(Math.floor(data.current.feelslike_c));
        setHighTemp(data.forecast.forecastday[0].day.maxtemp_c);
        setLowTemp(data.forecast.forecastday[0].day.mintemp_c);
        setChanceOfRain(data.forecast.forecastday[0].day.daily_chance_of_rain);
        setUvIndex(data.forecast.forecastday[0].day.uv);
        setWindStatus(data.forecast.forecastday[0].day.maxwind_mph);
        setHumidity(data.forecast.forecastday[0].day.avghumidity);
        setSunRise(data.forecast.forecastday[0].astro.sunrise);
        setSunSet(data.forecast.forecastday[0].astro.sunset);
        setMainIcon("https:" + data.current.condition.icon);
        const forecastArray = data.forecast.forecastday.slice(0, 7).map((dayData) => {
        const date = new Date(dayData.date);
        const options = { weekday: "short" };
        const dayName = date.toLocaleDateString("en-US", options);
        const localTimeStr = data.location.localtime; 
        const localDate = new Date(localTimeStr.replace(" ", "T"));
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        setDay(days[localDate.getDay()]);
        setDate(localDate.getDate());
        setMonth(months[localDate.getMonth()]);
        setYear(localDate.getFullYear());

       return {
    name: dayName,
    temp: Math.floor(dayData.day.maxtemp_c),
    icon: "https:" + dayData.day.condition.icon,
    condition: dayData.day.condition.text,
  };
});

setForecastDays(forecastArray);

      }
    } catch (error) {
      console.error("Error fetching weather data", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setCity("Chennai");
    setRegion("Tamil Nadu");
    setCountry("India");
    function updateDate() {
  }

  updateDate();
  const timer = setInterval(updateDate, 60 * 60 * 1000);
  return () => clearInterval(timer);
  }, []);

  return (
    <div className="weather-main">
      <div className="weather-submain">
        <div className="searchbox flex">
          <div className="search-img">
            <input
              type="text"
              placeholder="Search city"
              value={search}
              onChange={searchInput}
              onKeyDown={enter}
            />
            <img src={searchIcon} alt="search icon" onClick={searchWeather} />
          </div>
        </div>

        {loading && <p className="pleasewait">Please Wait...</p>}

        {!cityNotFound && (
          <div className="main-weather">
            <div className="main-weather-todayhighlights">
              <div className="left-weather">
                <div className="location">
                  <div className="location-main flex">
                    <img src={locationIcon} alt="location" />
                    <p>
                      {city}, {region}, {country}
                    </p>
                  </div>
                </div>
                <div className="date-day">
                  <h1>{day}</h1>
                  <p>
                    {date} {month}, {year}
                  </p>
                </div>
                <div className="temp">
                  <h1>{temp}°C</h1>
                  <p>
                    High: {highTemp} Low: {lowTemp}
                  </p>
                </div>
              </div>
              <div className="right-weather">
                <div className="weather-icon">
                  <img src={mainIcon} alt="weather icon" />
                </div>
                <div className="weather-feelslike">
                  <h1>{weatherName}</h1>
                  <p>Feels like: {feelsLike}°C</p>
                </div>
              </div>
            </div>

            <div className="today-highlights">
              <h1>Today Highlights</h1>
              <div className="today-hightlights-main">
                <div className="chance-of-rain">
                  <p>Chance of Rain: {chanceOfRain}%</p>
                  <img src={rainIcon} />
                </div>
                <div className="uv-index">
                  <p>UV Index: {uvIndex}</p>
                  <img src={uvIcon} />
                </div>
                <div className="wind-status">
                  <p>Wind Status: {windStatus} mph</p>
                  <img src={windIcon} />
                </div>
                <div className="humi">
                  <p>Humidity: {humidity}%</p>
                  <img src={humiIcon} />
                </div>
              </div>
            </div>

            <div className="today-week">
              <div className="today-week-main">
                <h1>Today / Week</h1>
                <div className="today-week-left">
                 <div className="days-forecast">
                  {forecastDays.length > 0 ? (
                    forecastDays.map((day, index) => (
                      <div className="day1" key={index}>
                        <p>{day.name}</p>
                        <img src={day.icon} alt={day.condition} className="w-13" />
                        <p>{day.temp}°C</p>
                      </div>
                    ))
                  ) : (
                    <p>No forecast data available</p>
                  )}
                </div>

                </div>
                <div className="today-week-right">
                  <div className="rise-set">
                    <div className="sun-rise">
                      <img src={sunRiseIcon} alt="" />
                      <div className="sun-rise-words">
                        <p>Sunrise</p>
                        <h1>{sunRise}</h1>
                      </div>
                    </div>
                    <div className="sun-set">
                      <img src={sunSetIcon} alt="" />
                      <div className="sun-set-words">
                        <p>Sunset</p>
                        <h1>{sunSet}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="other-cities">
              <div className="heading">
                <h1>Recent Search Cities</h1>
              </div>
              <div className="other-cities-main">
                {recentCities.length === 0 ? (
                  <p>No recent cities</p>
                ) : (
                  recentCities.map((cityName, index) => (
                    <div className="city-1" key={index}>
                      <div className="city-1-words">
                        <h1>{cityName.temp}°</h1>
                        <p>{cityName.name}</p>
                      </div>
                      <div className="city-1-img">
                       <img src={cityName.icon} alt={cityName.name} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {cityNotFound && (
          <div className="citynotfound">
            <p>City not found</p>
            <img src={notfound} alt="not found image" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Myweather;


