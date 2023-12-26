import React from "react";
import { TextInput as ITextInput, View } from "react-native";
import { useSelector } from "react-redux";

const TextInput = (props) => {
  const theme = useSelector((e) => e.theme);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#181F34",
        borderRadius: 7,
        paddingHorizontal: 15,
        height: 50,
        marginVertical: 9,
        ...props.style,
      }}
    >
      {props.icon !== undefined && props.icon}
      <ITextInput
        autoCapitalize='none'
        placeholderTextColor='#B7B7B7'
        {...props}
        style={{
          height: 50,
          width: "90%",
          paddingHorizontal: 15,
          color: theme.text,
          ...props.style,
        }}
      />
    </View>
  );
};

export default TextInput;
