import React, { Fragment } from 'react';
import styled from 'styled-components';
import './emoji.css';

const Container = styled.div`
	display: grid;
	grid-template-columns: 100px 1fr 80px;
	grid-row-gap: 6px;
	align-items: center;
`;

const Label = styled.span`
	font-size: 20px;
	color: #979b9c;
`;

const Bar = styled.div`
	background-color: #e7e7e7;
	height: 8px;
	position: relative;
	transition: 0.3s all linear;
	&:after {
		position: absolute;
		content: ' ';
		background-color: ${prop => prop.color};
		top: 0;
		left: 0;
		bottom: 0;
		width: ${prop => prop.value}%;
	}
`;

const Value = styled.span`
	font-size: 13px;
	color: #979b9c;
	margin-left: 12px;
`;

const getEmoji = {
	Disappointed: <span class="twa twa-pouting-face" title="Dissapointed"></span>,
	Sad: <span class="twa twa-unamused-face" title="Sad"></span>,
	Neutral: <span class="twa twa-zipper-mouth" title="Neutral"></span>,
	Happy: <span class="twa twa-smiling-face" title="Happy"></span>,
	Satisfied: <span class="twa twa-star-struck" title="Excited"></span>,
};

const LABELS = {
	rating: ['Poor', 'Below Average', 'Average', 'Good', 'Excellent'],
	sentiment: ['Disappointed', 'Sad', 'Neutral', 'Happy', 'Satisfied'],
	status: ['Published', 'Abusive', 'Removed'],
};

const statusMap = {
	1: 'Published',
	2: 'Abusive',
	3: 'Removed',
};

const COLORS = ['#ee3b11', '#f7a521', '#f7e731', '#a5d72f', '#4aa54a'];

const RatingBar = ({ ratings, totalRating, type }) => {
	const getValue = i => {
		const index = type == 'status' ? ratings[statusMap[i + 1]] : ratings[i + 1];
		return {
			value: totalRating ? Math.floor((index * 100) / totalRating) : 0,
			count: index,
			name: type == 'sentiment' ? getEmoji[LABELS['sentiment'][[i]]] : LABELS[type][i],
			color: COLORS[i],
		};
	};

	const data = LABELS[type].map((_, i) => getValue(i)).reverse();
	if (type === 'status') console.log('data ---> ', data);
	return (
		<Container>
			{data.map(row => (
				<Fragment key={row.name}>
					<Label>{row.name}</Label>
					<Bar value={row.value} color={row.color}></Bar>
					<Value>( {row.count} )</Value>
				</Fragment>
			))}
		</Container>
	);
};

export default RatingBar;
