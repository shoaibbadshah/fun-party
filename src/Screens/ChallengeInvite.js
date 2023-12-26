import {
  View,
  Image,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRoute, useNavigation } from '@react-navigation/native';

import Button from '../Components/TouchableOpacity';
import Text from '../Components/Text';
import MinisSearch from '../Assets/MinisSearch';
import {
  fetchUserInvitables,
  onInvitableUserTap,
  onSelectInvitableUsers,
} from '../Store/Actions/profile';
import { sendMiniChallengeInvite } from '../Store/Actions/minis';

const ChallengeInvite = () => {
  const theme = useSelector((e) => e.theme);
  const { isLoading, invitablesUsers, selectedInvitables } = useSelector(
    ({ profile }) => profile,
  );

  const [isAllSelected, setIsAllSelected] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredInvitables, setFilteredInvitables] = useState([]);
  const [isSeachStarted, setIsSeachStarted] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { miniId } = route.params;

  useEffect(() => {
    dispatch(fetchUserInvitables());
  }, []);

  useEffect(() => {
    if (isAllSelected && selectedInvitables.length === 0) {
      setIsAllSelected(false);
    }
  }, [isAllSelected, selectedInvitables.length]);

  const handleUserClicked = (id) => {
    dispatch(onInvitableUserTap(id));
  };

  const handleInviteClicked = () => {
    dispatch(
      sendMiniChallengeInvite(
        {
          mini_id: miniId,
          users: selectedInvitables,
        },
        navigation,
      ),
    );
  };

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredInvitables([]);
      setIsSeachStarted(false);
    }
  }, [search]);

  const handleSearch = () => {
    setIsSeachStarted(true);
    setFilteredInvitables(
      invitablesUsers.filter(
        (d) =>
          d.first_name.toLowerCase().includes(search.toLowerCase().trim()) ||
          d.last_name.toLowerCase().includes(search.toLowerCase().trim()),
      ),
    );
  };

  const renderProfile = ({ item }) => {
    return (
      <Pressable
        onPress={() => handleUserClicked(item._id)}
        style={{
          flexDirection: 'row',
          marginHorizontal: 15,
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 5,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={
              item.profile_image
                ? { uri: item.profile_image }
                : require('../Assets/avatar.jpg')
            }
            defaultSource={require('../Assets/avatar.jpg')}
            style={{
              borderColor: 'grey',
              borderRadius: 35,
              borderWidth: 1,
              width: 35,
              height: 35,
            }}
            resizeMode='cover'
          />
          <View style={{ marginLeft: 10, justifyContent: 'center' }}>
            <View>
              <Text style={{ color: theme.text, fontWeight: '600' }}>
                {item.first_name} {item.last_name}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <AntDesign
            name={item.isSelected ? 'checksquare' : 'checksquareo'}
            size={18}
            color={item.isSelected ? theme.secondary : theme.text}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{ backgroundColor: theme.primary, flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            color: theme.selectContact,
            fontSize: 12,
            fontWeight: '900',
            textAlign: 'center',
          }}
        >
          Select Contacts
        </Text>
        <Text
          onPress={() => {
            if (isAllSelected) {
              dispatch(onSelectInvitableUsers('unselect'));
              setIsAllSelected(false);
            } else {
              dispatch(onSelectInvitableUsers('select'));
              setIsAllSelected(true);
            }
          }}
          style={{
            color: theme.select,
            fontSize: 12,
            fontWeight: '900',
            textAlign: 'center',
          }}
        >
          {isAllSelected ? 'Unselect' : 'Select All'}
        </Text>
      </View>
      <View style={[styles.searchView, { backgroundColor: theme.button }]}>
        <TextInput
          style={{
            width: '80%',
            height: '100%',
            color: theme.text,
            flex: 1,
            paddingVertical: 0,
          }}
          placeholderTextColor={'grey'}
          returnKeyType={'search'}
          onSubmitEditing={handleSearch}
          onChangeText={(e) => {
            setSearch(e);
          }}
          placeholder={'Search contacts'}
        />
        <TouchableOpacity
          disabled={search === '' ? true : false}
          onPress={() => {
            handleSearch();
          }}
        >
          <MinisSearch color={theme.selectContact} width={18} height={18} />
        </TouchableOpacity>
      </View>

      <>
        {isLoading ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator color={'#000000'} size={'large'} />
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            data={
              isSeachStarted
                ? filteredInvitables
                : filteredInvitables.length > 0
                ? filteredInvitables
                : invitablesUsers
            }
            renderItem={renderProfile}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: theme.text,
                    fontSize: 16,
                    textAlign:'center'
                  }}
                >
                  No contacts were found. {'\n'}Please add some followers to Challenge.
                </Text>
              </View>
            )}
          />
        )}
      </>
      <Button
        onPress={handleInviteClicked}
        style={{ marginHorizontal: 15, marginBottom: 15 }}
        disable={selectedInvitables.length === 0 ? true : false}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 12,
            fontWeight: '600',
            textTransform: 'uppercase',
          }}
        >
          Invite
        </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  searchView: {
    height: 35,
    width: '95%',
    marginVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
});
export default ChallengeInvite;
