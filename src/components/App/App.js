import React, { PureComponent } from "react";
import './App.css';
import { Search } from "../Search/Search";
import { Table } from "../Table/Table";
import { list } from "../../mocks/list";

class App extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			list,
			searchTerm: ''
		};

	}

	onDismiss = id => {
		const updatedList = this.state.list.filter(item => item.objectID !== id);
		this.setState({ list: updatedList });
	};

	onSearchChange = event => {
		this.setState({ searchTerm: event.target.value });
	};

	render() {
		const { searchTerm, list } = this.state;
		return (
			<div className="page">
				<div className="interactions">
					<Search
						value={searchTerm}
						onChange={this.onSearchChange}>
						Поиск
					</Search>
				</div>
				<Table
					list={list}
					pattern={searchTerm}
					onDismiss={this.onDismiss}
				/>
			</div>
		);
	}
}

export default App;
