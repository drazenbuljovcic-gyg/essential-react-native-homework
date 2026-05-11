import { Pressable, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { Lottery } from "../types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  lottery: Lottery;
  selected?: boolean;
  registered?: boolean;
  onSelect?: () => void;
}

export function LotteryCard({
  lottery,
  selected = false,
  registered = false,
  onSelect,
}: Props) {
  const isFinished = lottery.status === "finished";
  const isDisabled = isFinished || registered;

  const handlePress = () => {
    if (isDisabled || !onSelect) return;
    onSelect();
  };

  return (
    <Pressable onPress={handlePress}>
      <Card
        style={[
          styles.card,
          isDisabled && styles.cardDisabled,
          selected && styles.cardSelected,
        ]}
        mode="outlined"
      >
        <Card.Content>
          <View style={styles.header}>
            <Text
              variant="titleMedium"
              style={[styles.name, isDisabled && styles.textDisabled]}
            >
              {lottery.name}
            </Text>
            <View style={styles.icons}>
              {registered && (
                <MaterialCommunityIcons
                  name="check-circle"
                  size={20}
                  color="#4CAF50"
                  style={styles.registeredIcon}
                />
              )}
              {lottery.status === "running" && (
                <MaterialCommunityIcons name="sync" size={20} color="#666" />
              )}
              {lottery.status === "finished" && (
                <MaterialCommunityIcons name="check" size={20} color="#666" />
              )}
            </View>
          </View>
          <Text
            variant="bodySmall"
            style={[styles.prize, isDisabled && styles.textDisabled]}
          >
            {lottery.prize}
          </Text>
          <Text variant="labelSmall" style={styles.id}>
            {lottery.id}
          </Text>
        </Card.Content>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  cardDisabled: {
    backgroundColor: "#f5f5f5",
    opacity: 0.7,
  },
  cardSelected: {
    borderColor: "#2196F3",
    borderWidth: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  registeredIcon: {
    marginRight: 8,
  },
  name: {
    fontWeight: "600",
  },
  textDisabled: {
    color: "#999",
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
