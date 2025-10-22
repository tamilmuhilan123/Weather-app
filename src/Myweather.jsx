import { useEffect, useState } from "react";

/* Images for weather app */
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
        setRecentCities((prev) => {
          const filtered = prev.filter((c) => c.name !== cityName);
          const updated = [{ name: cityName, temp: cityTemp }, ...filtered];
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
        setMainIcon(data.current.condition.icon);
        setDays1Temp(Math.floor(data.forecast.forecastday[0].day.maxtemp_c));
        setDays2Temp(Math.floor(data.forecast.forecastday[1].day.maxtemp_c));
        setDays3Temp(Math.floor(data.forecast.forecastday[2].day.maxtemp_c));
        setDays4Temp(Math.floor(data.forecast.forecastday[3].day.maxtemp_c));
        setDays5Temp(Math.floor(data.forecast.forecastday[4].day.maxtemp_c));
        setDays6Temp(Math.floor(data.forecast.forecastday[5].day.maxtemp_c));
        setDays7Temp(Math.floor(data.forecast.forecastday[6].day.maxtemp_c));
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
    const now = new Date();
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    setDay(days[now.getDay()]);
    setDate(now.getDate());
    setMonth(months[now.getMonth()]);
    setYear(now.getFullYear());
  }

  updateDate();
  const timer = setInterval(updateDate, 60 * 60 * 1000); // update every hour
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
                    {[
                      days1Temp,
                      days2Temp,
                      days3Temp,
                      days4Temp,
                      days5Temp,
                      days6Temp,
                      days7Temp,
                    ].map((temp, index) => (
                      <div className="day1" key={index}>
                        <p>Day {index + 1}</p>
                        <img src={stromIcon} className="w-13" />
                        <p>{temp}°C</p>
                      </div>
                    ))}
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

            {/* ✅ Recent Cities Section */}
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
                        <img src={stromIcon} alt="icon" />
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

// import { useEffect, useState } from "react"

// /*images for weather app */
// import searchIcon from "./assets/search.png"
// import locationIcon from "./assets/location.png" 
// import stromIcon from "./assets/weathericons/thunderstorms.svg"
// import rainIcon from "./assets/rain.gif"
// import uvIcon from "./assets/uv.gif"
// import windIcon from "./assets/wind.gif"
// import humiIcon from "./assets/humidity.gif"
// import sunSetIcon from "./assets/weathericons/sunset.svg"
// import sunRiseIcon from "./assets/weathericons/sunrise.svg"
// import notfound from "./assets/notfound.jpg"



// const Myweather = () => {
//   const[search,setSearch]=useState("")
//   const[city,setCity]=useState("")
//   const[region,setRegion]=useState("")
//   const[country,setCountry]=useState("")
//   const[day,setDay]=useState("Monday")
//   const[date,setDate]=useState("12")
//   const[month,setMonth]=useState("May")
//   const[year,setYear]=useState(2025)
//   const[temp,setTemp]=useState("23")
//   const[highTemp,setHighTemp]=useState(27)
//   const[lowTemp,setLowTemp]=useState(10)
//   const[weatherName,setWeatherName]=useState("thunder")
//   const[feelsLike,setFeelsLike]=useState(26)
//   const[chanceOfRain,setChanceOfRain]=useState("")
//   const[uvIndex,setUvIndex]=useState("")
//   const[windStatus,setWindStatus]=useState("")
//   const[humidity,setHumidity]=useState("")
//   const[sunRise,setSunRise]=useState("7:50 am")
//   const[sunSet,setSunSet]=useState("6:45 pm")
//   const[days1Temp,setDays1Temp]=useState("")
//   const[days2Temp,setDays2Temp]=useState("")
//   const[days3Temp,setDays3Temp]=useState("")
//   const[days4Temp,setDays4Temp]=useState("")
//   const[days5Temp,setDays5Temp]=useState("")
//   const[days6Temp,setDays6Temp]=useState("")
//   const[days7Temp,setDays7Temp]=useState("")
//   const[loading,setLoading]=useState(false)
//   const[cityNotFound,setCityNotFound]=useState(false)
//   const [mainIcon,setMainIcon]=useState(stromIcon)
//   const [recentCities, setRecentCities] = useState([]);



  

//   function searchInput(e){
//     setSearch(e.target.value)
//   }


//   function enter(e){
//     if(e.key==="Enter"){
//       searchWeather()
//       setSearch("")
//     }
//   }

//   async function searchWeather(){
//     try {
//       setLoading(true)
//       const res=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b8377ca2009046778cc62013251205&q=${search}&days=7`)
//       const data=await res.json()
//       console.log(data)
//       if(data.error){
//         setCityNotFound(true)
//         setLoading(false)
//         return;
//       }
//       else{
//         setCityNotFound(false)
//       setCity(data.location.name)
//       setRegion(data.location.region)
//       setCountry(data.location.country)
//       const setcurrenttemp=Math.floor(data.current.temp_c)
//       setTemp(setcurrenttemp)
//       setWeatherName(data.current.condition.text)
//       const feelsliketemp=Math.floor(data.current.feelslike_c)
//       setFeelsLike(feelsliketemp)
//       setHighTemp(data.forecast.forecastday[0].day.maxtemp_c)
//       setLowTemp(data.forecast.forecastday[0].day.mintemp_c)
//       setChanceOfRain(data.forecast.forecastday[0].day.daily_chance_of_rain)
//       setUvIndex(data.forecast.forecastday[0].day.uv)
//       setWindStatus(data.forecast.forecastday[0].day.maxwind_mph)
//       setHumidity(data.forecast.forecastday[0].day.avghumidity)
//       setSunRise(data.forecast.forecastday[0].astro.sunrise)
//       setSunSet(data.forecast.forecastday[0].astro.sunset)
//       setMainIcon(data.current.condition.icon)
//       const day1temp=Math.floor(data.forecast.forecastday[0].day.maxtemp_c)
//       console.log(day1temp)
//       setDays1Temp(day1temp)
//       const day2temp=Math.floor(data.forecast.forecastday[1].day.maxtemp_c)
//       console.log(day2temp)
//       setDays2Temp(day2temp)
//       const day3temp=Math.floor(data.forecast.forecastday[2].day.maxtemp_c)
//        console.log(day3temp)
//       setDays3Temp(day3temp)
//       const day4temp=Math.floor(data.forecast.forecastday[3].day.maxtemp_c)
//        console.log(day4temp)
//       setDays4Temp(day4temp)
//       const day5temp=Math.floor(data.forecast.forecastday[4].day.maxtemp_c)
//        console.log(day5temp)
//       setDays5Temp(day5temp)
//       const day6temp=Math.floor(data.forecast.forecastday[5].day.maxtemp_c)
//        console.log(day6temp)
//       setDays6Temp(day6temp)
//       const day7temp=Math.floor(data.forecast.forecastday[6].day.maxtemp_c)
//        console.log(day7temp)
//       setDays7Temp(day7temp)
//        const cityName = data.location.name;
//       setRecentCities(prev => {
//     const updated = [cityName, ...prev.filter(c => c !== cityName)];
//     return updated.slice(0, 5);
//       })
      
//       // setDays3Temp(data.forecast.forecastday[2].day.maxtemp_c)
//       // setDays4Temp(data.forecast.forecastday[3].day.maxtemp_c)
//       // setDays5Temp(data.forecast.forecastday[4].day.maxtemp_c)
//       // setDays6Temp(data.forecast.forecastday[5].day.maxtemp_c)
//       // setDays7Temp(data.forecast.forecastday[6].day.maxtemp_c)
//       }
//     } catch (error) {
//       console.error("Error occuring during api fetching",error.message)
//     }
//     finally{
//       setLoading(false)
//     }
//   }

//   useEffect(()=>{
//     setCity("chennai")
//     setRegion("tamil nadu")
//     setCountry("india")
//   },[])
//   return (
//     <>
//     <div className="weather-main">
//       <div className="weather-submain">
//         <div className="searchbox flex">
//           <div className="search-img">
//             <input type="text" placeholder="Search city" value={search} onChange={searchInput} onKeyDown={enter}/> 
//             <img src={searchIcon} alt="search icon" onClick={searchWeather}/>     
//           </div>
//       </div>
//       <p className="pleasewait">{loading && <p>Please Wait...</p>}</p>
//       {!cityNotFound && <div className="main-weather">
//          <div className="main-weather-todayhighlights">
//         <div className="left-weather">
//           <div className="location">
//             <div className="location-main flex">
//               <img src={locationIcon} alt="location" />
//               <p>{city},{region},{country}</p>
//             </div>
//           </div>
//           <div className="date-day">
//             <h1>{day}</h1>
//             <p>{date} {month} , {year}</p>
//           </div>
//           <div className="temp">
//             <h1>{temp}°c</h1>
//             <p>High:{highTemp} low:{lowTemp}</p>
//           </div>
//         </div>
//         <div className="right-weather">
//           <div className="weather-icon">
//             <img src={mainIcon} alt="storm image" />
//           </div>
//           <div className="weather-feelslike">
//             <h1>{weatherName}</h1>
//             <p>Feels like : {feelsLike}°C</p>
//           </div>
//         </div>
//       </div>
//       <div className="today-highlights">
//         <h1>Today hightlights</h1>
//         <div className="today-hightlights-main">
//           <div className="chance-of-rain">
//             <p>chance of rain : {chanceOfRain} %</p>
//             <img src={rainIcon}/>
//           </div>
//           <div className="uv-index">
//             <p>UV index : {uvIndex}</p>
//             <img src={uvIcon}/>
//           </div>
//           <div className="wind-status">
//             <p>wind status : {windStatus} mph</p>
//             <img src={windIcon}/>
//           </div>
//           <div className="humi">
//             <p>humidity : {humidity}</p>
//             <img src={humiIcon}/>
//           </div>
//         </div>
//       </div>
//       <div className="today-week">
//         <div className="today-week-main">
//           <h1>Today / week</h1>
//           <div className="today-week-left">
//              <div className="days-forecast">
//             <div className="day1">
//               <p>Mon</p>
//               <img src={stromIcon} className="w-13"/>
//               <p>{days1Temp}°C</p>
//             </div>
//             <div className="day1">
//               <p>Tue</p>
//               <img src={stromIcon} className="w-13"/>
//               <p>{days2Temp}°C</p>
//             </div>
//             <div className="day1">
//               <p>Wed</p>
//               <img src={stromIcon} className="w-13"/>
//               <p>{days3Temp}°C</p>
//             </div>
//             <div className="day1">
//               <p>thu</p>
//               <img src={stromIcon} className="w-13"/>
//               <p>{days4Temp}°C</p>
//             </div>
//             <div className="day1">
//               <p>fri</p>
//               <img src={stromIcon} className="w-13"/>
//               <p>{days5Temp}°C</p>
//             </div>
//             <div className="day1">
//               <p>sat</p>
//               <img src={stromIcon} className="w-13"/>
//               <p>{days6Temp}°C</p>
//             </div>
//             <div className="day1">
//               <p>sun</p>
//               <img src={stromIcon} className="w-13"/>
//               <p>{days7Temp}°C</p>
//             </div>
//           </div>
//           </div>
//           <div className="today-week-right">
//             <div className="rise-set">
//             <div className="sun-rise">
//               <img src={sunRiseIcon} alt="" />
//               <div className="sun-rise-words">
//                  <p>Sunrise</p>
//                  <h1>{sunRise}</h1>
//               </div>
//             </div>
//             <div className="sun-set">
//               <img src={sunSetIcon} alt="" />
//                <div className="sun-set-words">
//                  <p>Sunset</p>
//                  <h1>{sunSet}</h1>
//               </div>
//             </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="other-cities">
//        <div className="heading">
//          <h1>Recent search cities</h1>
//        </div>
//        <div className="other-cities-main">
//   {recentCities.map((cityName, index) => (
//     <div key={index} className="city-1">
//       <div className="city-1-words">
//         <h1>--°</h1> {/* You can fetch temp too if needed */}
//         <p>{cityName}</p>
//       </div>
//       <div className="city-1-img">
//         <img src={stromIcon} alt="" />
//       </div>
//     </div>
//   ))}
//   {recentCities.length === 0 && <p>No recent cities yet</p>}
// </div>

//         <div className="other-cities-main">
//           <div className="city-1">
//             <div className="city-1-words">
//               <h1>14°</h1>
//               <p>USA</p>
//             </div>
//             <div className="city-1-img">
//               <img src={stromIcon} alt="" />
//             </div>
//           </div>
//           <div className="city-1">
//             <div className="city-1-words">
//               <h1>14°</h1>
//               <p>USA</p>
//             </div>
//             <div className="city-1-img">
//               <img src={stromIcon} alt="" />
//             </div>
//           </div>
//           <div className="city-1">
//             <div className="city-1-words">
//               <h1>14°</h1>
//               <p>USA</p>
//             </div>
//             <div className="city-1-img">
//               <img src={stromIcon} alt="" />
//             </div>
//           </div>
//           <div className="city-1">
//             <div className="city-1-words">
//               <h1>14°</h1>
//               <p>USA</p>
//             </div>
//             <div className="city-1-img">
//               <img src={stromIcon} alt="" />
//             </div>
//           </div>
//         </div>
//       </div>
//       </div>}
//       </div>
//       <div className="citynotfound">
//         {cityNotFound && <p>city not found</p>}
//         {cityNotFound && <img src={notfound} alt="not found image" />}
//       </div>
//     </div>
//     </>
//   )
// }

// export default Myweather
// import { useEffect, useState } from "react";

// /* images for weather app */
// import searchIcon from "./assets/search.png";
// import locationIcon from "./assets/location.png";
// import stromIcon from "./assets/weathericons/thunderstorms.svg";
// import rainIcon from "./assets/rain.gif";
// import uvIcon from "./assets/uv.gif";
// import windIcon from "./assets/wind.gif";
// import humiIcon from "./assets/humidity.gif";
// import sunSetIcon from "./assets/weathericons/sunset.svg";
// import sunRiseIcon from "./assets/weathericons/sunrise.svg";

// const Myweather = () => {
//   const [search, setSearch] = useState("");
//   const [city, setCity] = useState("");
//   const [region, setRegion] = useState("");
//   const [country, setCountry] = useState("");
//   const [day, setDay] = useState("Monday");
//   const [date, setDate] = useState("12");
//   const [month, setMonth] = useState("May");
//   const [year, setYear] = useState(2025);
//   const [time, setTime] = useState("16:45");
//   const [temp, setTemp] = useState("23");
//   const [highTemp, setHighTemp] = useState(27);
//   const [lowTemp, setLowTemp] = useState(10);
//   const [weatherName, setWeatherName] = useState("thunder");
//   const [feelsLike, setFeelsLike] = useState(26);
//   const [chanceOfRain, setChanceOfRain] = useState("");
//   const [uvIndex, setUvIndex] = useState("");
//   const [windStatus, setWindStatus] = useState("");
//   const [humidity, setHumidity] = useState("");
//   const [sunRise, setSunRise] = useState("7:50 am");
//   const [sunSet, setSunSet] = useState("6:45 pm");
//   const [days1Temp, setDays1Temp] = useState("");
//   const [days2Temp, setDays2Temp] = useState("");
//   const [days3Temp, setDays3Temp] = useState("");
//   const [days4Temp, setDays4Temp] = useState("");
//   const [days5Temp, setDays5Temp] = useState("");
//   const [days6Temp, setDays6Temp] = useState("");
//   const [days7Temp, setDays7Temp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [cityNotFound, setCityNotFound] = useState(false);

//   function searchInput(e) {
//     setSearch(e.target.value);
//   }

//   function enter(e) {
//     if (e.key === "Enter") {
//       searchWeather();
//       setSearch("");
//     }
//   }

//   async function searchWeather() {
//     try {
//       setLoading(true);
//       const res = await fetch(
//         `https://api.weatherapi.com/v1/forecast.json?key=b8377ca2009046778cc62013251205&q=${search}&days=7`
//       );
//       const data = await res.json();
//       console.log(data);

//       setCity(data.location.name);
//       setRegion(data.location.region);
//       setCountry(data.location.country);

//       // Extract date and time from localtime
//       const localTime = data.location.localtime; // e.g. "2025-07-03 16:45"
//       const [fullDate, localTimeOnly] = localTime.split(" ");
//       const [yearVal, monthNum, dayNum] = fullDate.split("-");

//       const monthNames = [
//         "January", "February", "March", "April", "May", "June",
//         "July", "August", "September", "October", "November", "December"
//       ];
//       const dayNames = [
//         "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
//       ];

//       const dateObj = new Date(fullDate);
//       setDate(dayNum);
//       setMonth(monthNames[parseInt(monthNum) - 1]);
//       setYear(yearVal);
//       setDay(dayNames[dateObj.getDay()]);
//       setTime(localTimeOnly);

//       // Set main weather info
//       setTemp(Math.floor(data.current.temp_c));
//       setWeatherName(data.current.condition.text);
//       setFeelsLike(Math.floor(data.current.feelslike_c));
//       setHighTemp(data.forecast.forecastday[0].day.maxtemp_c);
//       setLowTemp(data.forecast.forecastday[0].day.mintemp_c);
//       setChanceOfRain(data.forecast.forecastday[0].day.daily_chance_of_rain);
//       setUvIndex(data.forecast.forecastday[0].day.uv);
//       setWindStatus(data.forecast.forecastday[0].day.maxwind_mph);
//       setHumidity(data.forecast.forecastday[0].day.avghumidity);
//       setSunRise(data.forecast.forecastday[0].astro.sunrise);
//       setSunSet(data.forecast.forecastday[0].astro.sunset);

//       // Set week temps
//       setDays1Temp(Math.floor(data.forecast.forecastday[0].day.maxtemp_c));
//       setDays2Temp(Math.floor(data.forecast.forecastday[1].day.maxtemp_c));
//       setDays3Temp(Math.floor(data.forecast.forecastday[2].day.maxtemp_c));
//       setDays4Temp(Math.floor(data.forecast.forecastday[3].day.maxtemp_c));
//       setDays5Temp(Math.floor(data.forecast.forecastday[4].day.maxtemp_c));
//       setDays6Temp(Math.floor(data.forecast.forecastday[5].day.maxtemp_c));
//       setDays7Temp(Math.floor(data.forecast.forecastday[6].day.maxtemp_c));
//     } catch (error) {
//       console.error("Error during API fetch:", error.message);
//       setCityNotFound(true);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     setCity("Chennai");
//     setRegion("Tamil Nadu");
//     setCountry("India");
//   }, []);

//   return (
//     <>
//       <div className="weather-main">
//         <div className="weather-submain">
//           <div className="searchbox flex">
//             <div className="search-img">
//               <input type="text" placeholder="Search city" value={search} onChange={searchInput} onKeyDown={enter} />
//               <img src={searchIcon} alt="search icon" onClick={searchWeather} />
//             </div>
//           </div>

//           <p className="pleasewait">{loading && <p>Please Wait...</p>}</p>

//           <div className="main-weather">
//             <div className="main-weather-todayhighlights">
//               <div className="left-weather">
//                 <div className="location">
//                   <div className="location-main flex">
//                     <img src={locationIcon} alt="location" />
//                     <p>{city}, {region}, {country}</p>
//                   </div>
//                 </div>
//                 <div className="date-day">
//                   <h1>{day}</h1>
//                   <p>{date} {month}, {year}</p>
//                   <p>{time}</p>
//                 </div>
//                 <div className="temp">
//                   <h1>{temp}°C</h1>
//                   <p>High: {highTemp}° Low: {lowTemp}°</p>
//                 </div>
//               </div>

//               <div className="right-weather">
//                 <div className="weather-icon">
//                   <img src={stromIcon} alt="storm image" />
//                 </div>
//                 <div className="weather-feelslike">
//                   <h1>{weatherName}</h1>
//                   <p>Feels like: {feelsLike}°C</p>
//                 </div>
//               </div>
//             </div>

//             <div className="today-highlights">
//               <h1>Today highlights</h1>
//               <div className="today-hightlights-main">
//                 <div className="chance-of-rain">
//                   <p>Chance of rain: {chanceOfRain} %</p>
//                   <img src={rainIcon} />
//                 </div>
//                 <div className="uv-index">
//                   <p>UV index: {uvIndex}</p>
//                   <img src={uvIcon} />
//                 </div>
//                 <div className="wind-status">
//                   <p>Wind status: {windStatus} mph</p>
//                   <img src={windIcon} />
//                 </div>
//                 <div className="humi">
//                   <p>Humidity: {humidity}</p>
//                   <img src={humiIcon} />
//                 </div>
//               </div>
//             </div>

//             <div className="today-week">
//               <div className="today-week-main">
//                 <h1>Today / week</h1>
//                 <div className="today-week-left">
//                   <div className="days-forecast">
//                     {[days1Temp, days2Temp, days3Temp, days4Temp, days5Temp, days6Temp, days7Temp].map((temp, i) => (
//                       <div className="day1" key={i}>
//                         <p>{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}</p>
//                         <img src={stromIcon} className="w-13" />
//                         <p>{temp}°C</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="today-week-right">
//                   <div className="rise-set">
//                     <div className="sun-rise">
//                       <img src={sunRiseIcon} alt="" />
//                       <div className="sun-rise-words">
//                         <p>Sunrise</p>
//                         <h1>{sunRise}</h1>
//                       </div>
//                     </div>
//                     <div className="sun-set">
//                       <img src={sunSetIcon} alt="" />
//                       <div className="sun-set-words">
//                         <p>Sunset</p>
//                         <h1>{sunSet}</h1>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="other-cities">
//               <div className="heading">
//                 <h1>Other cities</h1>
//               </div>
//               <div className="other-cities-main">
//                 {[1, 2, 3, 4].map((_, index) => (
//                   <div className="city-1" key={index}>
//                     <div className="city-1-words">
//                       <h1>14°</h1>
//                       <p>USA</p>
//                     </div>
//                     <div className="city-1-img">
//                       <img src={stromIcon} alt="" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="citynotfound">
//             {cityNotFound && <p>City not found</p>}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Myweather;
