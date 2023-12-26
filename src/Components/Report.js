import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

import RadioForm from "react-native-simple-radio-button";
import TouchableOpacity from "../Components/TouchableOpacity";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";

const ReportMini = ({ onSubmit }) => {
  const [selectedReason, setSelectedReason] = useState("others");

  var radio_props = [
    { label: "Voilent content", value: "Voilent content" },
    { label: "Hateful Content", value: "Hateful Content" },
    { label: "Harmful acts", value: "Harmful acts" },
    { label: "Child abuse", value: "Child abuse" },
    { label: "Sexual content", value: "Sexual content" },
    { label: "Promotes terrorism", value: "Promotes terrorism" },
    { label: "Spam", value: "Spam" },
    { label: "Incorrect or misleading", value: "Incorrect or misleading" },
    { label: "Violates my right", value: "Violates my right" },
    { label: "other issues", value: "other issues" },
  ];

  return (
    <KeyboardAwareScrollView style={{ marginBottom: 10 }}>
      <View style={styles.componentView}>
        <View style={{ flexDirection: "row", bottom: 15 }}>
          {/* <Text style={{ fontSize: 25, fontWeight: "bold" }}>Report</Text> */}
        </View>
        {radio_props.map((option) => (
          <TouchableOpacity
            noBg
            style={{
              alignItems: "flex-start",
              justifyContent: "center",
              height: 40,
            }}
            onPress={() => setSelectedReason(option.label)}
          >
            <Text
              style={{
                color: selectedReason === option.label ? "#5E72E4" : "white",
                fontWeight: selectedReason === option.label ? "bold" : "normal",
                fontSize: selectedReason === option.label ? 16 : 12,
              }}
            >
              {option.label}
            </Text>
            {/* <View
              style={{
                height: 0.33,
                marginTop: 5,
                width: "100%",
                backgroundColor: "grey",
              }}
            ></View> */}
          </TouchableOpacity>
        ))}
        {/* <RadioForm
        
          radio_props={radio_props}
          initial={0}
          onPress={(label) => {
            setSelectedReason(label);
          }}
        /> */}
        {selectedReason === "other issues" ? (
          <TextInput
            style={{
              width: "100%",
              padding: 15,
              height: 70,
              backgroundColor: "#EFF3F6",
              borderRadius: 12,
            }}
            placeholderTextColor={"grey"}
            numberOfLines={3}
            placeholder='Enter reason'
          ></TextInput>
        ) : (
          <></>
        )}
        <View style={{ alignSelf: "center", marginVertical: "3%" }}>
          <TouchableOpacity
            style={{ height: 45, width: 250 }}
            onPress={() => {
              onSubmit(selectedReason);
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
              {" "}
              Submit{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
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
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 15,
    marginVertical: 15,
  },
  searchView: {
    height: 60,
    width: "95%",
    backgroundColor: "white",
    marginVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
export default ReportMini;
