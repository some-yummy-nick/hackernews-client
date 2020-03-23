import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Table} from "./Table";

Enzyme.configure({adapter: new Adapter()});

const props = {
	list: [
		{ title: "title 1", author: "name 1", num_comments: 1, points: 2, objectID: "y" },
		{ title: "title 2", author: "name 2", num_comments: 1, points: 2, objectID: "z" },
	],
	sortKey: "TITLE",
	isSortReverse: false,
};

test("shows two items in list", () => {
	const element = shallow(
		<Table { ...props } />
	);
	expect(element.find(".table-row").length).toBe(2);
});
