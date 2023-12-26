import { Types } from "../Types/type";
import _ from "lodash";
const initialState = {
  minis: [],
  totalPages: 1,
  page: 1,
};

export default function lvMoreVideosReducer(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH_MORE_LONG_VIDEOS:
      return { ...state, ...action.payload };
    case Types.USER_FOLLOW_UPDATE:
      const { id, follow } = action.payload;
      let newArr = [...state.minis];
      const filterArr = newArr.filter((item) => item?.created_by?._id == id);
      const result = filterArr.map((item) => {
        item.created_by.is_followed = follow === true ? true : false;
        return item;
      });
      const final = state.minis.map((elem) => {
        result.map((res) => {
          if (elem._id === res._id) {
            elem = res;
          }
        });
        return elem;
      });
      return { ...state, minis: final };
    default:
      return state;
  }
}
