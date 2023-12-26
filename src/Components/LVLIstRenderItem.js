/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity as ITouchableOpacity,
  Image,
  View,
} from "react-native";
import { countFormatter } from "../Utils/helpers";
import moment from "moment/moment";

export default function LVListRenderItem({ item, onPress }) {
  const theme = useSelector((s) => s.theme);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <ITouchableOpacity
      style={{
        marginLeft: 20,
        marginTop: 15,
        display: "flex",
        flexDirection: "row",
        width: "90%",
      }}
      onPress={() => {
        onPress(item);
      }}
    >
      <Image
        source={
          item?.thumbnail
            ? { uri: item?.thumbnail }
            : require("../Assets/story.png")
        }
        style={{
          width: "40%",
          height: 105,
          borderRadius: 9,
        }}
        resizeMode='cover'
      />
      <View style={{ width: "70%" }}>
        <Text style={{ marginRight: 30, margin: 5, color: theme.text1 }}>
          {item?.caption}
        </Text>
        <Text style={{ fontWeight: "bold", color: theme.text, marginLeft: 5 }}>
          {item?.created_by?.first_name + " " + item?.created_by?.last_name}
        </Text>
        <Text style={{ margin: 5, color: theme.text1 }}>
          {countFormatter(item?.views_count)} Views{" "}
          {moment(new Date(item?.createdAt)).fromNow()}Ago
        </Text>
      </View>
    </ITouchableOpacity>
  );
}
