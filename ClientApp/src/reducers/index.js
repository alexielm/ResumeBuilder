import { combineReducers } from 'redux';

const frontEndParametersReducer = (state = null, action) => {
    switch (action.type) {
        case 'FETCH_PARAMETERS': return action.payload;
        default: return state;
    }
};

const resumeDataReducer = (state = null, action) => {
    switch (action.type) {
        case 'FETCH_RESUME': return action.payload;
        case 'REFRESH_RESUME': {
            document.location.reload();
            return null;
        }
      default: return state;
    }
};

const queryParametersReducer = (state = null, action) => {
    switch (action.type) {
        case 'PARSE_QUERY': return action.payload;
        default: return state;
    }
};

export default combineReducers({
    frontEndParameters: frontEndParametersReducer,
    resumeData: resumeDataReducer,
    queryParameters: queryParametersReducer
});
