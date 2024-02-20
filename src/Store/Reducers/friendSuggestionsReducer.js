import {Types} from '../Types/type';

const initialState = {
  suggested_List: [],
};

export default function friendSuggestionsReducer(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH_SUGGESTIONS_LIST:
      return {...state, ...action.payload};
    default:
      return state;
  }
}
