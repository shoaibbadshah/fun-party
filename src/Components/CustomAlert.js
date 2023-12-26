import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const CustomAlert = ({
  modalVisible,
  setModalVisible,
  title,
  message,
  leftBtn,
  rightBtn,
  centerBtn,
  leftBtnText,
  rightBtnText,
  centerBtnText,
  totalbtn,
}) => {
  const theme = useSelector((e) => e.theme);
  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={modalVisible}
      // onRequestClose={() => setModalVisible(false)}
    >
      <Pressable
        // onPress={guestHandle}
        style={styles.container}
      >
        <Pressable style={[styles.modal, { backgroundColor: "#354265" }]}>
          <View style={{ padding: 20 }}>
            <Text style={styles.message}>{title}</Text>
            <Text
              style={{
                fontSize: 18,
                // marginBottom: 20,
                //   alignSelf: "center",
                textAlign: "center",
                color: "white",
                //   marginTop: 5,
                // fontWeight: "600",
              }}
            >
              {message}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",

              //   marginTop: 15,
              borderTopColor: "black",
              borderTopWidth: 1,
            }}
          />

          <View
            style={[
              styles.buttonGroup,
              {
                justifyContent: totalbtn > 1 ? "space-between" : "center",
              },
            ]}
          >
            <TouchableOpacity
              style={{
                height: 37,
                //   padding: 5,
                display: leftBtnText ? "flex" : "none",
              }}
            >
              <Text
                style={{
                  //   textAlign: "center",
                  fontSize: 22,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {leftBtnText}
              </Text>
            </TouchableOpacity>
            {/* <View style={[styles.buttonGroup1]}> */}
            <TouchableOpacity
              style={{
                //   backgroundColor: "white",
                height: 37,
                //   padding: 5,
                display: centerBtnText ? "flex" : "none",
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text
                style={{
                  // textAlign: "center",
                  fontSize: 22,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {centerBtnText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ display: rightBtnText ? "flex" : "none", height: 37 }}
              onPress={() => setModalVisible(false)}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 22,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {rightBtnText}
              </Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  salesPrice: {
    fontSize: 15,
    marginLeft: 0,
    color: "white",
    textAlign: "right",
  },
  supSalePrice: {
    fontSize: 10,
    color: "white",
    paddingTop: "-3%",
    paddingLeft: "0%",
  },
  cartStyle: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "#00ab15",
    borderRadius: 10,
    flexDirection: "row",
    padding: 1,
    zIndex: 9,
    paddingRight: 3,
    paddingLeft: 3,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modal: {
    width: "80%",
    backgroundColor: "#fff",
    // padding: 20,
    borderRadius: 10,
    // alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 10,
    width: "80%",
    // height: '35%',
    // textAlign: 'start',
    // textAlign
  },
  message: {
    fontSize: 20,
    marginBottom: 20,
    alignSelf: "center",
    // textAlign: 'center',
    color: "white",
    marginTop: 5,
    fontWeight: "800",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 15,
    // borderTopColor: "black",
    // borderTopWidth: 0.5,
  },
  buttonGroup1: {
    flexDirection: "row",
    // width: '100%',
    // alignSelf: "flex-end"
  },
  button: {
    // backgroundColor: '#5E72E4',
    padding: 5,
    height: 37,
    // borderRadius: 5,
    // width: '30%',
    alignSelf: "flex-start",
    // borderColor: '#5E72E4',
    // borderWidth: 2,
    // borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    width: "30%",
  },
});
