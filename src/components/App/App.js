import React, { PureComponent, Fragment } from "react";
import axios from 'axios';
import "./App.css";
import { PATH_BASE, PATH_SEARCH, PARAM_PAGE, PARAM_SEARCH, DEFAULT_QUERY } from "../../constants";
import { Search } from "../Search/Search";
import { Table } from "../Table/Table";
import { Button } from "../Button/Button";
import { Loading } from "../Loading/Loading";
import { WithLoading } from "../WithLoading/WithLoading";

const ButtonWithLoading = WithLoading(Button);

class App extends PureComponent {
	_isMounted = false;

	constructor(props) {
		super(props);

		this.state = {
			data: null,
			searchKey: '',
			searchTerm: DEFAULT_QUERY,
			error: false,
			isLoading: false,
			sortKey: 'NONE',
			isSortReverse: false,
		};

	}

	setSearchTopStories = result => {
		const { hits, page } = result;
		const { searchKey } = this.state;
		const results = this.state.data;
		const oldHits = results && results[searchKey]
			? results[searchKey].hits
			: [];
		const updatedHits = [
			...oldHits,
			...hits
		];
		this.setState({
			data: {
				...results,
				[searchKey]: { hits: updatedHits, page }
			},
			isLoading: false
		});
	};

	needsToSearchTopStories = (searchTerm) => {
		return !this.state.data[searchTerm];
	};

	fetchSearchTopStories = (searchTerm, page = 0) => {
		this.setState({ isLoading: true });
		axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
			.then(response => this._isMounted && this.setSearchTopStories(response.data))
			.catch(error => this._isMounted && this.setState({ error }));
	};

	onDismiss = id => {
		const { searchKey, data } = this.state;
		const { hits, page } = data[searchKey];
		const updatedList = hits.filter(item => item.objectID !== id);
		this.setState({
			data: {
				...data,
				[searchKey]: { hits: updatedList, page }
			}
		});
	};

	onSearchChange = event => {
		this.setState({ searchTerm: event.target.value });
	};

	onSearchSubmit = event => {
		event.preventDefault();
		const { searchTerm } = this.state;
		this.setState({ searchKey: searchTerm });
		if (this.needsToSearchTopStories(searchTerm)) {
			this.fetchSearchTopStories(searchTerm);
		}
	};

	onSort = (sortKey) => {
		const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
		this.setState({ sortKey, isSortReverse });
	};

	componentDidMount() {
		this._isMounted = true;
		const { searchTerm } = this.state;
		this.setState({ searchKey: searchTerm });
		this.fetchSearchTopStories(searchTerm);
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		const {
			searchKey, searchTerm, data, error, isLoading, sortKey,isSortReverse
		} = this.state;
		const page = (
			data &&
			data[searchKey] &&
			data[searchKey].page
		) || 0;

		const list = (
			data &&
			data[searchKey] && data[searchKey].hits
		) || [];


		return (
			<div className="page">
				{isLoading ?
					<Loading/>
					: ""
				}

				{list.length ?
					<Fragment>
						<div className="interactions">

							<Search
								value={searchTerm}
								onChange={this.onSearchChange}
								onSubmit={this.onSearchSubmit}
							>
								Поиск
							</Search>
						</div>
						< Table
							list={list}
							onDismiss={this.onDismiss}
							sortKey={sortKey}
							onSort={this.onSort}
							isSortReverse={isSortReverse}
						/>
						<ButtonWithLoading isLoading={isLoading}
										   onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
							Больше историй
						</ButtonWithLoading>
					</Fragment>
					: ""
				}
				{error ?
					<div className="interactions">
						<p>Что-то произошло не так.</p>
					</div>
					: ""
				}

			</div>
		);
	}
}

export default App;
