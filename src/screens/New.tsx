import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { useState } from "react";
import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors";


const avaliableWeeksDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sabado'
]

export function New() {

    const [weeksDays, setWeekDays] = useState<number[]>([])

    function handleToggleWeekDays(weekDasyIndex: number) {
        if (weeksDays.includes(weekDasyIndex)) {
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDasyIndex))
        } else {
            setWeekDays(prevState => [...prevState, weekDasyIndex])
        }
    }
    return (
        <View className="flex-1 bg-background px-8 pt-16 ">
            <ScrollView showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}
            >


                <BackButton />

                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar Habito
                </Text>

                <Text className="mt-6 text-white font-extrabold text-base">
                    Qual seu comprimetimento?
                </Text>

                <TextInput
                placeholder="Exercicios, dormir bem, etc..."
                placeholderTextColor={colors.zinc[400]}
                    className="h-12 pl-4 mt-3 rounded-lg bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
                />

                <Text className="font-semibold mt-4 mb-3 text-white text-base">
                    Qual a recorrencia?
                </Text>

                {avaliableWeeksDays.map((day, index) =>

                    <Checkbox
                        key={index}
                        title={day}
                        checked={weeksDays.includes(index)}
                        onPress={() => handleToggleWeekDays(index)}
                    />
                )}

                <TouchableOpacity
                    activeOpacity={0.7}
                    className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
                >
                    <Feather
                        name="check"
                        size={20}
                        color={colors.white}
                    />

                    <Text className="font-semibold test-base text-white ml-2">Confirmar</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}