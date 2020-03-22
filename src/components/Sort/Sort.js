import React from "react";
import { Button } from "../Button/Button";

export const Sort = ({ sortKey, onSort, children, activeSortKey }) => {
	const sortClass = ['button-inline'];
	if (sortKey === activeSortKey) {
		sortClass.push('button-active');
	}
	return (
		<Button onClick={() => onSort(sortKey)} className={sortClass.join(' ')}>
			{children}
		</Button>
	)
};

