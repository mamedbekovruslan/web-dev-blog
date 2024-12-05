import { useEffect, useState } from 'react';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState('');
  const [weather, setWeather] = useState('');

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&lang=ru&appid=a550a5754a89b4ca24619b8714c5e1d5`,
    )
      .then((res) => res.json())
      .then(({ name, main, weather }) => {
        setCity(name);
        setTemperature(Math.round(main.temp));
        setWeather(weather[0].description);
      });
  }, []);

  return (
    <div className={className}>
      <div>
        <div>Блог веб-разработчика</div>
        <div>mamedbekovruslan@yandex.ru</div>
      </div>
      <div>
        <div>
          {city}, {new Date().toLocaleString('ru', { day: 'numeric', month: 'long' })}
        </div>
        <div>
          {temperature} градусов, {weather}
        </div>
      </div>
    </div>
  );
};

export const Footer = styled(FooterContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1000px;
  height: 120px;
  padding: 20px 40px;
  font-weight: bold;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(0, 0, 0) 0 2px 17px;
`;
