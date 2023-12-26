import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  Platform,
  FlatList,
  TextInput,
  Pressable,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import moment from "moment/moment";
import Ionicons from "react-native-vector-icons/Ionicons";

import CommentUp from "../Utils/Assets/Icons/CommentUp";
import { NAVIGATION_ROUTES } from "../Utils/Navigation/NavigationRoutes";
import { isEmpty } from "lodash";
import { store } from "../Store/store";
import { useSelector } from "react-redux";
import { checkImageUrl } from "../Utils/helpers";
import { SendNewSvg } from "../Assets/Svgs";

const CommentWrapper = ({
  itemId,
  CommentArray,
  handleSubmitComment,
  commentText,
  setCommentText,
  handleReplyComment,
  handleReplySubmit,
  replyComment,
  navigation,
  refRBSheetComponent,
  setReplyComment,
  sheetModal,
  deleteComment,
  editCommet,
  editCommentText,
  setEditCommentText,
}) => {
  const [name, setName] = useState({ first_name: "", last_name: "" });
  const user = store.getState().user;
  const theme = useSelector((state) => state.theme);

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardOpen(false);
      },
    );

    // cleanup listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const RenderItem = ({ item, refRBSheetComponent, index }) => {
    return (
      <View key={index}>
        <View
          style={{
            backgroundColor: "transparent",
            justifyContent: "flex-start",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <View
            style={{
              backgroundColor: "transparent",
              padding: 5,
              justifyContent: "flex-start",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 100,
                backgroundColor: "grey",
                justifyContent: "center",
                marginTop: 5,
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  resizeMode: "cover",
                }}
                source={{
                  uri: checkImageUrl(
                    item?.created_by?.profile_image,
                    `https://ui-avatars.com/api/?background=random&name=${item?.created_by?.first_name}+${item?.created_by?.last_name}`,
                  ),
                }}
              />
            </View>
            <View style={{ width: "80%" }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(NAVIGATION_ROUTES.PROFILE_OTHER, {
                    item: {
                      item: item?.created_by,
                      screenName: "OtherProfile",
                    },
                  }),
                    refRBSheetComponent.current.close();
                }}
              >
                <View
                  style={{
                    marginLeft: 12,
                    marginBottom: 2,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: theme.text,
                    }}
                  >
                    {item?.created_by?.first_name} {item?.created_by?.last_name}
                  </Text>
                </View>
              </TouchableOpacity>

              <Pressable
                onLongPress={() => {
                  if (item?.created_by?._id == user.data?.checkUser?._id) {
                    sheetModal({ comment_id: item._id });
                    setEditCommentText(item?.comment);
                  }
                }}
                style={{
                  backgroundColor: theme.button,
                  marginLeft: 10,
                  marginRight: 40,
                  padding: 5,
                  paddingBottom: 10,
                  width: "100%",
                  paddingLeft: 10,
                  paddingRight: 30,
                  borderRadius: 10,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    paddingTop: 5,
                    marginLeft: 3,
                    fontWeight: "300",
                    color: theme.text,
                  }}
                >
                  {item?.comment}
                </Text>
              </Pressable>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <View style={{ marginLeft: 10, marginTop: 10 }}>
                  <Text style={{ fontSize: 14, color: "#8c8a8a" }}>
                    {moment(new Date(item?.createdAt)).fromNow()}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    handleReplyComment(item?._id);
                    setName({
                      first_name: item?.created_by?.first_name,
                      last_name: item?.created_by?.last_name,
                    });
                  }}
                  style={{ marginLeft: 20, marginTop: 10 }}
                >
                  <Text style={{ fontSize: 14, color: "#8c8a8a" }}>Reply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/*    Reply Section*/}
        {item?.replies?.length
          ? item?.replies?.map((reply) => (
              <View
                style={{
                  backgroundColor: "transparent",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginLeft: "8%",
                }}
              >
                <View
                  style={{
                    backgroundColor: "transparent",
                    padding: 5,
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}
                >
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 100,
                      backgroundColor: "grey",
                      justifyContent: "center",
                      marginTop: 5,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 50,
                        resizeMode: "cover",
                      }}
                      source={{
                        uri: checkImageUrl(
                          item?.created_by?.profile_image,
                          `https://ui-avatars.com/api/?background=random&name=${item?.created_by?.first_name}+${item?.created_by?.last_name}`,
                        ),
                      }}
                      // source={{
                      //   uri: reply?.created_by?.profile_image
                      //     ? reply?.created_by?.profile_image
                      //     : "https://img.freepik.com/premium-photo/curious-tender-lovely-ginger-caucasian-girl-pointing-down-questioned-check-out-interesting-promo-point-bottom-down-copy-space-look-camera-intrigued-suggest-good-product-online-shop-link_1258-82563.jpg",
                      // }}
                    />
                  </View>
                  <View style={{ width: "80%" }}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate(NAVIGATION_ROUTES.PROFILE_OTHER, {
                          item: {
                            item: reply?.created_by,
                            screenName: "OtherProfile",
                          },
                        }),
                          refRBSheetComponent.current.close();
                      }}
                    >
                      <View
                        style={{
                          marginLeft: 12,
                          marginBottom: 2,
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: theme.text,
                          }}
                        >
                          {reply?.created_by?.first_name}{" "}
                          {reply?.created_by?.last_name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <Pressable
                      onLongPress={() => {
                        sheetModal({
                          comment_id: item._id,
                          reply_id: reply._id,
                        });
                        setEditCommentText(reply.reply);
                      }}
                      style={{
                        backgroundColor: theme.button,
                        marginLeft: 10,
                        marginRight: 40,
                        padding: 5,
                        paddingBottom: 10,
                        width: "100%",
                        paddingLeft: 10,
                        paddingRight: 30,
                        borderRadius: 10,
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          paddingTop: 5,
                          marginLeft: 3,
                          fontWeight: "300",
                          color: theme.text,
                        }}
                      >
                        {reply?.reply}
                      </Text>
                    </Pressable>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ marginLeft: 10, marginTop: 10 }}>
                        <Text style={{ fontSize: 14, color: "#8c8a8a" }}>
                          {moment(new Date(reply?.time)).fromNow()}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))
          : null}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ padding: 10, marginBottom: 80 }}>
          {CommentArray?.length ? (
            <FlatList
              key={"_"}
              data={CommentArray}
              inverted
              renderItem={({ item, index }) => (
                <RenderItem
                  item={item}
                  index={index}
                  refRBSheetComponent={refRBSheetComponent}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                height: isKeyboardOpen
                  ? Dimensions.get("screen").height / 2.5
                  : Dimensions.get("screen").height / 1.5,
              }}
            >
              <Ionicons
                name='chatbox-ellipses'
                color={"lightgrey"}
                size={145}
              />

              <Text
                style={{
                  color: "grey",
                }}
              >
                No Comments yet
              </Text>
              <Text
                style={{
                  color: "grey",
                }}
              >
                Be the first one to comment on this post{" "}
              </Text>
            </View>
          )}
        </View>

        {/*    Text Field Area*/}
        <View
          style={{
            borderTopWidth: 1,
            backgroundColor: theme?.name === "light" ? "#f4f4f4" : "black",
            borderTopColor: theme.button,
            position: "absolute",
            zIndex: 99,
            width: "100%",
            bottom: Platform.OS == "android" && isKeyboardOpen ? 40 : 0,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: 10,
          }}
        >
          {replyComment ? (
            <View
              style={{
                width: "100%",
                paddingVertical: 10,
                flexDirection: "row",
                paddingLeft: 10,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: theme.text }}>Replying to </Text>
                <Text style={{ fontWeight: "bold", color: theme.text }}>
                  {name?.first_name} {name?.last_name}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setReplyComment(false)}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#5E72E4",
                    paddingLeft: 10,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <View
            style={{
              width: "100%",
              bottom: 0,
              flexDirection: "row",
              alignItems: "center",
              paddingRight: 10,
            }}
          >
            <TextInput
              style={{
                width: "90%",
                minHeight: 50,
                maxHeight: 90,
                borderRadius: 10,
                textAlignVertical: "center",
                paddingHorizontal: 10,
                textAlign: "left",
                fontSize: 16,
                color: theme.text,
                fontWeight: "400",
                paddingTop: 10,
                // (commentText.length > 0 &&
                //   commentText.replace(/\s/g, "").length == 0) ||
                // (editCommentText.length > 0 &&
                //   editCommentText.replace(/\s/g, "").length == 0)
                //   ? 10
                //   : !commentText && !editCommentText
                //   ? 10
                //   : 0,
              }}
              numberOfLines={8}
              multiline
              value={commentText}
              clearButtonMode='always'
              placeholder={replyComment ? "Reply to comment..." : "Add comment"}
              placeholderTextColor={"#b7b7b7"}
              onChangeText={
                // editCommentText
                //   ? (argsText) => {
                //       setEditCommentText(argsText);
                //     }
                //   :
                (argsText) => {
                  setCommentText(argsText);
                }
              }
            />

            <TouchableOpacity
              disabled={
                commentText.length > 0 &&
                commentText.replace(/\s/g, "").length == 0
                  ? true
                  : !commentText
                  ? true
                  : false
              }
              onPress={replyComment ? handleReplySubmit : handleSubmitComment}
              style={{ marginLeft: 10, bottom: 5 }}
            >
              {/* <View
                style={{
                  backgroundColor:
                    (commentText.length > 0 &&
                      commentText.replace(/\s/g, '').length == 0) ||
                    (editCommentText.length > 0 &&
                      editCommentText.replace(/\s/g, '').length == 0)
                      ? '#cbc9c9'
                      : !commentText && !editCommentText
                      ? '#cbc9c9'
                      : '#5E72E4',

                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',backgroundColor: theme?.name === 'Light' ? '#f4f4f4' : 'black',
                }}
              > */}
              {/*theme?.name === 'light' ? '#cbc9c9' : '#5E72E4'*/}
              {/* <Ionicons
                name={theme?.name === "light" ? "send-outline" : "send"}
                color={
                  (commentText.length > 0 &&
                    commentText.replace(/\s/g, "").length == 0) ||
                  (editCommentText.length > 0 &&
                    editCommentText.replace(/\s/g, "").length == 0)
                    ? "#cbc9c9"
                    : !commentText && !editCommentText
                    ? "#cbc9c9"
                    : "#5E72E4"
                }
                size={32}
              /> */}
              <SendNewSvg
                size={28}
                color={
                  (commentText.length > 0 &&
                    commentText.replace(/\s/g, "").length == 0) ||
                  (editCommentText.length > 0 &&
                    editCommentText.replace(/\s/g, "").length == 0)
                    ? "#cbc9c9"
                    : !commentText && !editCommentText
                    ? "#cbc9c9"
                    : "#5E72E4"
                }
              />
              {/* <CommentUp width={22} height={22} color={'#ffffff'} /> */}
              {/* </View> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CommentWrapper;
