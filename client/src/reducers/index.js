import { combineReducers } from 'redux';
import authReducer from './authReducer';
import modeReducer from './modeReducer';
import enrollmentsReducer from './enrollmentsReducer';
import responsesReducer from './responsesReducer';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
	auth: authReducer,
	mode: modeReducer,
	form: reduxForm,
	responses: responsesReducer,
	enrollments: enrollmentsReducer
});
