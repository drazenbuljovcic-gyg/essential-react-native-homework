import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text, TextInput } from "react-native-paper";
import { Lottery } from "../types";
import { LotteryCard } from "./LotteryCard";

interface Props {
  lotteries: Array<Lottery>;
  loading: boolean;
  selectedLotteries: Array<string>;
  registeredLotteries: Array<string>;
  onSelect: (lotteryId: string) => void;
}

export function LotteryList({
  lotteries,
  loading,
  selectedLotteries,
  registeredLotteries,
  onSelect,
}: Props) {
  const [filter, setFilter] = useState("");

  const filteredLotteries = lotteries.filter((lottery) =>
    lottery.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const hasLotteries = lotteries.length > 0;
  const hasNoSearchResults = hasLotteries && filteredLotteries.length === 0;

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        placeholder="Filter lotteries"
        value={filter}
        onChangeText={setFilter}
        style={styles.searchInput}
        right={<TextInput.Icon icon="magnify" />}
      />

      {loading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      )}

      {!loading && !hasLotteries && (
        <View style={styles.centered}>
          <Text variant="headlineSmall" style={styles.emptyText}>
            😔
          </Text>
          <Text variant="titleMedium" style={styles.emptyText}>
            There are no lotteries currently
          </Text>
        </View>
      )}

      {!loading && hasNoSearchResults && (
        <View style={styles.centered}>
          <Text variant="titleMedium" style={styles.emptyText}>
            No search results for '{filter}'
          </Text>
        </View>
      )}

      {!loading && filteredLotteries.length > 0 && (
        <FlatList
          data={filteredLotteries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LotteryCard
              lottery={item}
              selected={selectedLotteries.includes(item.id)}
              registered={registeredLotteries.includes(item.id)}
              onSelect={() => onSelect(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  searchInput: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 8,
  },
  listContent: {
    paddingBottom: 100,
  },
});
