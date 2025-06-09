import { useEffect, useState } from "react";

function App() {
  const [current_weather, setCurrent_Weather] = useState({});
  const [city, setCity] = useState("London");

  const [windspeedUnit, setWindSpeedUnit] = useState("mph");
  const [tempUnit, setTempUnit] = useState("c");
  const [heatIndexUnit, setHeatIndexUnit] = useState("c");
  const [pressureUnit, setPressureUnit] = useState("mb");
  const [precipUnit, setPrecipUnit] = useState("mm");
  const [darkMode, setDarkMode] = useState(false);

  const apiKey = import.meta.env.VITE_API_URL;

  const fetch_curr_weather = async () => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
      );
      const data = await response.json();

      if (!response.ok) {
        if (data && data.error) {
          const code = data.error.code;
          if (code === 1003) {
            throw new Error("City name is missing.");
          } else if (code === 1006) {
            throw new Error("City not found.");
          } else {
            throw new Error("Internal error. Try again later.");
          }
        } else {
          throw new Error("Unexpected error occurred.");
        }
      }

      setCurrent_Weather(data);
    } catch (err) {
      alert(err.message);
    }
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

  const containerStyle = darkMode
    ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white"
    : "min-h-screen bg-gradient-to-br from-sky-100 via-blue-200 to-blue-400 text-gray-800";

  const cardStyle = darkMode
    ? "bg-gray-800 bg-opacity-90 text-white"
    : "bg-white bg-opacity-90 text-gray-900";

  return (
    <div className={`${containerStyle} p-4 flex items-center justify-center`}>
      <div
        className={`${cardStyle} rounded-3xl shadow-2xl max-w-lg w-full p-8 space-y-6`}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-center w-full">
            🌦️ Weather Application
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`absolute top-4 right-4 px-3 py-1 rounded-full font-semibold transition ${
              darkMode ? "bg-yellow-400 text-black" : "bg-gray-900 text-white"
            }`}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Input & Button */}
        <div className="space-y-2">
          <label
            className={`block font-medium ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Enter City:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={`flex-1 px-4 py-2 border ${
                darkMode
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-white text-black border-gray-300"
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
              placeholder="e.g., New York"
            />
            <button
              onClick={fetch_curr_weather}
              className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Get Weather
            </button>
          </div>
        </div>

        {/* Weather Data */}
        {current_weather.current ? (
          <div className="space-y-4">
            {/* Temperature */}
            <div className="flex justify-between items-center border-b pb-2">
              <div className="text-lg font-semibold flex items-center gap-1">
                Temperature:
                <span className="text-xl font-bold text-blue-400">
                  {tempUnit === "c"
                    ? `${current_weather.current.temp_c}°C`
                    : `${current_weather.current.temp_f}°F`}
                </span>
              </div>
              <select
                value={tempUnit}
                onChange={(e) => setTempUnit(e.target.value)}
                className={`"rounded px-2 py-1 text-sm ${
                  darkMode ? "bg-black text-white" : "bg-white text-black"
                }"`}
              >
                <option value="c">°C</option>
                <option value="f">°F</option>
              </select>
            </div>

            {/* Condition */}
            <div className="flex items-center gap-4 border-b pb-2">
              <img
                src={`https:${current_weather.current.condition.icon}`}
                alt="icon"
                className="w-16 h-16"
              />
              <div>
                <div className="text-lg font-medium">
                  {current_weather.current.condition.text}
                </div>
                <div className="text-sm">
                  {current_weather.current.is_day ? "☀️ Daytime" : "🌙 Night"}
                </div>
                <div className="text-sm">
                  ☁️ Cloud Cover: {current_weather.current.cloud}%
                </div>
                <div className="text-sm">
                  🌫️ Air Quality:{" "}
                  {
                    airQuality[
                      current_weather.current.air_quality["us-epa-index"]
                    ]
                  }
                </div>
              </div>
            </div>

            {/* Wind */}
            <div className="space-y-1 border-b pb-2">
              <div className="font-semibold">💨 Wind:</div>
              <div className="flex justify-between items-center">
                <div>
                  Speed:{" "}
                  {windspeedUnit === "mph"
                    ? `${current_weather.current.wind_mph} mph`
                    : `${current_weather.current.wind_kph} kph`}
                </div>
                <select
                  value={windspeedUnit}
                  onChange={(e) => setWindSpeedUnit(e.target.value)}
                  className={`"rounded px-2 py-1 text-sm ${
                    darkMode ? "bg-black text-white" : "text-black"
                  }"`}
                >
                  <option value="mph">MPH</option>
                  <option value="kph">KPH</option>
                </select>
              </div>
              <div>Direction: {current_weather.current.wind_dir}</div>
              <div>Degree: {current_weather.current.wind_degree}°</div>
            </div>

            {/* Heat Index */}
            <div className="flex justify-between items-center border-b pb-2">
              <span>
                🌡️ Heat Index:{" "}
                {heatIndexUnit === "c"
                  ? `${current_weather.current.heatindex_c}°C`
                  : `${current_weather.current.heatindex_f}°F`}
              </span>
              <select
                value={heatIndexUnit}
                onChange={(e) => setHeatIndexUnit(e.target.value)}
                className={`"rounded px-2 py-1 text-sm ${
                  darkMode ? "bg-black text-white" : "text-black"
                }"`}
              >
                <option value="c">°C</option>
                <option value="f">°F</option>
              </select>
            </div>

            {/* Pressure */}
            <div className="flex justify-between items-center border-b pb-2">
              <span>
                📊 Pressure:{" "}
                {pressureUnit === "mb"
                  ? `${current_weather.current.pressure_mb} mb`
                  : `${current_weather.current.pressure_in} in`}
              </span>
              <select
                value={pressureUnit}
                onChange={(e) => setPressureUnit(e.target.value)}
                className={`"rounded px-2 py-1 text-sm ${
                  darkMode ? "bg-black text-white" : "text-black"
                }"`}
              >
                <option value="mb">mb</option>
                <option value="in">in</option>
              </select>
            </div>

            {/* Precipitation */}
            <div className="flex justify-between items-center">
              <span>
                🌧️ Precipitation:{" "}
                {precipUnit === "mm"
                  ? `${current_weather.current.precip_mm} mm`
                  : `${current_weather.current.precip_in} in`}
              </span>
              <select
                value={precipUnit}
                onChange={(e) => setPrecipUnit(e.target.value)}
                className={`"rounded px-2 py-1 text-sm ${
                  darkMode ? "bg-black text-white" : "text-black"
                }"`}
              >
                <option value="mm">mm</option>
                <option value="in">in</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="text-center pt-4 text-gray-400">
            No data yet or loading...
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
