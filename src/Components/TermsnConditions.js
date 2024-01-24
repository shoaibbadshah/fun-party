import React from 'react';
import {Text, View, Linking, ScrollView, StyleSheet} from 'react-native';

const TermsnConditions = ({route}) => {
  const textData = route?.params?.textData.data;
  const Title = route?.params?.textData.title;

  const emailRegex = /([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,})/g;

  const parts = textData?.split(emailRegex);

  const highlightedText = parts?.map((part, index) =>
    index % 2 === 0 ? (
      <Text key={index}>{part}</Text>
    ) : (
      <Text
        onPress={() => {
          Linking.openURL(`mailto:${part}`);
        }}
        key={index}
        style={{color: 'blue', fontWeight: 'bold'}}>
        {part}
      </Text>
    ),
  );

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <ScrollView
        style={styles.componentView}
        showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 15,
            }}>
            {Title}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginBottom:
              Title == 'Copyright Policy' || Title == 'Cookie Policy'
                ? 35
                : Title == 'Privacy Policy'
                ? '-10%'
                : 0,
            //: '-75%',
          }}>
          <Text
            style={{
              textAlign: 'justify',
              color: 'white',
            }}>
            {highlightedText}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  footerView: {position: 'absolute', zIndex: 10, bottom: 20, left: 10},
  itemContainer: {},
  itemImage: {
    width: 125,
    height: 180,
    marginBottom: 5,
    borderRadius: 3,
  },
  componentView: {
    marginHorizontal: 15,
  },
});
export default TermsnConditions;
