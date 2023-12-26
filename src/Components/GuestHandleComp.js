import {
  Alert,
  StyleSheet,
  View,
  Pressable,
  Image,
  Modal,
  Dimensions,
  TouchableOpacity as ITouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
// import Text from '../../Components/Text';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Text from "./Text";

const GuestHandleComp = ({
  backToLogin,
  backToSignup,
  visible,
  guestHandle,
  setModalVisible,
  modalVisible,
}) => {
  const navigation = useNavigation();
  const theme = useSelector((e) => e.theme);
  const user = useSelector((e) => e.profile?.profile);
  //   const [modalVisible, setModalVisible] = useState(visible);
  const { guestUser } = useSelector((state) => state.guestUser?.guestUser);

  //   const guestHandle = () => {
  //     setModalVisible(!modalVisible);
  //   };
  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={modalVisible}
      onRequestClose={guestHandle}
    >
      <Pressable onPress={guestHandle} style={styles.container}>
        <Pressable style={[styles.modal, { backgroundColor: theme.primary }]}>
          {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '100%',
                alignItems: 'center',
              }}
            > */}
          {/*<Ionicons*/}
          {/*  name="close"*/}
          {/*  size={35}*/}
          {/*  color={theme.textgrey}*/}
          {/*  onPress={() => setModalVisible(false)}*/}
          {/*  style={{*/}
          {/*    left: -8,*/}
          {/*    // top: -12,*/}
          {/*    // width: '8%',*/}
          {/*    shadowOpacity: 0.25,*/}

          {/*    shadowOffset: { width: 0, height: 7 },*/}
          {/*    alignSelf: 'flex-start',*/}
          {/*    // backgroundColor: 'red',*/}
          {/*  }}*/}
          {/*/>*/}
          {/*<Text style={{ ...styles.title, marginTop: -32, left: 12 }}>*/}
          {/*  You are in guest mode*/}
          {/*</Text>*/}
          {/* </View> */}
          <Text style={styles.message}>Login required</Text>
          <View style={styles.buttonGroup}>
            <ITouchableOpacity style={styles.button} onPress={backToLogin}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Login
              </Text>
            </ITouchableOpacity>
            <View style={styles.buttonGroup1}>
              <ITouchableOpacity
                noBg
                stroke
                style={{
                  backgroundColor: "#0000000",
                  height: 37,
                  // borderRadius: 5,
                  padding: 5,
                  // width: '42%',
                  // borderColor: 'grey',
                  // borderWidth: 2,
                  // borderRadius: 8,
                }}
                onPress={backToSignup}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Signup
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
export default GuestHandleComp;
