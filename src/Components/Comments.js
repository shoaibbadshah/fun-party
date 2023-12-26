import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Comments = ({ PostId }) => {
  const [commentText, SetCommentText] = useState('');
  const [CommentArray, SetCommentArray] = useState([1, 2, 3, 4, 5, 6]);
  const [Comments, SetComments] = useState(true);

  const [selectedItem1, setSelectedItem] = useState({});

  const Item = ({ item, onPress, onSelect, textColor }) => (
    <View onPress={onSelect} style={[styles.item]}>
      <View
        style={{
          width: '95%',
          borderRadius: 5,
          marginTop: '2%',
          marginBottom: '2%',
          alignSelf: 'center',
          flexDirection: 'row',
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 45,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'black',
            borderWidth: 1,
            marginLeft: 15,
          }}
        >
          <Image
            // resizeMode="cover"
            source={{ uri: item.profileImg }}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>

        {/* Name and comment */}

        <View
          style={{
            justifyContent: 'center',
            // alignItems:'center',
            marginLeft: 15,
          }}
        >
          <View
            style={{
              maxWidth: '90%',
              backgroundColor: 'darkgrey',
              //   backgroundColor: theme.backgroundColor,
              borderRadius: 15,
              paddingHorizontal: 15,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                alignContent: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                // color: theme.textColor,
                color: 'black',
                width: 140,
              }}
            >
              {item.name}
              awais
            </Text>
            <Text
              style={{
                fontSize: 12,
                alignContent: 'center',
                justifyContent: 'center',
                // fontFamily: 'Poppins-Regular',
                // color: theme.textColor,
                maxWidth: '100%',
              }}
            >
              {item.comment}
              nice Bro asa sas anice Bro asa sas anice Bro asa sas anice Bro asa
              sas anice Bro asa sas a
            </Text>
          </View>

          <Text
            style={{
              fontSize: 12,
              //   color: theme.appLightGreen,
              //   fontFamily: 'Roboto-Regular',
              marginTop: '2%',
              marginLeft: '8%',
            }}
          >
            {item.date}2 days ago
          </Text>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => {
    return (
      <View>
        <Item item={item} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.buttons}>
      {/* // <KeyboardAvoidingView
    //   style={{
    //     flex: 1,
    //     // paddingBottom: 20,
    //     marginBottom: Platform.OS == 'android' ? '0%' : '0%',
    //   }}
    //   behavior={Platform.OS == 'android' ? 'padding' : 'padding'}
    // > */}
      {/* <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        style={{
          flex: 1,
          // height: Dimensions.get('screen').height - 75,
          //   backgroundColor: theme.apptheme,
          // flexGrow: 1,
          // marginBottom: '10%',
        }}
      > */}
      {Comments == true ? (
        <FlatList
          key={'_'}
          keyExtractor={(item) => item.post_id}
          data={CommentArray}
          inverted
          renderItem={renderItem}
          extraData={selectedItem1.id}
        />
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            height: Dimensions.get('screen').height / 1.3,
          }}
        >
          <Ionicons name='chatbox-ellipses' color={'lightgrey'} size={145} />

          <Text
            style={{
              color: 'grey',
            }}
          >
            No Comments yet
          </Text>
          <Text
            style={{
              color: 'grey',
            }}
          >
            Be the first one to comment on this post{' '}
          </Text>
        </View>
      )}
      {/* </ScrollView> */}
      <View
        style={{
          width: '95%',
          height: 75,
          maxHeight: 145,
          flexDirection: 'row',
          // marginBottom: 15,
          // position: 'absolute',
          bottom: 0,
          // left: 10,
          right: 0,
          alignSelf: 'center',
          //   backgroundColor: theme.backgroundColor,
          borderRadius: 15,
          marginBottom: Platform.OS == 'android' ? '25%' : '20%',

          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          // paddingVertical: 15,
        }}
      >
        {/* <KeyboardShift>
            {() => ( */}
        {/* <View
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            marginBottom: 15,
            alignSelf: 'center',
            backgroundColor: 'white',
            borderRadius: 15,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}> */}
        <TextInput
          style={{
            width: '90%',
            height: '100%',
            // color: theme.textColor,
            textAlignVertical: true,

            paddingHorizontal: 15,
          }}
          multiline
          numberOfLines={8}
          // returnKeyType={'done'}
          value={commentText}
          clearButtonMode='always'
          placeholder='Enter Your comment'
          placeholderTextColor={'grey'}
          onChangeText={(argsText) => {
            SetCommentText(argsText);
          }}
        ></TextInput>
        {/* <TouchableOpacity onPress={handleSendCommeent}>
          <Ionicons color={'#73cfeb'} size={30} name={'send-outline'} />
        </TouchableOpacity> */}
      </View>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    height: '100%',
  },
  buttonIcon: {
    width: 30,
    height: 30,
    margin: 10,
  },
  buttons: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: '#e2f6fa',
    flex: 1,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#73CEEB',
    fontSize: 14,
    fontWeight: '600',
  },
});
export default Comments;
