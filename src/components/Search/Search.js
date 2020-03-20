import React from "react";

export const Search = ({ value, onChange, children }) =>
	<form>
		{children} {" "}
		<input
			type="text"
			value={value}
			onChange={onChange}
		/>
	</form>;
