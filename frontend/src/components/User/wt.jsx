import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('http://thoitiet.vn/embed/vopgfypubzd?days=5&hC=%2310b982&hB=%23caf1d8&tC=%2310b981&bC=transpane&lC=%23dddddd');
        const parser = new DOMParser();
        const doc = parser.parseFromString(response.data, 'text/html');
        
        const temperature = doc.querySelector('.temperature').textContent.trim();
        const location = doc.querySelector('.location a').textContent.trim();
        const feelLike = doc.querySelector('.feellike').textContent.trim();
        const description = doc.querySelector('.temp-description').textContent.trim();
        const icon = doc.querySelector('.icon-container img').src;
        
        const days = [...doc.querySelectorAll('#weather-days tr')].map(row => {
          const columns = row.querySelectorAll('td');
          if (columns.length === 4) {
            return {
              day: columns[0].textContent.trim(),
              icon: columns[1].querySelector('img').src,
              name: columns[2].textContent.trim(),
              temp: columns[3].textContent.trim()
            };
          }
          return null;
        }).filter(day => day !== null);

        setWeatherData({ temperature, location, feelLike, description, icon, days });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };
    console.log(weatherData)
    fetchWeatherData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!weatherData) {
    return <p>No weather data available</p>;
  }

  return (
    <div className="card card-body">
      <div className="row">
        <div className="col-6">
          <p title="Nhiệt độ hiện tại" className="temperature">
            {weatherData.temperature}
          </p>
          <p className="location">
            <a href="http://thoitiet.vn/an-giang/long-xuyen">
              {weatherData.location}
            </a>
          </p>
          <p className="feellike">
            {weatherData.feelLike}
          </p>
        </div>
        <div className="col-6">
          <div className="icon-container">
            <img src={weatherData.icon} alt={weatherData.description} title={weatherData.description} />
          </div>
          <p className="temp-description">
            {weatherData.description}
          </p>
        </div>
      </div>
      <table id="weather-days">
        {weatherData.days.map((day, index) => (
          <tr key={index}>
            <td>{day.day}</td>
            <td><img src={day.icon} alt={day.name} title={day.name} /></td>
            <td><div className="name">{day.name}</div></td>
            <td><div className="temp">{day.temp}</div></td>
          </tr>
        ))}
        <tr>
          <td colSpan="4" style={{ textAlign: 'right' }}>
            <img src="http://thoitiet.vn/img/logo-header.png" alt="thoitiet.vn" title="ThoiTiet.VN" className="logo" style={{ width: '100px' }} />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default WeatherWidget;
