import React, {useState} from 'react';
import {
  View,
  FlatList,
  TextInput,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';

import {
  fetchSearchMinisAndUsers,
  userFollow,
  userFollowing,
} from '../Store/Actions/minis';
import Text from '../Components/Text';
import MinisSearch from '../Assets/MinisSearch';

import LeftArrow from '../Utils/Assets/Icons/LeftArrow';

import UserListItem from '../Components/UserListItem';

const SearchMini = ({route}) => {
  const navigation = useNavigation();
  const [caption, setCaption] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isLoading1, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const theme = useSelector(e => e.theme);
  const {users} = useSelector(({previewMinis}) => previewMinis);

  const searchHandle = async () => {
    setIsFocus(true);
    dispatch(fetchSearchMinisAndUsers(caption));
  };

  const onRefresh = () => {
    setCaption(true);
    setIsLoading(true);
    dispatch(fetchSearchMinisAndUsers(1, []));

    setIsLoading(false);
  };

  const UsersSearch = () => (
    <View style={{flex: 1, justifyContent: 'center', marginTop: 15}}>
      {users.length > 0 ? (
        <FlatList data={users} renderItem={renderProfile} />
      ) : (
        <Text
          style={{
            color: theme.text,
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Search not Found
        </Text>
      )}
    </View>
  );

  const renderProfile = ({item, index}) => {
    return <UserListItem item={item} />;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.primary,
        paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 60 : 15,
      }}>
      <StatusBar barStyle={theme.statusbar} />
      {/* +++++++++++++++++++++++++++++++++++++++++++++ Header Start +++++++++++++++++++++++++++++++++++++++++++ */}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingBottom: 12,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: 15,
            width: '20%',
          }}>
          <LeftArrow width={18} height={18} color={theme.text} />
        </TouchableOpacity>

        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '600',
            color: theme.text,
          }}>
          Search
        </Text>

        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: 15,
            boxShadow: 'none',
            width: '20%',
          }}></TouchableOpacity>
      </View>
      {/* +++++++++++++++++++++++++++++++++++++++++++++ Header End +++++++++++++++++++++++++++++++++++++++++++ */}
      {/* +++++++++++++++++++++++++++++++++++++++++++++ Search Input Start +++++++++++++++++++++++++++++++++++++++++++ */}

      <View style={[styles.componentView, {backgroundColor: theme.primary}]}>
        <View style={[styles.searchView, {backgroundColor: '#222222'}]}>
          <TextInput
            style={{width: '80%', height: '100%', color: theme.text}}
            placeholderTextColor={'grey'}
            returnKeyType={'search'}
            value={caption}
            onSubmitEditing={searchHandle}
            onChangeText={e => {
              setCaption(e);
            }}
            placeholder={'Enter text to search'}
          />

          <TouchableOpacity
            disabled={caption === '' ? true : false}
            onPress={searchHandle}>
            <MinisSearch color={theme.text} width={24} height={24} />
          </TouchableOpacity>
        </View>
        {isFocus
          ? // <FlatList
            //   data={users}
            //   renderItem={UsersSearch}
            //   keyExtractor={item => item.id}
            //   refreshControl={
            //     <RefreshControl
            //       tintColor={'black'}
            //       refreshing={isLoading1}
            //       onRefresh={onRefresh}
            //     />
            //   }
            // />
            UsersSearch()
          : ''}
      </View>
      {/* +++++++++++++++++++++++++++++++++++++++++++++ Search Input End +++++++++++++++++++++++++++++++++++++++++++ */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {},
  itemImage: {
    width: '100%',
    height: '100%',
  },
  componentView: {flex: 1},

  searchView: {
    height: 40,
    width: '95%',
    marginVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight - 45,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});
export default SearchMini;
