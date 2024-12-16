import React, {  useEffect,useState } from "react";
import NetworkMap from "./components/NetworkMap";
import RoadChart from "./components/RoadChart";
import axios from "axios";

const App = () => {
  const [chartData, setChartData] = useState([]);
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    // GeoJSON 데이터 로드 (SUMO 네트워크 변환 데이터)
    // http://127.0.0.1:5000/api/gangnam/geojson 형태로 GeoJSON을 제공한다고 가정
    axios.get("http://127.0.0.1:5000/api/gangnam/geojson")
      .then(response => {
        setGeoData(response.data);
      })
      .catch(error => console.error("Error fetching geojson:", error));
  }, []);


//   const fetchRoadData = (roadId) => {
//     // 클릭된 도로의 정보를 API를 통해 가져오기
//     axios.get(`http://127.0.0.1:5000/api/road/info?roadId=${roadId}`)
//       .then((response) => {
//         const { trafficVolume } = response.data; // API 응답 예시
//         setChartData(trafficVolume); // 그래프 데이터 업데이트
//       })
//       .catch((error) => console.error("Error fetching road info:", error));
//   };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ flex: 2 }}>
        <NetworkMap geoData={geoData}/>
      </div>
      <div style={{ flex: 1 }}>
        <RoadChart data={chartData} />
      </div>
    </div>
  );
};

export default App;