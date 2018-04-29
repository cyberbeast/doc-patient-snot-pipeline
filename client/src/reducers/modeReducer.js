import { SET_MODE } from './../actions/types';

export default function(state = null, action) {
	switch (action.type) {
		case SET_MODE:
			return action.payload || null;
		default:
			return state;
	}
}
