import React, { PureComponent } from "react";
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
			searchTerm: DEFAULT_QUERY
		};

	}

	setSearchTopStories = data => {
		const { hits, page } = data;
		const oldHits = page !== 0
			? this.state.data.hits
			: [];
		const updatedHits = [
			...oldHits,
			...hits
		];
		this.setState({
			data: { hits: updatedHits, page }
		});
	};

	fetchSearchTopStories = (searchTerm, page = 0) => {
		fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
			.then(response => response.json())
			.then(data => this.setSearchTopStories(data))
			.catch(error => error);
	};

	componentDidMount() {
		const { searchTerm } = this.state;
		this.fetchSearchTopStories(searchTerm);
	}

	onDismiss = id => {
		const updatedList = this.state.data.hits.filter(item => item.objectID !== id);
		this.setState({
			data: {
				...this.state.data,
				hits: updatedList
			}
		});
	};

	onSearchChange = event => {
		this.setState({ searchTerm: event.target.value });
	};

	onSearchSubmit = event => {
		event.preventDefault();
		const { searchTerm } = this.state;
		this.fetchSearchTopStories(searchTerm);
	};

	render() {
		const { searchTerm, data } = this.state;
		const page = (data && data.page) || 0;

		return (
			<div className="page">
				<div className="interactions">
					<Search
						value={searchTerm}
						onChange={this.onSearchChange}
						onSubmit={this.onSearchSubmit}
					>
						Поиск
					</Search>
				</div>
				{data &&
				<Table
					list={data.hits}
					onDismiss={this.onDismiss}
				/>
				}
				<div className="interactions">
					<Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
						Больше историй
					</Button>
				</div>
			</div>
		);
	}
}

export default App;
