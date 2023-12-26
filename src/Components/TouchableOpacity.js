import React from "react";
import { useSelector } from "react-redux";
import { TouchableOpacity as ITouchableOpacity } from "react-native";

const TouchableOpacity = (props) => {
  const theme = useSelector((e) => e.theme);
  return (
    <ITouchableOpacity
      disabled={props.disable}
      {...props}
      style={{
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 5 },
        // shadowOpacity: 0.2,
        //shadowRadius: 3,
        elevation: props.noBg ? 0 : 9,
        justifyContent: props.start ? "flex-end" : "center",
        alignItems: props.start ? "flex-start" : "center",
        padding: 12,
        borderRadius: 4,
        backgroundColor: props.noBg
          ? "transparent"
          : props.disable
          ? "grey"
          : theme.secondary,
        borderColor: props.stroke ? "#5E72E4" : "transparent",
        borderWidth: props.stroke ? 2 : 0,
        ...props.style,
      }}
    >
      {props.children}
    </ITouchableOpacity>
  );
};

export default TouchableOpacity;
