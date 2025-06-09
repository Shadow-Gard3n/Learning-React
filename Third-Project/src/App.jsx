import { useEffect, useState } from "react";

function App() {
  const [current_weather, setCurrent_Weather] = useState({});
  const [city, setCity] = useState("London");

  const [windspeedUnit, setWindSpeedUnit] = useState("mph");
  const [tempUnit, setTempUnit] = useState("c");
  const [heatIndexUnit, setHeatIndexUnit] = useState("c");
  const [pressureUnit, setPressureUnit] = useState("mb");
  const [precipUnit, setPrecipUnit] = useState("mm");

  const apiKey = "550d36304f7048ecb9e54320250906";
  const fetch_curr_weather = async () => {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
    );
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    setCurrent_Weather(data);
  };

  const airQuality = {
    1: "Good",
    2: "Moderate",
    3: "Unhealthy for sensitive groups",
    4: "Unhealthy",
    5: "Very Unhealthy",
    6: "Hazardous",
  };

  useEffect(() => {
    fetch_curr_weather();
  }, []);

  return (
    <>
      <div>Weather Application</div>

      <div>Place: </div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <div>
        {current_weather.current ? (
          <div>
            {/* Temperature */}
            <div>
              Current Temperature:{" "}
              {tempUnit === "c"
                ? `${current_weather.current.temp_c}`
                : `${current_weather.current.temp_f}`}
              <select
                value={tempUnit}
                onChange={(e) => setTempUnit(e.target.value)}
              >
                <option value="c">Celsius (°C)</option>
                <option value="f">Fahrenheit (°F)</option>
              </select>
            </div>

            {/* weather condition important*/}
            <div>
              <img src={`https:${current_weather.current.condition.icon}`} />
              <div>{current_weather.current.condition.text}</div>
              <div>{current_weather.current.is_day ? "Day" : "Night"}</div>
              <div>Cloud Percentage: {current_weather.current.cloud}</div>
              <div>
                Air Quality:{" "}
                {
                  airQuality[
                    current_weather.current.air_quality["us-epa-index"]
                  ]
                }
              </div>
            </div>

            {/* wind condition */}
            <div>Wind Condition: </div>
            <div>
              Wind Speed:{" "}
              {windspeedUnit === "mph"
                ? `${current_weather.current.wind_mph}`
                : `${current_weather.current.wind_kph}`}
              <select
                value={windspeedUnit}
                onChange={(e) => setWindSpeedUnit(e.target.value)}
              >
                <option value="mph">MPH</option>
                <option value="kph">KPH</option>
              </select>
            </div>

            <div>Wind Degree: {current_weather.current.wind_degree}</div>
            <div>Wind Direction: {current_weather.current.wind_dir}</div>

            <div>
              Heat Index:{" "}
              {heatIndexUnit === "c"
                ? `${current_weather.current.heatindex_c}`
                : `${current_weather.current.heatindex_f}`}{" "}
              <select
                onChange={(e) => setHeatIndexUnit(e.target.value)}
                value={heatIndexUnit}
              >
                <option value="c">°C</option>
                <option value="f">°F</option>
              </select>
            </div>

            <div>
              Pressure:{" "}
              {pressureUnit === "mb"
                ? `${current_weather.current.pressure_mb}`
                : `${current_weather.current.pressure_in}`}{" "}
              <select
                onChange={(e) => setPressureUnit(e.target.value)}
                value={pressureUnit}
              >
                <option value="mb">mb</option>
                <option value="in">in</option>
              </select>
            </div>

            <div>
              Precipitation:{" "}
              {precipUnit === "mm"
                ? `${current_weather.current.precip_mm}`
                : `${current_weather.current.precip_in}`}{" "}
              <select
                onChange={(e) => setPrecipUnit(e.target.value)}
                value={precipUnit}
              >
                <option value="mm">mm</option>
                <option value="in">in</option>
              </select>
            </div>
          </div>
        ) : (
          <div>Loading or no data yet</div>
        )}
      </div>
      <button onClick={fetch_curr_weather}>Submit</button>
    </>
  );
}

export default App;
