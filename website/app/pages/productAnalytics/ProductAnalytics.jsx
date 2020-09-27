import React, { useState, useEffect, Fragment } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import styled from 'styled-components';
import FullScreenLoader from '../../components/FullScreenLoader';
import restClients from '../../http/reviews';
import PieChartGraph from '../../components/graphs';
import { useHistory } from 'react-router-dom';
import RatingBar from '../../components/RatingsBar/RatingsBar';
import DonutChart from 'react-donut-chart';

const BodyWrapper = styled.div`
	padding-bottom: 20px;
`;

const Container = styled.div`
	margin: 0 auto;
	max-width: 1280px;
	width: 100%;
	font-size: 14px;
`;

const ContentWrapper = styled.div``;

const HeadContainer = styled.div`
	margin: auto;
`;

const GraphsGrid = styled.div`
	display: flex;
	justify-content: space-around;
	height: auto;
`;

const MarginedDiv = styled.div`
	h4 {
		margin-bottom: 50px;
	}
	width: 100%;
	min-height: 350px;
	text-align: center;
`;

const ProductAnalytics = () => {
	const [analyticsData, setAnalyticsData] = useState({});
	const [loading, setLoading] = useState(false);
	const pageType = window.location.search.split('=')[1];

	const getAnalyticsInfo = async () => {
		setLoading(true);
		const URL = window.location.pathname + window.location.search;
		const response = await restClients.getProductAnalytics(URL);
		response.success ? setAnalyticsData(response.body) : setReviewList([]);
		setLoading(false);
		return;
	};

	useEffect(() => {
		getAnalyticsInfo();
	}, []);

	const formDataForBar = (data = [], type) => {
		if (!data.length) return {};
		let ratings = {};
		let totalRating = 0;
		data.forEach(dt => {
			ratings[dt.key] = dt.value;
			totalRating += dt.value;
		});

		if (totalRating < 1) return {};
		return {
			ratings,
			totalRating,
			type,
		};
	};

	const formDataForChart = (data = []) => {
		return data.map(dt => {
			return {
				label: dt.key,
				value: dt.value,
			};
		});
	};

	const { rating_buckets, sentiment_buckets, review_status } = analyticsData;

	const ratingData = formDataForBar(rating_buckets, 'rating');
	const sentimentData = formDataForBar(sentiment_buckets, 'sentiment');
	const statusData = formDataForChart(review_status);
	const showRatings = Object.keys(ratingData).length;
	const showSentimentData = Object.keys(sentimentData).length;
	const showStatus = statusData.length;
	const noData = !loading && !showRatings && !showSentimentData && !showStatus;
	return (
		<BodyWrapper>
			<Container>
				<ContentWrapper>
					<Jumbotron>
						<HeadContainer>
							<div>
								<h1>{pageType == 'sku' ? 'Product' : 'User'} Analytics : </h1>
							</div>
						</HeadContainer>
					</Jumbotron>
					{noData && (
						<MarginedDiv>
							<h1>No data available for the {pageType == 'sku' ? 'Product' : 'User'} </h1>
						</MarginedDiv>
					)}
					<GraphsGrid>
						<MarginedDiv>
							{showRatings ? (
								<Fragment>
									<h4>Rating distribution </h4>
									<RatingBar {...ratingData} />
								</Fragment>
							) : (
								loading && <span>Loading Ratings...</span>
							)}
						</MarginedDiv>
						<MarginedDiv>
							{showSentimentData ? (
								<Fragment>
									<h4>Sentiments analysed </h4>
									<RatingBar {...sentimentData} />
								</Fragment>
							) : (
								loading && <span>Loading Sentiments...</span>
							)}
						</MarginedDiv>
					</GraphsGrid>
					<GraphsGrid>
						<MarginedDiv>
							{showStatus ? (
								<Fragment>
									<h4>Review status distribution </h4>
									<DonutChart data={statusData} />
								</Fragment>
							) : (
								loading && <span>Loading Status...</span>
							)}
						</MarginedDiv>
					</GraphsGrid>
					{loading && <FullScreenLoader />}
				</ContentWrapper>
			</Container>
		</BodyWrapper>
	);
};

export default ProductAnalytics;
