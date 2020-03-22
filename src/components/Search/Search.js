import React from "react";
import PropTypes from 'prop-types';

export const Search = ({ value, onChange, onSubmit, children }) =>
	<form onSubmit={onSubmit}>
		<input
			type="text"
			value={value}
			onChange={onChange}
		/>
		<button type="submit">
			{children}
		</button>
	</form>;

Search.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,
	children: PropTypes.node.isRequired,
};
