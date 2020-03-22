import React from "react";
import { Loading } from "../Loading/Loading";

export const WithLoading = (Component) => ({ isLoading, ...rest }) =>
	<div className="interactions">
		{
			isLoading
				? <Loading/>
				: <Component {...rest} />
		}
	</div>;
