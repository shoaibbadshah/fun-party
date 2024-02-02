import {Types} from '../Types/type';

const initialState = {
  profile: [],
  invitablesUsers: [],
  selectedInvitables: [],
  isLoading: false,
  ownerCountry: {},
  blockedAccounts: [],
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH_PROFILE:
      return {...state, profile: action.payload.profile};
    case Types.FETCH_USER_INVITABLES:
      return {
        ...state,
        invitablesUsers: action.payload,
      };
    case Types.USER_INVITABLES_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case Types.ON_INVITABLE_USER_TAP:
      let tempUsers = [...state.invitablesUsers];
      tempUsers = tempUsers.map(user =>
        user._id === action.payload
          ? {...user, isSelected: !user.isSelected}
          : user,
      );
      let tempSelectedUsers = tempUsers
        .filter(user => user.isSelected)
        .map(u => u._id);

      return {
        ...state,
        invitablesUsers: tempUsers,
        selectedInvitables: tempSelectedUsers,
      };

    case Types.ON_SELECT_INVITABLE_USERS:
      let allUsers = [...state.invitablesUsers];
      allUsers = allUsers.map(user => ({
        ...user,
        isSelected: action.payload === 'select' ? true : false,
      }));
      let tempFilteredSelectedUsers = allUsers
        .filter(user => user.isSelected)
        .map(u => u._id);
      return {
        ...state,
        invitablesUsers: allUsers,
        selectedInvitables: tempFilteredSelectedUsers,
      };
    case Types.FETCH_BLOCKED_ACCOUNTS:
      return {
        ...state,
        blockedAccounts: action.payload,
      };

    case Types.UNBLOCKED_ACCOUNT:
      let tempBlockedAccounts = [...state.blockedAccounts];
      tempBlockedAccounts = tempBlockedAccounts.filter(
        acc => acc._id !== action.payload,
      );
    case Types.FETCH_OTHER_PROFILE:
      // let tempBlockedAccounts = [...state.blockedAccounts];

      return {
        ...state,
        profile: action.payload,
      };

    case Types.OWNER_COUNTRY:
      return {
        ...state,
        ownerCountry: action.responseJson,
      };

    default:
      return state;
  }
}
