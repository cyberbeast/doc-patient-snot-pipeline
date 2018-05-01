import axios from 'axios';
import * as types from './types';

export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: types.FETCH_USER, payload: res.data });
	if (res.data) {
		dispatch({ type: types.SET_MODE, payload: res.data.userType });
	}
};

export const submitEnrollment = (value, history) => async dispatch => {
	value.title = 'SNOT Survey';
	console.log('VALUE: ', value);
	const res = await axios.post('/api/enrollments', value);
	history.push('/dashboard');
	dispatch({ type: types.FETCH_USER, payload: res.data });
};

export const submitResponse = (
	values,
	history,
	enrollmentId
) => async dispatch => {
	console.log('VALUES: ', values);
	console.log('ID: ', enrollmentId);
	const res = await axios.post('/api/responses', {
		values,
		enrollmentId
	});
	history.push('/dashboard');
	dispatch({ type: types.FETCH_USER, payload: res.data });
};

export const fetchEnrollments = () => async dispatch => {
	const res = await axios.get('/api/enrollments');

	dispatch({ type: types.FETCH_ENROLLMENTS, payload: res.data });
};

export const fetchResponses = () => async dispatch => {
	const res = await axios.get('/api/responses');
	dispatch({ type: types.FETCH_RESPONSES, payload: res.data });
};
