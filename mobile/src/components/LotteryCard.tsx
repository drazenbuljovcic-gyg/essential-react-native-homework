import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { Lottery } from "../types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  lottery: Lottery;
}

export function LotteryCard({ lottery }: Props) {
  const isFinished = lottery.status === "finished";

  return (
    <Card
      style={[styles.card, isFinished && styles.cardDisabled]}
      mode="outlined"
    >
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.name}>
            {lottery.name}
          </Text>
          {lottery.status === "running" && (
            <MaterialCommunityIcons name="sync" size={20} color="#666" />
          )}
          {lottery.status === "finished" && (
            <MaterialCommunityIcons name="check" size={20} color="#666" />
          )}
        </View>
        <Text variant="bodySmall" style={styles.prize}>
          {lottery.prize}
        </Text>
        <Text variant="labelSmall" style={styles.id}>
          {lottery.id}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  cardDisabled: {
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontWeight: "600",
  },
  prize: {
    marginTop: 4,
    color: "#666",
  },
  id: {
    marginTop: 4,
    color: "#999",
  },
});
