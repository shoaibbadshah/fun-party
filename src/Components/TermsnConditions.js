import React from "react";
import {
  Text,
  View,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { TermsandConditions } from "../Utils/PolicyStrings";
import { convertMentionsToPlainText } from "../Utils/helpers";

const TermsnConditions = ({ route }) => {
  const textData = route?.params?.textData.data;
  const Title = route?.params?.textData.title;
  // const textData = TermsandConditions;
  // const singleWord = textData.split(" ");
  const words = textData.split(" ");
  const emailRegex = /([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,})/g;
  // const emailRegex = /([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,})/g;

  const Regex = /[\n\r\s]/g;

  // Split the text into parts using the emailRegex
  const parts = textData.split(emailRegex);
  // const words = singleWord;
  const highlightedText = parts.map((part, index) =>
    // emailRegex.test(part) ? (
    //   <Text
    //     onPress={() => {
    //       if (part.split("\n")[0].endsWith(".")) {
    //         Linking.openURL(`mailto:${part.split("\n")[0].slice(0, -1)}`);
    //       } else {
    //         Linking.openURL(`mailto:${part.split("\n")[0]}`);
    //       }
    //     }}
    //     key={index}
    //     style={{ color: "blue" }}
    //   >
    //     {part}{" "}
    //   </Text>
    // ) : (
    //   <Text key={index}>{part} </Text>
    // ),
    index % 2 === 0 ? (
      <Text key={index}>{part}</Text>
    ) : (
      <Text
        onPress={() => {
          // Alert.alert(part);

          Linking.openURL(`mailto:${part}`);
          // if (part.split("\n")[0].endsWith(".")) {
          //   Linking.openURL(`mailto:${part.split("\n")[0].slice(0, -1)}`);
          // } else {
          //   Linking.openURL(`mailto:${part.split("\n")[0]}`);
          // }
        }}
        key={index}
        style={{ color: "blue", fontWeight: "bold" }}
      >
        {part}
      </Text>
    ),
  );

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView
        style={styles.componentView}
        showsVerticalScrollIndicator={false}
      >
        <>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                color: "white",
                marginBottom: 15,
              }}
            >
              {Title}
            </Text>
          </View>

          <View
            style={{
              // textAlign: 'justify',
              // color: 'white',
              flexDirection: "column",
              marginBottom: Platform.OS === "android" ? "-75%" : 35,
            }}
          >
            <Text
              style={{
                textAlign: "justify",
                color: "white",
              }}
            >
              {highlightedText}
              {/* {words.map((word, index) => {
                if (word.includes("@shareslate.fun")) {
                  return (
                    <Text
                      onPress={() => {
                        console.log("Press");
                      }}
                      key={index}
                      style={{ textAlign: "justify", color: "red" }}
                    >
                      {word}
                    </Text>
                  );
                }
                return (
                  <Text
                    key={index}
                    style={{ textAlign: "justify", color: "white" }}
                  >
                    {convertMentionsToPlainText(word)}{" "}
                  </Text>
                );
              })} */}
            </Text>
          </View>
        </>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  footerView: { position: "absolute", zIndex: 10, bottom: 20, left: 10 },
  itemContainer: {},
  itemImage: {
    width: 125,
    height: 180,
    marginBottom: 5,
    borderRadius: 3,
  },
  componentView: {
    marginHorizontal: 15,
  },
});
export default TermsnConditions;
