import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131016",
    paddingHorizontal: 32,
    paddingVertical: 64,
    gap: 24,
  },
  input: {
    backgroundColor: "#1F1E25",
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 8,
    color: "white",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  eventDate: {
    fontSize: 12,
    color: "#6b6b6b",
  },
  buttonText: {
    color: "white",
    fontSize: 24,
  },
  button: {
    backgroundColor: "#2ac83c",
    padding: 12,
    borderRadius: 5,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "100%",
    flexDirection: "row",
    gap: 8,
  },
  participants: {
    flex: 1,
    gap: 8,
  },
  text: {
    color: "white",
    fontSize: 14,
  },
});
