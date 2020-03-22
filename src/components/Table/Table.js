import React from "react";
import PropTypes from 'prop-types';
import { SORTS } from "../../constants";
import { Button } from "../Button/Button";
import { Sort } from "../Sort/Sort";
import './Table.css';

export const Table = ({ list, onDismiss, sortKey, onSort, isSortReverse }) => {
	const sortedList = SORTS[sortKey](list);
	const reverseSortedList = isSortReverse
		? sortedList.reverse()
		: sortedList;
	return (
		<div className="table">
			<div className="table-header">
				<Sort
					sortKey={'TITLE'}
					onSort={onSort}
					activeSortKey={sortKey}
				>
					Заголовок
				</Sort>
				<Sort
					sortKey={'AUTHOR'}
					onSort={onSort}
					activeSortKey={sortKey}
				>
					Автор
				</Sort>
				<Sort
					sortKey={'COMMENTS'}
					onSort={onSort}
					activeSortKey={sortKey}
				>
					Комментарии
				</Sort>
				<Sort
					sortKey={'POINTS'}
					onSort={onSort}
					activeSortKey={sortKey}
				>
					Очки
				</Sort>
			</div>
			{reverseSortedList.map(item =>
				<div key={item.objectID} className="table-row">
						<span>
						<a href={item.url}>{item.title}</a>
						</span>
					<span>{" "}{item.author}</span>
					<span>{" "}{item.num_comments}</span>
					<span>{" "}{item.points}{" "}</span>
					<span>
						<Button onClick={() => onDismiss(item.objectID)} className="button-inline">
							Отбросить
						</Button>
						</span>
				</div>
			)}
		</div>
	);
};

Table.propTypes = {
	list: PropTypes.arrayOf(
		PropTypes.shape({
			objectID: PropTypes.string.isRequired,
			author: PropTypes.string,
			url: PropTypes.string,
			num_comments: PropTypes.number,
			points: PropTypes.number,
		})
	).isRequired,
	onDismiss: PropTypes.func,
};
