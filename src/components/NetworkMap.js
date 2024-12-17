import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import * as d3 from "d3";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

const NetworkMap = ({ geoData }) => {
  const bounds = L.latLngBounds(
    [37.490, 127.020], // 남서 (South-West) 좌표 
    [37.528, 127.078]  // 북동 (North-East) 좌표
  );

  console.log(geoData);

    // Feature마다 Tooltip 추가
  const onEachFeature = (feature, layer) => {

    // 클릭 이벤트
    layer.on("click", (e) => {
      console.log("Feature clicked:", feature);
    });
    // 툴팁 추가
    layer.on("mouseover", () => {
      layer.bindTooltip(
        `Edge ID: ${feature.properties.edge_id}<br>Lane ID: ${feature.properties.lane_id}`,
        { sticky: true }
      ).openTooltip();
    });

    layer.on("mouseout", () => {
      layer.closeTooltip();
    });
  };

  // 스타일 함수: trafficVolume에 따라 색상 결정
  const styleFunction = (feature) => {
    const volume = feature.properties.trafficVolume;
    // 여기서 volume 값의 범위를 고려해서 색상 스케일 설정
    // 예: 0~1000 사이의 값이라 가정
    const colorScale = d3.scaleLinear()
      .domain([0, 1000])
      .range(["green", "red"]);

    return {
      color: "black",
      weight: 2,
      fillOpacity: 0,      // 채우기 없음
    };
  };

  return (
    <MapContainer 
      bounds={bounds} // 지정한 범위 사용
      style={{ width: "500px", height: "400px" }}
      boundsOptions={{ padding: [25, 25] }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoData && (
        <GeoJSON data={geoData} onEachFeature={onEachFeature}  style={styleFunction} />
      )}
    </MapContainer>
  );
};

export default NetworkMap;
// import React, { useEffect, useRef, useState } from "react";
// import * as d3 from "d3";
// import axios from "axios";

// const NetworkMap = () => {
//   const svgRef = useRef();
//   const [networkData, setNetworkData] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:5000/api/gangnam/network")
//       .then((response) => {
//         setNetworkData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching network data:", error);
//       });
//   }, []);

//   useEffect(() => {
//     if (networkData && svgRef.current) {
//       const svg = d3.select(svgRef.current);
//       svg.selectAll("*").remove();

//       const width = 800;
//       const height = 600;

//       // 모든 coords 추출
//       const allCoords = networkData.edges.flatMap((edge) =>
//         edge.lanes.flatMap((lane) => lane.coords)
//       );
//       const allX = allCoords.map((d) => d[0]);
//       const allY = allCoords.map((d) => d[1]);

//       const xMin = d3.min(allX);
//       const xMax = d3.max(allX);
//       const yMin = d3.min(allY);
//       const yMax = d3.max(allY);

//       // 스케일 설정
//       const xScale = d3.scaleLinear().domain([xMin, xMax]).range([50, width - 50]);
//       const yScale = d3.scaleLinear().domain([yMin, yMax]).range([height - 50, 50]);

//       // 통행량 범위 추출 (edge별 trafficVolume이 있다고 가정)
//       // const trafficVolumes = networkData.edges.map(e => e.trafficVolume);
//       // const minTrafficVolume = d3.min(trafficVolumes);
//       // const maxTrafficVolume = d3.max(trafficVolumes);

//       // 색상 스케일: 통행량 적으면 녹색, 많으면 빨강
//       // const colorScale = d3.scaleLinear()
//       //   .domain([minTrafficVolume, maxTrafficVolume])
//       //   .range(["green", "red"]);

//       const lineGenerator = d3.line()
//         .x((d) => xScale(d[0]))
//         .y((d) => yScale(d[1]))
//         .curve(d3.curveBasis);

//       networkData.edges.forEach((edge) => {
//         edge.lanes.forEach((lane) => {
//           svg
//             .append("path")
//             .attr("d", lineGenerator(lane.coords))
//             .attr("stroke", "black") // edge 통행량 기반 색상
//             .attr("stroke-width", 2)
//             .attr("fill", "none");
//         });
//       });
//     }
//   }, [networkData]);

//   return <svg ref={svgRef} width={800} height={600} style={{ background: '#eee' }}></svg>;
// };

// export default NetworkMap;