import { Text, View, ScrollView } from "react-native";

import { generateRangeDatesFromYearStart } from "../utils/generate-range-between-dates"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

import { Header } from "../components/Header";
import { HeabitDay, DAY_SIZE } from "../components/HabitDay";
const datesFormYearStart = generateRangeDatesFromYearStart();

const minimumSummanyDatesSizes = 18 * 5

const amountOfDaysFill = minimumSummanyDatesSizes - datesFormYearStart.length

export function Home() {
    return (
        <View className='flex-1 bg-background px-8 pt-16'>
            <Header />

            <View className="flex-row mt-6 mb-2">
                {weekDays.map((day, i) => (
                    <Text key={`${day}-${i}`}
                        className="text-zinc-400 text-xl font-bold text-center mx-1"
                        style={{
                            width: DAY_SIZE
                        }}
                    >
                        {day}
                    </Text>
                ))}
            </View>

            <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100 }}
            >

                <View className="flex-row flex-wrap">
                    {datesFormYearStart.map(date => (
                        <HeabitDay
                            key={date.toDateString()}
                        />
                    ))}

                    {
                        amountOfDaysFill > 0 && Array.from({ length: amountOfDaysFill })
                            .map((_, i) => (
                                <View
                                    key={i}
                                    className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                                    style={{
                                        width: DAY_SIZE,
                                        height: DAY_SIZE
                                    }}
                                />
                            ))
                    }
                </View>
            </ScrollView>

        </View>
    )
}