import React, { useCallback, useEffect, useState,memo } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Play from '../Assets/Play';
import {
  fetchPaginatedOtherUserMinis,
  fetchPaginatedUserMinis,
} from '../Store/Actions/profile';
import { TouchableOpacity as ITouchableOpacity } from 'react-native';
import { NAVIGATION_ROUTES } from '../Utils/Navigation/NavigationRoutes';
import LeftArrow from '../Utils/Assets/Icons/LeftArrow';
import { useNavigation } from '@react-navigation/native';

// import React, { memo } from 'react'

// const ProfileMinis = memo(() => {
//   return (
//     <div>ProfileMinis</div>
//   )
// })

// export default ProfileMinis

const ProfileMinis = memo(({minisData}) => {
    const navigation = useNavigation()

  const theme = useSelector((e) => e.theme);
  const userMinisSelfData = useSelector((state) => state.userMinis);
  const totalSelfPages = useSelector((state) => state?.userMinis?.totalPages);
  const userMinisOtherData = useSelector((state) => state.otherUserMinis);
  const totalOtherPages = useSelector(
    (state) => state?.otherUserMinis?.totalPages
  );
//   const userMinisData =
//     screenName === 'OtherProfile'
//       ? userMinisOtherData?.otherUserMinis
//       : userMinisSelfData?.userMinis;
//   const totalPages =
//     screenName === 'OtherProfile' ? totalOtherPages : totalSelfPages;

  const { width, height } = useWindowDimensions();

  const dispatch = useDispatch();

//   const onReachEndHandler = () => {
//     setPage(page + 1);
//     if (page <= totalPages) {
//       if (screenName === 'OtherProfile') {
//         dispatch(fetchPaginatedOtherUserMinis(page + 1, userMinisData));
//       }
//       dispatch(fetchPaginatedUserMinis(page + 1, userMinisData));
//     }
//   };

  const keyExtractor = useCallback((item, index) => `$${index}`, []);

  const renderItem = ({ item }) => {
    return (
      <ITouchableOpacity
        style={{
          position: 'relative',
          padding: 1,
          width: width / 3.1,
          height: 180,
        }}
        onPress={() =>
          navigation.navigate(NAVIGATION_ROUTES.MINI_PLAY, { item: item })
        }
      >
        <Image
          source={
            item.thumbnail
              ? { uri: item.thumbnail }
              : require('../Assets/story.png')
          }
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 8,
            //   backgroundColor: item % 2 == 0 ? 'red' : 'green',
          }}
          resizeMode='cover'
        />
        <View style={{ position: 'absolute', bottom: 5, left: 5 }}>
          <Play width={40} height={40} />
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: '#fff',
              marginLeft: 5,
            }}
          >
            {item?.views_count} view
          </Text>
        </View>
      </ITouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      
      {/* <View
        style={{
          alignItems: 'center',
        }}
      > */}
        <FlatList
          data={minisData}
          // horizontal
          numColumns={3}
          // pagingEnabled
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<View style={{justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:18, fontWeight:'bold', color:theme.Text}}>
                No data available
            </Text>



        </View>}
          //style={{ marginHorizontal: "3%" }}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          // ItemSeparatorComponent={itemSeprator}
          keyExtractor={keyExtractor}
          onEndReachedThreshold={0.5}
        //   onEndReached={onReachEndHandler}
        />
      {/* </View> */}
    </View>
  );
});
export default ProfileMinis
// export default PrfileMIni;
