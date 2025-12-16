import React from "react";
import { View, Button, Text } from "react-native";
import { useCsvImporter } from "./useCsvImporter";
import { styles } from "./styles";
import { PAData } from "@/shared/interfaces/pa-data";

interface Props {
  onDataLoaded: (data: PAData[]) => void;
}

export function CSVImporter({ onDataLoaded }: Props) {
  const { fileName, handleFilePick } = useCsvImporter(onDataLoaded);

  return (
    <View style={styles.container}>
      <Button title="Importar CSV de Dados de AP" onPress={handleFilePick} />
      <Text style={styles.fileName}>{fileName}</Text>
    </View>
  );
}
