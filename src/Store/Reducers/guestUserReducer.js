import { Types } from '../Types/type';

const initialstate = {
  guestUser: {},
};
export default function guestUserReducer(state = initialstate, action) {
  switch (action.type) {
    case Types.GUEST_USER:
      return {
        ...state,
        guestUser: action.payload,
      };
    default:
      return state;
  }
}
