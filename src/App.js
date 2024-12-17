import React, {  useEffect,useState } from "react";
import "./style.css";
import axios from "axios";
import SpeedChart from "./components/SpeedChart";
import TrafficChart from "./components/TrafficChart";
import NetworkMap from "./components/NetworkMap";
import NetworkTollMap from "./components/NetworkTollMap";
import ColorLegend from "./components/ColorLegend";




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

  // 2. 요금 없음 데이터를 가져와 기존 GeoJSON에 병합
  useEffect(() => {
    if (geoData) {
      axios
        .get("http://127.0.0.1:5000/api/gangnam/map?roadName=요금없음")
        .then((response) => {
          const trafficData = response.data.edges || response.data; // 응답 형태 확인

          const updatedFeatures = geoData.features.map((feature) => {
            const matchingData = trafficData.find(
              (item) => String(item.id) === String(feature.properties.edge_id)
            );

            return {
              ...feature,
              properties: {
                ...feature.properties,
                speed: matchingData ? matchingData.speed : null,
                volume: matchingData ? matchingData.traffic_volume : null,
              },
            };
          });

          setNoTollData({
            ...geoData,
            features: updatedFeatures,
          });
        })
        .catch((error) => console.error("Error fetching no-toll data:", error));
    }
  }, [geoData]);

  return (
    <div className="app-container">
      <div className="left-grid">
        <TrafficChart data={null} />
        <SpeedChart data={null} />
      </div>
      <div className="toll-map-area">
        
          <h3>07:00 ~ 21:00 통행료 부여</h3>
          <ColorLegend />
        
        <NetworkTollMap noTollData={noTollData} />
      </div>
      <div className="no-toll-map-area">
        <div>
          <h3>07:00 ~ 21:00 통행료 X</h3>
        </div>
        <NetworkMap geoData={noTollData} />
      </div>
    </div>
  );
};

export default App;