import React from "react";
import classNames from 'classnames';
import { Button } from "../Button/Button";

export const Sort = ({ sortKey, onSort, children, activeSortKey, isSortReverse }) => {
	const sortClass = classNames(
		'button-inline',
		{ 'button-active': sortKey === activeSortKey },
		{ 'button-reverse': sortKey === activeSortKey && isSortReverse === true },
	);
	return (
		<Button onClick={() => onSort(sortKey)} className={sortClass}>
			{children}
		</Button>
	)
};
