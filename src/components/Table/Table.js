import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { SORTS } from "../../constants";
import { Button } from "../Button/Button";
import { Sort } from "../Sort/Sort";
import "./Table.css";

export class Table extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			sortKey: 'NONE',
			isSortReverse: false,
		};
	}

	onSort = (sortKey) => {
		const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
		this.setState({ sortKey, isSortReverse });
	};

	render() {
		const { list, onDismiss } = this.props;
		const { sortKey, isSortReverse } = this.state;
		const sortedList = SORTS[sortKey](list);
		const reverseSortedList = isSortReverse
			? sortedList.reverse()
			: sortedList;
		return (
			<div className="table">
				<div className="table-header">
					<Sort
						sortKey={"TITLE"}
						onSort={this.onSort}
						isSortReverse={isSortReverse}
						activeSortKey={sortKey}
					>
						Заголовок
					</Sort>
					<Sort
						sortKey={"AUTHOR"}
						onSort={this.onSort}
						isSortReverse={isSortReverse}
						activeSortKey={sortKey}
					>
						Автор
					</Sort>
					<Sort
						sortKey={"COMMENTS"}
						onSort={this.onSort}
						isSortReverse={isSortReverse}
						activeSortKey={sortKey}
					>
						Комментарии
					</Sort>
					<Sort
						sortKey={"POINTS"}
						onSort={this.onSort}
						isSortReverse={isSortReverse}
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
	}
}

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
