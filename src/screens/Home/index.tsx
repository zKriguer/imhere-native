import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { Participant } from "../../components/Participant";
import React from "react";
import RenderIf from "../../components/RenderIf";
import uuid from "react-native-uuid";

export function Home() {
  const eventDate = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  type Participant = {
    name: string;
    id: string;
  };

  const [participants, setParticipants] = React.useState<Participant[]>([]);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [isLoading, setisLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("participants");
        return jsonValue != null ? JSON.parse(jsonValue) : [];
      } catch (e) {
        console.error(e);
        return [];
      }
    };

    getData().then((data) => setParticipants(data));
  }, [participants]);

  async function handleParticipantAdd(participantName: string) {
    if (
      participants.find((participant) => participant.name === participantName)
    ) {
      Alert.alert(
        "Participante já adicionado!",
        "Este participante já foi adicionado, tente adicionar outro nome."
      );
    } else {
      try {
        setisLoading(true);
        const updatedData = [
          ...participants,
          { name: participantName, id: String(uuid.v4()) },
        ];
        setParticipants(updatedData);
        const jsonValue = JSON.stringify(updatedData);
        await AsyncStorage.setItem("participants", jsonValue);
        setInputValue("");
        setisLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
  }

  async function handleParticipantRemove(participantId: string) {
    Alert.alert(
      "Você tem certeza?",
      "Deseja mesmo remover este participante?",
      [
        {
          text: "Sim",
          onPress: async () => {
            const updatedData = participants.filter((participant) => {
              return participant.id !== participantId;
            });

            try {
              setisLoading(true);
              setParticipants(updatedData);
              const jsonValue = JSON.stringify(updatedData);
              await AsyncStorage.setItem("participants", jsonValue);
              setisLoading(false);
            } catch (e) {
              console.error(e);
            }
          },
        },
        {
          text: "Não",
          style: "cancel",
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evento genérico e tal</Text>

      <Text style={styles.eventDate}>{eventDate}</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={inputValue}
          placeholder="Insira o nome do participante"
          placeholderTextColor={"#6b6b6b"}
          onChangeText={(text) => setInputValue(text)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={(e) => {
            if (inputValue.trim() != "")
              return handleParticipantAdd(inputValue);
            else {
              return Alert.alert(
                "Nome inválido!",
                "O nome do participante não pode ser vazio."
              );
            }
          }}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <SafeAreaView style={styles.participants}>
        <RenderIf condition={participants.length === 0 && !isLoading}>
          <Text style={styles.text}>
            Ainda não há participantes, gostaria de adicionar alguém?
          </Text>
        </RenderIf>
        <RenderIf condition={isLoading}>
          <Text style={styles.title}>Carregando... 😳</Text>
        </RenderIf>
        <RenderIf condition={!isLoading}>
          <FlatList
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
            data={participants}
            renderItem={({ item: participant }) => (
              <Participant
                name={participant.name}
                onRemove={() => handleParticipantRemove(participant.id)}
              />
            )}
          />
        </RenderIf>
      </SafeAreaView>

      <StatusBar style={"auto"} />
    </View>
  );
}
