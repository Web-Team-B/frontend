import React, {  useEffect,useState } from "react";
import "./style.css";
import axios from "axios";
import SpeedChart from "./components/SpeedChart";
import TrafficChart from "./components/TrafficChart";
import NetworkMap from "./components/NetworkMap";


const App = () => {
  const [geoData, setGeoData] = useState(null); //기본 도로 시각화 데이터
  const [noTollData, setNoTollData] = useState(null); // 요금 없음 데이터를 포함한 지도 데이터

  useEffect(() => {

    axios.get("http://127.0.0.1:5000/api/gangnam/geojson")
      .then(response => {
        setGeoData(response.data);
      })
      .catch(error => console.error("Error fetching geojson:", error));
  }, []);


  return (
    <div className="app-container">
      <div className="left-grid">
        <TrafficChart data={null} />
        <SpeedChart data={null} />
      </div>
      <div className="toll-map-area">
        <NetworkMap geoData={geoData} />
      </div>
      <div className="no-toll-map-area">
        <h3>통행료 X</h3>
        <NetworkMap geoData={geoData} />
      </div>
    </div>
  );
};

export default App;