"use client";

import { useEffect } from "react";

export default function MapPage() {
  useEffect(() => {
    if (document.getElementById("naver-map-script")) return;

    const script = document.createElement("script");
    script.id = "naver-map-script";
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=6xm0j64u4c`;
    script.async = true;

    script.onload = () => {
  const naver = (window as any).naver;
  if (!naver?.maps) return;

  const defaultLocation = new naver.maps.LatLng(37.5665, 126.978);

  const map = new naver.maps.Map("map", {
    center: defaultLocation,
    zoom: 14, // ✅ 3km 정도 보이게
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const myLocation = new naver.maps.LatLng(lat, lng);

        map.setCenter(myLocation);
        map.setZoom(14); // ✅ 핵심

        new naver.maps.Marker({
          position: myLocation,
          map,
          title: "내 현재 위치",
        });
      },
      () => {
        alert("위치 정보를 가져올 수 없습니다.");
      }
    );
  }
};


    document.head.appendChild(script);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "10px" }}>내 주변 3km 지도</h2>
      <div
        id="map"
        style={{ width: "100%", height: "500px", borderRadius: "10px" }}
      />
    </div>
  );
}
