import React from "react";
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import {Table} from "./Table";

describe('Table', () => {
	const props = {
		list: [
			{ title: 'title 1', author: 'name 1', num_comments: 1, points: 2, objectID: 'y' },
			{ title: 'title 2', author: 'name 2', num_comments: 1, points: 2, objectID: 'z' },
		],
	};
	test('отрисовывает без ошибки', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Table { ...props } />, div);
	});
	test('есть корректный снимок', () => {
		const component = renderer.create(
			<Table { ...props } />
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
