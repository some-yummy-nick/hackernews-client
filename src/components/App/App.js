import React, { PureComponent } from "react";
import "./App.css";
import { Search } from "../Search/Search";
import { Table } from "../Table/Table";

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const DEFAULT_QUERY = "redux";

class App extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			list: null,
			searchTerm: DEFAULT_QUERY
		};

	}

	setSearchTopStories = (list) => {
		this.setState({ list });
	};

	fetchSearchTopStories = searchTerm => {
		fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
			.then(response => response.json())
			.then(list => this.setSearchTopStories(list.hits))
			.catch(error => error);
	};

	componentDidMount() {
		const { searchTerm } = this.state;
		this.fetchSearchTopStories(searchTerm);
	}

	onDismiss = id => {
		const updatedList = this.state.list.filter(item => item.objectID !== id);
		this.setState({ list: updatedList });
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
		const { searchTerm, list } = this.state;
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
				{list &&
				<Table
					list={list}
					onDismiss={this.onDismiss}
				/>
				}
			</div>
		);
	}
}

export default App;
