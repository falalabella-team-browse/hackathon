import React from 'react';
import styled from 'styled-components';

const Rating = styled.p`
	font-size: 48px;
	font-weight: 900;
`;

const Summary = styled.p`
	font-weight: 700;
	font-size: 16px;
	color: #4f585e;
`;

const ReviewSummary = ({ rating, count }) => {
	return (
		<div>
			<Rating>{rating}</Rating>
			<Summary>based on {count} ratings</Summary>
		</div>
	);
};

export default ReviewSummary;
