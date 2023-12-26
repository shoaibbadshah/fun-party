import { Types } from "../Types/type";

const initialState = {
  userSavedMinis: [],
  userSavedLongVideos: [],
};

export default function userMinisSavedReducer(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH_USER_SAVED_MINIS:
      return { ...state, ...action.payload };
    case Types.USER_FOLLOW_UPDATE:
      const { id, follow } = action.payload;
      let newArr = [...state.userSavedMinis];
      const filterArr = newArr.filter((item) => item?.created_by?._id == id);
      const result = filterArr.map((item) => {
        item.created_by.is_followed = follow === true ? true : false;
        return item;
      });

      const final = state.userSavedMinis.map((elem) => {
        result.map((res) => {
          if (elem._id === res._id) {
            elem = res;
          }
        });
        return elem;
      });
      return { ...state, userSavedMinis: final };
    case Types.FETCH_USER_SAVED_LONG_VIDEOS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
