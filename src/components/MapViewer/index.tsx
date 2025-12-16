import React, { useRef, useEffect } from "react";
import { View, Text } from "react-native";
import MapView, { Circle } from "react-native-maps";
import { styles } from "./styles";
import { PAData } from "@/shared/interfaces/pa-data";
import { useMapViewer } from "./useMapViewer";

interface Props {
  data: PAData[];
}

export function MapViewer({ data }: Props) {
  const { getColorFromValue, getRegionFromPoints } = useMapViewer();

  const mapRef = useRef<MapView>(null);

  const initialRegion = getRegionFromPoints(data);

  useEffect(() => {
    if (mapRef.current && data.length > 0) {
      mapRef.current.animateToRegion(initialRegion, 1000);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={false}
        showsCompass={false}
        toolbarEnabled={false}
        loadingEnabled={true}
      >
        {data.map((point, index) => (
          <Circle
            key={index}
            center={{ latitude: point.latitude, longitude: point.longitude }}
            radius={10}
            strokeWidth={1}
            strokeColor={getColorFromValue(point.valor)}
            fillColor={getColorFromValue(point.valor)}
          />
        ))}
      </MapView>

      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Produtividade (Exemplo)</Text>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.colorBox,
              { backgroundColor: "rgba(0, 128, 0, 0.7)" },
            ]}
          />
          <Text>Alta (Acima de 70)</Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.colorBox,
              { backgroundColor: "rgba(255, 165, 0, 0.7)" },
            ]}
          />
          <Text>Média (40 - 70)</Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.colorBox,
              { backgroundColor: "rgba(255, 0, 0, 0.7)" },
            ]}
          />
          <Text>Baixa (Abaixo de 40)</Text>
        </View>
      </View>
    </View>
  );
}
