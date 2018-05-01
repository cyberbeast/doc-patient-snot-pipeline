import { FETCH_RESPONSES } from './../actions/types';

export default function(state = [], action) {
	switch (action.type) {
		case FETCH_RESPONSES:
			return action.payload;
		default:
			return state;
	}
}
