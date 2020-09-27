import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Heading from '../../components/Heading';
import RatingView from '../../components/RatingView';
import ReviewSummary from '../../components/ReviewSummary';
import { OutlinedButton } from '../../components/Button';
import ReviewFilterContainer from '../Filters/Filters';
import ReviewsContainer from '../Reviews/Reviews';
import Modal from '../../components/Modal';
import ReviewForm from '../Form/Form';
import { useUser } from '../../Context/UserContext';
import http from '../../http';
import './emoji.css';

const getEmoji = {
	1: <span class="twa twa-pouting-face" title="Dissapointed"></span>,
	2: <span class="twa twa-unamused-face" title="Sad"></span>,
	3: <span class="twa twa-zipper-mouth" title="Neutral"></span>,
	4: <span class="twa twa-smiling-face" title="Happy"></span>,
	5: <span class="twa twa-star-struck" title="Excited"></span>,
};

const Container = styled.div`
	padding: 25px;
`;

const ReviewsSummarySection = styled.div`
	margin-top: 25px;
	display: flex;
	align-items: center;

	@media (max-width: 568px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

const RatingButtonContainer = styled.div`
	flex-grow: 1;
	text-align: right;

	@media (max-width: 568px) {
		width: 100%;
		margin-top: 25px;
	}
`;

const ContentContainer = styled.div`
	display: grid;

	@media (max-width: 568px) {
		grid-template-rows: 1fr auto;
		grid-row-gap: 48px;
	}

	@media (min-width: 568px) {
		grid-template-columns: 30% 70%;
		margin-top: 45px;
	}
`;

const Sentiment = styled.p`
	font-weight: 700;
	font-size: 16px;
	color: #4f585e;
	display: block;
`;

const AppShell = () => {
	const [showModal, setShowModal] = useState(false);
	const [data, setData] = useState({
		rating: 0,
		reviewCount: 0,
		ratings: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
		totalRating: 0,
	});
	const [counter, setCounter] = useState(1);
	const [averageSentiment, setAverageSentiment] = useState(0);

	const handleCreateModal = () => {
		setShowModal(true);
	};

	const user = useUser();

	const loadData = async () => {
		const data = await http.getAggregatedDetails(user.productId);

		if (data.success) {
			const { averageRating, totalNumberOfReviews, rating_buckets, averageSentiment } = data.body;
			setAverageSentiment(averageSentiment);
			let totalRating = 0;
			const ratings = rating_buckets.reduce((obj, { key, value }) => {
				totalRating += value;
				return {
					...obj,
					[key]: value,
				};
			}, {});

			setData({
				rating: Math.floor(averageRating * 10) / 10,
				reviewCount: totalNumberOfReviews,
				ratings,
				totalRating,
			});
		}
	};

	const refreshContent = () => {
		loadData();
		setCounter(counter + 1);
	};

	useEffect(() => {
		loadData();
	}, []);

	return (
		<Container>
			<Heading.H1>Comments</Heading.H1>

			<ReviewsSummarySection>
				<ReviewSummary rating={data.rating} count={data.reviewCount} />
				<RatingView rating={data.rating} />

				<RatingButtonContainer>
					<OutlinedButton onClick={handleCreateModal}>Write comment</OutlinedButton>
				</RatingButtonContainer>
			</ReviewsSummarySection>
			{averageSentiment > 0 ? (
				<Sentiment>Average sentiment : {getEmoji[Math.ceil(averageSentiment)]} </Sentiment>
			) : null}
			<ContentContainer>
				<ReviewFilterContainer ratings={data.ratings} totalRating={data.totalRating}></ReviewFilterContainer>
				<ReviewsContainer counter={counter}></ReviewsContainer>
			</ContentContainer>

			{showModal && (
				<Modal>
					<ReviewForm
						onClose={() => {
							setShowModal(false);
						}}
						onChange={refreshContent}
					/>
				</Modal>
			)}
		</Container>
	);
};

export default AppShell;
