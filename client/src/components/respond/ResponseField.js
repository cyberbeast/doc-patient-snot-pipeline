// ResponseField contains the logic to render a single row of label and value tuple
import React from 'react';

export default ({ input, label, values, name, meta: { error, touched } }) => {
	return (
		<tr>
			<td>{label}</td>
			<td key={label}>
				<p class="range-field">
					<input type="range" id="test5" min="0" max="5" />
				</p>
			</td>
			<td className="red-text">{touched && error}</td>
		</tr>
	);
};
