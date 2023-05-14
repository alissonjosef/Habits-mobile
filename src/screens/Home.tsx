import { Text, View, ScrollView, Alert } from "react-native";

import { generateRangeDatesFromYearStart } from "../utils/generate-range-between-dates";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

import { Header } from "../components/Header";
import { Loanding } from "../components/Loanding";
import { HeabitDay, DAY_SIZE } from "../components/HabitDay";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { api } from "../lib/axios";
import { useCallback, useState } from "react";
import dayjs from "dayjs";
const datesFormYearStart = generateRangeDatesFromYearStart();

const minimumSummanyDatesSizes = 18 * 5;

const amountOfDaysFill = minimumSummanyDatesSizes - datesFormYearStart.length;

type SammaryProps = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>;

export function Home() {
  const [loanding, setLoanding] = useState(true);
  const [sammary, setSammary] = useState<SammaryProps | null>(null);

  const { navigate } = useNavigation();

  async function featDate() {
    try {
      setLoanding(true);
      const res = await api.get("/sammary");
      setSammary(res.data);
    } catch (error) {
      Alert.alert("OPS", "Não foi possivel carregar o sumario de habitos.");
      console.log(error);
    } finally {
      setLoanding(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      featDate();
    }, [])
  );

  if (loanding) {
    return <Loanding />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((day, i) => (
          <Text
            key={`${day}-${i}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{
              width: DAY_SIZE,
            }}
          >
            {day}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {sammary && (
          <View className="flex-row flex-wrap">
            {datesFormYearStart.map((date) => {
              const dayWithHabits = sammary.find((day) => {
                return dayjs(date).isSame(day.date, "day");
              });

              return (
                <HeabitDay
                  key={date.toDateString()}
                  date={date}
                  amountOfHabits={dayWithHabits?.amount}
                  amountCompleted={dayWithHabits?.completed}
                  onPress={() =>
                    navigate("habit", { date: date.toDateString() })
                  }
                />
              );
            })}

            {amountOfDaysFill > 0 &&
              Array.from({ length: amountOfDaysFill }).map((_, i) => (
                <View
                  key={i}
                  className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                  style={{
                    width: DAY_SIZE,
                    height: DAY_SIZE,
                  }}
                />
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
