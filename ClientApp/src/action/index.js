import { LoadQueryParameters } from '../generalUtils/GeneralUtils';


export const fetchAll = () => async (dispatch, getState) => {
    await dispatch(fetchParamaters());
    await dispatch(fetchResumeData());
};

export const fetchParamaters = () => async dispatch => {
    const response = await fetch("api/frontEndParameters");
    const payload = await response.json();
    dispatch({ type: 'FETCH_PARAMETERS', payload });
};

export const fetchResumeData = () => async dispatch => {
    const response = await fetch("api/resumeData");
    const payload = await response.json();
    dispatch({ type: 'FETCH_RESUME', payload });
};


export const refreshResumeData = () => async dispatch => {
    const response = await fetch("api/refreshResumeData");
    const payload = await response.text();
    dispatch({ type: 'REFRESH_RESUME', payload });
};


export const parseQueryParamter = () => async dispatch => {
    dispatch({ type: 'PARSE_QUERY', payload: LoadQueryParameters() });
};