import {
  StyleSheet,
  View,
  Pressable,
  Modal,
  TouchableOpacity as ITouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Text from "./Text";
import { navigate } from "../Utils/Navigation/navigationRef";
import { NAVIGATION_ROUTES } from "../Utils/Navigation/NavigationRoutes";

const ModalForContact = ({ allowHandler, setModalVisible, modalVisible }) => {
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
        <Pressable style={[styles.modal, { backgroundColor: theme.primary }]}>
          <Text style={styles.message}>
            Share Slate Fun would like to access your device’s Phonebook.{" "}
            {/* <ITouchableOpacity
              onPress={() => {
                navigate(NAVIGATION_ROUTES.TERMS_CONDITION, {
                  typ: "terms",
                });
              }}
            > */}
            <Text
              onPress={() => {
                setModalVisible(false);
                navigate(NAVIGATION_ROUTES.TERMS_CONDITION, {
                  typ: "terms",
                });
              }}
              style={{ color: "#5E72E4" }}
            >
              Learn more
            </Text>
            {/* </ITouchableOpacity> */}
            <Text>.</Text>
          </Text>
          <View style={styles.buttonGroup}>
            <ITouchableOpacity style={styles.button} onPress={allowHandler}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Allow
              </Text>
            </ITouchableOpacity>
            <View style={styles.buttonGroup1}>
              <ITouchableOpacity
                noBg
                stroke
                style={{
                  backgroundColor: "#0000000",
                  height: 37,
                  padding: 5,
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Don't Allow
                </Text>
              </ITouchableOpacity>
              <ITouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(false)}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Cancel
                </Text>
              </ITouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
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
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
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
    fontSize: 16,
    marginBottom: 20,
    alignSelf: "flex-start",
    // textAlign: 'center',
    marginTop: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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
export default ModalForContact;
