import { Types } from '../Types/type';

const initialState = {
  wallet: {},
};

export default function fetchWalletReducer(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH_WALLET:
      return { ...state, wallet: action.payload };
    default:
      return state;
  }
}
