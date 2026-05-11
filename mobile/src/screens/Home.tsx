import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FAB } from "react-native-paper";

import useLotteries from "../hooks/useLotteries";
import useRegisteredLotteries from "../hooks/useRegisteredLotteries";
import { LotteryList } from "../components/LotteryList";
import { RegisterModal } from "../components/RegisterModal";

export function HomeScreen() {
  const navigation = useNavigation();
  const { data: lotteries, loading, fetchLotteries } = useLotteries();
  const { registeredIds, addRegisteredLotteries } = useRegisteredLotteries();

  const [selectedLotteries, setSelectedLotteries] = useState<Array<string>>([]);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  // Re-fetch lotteries when screen comes into focus (after adding a new lottery)
  useFocusEffect(
    useCallback(() => {
      fetchLotteries();
    }, []),
  );

  const handleSelect = (lotteryId: string) => {
    setSelectedLotteries((prev) =>
      prev.includes(lotteryId)
        ? prev.filter((id) => id !== lotteryId)
        : [...prev, lotteryId],
    );
  };

  const handleRegisterSubmit = async (lotteryIds: Array<string>) => {
    await addRegisteredLotteries(lotteryIds);
    setSelectedLotteries([]);
  };

  const hasSelectedLotteries = selectedLotteries.length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lotteries 🎲</Text>
      <LotteryList
        lotteries={lotteries}
        loading={loading}
        selectedLotteries={selectedLotteries}
        registeredLotteries={registeredIds}
        onSelect={handleSelect}
      />
      <View style={styles.fabContainer}>
        <FAB
          icon="account-plus"
          style={[styles.fab, !hasSelectedLotteries && styles.fabDisabled]}
          onPress={() => setRegisterModalVisible(true)}
          disabled={!hasSelectedLotteries}
        />
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => navigation.navigate("AddLottery" as never)}
        />
      </View>
      <RegisterModal
        visible={registerModalVisible}
        onClose={() => setRegisterModalVisible(false)}
        onSubmit={handleRegisterSubmit}
        selectedLotteries={selectedLotteries}
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
  fabContainer: {
    position: "absolute",
    right: 30,
    bottom: 50,
    flexDirection: "row",
    gap: 12,
  },
  fab: {
    margin: 0,
  },
  fabDisabled: {
    backgroundColor: "#ccc",
  },
});
