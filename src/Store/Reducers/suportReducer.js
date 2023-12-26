import { Types } from '../Types/type';

const initialState = {
  cases: [],
  openCases: [],
  closedCases: [],
  filteredAllCases: [],
  filteredOpenCases: [],
  filteredClosedCases: [],
  isLoading: false,
  case: null,
};

export default function suportReducer(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH_CASES:
      return {
        ...state,
        cases: action.payload.allCases,
        openCases: action.payload.openCases,
        closedCases: action.payload.closedCases,
      };
    case Types.CASES_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case Types.SEARCH_CASE:
      let tempAllCases = [...state.cases];
      let tempOpenCases = [...state.openCases];
      let tempClosedCases = [...state.closedCases];

      if (action.payload.searchType === 'all') {
        tempAllCases = tempAllCases.filter(
          (c) =>
            c.title.includes(action.payload.text) ||
            c.case_no.includes(action.payload.text),
        );
      } else if (action.payload.searchType === 'open') {
        tempOpenCases = tempOpenCases.filter(
          (c) =>
            c.title.includes(action.payload.text) ||
            c.case_no.includes(action.payload.text),
        );
      } else if (action.payload.searchType === 'closed') {
        tempClosedCases = tempClosedCases.filter(
          (c) =>
            c.title.includes(action.payload.text) ||
            c.case_no.includes(action.payload.text),
        );
      }

      return {
        ...state,
        filteredAllCases: tempAllCases,
        filteredOpenCases: tempOpenCases,
        filteredClosedCases: tempClosedCases,
      };
    case Types.FETCH_CASE_DETAILS:
      let tempCaseDetails = { ...action.payload };
      let case_messages = tempCaseDetails.case_messages.reverse();
      tempCaseDetails = {
        ...tempCaseDetails,
        case_messages,
      };
      return {
        ...state,
        case: tempCaseDetails,
      };
    case Types.SEND_CASE_MESSAGE:
      let tempCase = null;
      if (state.case) {
        tempCase = { ...state.case };
        tempCaseMessages = [...tempCase.case_messages];
        tempCaseMessages.push(action.payload);
        tempCase = {
          ...tempCase,
          case_messages: tempCaseMessages,
        };
      }

      return {
        ...state,
        case: tempCase,
      };
    default:
      return state;
  }
}
