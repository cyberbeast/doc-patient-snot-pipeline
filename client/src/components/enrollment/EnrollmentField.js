// EnrollmentField contains logic to render a single label and text input

import React from 'react';
import TextField from 'material-ui/TextField';

export default ({ input, label, meta: { error, touched } }) => {
	return (
		<TextField
			{...input}
			error={touched && error}
			required
			id="full-width"
			label={label}
			helperText={touched && error}
			fullWidth
			margin="normal"
		/>
	);
};
