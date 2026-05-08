import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { FAB } from "react-native-paper";

export function HomeScreen() {
  const navigation = useNavigation();
  navigation.getState;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lotteries 🎲</Text>
      <FAB
        icon="plus"
        style={styles.fab}
        // fix for typing issue: Argument of type '[string]' is not assignable to parameter of type 'never'.
        onPress={() => navigation.navigate("AddLottery" as never)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  heading: {
    fontSize: 36,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 30,
    bottom: 50,
  },
});
