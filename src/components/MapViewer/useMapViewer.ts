import { PAData } from "@/shared/interfaces/pa-data";
import { Region } from "react-native-maps";

export function useMapViewer() {
  const getColorFromValue = (value: number): string => {
    const MIN_VALUE = 30;
    const MAX_VALUE = 100;

    const normalizedValue = Math.max(
      0,
      Math.min(1, (value - MIN_VALUE) / (MAX_VALUE - MIN_VALUE))
    );

    if (normalizedValue >= 0.7) {
      return "rgba(0, 128, 0, 0.7)";
    } else if (normalizedValue >= 0.4) {
      return "rgba(255, 165, 0, 0.7)";
    } else {
      return "rgba(255, 0, 0, 0.7)";
    }
  };

  const getRegionFromPoints = (points: PAData[]): Region => {
    if (points.length === 0) {
      return {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    }

    const minLat = Math.min(...points.map((p) => p.latitude));
    const maxLat = Math.max(...points.map((p) => p.latitude));
    const minLon = Math.min(...points.map((p) => p.longitude));
    const maxLon = Math.max(...points.map((p) => p.longitude));

    const latitude = (minLat + maxLat) / 2;
    const longitude = (minLon + maxLon) / 2;
    const latitudeDelta = (maxLat - minLat) * 1.5;
    const longitudeDelta = (maxLon - minLon) * 1.5;

    return { latitude, longitude, latitudeDelta, longitudeDelta };
  };

  return {
    getColorFromValue,
    getRegionFromPoints,
  };
}
