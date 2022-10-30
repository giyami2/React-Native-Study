import { useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export const CharacterView = (props) => {
  const { characterInfo } = props;

  //   useEffect(() => {
  //     console.log("CharacterInfo : ", characterInfo);
  //   }, [characterInfo]);

  return characterInfo === null ? null : (
    <View>
      <View
        style={{
          backgroundColor: "#16191d",
          //   borderLeftColor: "white",
          //   borderRightColor: "white",
          //   borderBottomColor: "white",
          //   borderWidth: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            height: 100,
            padding: 20,
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Image
              style={styles.jobImg}
              source={{
                uri: characterInfo.jobImg,
              }}
            />
            <Text
              style={{
                color: "white",
                fontSize: 12,
                textAlign: "center",
              }}
            >
              {characterInfo.job}
            </Text>
          </View>

          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 20,
            }}
          >
            {characterInfo.characterName}
            {characterInfo.server}
          </Text>
        </View>
        <Image
          style={styles.characterImg}
          source={{
            uri: characterInfo.characterImg,
          }}
        />
      </View>
      <Engravings engravings={characterInfo.engravings} />
      <Jems jems={characterInfo.jems} />
    </View>
  );
};

const Engravings = (props) => {
  const { engravings } = props;
  return (
    <View style={styles.engraveView}>
      <Text style={styles.engravesTitle}>각인</Text>
      {engravings.map((engraves, key) => {
        return (
          <Text style={styles.engravesContent} key={key}>
            {engraves}
          </Text>
        );
      })}
    </View>
  );
};

const Jems = (props) => {
  const { jems } = props;

  return (
    <View style={styles.jemsView}>
      <Text style={styles.engravesTitle}>보석</Text>
      {/* 보석 이미지 리스트 */}
      <View style={styles.jemsImgView}>
        {jems.map((jem) => {
          return (
            <View>
            <Image
              style={styles.jemsImg}
              source={{
                uri: jem.img,
              }}
            />
            <Text style={styles.jemsLevel}>{jem.level}</Text>
            </View>
          );
        })}
      </View>
      {/* 보석 - 스킬 효과 */}
      {jems.map((jem) => {
        return (
          <View style={styles.jemsSkillView}>
            <Image
              style={styles.jemsSkillImg}
              source={{
                uri: jem.skillImg,
              }}
            />
            <Text style={styles.jemsSkillTitle}>
                {jem.skillName} - 
            </Text>
            <Text style={styles.jemsSkillContent}>
                {jem.jemEffect}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  jobImg: {
    width: 50,
    height: 50,
  },
  characterImg: {
    // width: "100%",
    minHeight: 712,
    margin: 20,
  },
  engraveView: {
    // borderColor: "white",
    // borderWidth: 5,
    padding: 10,
  },
  engravesTitle: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  engravesContent: {
    color: "white",
    fontSize: 15,
  },
  jemsView: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
  },
  jemsImgView: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "center",
  },
  jemsLevel: {
    position: "absolute", 
    width: 12,
    height: 12,
    bottom: 0, 
    right:0, 
    backgroundColor: "beige",
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
    color: "#331900"
  },
  jemsSkillTitle: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    paddingTop: 2
  },
  jemsSkillContent: {
    color: "white",
    paddingTop: 3,
    paddingLeft: 2,
    fontSize: 11,
  },
  jemsSkillView: {
    flex: 0.7,
    flexDirection: "row",
    marginTop: 7,
    marginLeft: 10,
  },
  jemsImg: {
    width: 32,
    height: 32,
    borderColor: "white",
    borderWidth: 1,
  },
  jemsSkillImg: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});
