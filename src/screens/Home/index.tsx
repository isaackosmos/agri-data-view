import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { CSVImporter } from "@/components/CsvImporter";
import { MapViewer } from "@/components/MapViewer";
import { useState } from "react";

export function HomeScreen() {
  const [data, setData] = useState<any[]>([]);

  return (
    <SafeAreaView style={styles.container}>
      <CSVImporter onDataLoaded={setData} />

      <MapViewer data={data} />
    </SafeAreaView>
  );
}
