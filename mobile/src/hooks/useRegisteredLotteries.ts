import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "registered_lotteries";

export default function useRegisteredLotteries() {
  const [registeredIds, setRegisteredIds] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(true);

  const loadRegisteredLotteries = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRegisteredIds(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load registered lotteries:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const addRegisteredLotteries = useCallback(
    async (lotteryIds: Array<string>) => {
      try {
        const newIds = [...new Set([...registeredIds, ...lotteryIds])];
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
        setRegisteredIds(newIds);
      } catch (e) {
        console.error("Failed to save registered lotteries:", e);
        throw e;
      }
    },
    [registeredIds],
  );

  const isRegistered = useCallback(
    (lotteryId: string) => registeredIds.includes(lotteryId),
    [registeredIds],
  );

  useEffect(() => {
    loadRegisteredLotteries();
  }, [loadRegisteredLotteries]);

  return {
    registeredIds,
    loading,
    addRegisteredLotteries,
    isRegistered,
    refresh: loadRegisteredLotteries,
  };
}
