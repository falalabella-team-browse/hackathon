import React from 'react';
import styled from 'styled-components';
import { PieChart } from 'react-charts-d3';

const Container = styled.div`
	justify-items: center;
	align-items: center;
`;

const PieChartGraph = ({ data }) => {
	return (
		<Container>
			<PieChart data={data} />
		</Container>
	);
};

export default PieChartGraph;
