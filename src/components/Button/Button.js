import React from "react";
import './Button.css';

const emptyFunction = () => {
};

export const Button = ({ onClick = emptyFunction, className = "", children }) =>
	<button onClick={onClick} className={className} type="button">
		{children}
	</button>;
