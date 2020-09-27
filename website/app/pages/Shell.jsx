import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import ProductLanding from './Product/ProductLanding';
import Admin from './Admin/Admin';
import UserLanding from './User';
import ProductAnalytics from './productAnalytics/ProductAnalytics';

const Shell = () => {
	return (
		<Switch>
			<Route path="/admin" exact>
				<Admin />
			</Route>
			<Route path="/analytics/:id" exact>
				<ProductAnalytics />
			</Route>
			<Route path="/:userId" exact>
				<UserLanding />
			</Route>
			<Route path="/:userId/:productId" exact>
				<ProductLanding />
			</Route>
		</Switch>
	);
};

export default Shell;
