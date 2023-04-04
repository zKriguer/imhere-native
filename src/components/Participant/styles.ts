import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1F1E25",
    width: "100%",
    borderRadius: 5,
    flexDirection: "row",
  },
  name: {
    flex: 1,
    fontSize: 16,
    padding: 16,
    color: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 24,
  },
  button: {
    backgroundColor: "#e23c44",
    padding: 12,
    borderRadius: 5,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
});
