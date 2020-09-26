import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { getRelativeTime } from '../utils';
import Cart from './Cart';
import Heading from './Heading';
import RatingView from './RatingView';
import Thumbs from './Thumbs';
import http from '../http';

const Container = styled.div`
	border: 1px solid #e8e8e8;
	padding: 15px;
	border-radius: 5px;
	margin-bottom: 12px;
`;

const Metadata = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Actions = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 12px;
`;

const Time = styled.span`
	font-size: 12px;
	color: #999999;
`;

const Content = styled.pre`
	margin-top: 10px;
	font-size: 15px;
	white-space: pre-wrap;
	font-family: 'Lato', sans-serif !important;
	line-height: 17px;
`;

const Verified = styled.p`
	font-size: 12px;
	display: flex;
	align-items: center;
	padding: 8px 0;
	border-radius: 22px;
	color: #7e9e00;
	font-weight: 700;
`;

const Helpful = styled.p`
	font-size: 12px;
	color: #626262;
	display: flex;
	align-items: center;
`;

const ActionButton = styled.button`
	outline: none;
	border: none;
	background-color: transparent;
	padding: 6px 8px;
	cursor: pointer;

	&:hover {
		background: #dbdbdb;
		border-radius: 100px;
	}
`;

const ExpandButton = styled.a`
	cursor: pointer;
	color: #4b4bcf;
	text-decoration: none;
	cursor: pointer;
`;

const ReviewBlock = ({ review }) => {
	const { id, helpful_count, description, title, verifiedPurchase, rating, modified_date, sentiment } = review;

	const [expanded, setExpanded] = useState(false);
	const [hfCount, setHfCount] = useState(helpful_count || 0);

	const handleExpansion = e => {
		e.preventDefault();
		setExpanded(!expanded);
	};

	const updateHelpFulContent = e => {
		e.preventDefault();
		setHfCount(hfCount + 1);
		http.increamenHelpfulCount({
			id,
			helpful_count: hfCount + 1,
			description,
			title,
			verifiedPurchase,
			rating,
			modified_date,
			sentiment,
		});
	};

	return rating !== 0 || title || description ? (
		<Container>
			<Metadata>
				<RatingView rating={rating} size={15}></RatingView>
				<Time>{getRelativeTime(modified_date)}</Time>
			</Metadata>
			<Heading.H4>{title}</Heading.H4>
			<Content>
				{expanded ? description : description.substring(0, 350)}
				{description.length > 350 && (
					<Fragment>
						&nbsp;&nbsp;{' '}
						<ExpandButton href="#" onClick={handleExpansion}>
							{expanded ? 'Read Less' : 'Read More'}
						</ExpandButton>
					</Fragment>
				)}
			</Content>
			<Actions>
				<Verified>
					{verifiedPurchase && (
						<Fragment>
							<Cart />
							&nbsp; &nbsp; Verified Purchase
						</Fragment>
					)}
				</Verified>
				<Helpful>
					<ActionButton onClick={updateHelpFulContent}>
						<Thumbs />
					</ActionButton>
					&nbsp;&nbsp;{' '}
					{hfCount ? (
						<span style={{ color: 'green' }}>
							<strong>{hfCount} </strong>People found it useful.{' '}
						</span>
					) : (
						'Do you find it useful.. ?'
					)}
				</Helpful>
			</Actions>
		</Container>
	) : (
		<Fragment />
	);
};

export default ReviewBlock;
