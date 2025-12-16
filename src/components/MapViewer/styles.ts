import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  legendContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  legendTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  colorBox: {
    width: 15,
    height: 15,
    marginRight: 5,
    borderRadius: 2,
  },
});
