import { Types } from '../Types/type';

const initialstate = {
  insights: {},
  allInsights: {},
};
export default function fetchInsights(state = initialstate, action) {
  switch (action.type) {
    case Types.MINIS_INSIGHTS:
      return { ...state, insights: action.payload };
    case Types.ALL_ANALYTICS:
      return { ...state, allInsights: action.payload };

    default:
      return state;
  }
}
