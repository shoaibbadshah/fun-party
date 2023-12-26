import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import CommentWrapper from "./CommentWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  deleteCommentReply,
  deleteCommentReplyAction,
  editCommentAction,
  editCommentReplyAction,
  fetchComments,
  postComment,
  replyCommentAction,
} from "../Store/Actions/minis";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";

import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { DeleteSvg } from "../Assets/Svgs";

const CommentComponent = ({
  itemId,
  refRBSheetComponent,
  navigation,
  onMoveProfile,
  setComment_count,
}) => {
  const dispatch = useDispatch();
  const refRBSheet = useRef();

  const theme = useSelector((e) => e.theme);

  const commentsData = useSelector((state) => state?.comments);

  const loadingComment = useSelector(
    (state) => state?.comments?.loadingComment,
  );

  const [commentText, setCommentText] = useState("");
  const [editCommentText, setEditCommentText] = useState("");
  const [replyComment, setReplyComment] = useState(false);
  const [replyId, setReplyId] = useState("");
  const [commentId, setcommentId] = useState(null);
  const [editCommentID, setEditCommentID] = useState(null);

  // useEffect(() => {
  //   setCommentLoading(true);
  //   dispatch(fetchComments(itemId, setCommentLoading));
  //   setCommentLoading(false);
  // }, [itemId]);

  const sheetModal = (id) => {
    setcommentId(id);
    refRBSheet.current.open();
  };

  const handleEdit = (id) => {
    if (!id.reply_id) {
      setEditCommentID(id.comment_id);
      setCommentText(editCommentText);
    } else {
      console.log("edit reply", id);
      setCommentText(editCommentText);
      setEditCommentID({ ...id, reply: editCommentText });
    }
    refRBSheet.current.close();
  };

  const handleDelete = async (id) => {
    if (!id.reply_id) {
      try {
        const body = { comment_id: id.comment_id };
        dispatch(deleteComment({ data: body }, itemId));
        refRBSheet.current.close();
      } catch (error) {
        Alert.alert("Error", error?.response?.data?.message);
        console.log(
          "🚀 ~ file: CommentWrapper.js:59 ~ handleDelete ~ error:",
          error,
        );
      }
    } else {
      try {
        dispatch(deleteCommentReplyAction({ data: id }));
        refRBSheet.current.close();
      } catch (error) {
        Alert.alert("Error", error?.response?.data?.message);
        console.log(
          "🚀 ~ file: CommentWrapper.js:59 ~ handleDelete ~ error:",
          error,
        );
      }
    }

    setEditCommentText("");
    setCommentText("");
  };
  const handleSubmitComment = () => {
    if (editCommentID && !editCommentID.reply) {
      // Editing an existing comment
      if (
        editCommentText.length > 0 &&
        editCommentText.replace(/\s/g, "").length == 0
      ) {
        setEditCommentText("");
        setCommentText("");
      } else {
        const body = {
          comment: commentText,
        };
        dispatch(editCommentAction(body, itemId, editCommentID));
        setEditCommentText("");
        setCommentText("");
        setEditCommentID("");
      }
    } else if (editCommentID && editCommentID.reply) {
      // Editing an existing comment
      if (
        editCommentText.length > 0 &&
        editCommentText.replace(/\s/g, "").length == 0
      ) {
        setEditCommentText("");
        setCommentText("");
      } else {
        const body = {
          ...editCommentID,
          reply: commentText,
        };
        dispatch(editCommentReplyAction(body, itemId));
        setEditCommentText("");
        setCommentText("");
        setEditCommentID("");
      }
    } else {
      // Posting a new comment

      if (
        commentText.length > 0 &&
        commentText.replace(/\s/g, "").length == 0
      ) {
        setCommentText("");
        setEditCommentText("");
      } else {
        const body = {
          mini: itemId,
          comment: commentText,
        };
        dispatch(postComment(body, itemId, setComment_count));
        setCommentText("");
        setEditCommentText("");
      }
    }
  };

  const handleReplyComment = async (id) => {
    setReplyComment(true);
    setReplyId(id);
  };
  const handleReplySubmit = async () => {
    if (commentText.length > 0 && commentText.replace(/\s/g, "").length == 0) {
      setCommentText("");
      setReplyComment(false);
    } else {
      const body = {
        comment: replyId,
        reply: commentText,
      };
      dispatch(replyCommentAction(body, itemId, setComment_count));
      setCommentText("");
      setReplyComment(false);
    }
  };

  return (
    <View>
      <RBSheet
        ref={refRBSheetComponent}
        closeOnDragDown={true}
        closeOnPressMask={true}
        dragFromTopOnly={true}
        height={Dimensions.get("window").height / 1.2}
        closeOnPressBack={true}
        closeDuration={50}
        onClose={() => {
          setEditCommentText("");
          setCommentText("");
          setcommentId("");
          setEditCommentID("");
        }}
        openDuration={50}
        customStyles={{
          draggableIcon: {
            backgroundColor: "grey",
          },
          container: {
            backgroundColor: theme.primary,
            borderRadius: 15,
          },
        }}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{ flex: 1 }}
          extraHeight={30}
        >
          <View style={{ flex: 1 }}>
            {loadingComment ? (
              <ActivityIndicator
                color={"grey"}
                size={"large"}
                style={{ flex: 1 }}
              />
            ) : (
              <CommentWrapper
                itemId={itemId}
                CommentArray={commentsData?.comments}
                commentText={commentText}
                setCommentText={setCommentText}
                editCommentText={editCommentText}
                setEditCommentText={setEditCommentText}
                handleSubmitComment={handleSubmitComment}
                handleReplyComment={handleReplyComment}
                handleReplySubmit={handleReplySubmit}
                replyComment={replyComment}
                navigation={navigation}
                refRBSheetComponent={refRBSheetComponent}
                setReplyComment={setReplyComment}
                sheetModal={sheetModal}
                //editCommet={editCommet}
              />
            )}
          </View>
        </KeyboardAwareScrollView>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={Dimensions.get("screen").height / 4.0}
          closeOnPressBack={true}
          openDuration={50}
          customStyles={{
            draggableIcon: {
              backgroundColor: "grey",
            },
            container: {
              borderRadius: 15,
              backgroundColor: theme.primary,
            },
          }}
        >
          <TouchableOpacity
            onPress={() => {
              handleDelete(commentId);
            }}
            style={{
              paddingHorizontal: 15,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 12,
            }}
          >
            {/* <AntDesign name='delete' size={22} color={theme.textColor} /> */}
            <DeleteSvg size={22} color={"white"} />
            <Text
              style={{
                fontWeight: "bold",
                color: theme.textColor,
                paddingLeft: 15,
              }}
            >
              Delete
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleEdit(commentId)}
            style={{
              paddingHorizontal: 15,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 22,
            }}
          >
            <AntDesign name='edit' size={22} color={theme.textColor} />

            <Text
              style={{
                fontWeight: "bold",
                color: theme.textColor,
                paddingLeft: 15,
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </RBSheet>
      </RBSheet>
    </View>
  );
};

export default CommentComponent;
