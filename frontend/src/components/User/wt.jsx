import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getWeather } from "../../redux/apiRequest";

const Card = styled.div`
  width: 100%;
  border: 1px solid #e0e0e0;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  padding: 20px;
  font-family: "Arial", sans-serif;
  color: #333333;

  @media (max-width: 768px) {
    margin: 10px;
    padding: 10px;
  }
`;

const CardHeader = styled.div`
  background: #10b982;
  padding: 10px 15px;
  color: #ffffff;
  border-radius: 8px;
  text-align: center;
  font-size: 1.25em;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1em;
    padding: 8px 12px;
  }
`;

const Current = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
  padding: 20px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px 0;
  }
`;

const Temperature = styled.div`
  flex: 1;
  font-size: 3em;
  color: #003870;
  font-weight: 900;

  @media (max-width: 768px) {
    font-size: 2em;
  }
`;

const Location = styled.div`
  flex: 1;
  font-size: 1.5em;
  color: #003870;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.25em;
  }
`;

const FeelLike = styled.div`
  flex: 1;
  font-size: 1em;
  color: #555555;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

const TempDescription = styled.div`
  flex: 1;
  font-size: 1.25em;
  color: #555555;
  text-align: center;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 1em;
    margin-top: 5px;
  }
`;

const IconContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const WeatherDays = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const WeatherDayRow = styled.tr`
  text-align: center;
  border-bottom: 1px solid #dddddd;
  color: #333333;
  padding: 10px 0;

  &:last-child {
    border-bottom: none;
  }

  img {
    width: 40px;

    @media (max-width: 768px) {
      width: 30px;
    }
  }

  @media (max-width: 768px) {
    padding: 5px 0;
  }
`;

const WeatherDayRow2 = styled.tr`
  text-align: center;
  border-bottom: 3px solid #dddddd;
  color: var(--primary-color);
  padding: 10px 0;

  &:last-child {
    border-bottom: none;
  }

  img {
    width: 40px;

    @media (max-width: 768px) {
      width: 30px;
    }
  }

  @media (max-width: 768px) {
    padding: 5px 0;
  }
`;

const Logo = styled.img`
  width: 80px;
  margin: 10px 0;

  @media (max-width: 768px) {
    width: 60px;
  }
`;

const App = () => {
  const [curWeather, setCurWeather] = useState(
    JSON?.parse(localStorage?.getItem("weather")) || JSON?.parse("{}")
  );
  const [curDate, setCurDate] = useState(new Date().toLocaleString());
  const Day = new Date().getDay();
  useEffect(() => {
    getWeather();
    setCurWeather(JSON?.parse(localStorage?.getItem("weather")));
    setCurDate(new Date().toLocaleString().split(" ")[1]);
  }, []);
  return (
    <Card>
      <CardHeader>Dự báo thời tiết</CardHeader>
      <Current>
        <div>
          {new Date().getDay() > 0
            ? "Thứ " + (new Date().getDay() + 1)
            : "Chủ nhật"}{" "}
          {curDate}
          <Temperature>{curWeather?.current?.temp_c || 30}°C</Temperature>
          <Location>
            <a
              href="https://thoitiet.vn/an-giang/"
              style={{ color: "#003870", textDecoration: "none" }}
            >
              An Giang
            </a>
          </Location>
          <FeelLike>
            Cảm giác như {curWeather?.current?.feelslike_c || 30}°C
          </FeelLike>
        </div>
        {/* <div>
          <WeatherDays>
            <tbody>
              <WeatherDayRow>
                <td>Tia UV {
                  curWeather?.current?.uv
                  }</td>
              </WeatherDayRow>
              <WeatherDayRow>
                <td>Ngày mai</td>
              </WeatherDayRow>
            </tbody>
          </WeatherDays>
        </div> */}

        <div>
          <IconContainer>
            <img
              src={
                curWeather?.current?.condition?.icon ||
                "https://cdn-icons-png.flaticon.com/512/757/757401.png"
              }
              alt="Nhiều mây"
              title="Nhiều mây"
            />
          </IconContainer>
          <TempDescription>
            {curWeather?.current?.condition?.text}
          </TempDescription>
        </div>
      </Current>
      <WeatherDays>
        <tbody>
          <WeatherDayRow2>
            <td>
              {curWeather.forecast.forecastday[0].day.mintemp_c} |{" "}
              {curWeather.forecast.forecastday[0].day.maxtemp_c}°C
            </td>
            <td>Độ ẩm: {curWeather?.current?.humidity}%</td>
            <td>
              Chỉ số UV:{" "}
              {curWeather?.current?.uv < 2 ? 0 : curWeather?.current?.uv}
            </td>
            <td>Cập nhật: {curWeather?.current?.last_updated.split(" ")[1]}</td>
          </WeatherDayRow2>
          {curWeather.forecast.forecastday
            .filter((dayData, index) => index > 0)
            .map((dayData, index) => (
              <WeatherDayRow key={index}>
                <td>
                  {
                    [
                      "Chủ nhật",
                      "Thứ hai",
                      "Thứ ba",
                      "Thứ tư",
                      "Thứ năm",
                      "Thứ sáu",
                      "Thứ bảy",
                    ][(Day + index + 1) % 7]
                  }{" "}
                  {dayData.date.split("-")[2] +
                    "/" +
                    dayData.date.split("-")[1]}
                </td>
                <td>
                  <img
                    src={dayData.day.condition.icon}
                    alt={dayData.day.condition.text}
                    title={dayData.day.condition.text}
                  />
                </td>
                <td>{dayData.day.condition.text}</td>
                <td>
                  {dayData.day.mintemp_c} | {dayData.day.maxtemp_c}°C
                </td>
                <td></td>
              </WeatherDayRow>
            ))}
          {/* <WeatherDayRow>
            <td colSpan="4" style={{ textAlign: "right" }}>
              <Logo
                src="https://thoitiet.vn/img/logo-header.png"
                alt="thoitiet.vn"
                title="ThoiTiet.VN"
              />
            </td>
          </WeatherDayRow> */}
        </tbody>
      </WeatherDays>
    </Card>
  );
};

export default App;
