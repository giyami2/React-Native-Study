import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as cheerio from "cheerio";
import { CharacterView } from "./Components/CharacterInfoComponents";
import { getCharacterInfoFromHtml } from "./API/CharacterInfoApi";

// Default
export default function App() {
  const [characterInfo, setCharacterInfo] = useState(null);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} >
      <SearchView setCharacterInfo={setCharacterInfo} />
      <CharacterView characterInfo={characterInfo}/>
    </ScrollView>
  );
}

const SearchView = (props) => {
  const { setCharacterInfo } = props;
  const [text, setText] = useState("");
  const [searching, setSearching] = useState(false);

  function searchCharacter(characterName) {
    setSearching(true);
    // Alert.alert(characterName);
    getCharacterInfoFromHtml(characterName).then(res => {
      setCharacterInfo(res);
      setSearching(false);
    });
  }

  return (
    <View style={styles.searchViewContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="캐릭터명을 입력해주세요"
        placeholderTextColor={"#FFF"}
        selectionColor={"#FFF"}
        onChangeText={(newText) => setText(newText)}
        defaultValue={text}
      />
      <Button
        style={styles.textInputButton}
        color="beige"
        title="검색"
        onPress={() => searchCharacter(text)}
      />
      {searching ? <ActivityIndicator size="large" color="#00ff00" /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#404040",
    color: "white",
  },
  contentContainer: {
    paddingVertical: 100
  },
  searchViewContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "white",
    // borderWidth: 5,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
  },
  textInput: {
    textAlign: "center",
    color: "white",
    height: 30,
    width: 200,
    fontSize: 20
  },
});