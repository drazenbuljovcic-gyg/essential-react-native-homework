import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FAB } from "react-native-paper";

import useLotteries from "../hooks/useLotteries";
import { LotteryList } from "../components/LotteryList";

export function HomeScreen() {
  const navigation = useNavigation();
  const { data: lotteries, loading, fetchLotteries } = useLotteries();

  // Re-fetch lotteries when screen comes into focus (after adding a new lottery)
  useFocusEffect(
    useCallback(() => {
      fetchLotteries();
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lotteries 🎲</Text>
      <LotteryList lotteries={lotteries} loading={loading} />
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
