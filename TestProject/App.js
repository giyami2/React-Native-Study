import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import * as cheerio from "cheerio";
import axios from "axios";

const TextView = (props) => {
  const { style } = props;

  // useEffect(() => {
  //   console.log("first");

  //   return () => {
  //     console.log("second");
  //   }
  // }, []);

  const [text, setText] = useState("");
  const [jobImg, setJobImg] = useState(null);
  const getCharacterInfoFromHtml = (characterName) => {
    let encodedCharacterName = encodeURI(characterName);
    let requestUrl = `https://lostark.game.onstove.com/Profile/Character/${encodedCharacterName}`;

    axios.get(requestUrl).then((responsHtml) => {
      const $ = cheerio.load(responsHtml.data);
      // character name
      const userName = $("span.profile-character-info__name").text();
      // character server
      const server = $("span.profile-character-info__server").text();

      const jobImg = $("img.profile-character-info__img").attr("src");
      const job = $("img.profile-character-info__img").attr("alt");

      setJobImg(jobImg);
      console.log(jobImg)
      
      console.log(
        `닉네임 :  <${userName}> 서버 : <${server}> 직업 : <${job}>`
      );
    });
    // console.log(`https://lostark.game.onstove.com/Profile/Character/${encodeURI("휴지깡")}`);
  };

  function searchCharacter(characterName) {
    Alert.alert(characterName);
    getCharacterInfoFromHtml(characterName);
  }

  return (
    <View style={style}>
      <TextInput
        style={styles.textInputStyle}
        placeholder="Type here your character name!"
        placeholderTextColor={"#FFF"}
        selectionColor={"#FFF"}
        onChangeText={(newText) => setText(newText)}
        defaultValue={text}
      />
      <Button title="Press me" onPress={() => searchCharacter(text)} />
      <Text>{jobImg}</Text>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: jobImg,
        }}
      />
    </View>
  );
};

export default function App() {
  let textMessage = "Open up App.js to start working on your app!";
  return <TextView style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#404040",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  textInputStyle: {
    color: 'white',
    height: 30, 
    width: 200
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
