import axios from 'axios';
import * as types from './types';

export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: types.FETCH_USER, payload: res.data });
	if (res.data) {
		dispatch({ type: types.SET_MODE, payload: res.data.userType.category });
	}
};

export const submitEnrollment = (value, history) => async dispatch => {
	value.title = 'SNOT Survey';
	console.log('VALUE: ', value);
	const res = await axios.post('/api/enrollments', value);
	history.push('/dashboard');
	dispatch({ type: types.FETCH_USER, payload: res.data });
};

export const fetchEnrollments = () => async dispatch => {
	const res = await axios.get('/api/enrollments');

	dispatch({ type: types.FETCH_ENROLLMENTS, payload: res.data });
};
