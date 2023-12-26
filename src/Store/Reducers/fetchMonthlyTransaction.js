import { Types } from '../Types/type';
import _ from 'lodash';
const initialState = {
  monthlyTransaction: [],
};

export default function userMonthlyHistory(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH_USER_MONTHLY_TRANSACTION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
