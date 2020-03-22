import React, { PureComponent, Fragment } from "react";
import axios from 'axios';
import "./App.css";
import { Search } from "../Search/Search";
import { Table } from "../Table/Table";
import { Button } from "../Button/Button";

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_PAGE = 'page=';
const PARAM_SEARCH = "query=";
const DEFAULT_QUERY = "redux";

class App extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			data: null,
			searchKey: '',
			searchTerm: DEFAULT_QUERY,
			error: false
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
			}
		});
	};

	needsToSearchTopStories = (searchTerm) => {
		return !this.state.data[searchTerm];
	};

	fetchSearchTopStories = (searchTerm, page = 0) => {
		axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
			.then(response => this.setSearchTopStories(response.data))
			.catch(error => this.setState({ error }));
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

	componentDidMount() {
		const { searchTerm } = this.state;
		this.setState({ searchKey: searchTerm });
		this.fetchSearchTopStories(searchTerm);
	}

	render() {
		const { searchKey, searchTerm, data, error } = this.state;
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
						/>
						<div className="interactions">
							<Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
								Больше историй
							</Button>
						</div>
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
