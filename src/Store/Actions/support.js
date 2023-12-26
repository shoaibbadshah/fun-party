import { Alert } from 'react-native';

import { API } from '../../Api';
import { Types } from '../Types/type';

export const createCase = (body) => async (dispatch) => {
  try {
    dispatch({
      type: Types.CASES_LOADING,
      payload: true,
    });
    const { data } = await API.v1.Support.createCase(body);
    Alert.alert('Case Created', 'Case created successfully', [
      { text: 'OK', onPress: () => {} },
    ]);
    dispatch({
      type: Types.CASES_LOADING,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: Types.CASES_LOADING,
      payload: false,
    });
  }
};

export const fetchAllCases = () => async (dispatch) => {
  try {
    dispatch({
      type: Types.CASES_LOADING,
      payload: true,
    });
    const { data } = await API.v1.Support.fetchAllCases();

    let openCases = [];
    let closedCases = [];
    if (data && data.status === 200) {
      openCases = data.data.filter((c) => c.case_status === 'open');
      closedCases = data.data.filter((c) => c.case_status === 'closed');
      dispatch({
        type: Types.FETCH_CASES,
        payload: {
          allCases: data.data,
          openCases,
          closedCases,
        },
      });
    }
    dispatch({
      type: Types.CASES_LOADING,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: Types.CASES_LOADING,
      payload: false,
    });
  }
};

export const sendSuportMessage = (body) => async (dispatch) => {
  try {
    dispatch({
      type: Types.SEND_CASE_MESSAGE,
      payload: body,
    });

    await API.v1.Support.sendSuportMessage(body);
  } catch (error) {}
};

export const handleCaseSeach = (text, searchType) => {
  return {
    type: Types.SEARCH_CASE,
    payload: {
      text,
      searchType,
    },
  };
};

export const fetchCaseDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: Types.CASES_LOADING,
      payload: true,
    });
    const { data } = await API.v1.Support.fetchCaseDetails(id);
    if (data && data.status === 200) {
      dispatch({ type: Types.FETCH_CASE_DETAILS, payload: data });
    }
    dispatch({
      type: Types.CASES_LOADING,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: Types.CASES_LOADING,
      payload: false,
    });
  }
};
