import { useState } from "react";
import DocumentPicker from "react-native-document-picker";
import RNFS from "react-native-fs";
import Papa from "papaparse";
import { Alert } from "react-native";
import { PAData } from "@/shared/interfaces/pa-data";

export function useCsvImporter(onDataLoaded: (data: PAData[]) => void) {
  const [fileName, setFileName] = useState<string>(
    "Nenhum arquivo selecionado"
  );

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
        copyTo: "cachesDirectory",
      });

      setFileName(result.name || "Arquivo Selecionado");

      const fileCopyUri = result.fileCopyUri;
      if (!fileCopyUri) {
        Alert.alert("Erro", "Não foi possível acessar o arquivo.");
        return;
      }

      const fileUri = fileCopyUri.replace("file://", "");
      const csvContent = await RNFS.readFile(fileUri, "utf8");

      Papa.parse(csvContent, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedData = results.data;

          const validData = parsedData
            .map((item: any) => ({
              latitude: Number(item.latitude),
              longitude: Number(item.longitude),
              valor: Number(item.valor),
            }))
            .filter(
              (item) =>
                item.latitude &&
                item.longitude &&
                !isNaN(item.latitude) &&
                !isNaN(item.longitude)
            );

          if (validData.length > 0) {
            onDataLoaded(validData);
            Alert.alert(
              "Sucesso",
              `Dados de ${validData.length} pontos carregados.`
            );
          } else {
            Alert.alert(
              "Erro de Parsing",
              "O arquivo não contém dados válidos de latitude, longitude e valor."
            );
            onDataLoaded([]);
          }
        },
        error: (error: Error) => {
          Alert.alert("Erro", `Falha ao processar o CSV: ${error.message}`);
          onDataLoaded([]);
        },
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("Seleção cancelada");
      } else {
        console.error(err);
        Alert.alert("Erro", "Não foi possível carregar o arquivo.");
      }
    }
  };

  return {
    fileName,
    handleFilePick,
  };
}
