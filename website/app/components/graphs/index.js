import React from 'react';
import styled from 'styled-components';
import { PieChart } from 'react-charts-d3';

const Container = styled.div`
	justify-items: center;
	align-items: center;
`;

const PieChartGraph = () => {
	return (
		<Container>
			<PieChart
				data={[
					{ label: 'Abusive', value: 23 },
                    { label: 'Published', value: 56 },
                    { label: 'Removed', value: 5 },
				]}
			/>
		</Container>
	);
};

export default PieChartGraph;
