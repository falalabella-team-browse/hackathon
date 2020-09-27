import React, { useState, useEffect } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import styled from 'styled-components';
import restClients from '../../http/reviews';
import FullScreenLoader from '../../components/FullScreenLoader';
import './emoji.css';

const BodyWrapper = styled.div`
	background-color: #eee;
	padding-bottom: 20px;
`;

const Container = styled.div`
	margin: 0 auto;
	max-width: 1280px;
	width: 100%;
	font-size: 14px;
`;

const ContentWrapper = styled.div`
	background-color: #fff;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: flex-start;
	padding-top: 40px;
	padding: 20px;
`;

const PODCONTAINER = styled.div`
	width: 100%;
	padding: 15px;
	display: flex;
	flex-direction: column;
	border: 1px solid #f0f0f0;
	background-color: #fff;
	position: relative;
`;

const TabContainer = styled.div`
	display: flex;
	background-color: #fff;
	position: relative;
	width: 100%;
`;

const Tabs = styled.div`
	width: 33%;
	margin: 0.15%;
	border: 1px solid #f0f0f0;
`;

const Title = styled.div`
	font-size: 14px;
	display: flex;
	color: #fff;
	font-weight: bold;
	padding: 2px;
	align-items: center;
	justify-content: flex-start;
	padding: 5px 15px;
	background: #0062cc;
`;

const Table = styled.table`
	width: 100%;

	tr {
		padding: 10px 5px;
		border-bottom: 1px solid #eee;
	}

	td {
		padding: 5px 15px;
		font-size: 12.5px;
		max-width: 350px;
	}
`;

const Span = styled.span`
	font-size: 14px;
	color: #333;
	padding: 2px;
`;

const DangerText = styled.span`
	font-size: 14px;
	color: #e4022d;
	font-weight: bold;
	padding: 2px;
`;

const FlexWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`;

const FilterContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 20px 0;

	div {
		padding: 10px;
	}

	select {
		border: none;
		padding: 3px 10px;
		background: #eee;
		border-radius: 5px;
		margin-left: 5px;
	}

	input {
		border: none;
		padding: 3px 10px;
		border-bottom: 1px solid #ddd;
	}
`;

const Button = styled.button`
	outline: none;
	border: none;
	padding: 5px;
	text-align: center;
	color: #fff;
	font-weight: 500;
	cursor: pointer;
	line-height: 14px;
	border-radius: 4px;
	margin: 5px;

	&.big {
		line-height: 25px;
		font-size: 16px !important;
		padding: 5px 40px;
	}

	&.danger {
		background: #e4022d;
		font-size: 12px;
	}

	&.warning {
		background: #ffc107;
		font-size: 12px;
	}

	&.success {
		background: #28a745;
		font-size: 12px;
	}
`;

const Admin = () => {
	const [loading, setLoading] = useState(false);
	const [reviewsList, setReviewList] = useState([]);
	const [reviewStatus, setReviewStatus] = useState('Abusive');
	const [reviewSortBy, setReviewSortBy] = useState('created_date:desc');
	const [entity, setEntity] = useState('');
	const [penCount, setPenCount] = useState(0);

	const sortOptions = [
		{ label: 'Relevant', value: 'review_score:desc' },
		{ label: 'Recent', value: 'created_date:desc' },
		{ label: 'High to low', value: 'rating:desc' },
		{ label: 'Low to high', value: 'rating:asc' },
		{ label: 'Most Helpful', value: 'helpful_count:desc' },
	];

	const setResponse = response => {
		const total = Math.floor(response.body.data.meta.total / 10);
		setReviewList(response.body.data.data);
		setPenCount(total);
	};

	const datafetcher = async initQuery => {
		setLoading(true);
		const response = await restClients.getAllReviews(initQuery);
		response.success ? setResponse(response) : setReviewList([]);
		setLoading(false);
		return;
	};

	const ReviewStatus = ({ status }) => {
		if (status === 'Abusive') {
			return <DangerText>{status}</DangerText>;
		}
		return status;
	};

	const updateReview = async (reviewId, status) => {
		setLoading(true);
		const response = await restClients.updateStatus(reviewId, status);
		const filteredData = await reviewsList.filter(item => item.id !== reviewId);
		setReviewList(filteredData);
		setLoading(false);
		return response;
	};

	const EditReviewButtons = ({ review }) => {
		const { id } = review;
		if (review.reviewStatus === 'Abusive') {
			return (
				<FlexWrapper>
					<Button className="danger" onClick={() => updateReview(id, 'Removed')}>
						{' '}
						Remove{' '}
					</Button>
					<Button className="success" onClick={() => updateReview(id, 'Published')}>
						{' '}
						Publish{' '}
					</Button>
				</FlexWrapper>
			);
		}

		if (review.reviewStatus === 'Removed') {
			return (
				<FlexWrapper>
					<Button className="success" onClick={() => updateReview(id, 'Published')}>
						{' '}
						Publish{' '}
					</Button>
				</FlexWrapper>
			);
		}

		return (
			<FlexWrapper>
				<Button className="danger" onClick={() => updateReview(id, 'Removed')}>
					{' '}
					Remove{' '}
				</Button>
				<Button className="warning" onClick={() => updateReview(id, 'Abusive')}>
					{' '}
					Abusive{' '}
				</Button>
			</FlexWrapper>
		);
	};

	const getEmoji = {
		1: <span class="twa twa-pouting-face" title="Dissapointed"></span>,
		2: <span class="twa twa-unamused-face" title="Sad"></span>,
		3: <span class="twa twa-zipper-mouth" title="Neutral"></span>,
		4: <span class="twa twa-smiling-face" title="Happy"></span>,
		5: <span class="twa twa-star-struck" title="Excited"></span>,
	};

	const POD = ({ review }) => {
		return (
			<tr>
				<td>
					<a href={`/analytics/${review.entityId}?entityType=sku`}>{review.entityId}</a>
				</td>
				<td>
					<a href={`/analytics/${review.author}?entityType=author`}>{review.author}</a>
				</td>
				<td>{review.title}</td>
				<td>{review.description}</td>
				<td>{review.rating}</td>
				<td>{getEmoji[review.sentiment]}</td>
				<td>
					<ReviewStatus status={review.reviewStatus}></ReviewStatus>
				</td>
				<td>
					<EditReviewButtons review={review}></EditReviewButtons>
				</td>
			</tr>
		);
	};

	const statusChangeHandler = e => {
		e.target.value && setReviewStatus(e.target.value);
	};

	const sortByChangeHandler = e => {
		setReviewSortBy(e.target.value);
	};

	const searchByEntity = e => {
		setEntity(e.target.value);
	};

	const handleSearch = () => {
		let query = '';
		if (reviewStatus) {
			query = query.concat(`reviewStatus=${reviewStatus}&`);
		}
		if (reviewSortBy) {
			query = query.concat(`sort=${reviewSortBy}&`);
		}
		if (entity) {
			query = query.concat(`entityId=${entity}`);
		}
		datafetcher(query);
	};

	const handlePaginationSearch = page => {
		let query = '';
		if (reviewStatus) {
			query = query.concat(`reviewStatus=${reviewStatus}&`);
		}
		if (reviewSortBy) {
			query = query.concat(`sort=${reviewSortBy}&`);
		}
		if (entity) {
			query = query.concat(`entityId=${entity}`);
		}
		if (page) {
			query = query.concat(`pageNo=${page}`);
		}
		datafetcher(query);
	};

	const handlePageClick = (e, page) => {
		handlePaginationSearch(page - 1);
	};

	useEffect(() => {
		handleSearch();
	}, [reviewStatus, reviewSortBy]);

	return (
		<BodyWrapper>
			<Container>
				<ContentWrapper>
					<Content>
						<FilterContainer>
							<div>
								<label for="cars">Review Status:</label>
								<select value={reviewStatus} onChange={statusChangeHandler}>
									<option value="Abusive"> Abusive </option>
									<option value="Removed"> Removed </option>
									<option value="Published"> Published </option>
								</select>
							</div>

							<div>
								<label for="cars">Sort By:</label>
								<select value={reviewSortBy} onChange={sortByChangeHandler}>
									<option value=""> default </option>
									{sortOptions.map(item => (
										<option value={item.value} key={item.value}>
											{item.label}
										</option>
									))}
								</select>
							</div>

							<div>
								<label for="cars">Search By Entity:</label>
								<input placeholder="Product Id" value={entity} onChange={searchByEntity} />
							</div>

							<div>
								<Button className="big success" onClick={handleSearch}>
									{' '}
									Search{' '}
								</Button>
							</div>
						</FilterContainer>

						<Table>
							<tr>
								<th>
									<Title> Entity </Title>
								</th>
								<th>
									<Title>Author</Title>
								</th>
								<th>
									<Title> Title </Title>
								</th>
								<th>
									<Title> Description </Title>
								</th>
								<th>
									<Title>Rating</Title>
								</th>
								<th>
									<Title> Sentiment </Title>
								</th>
								<th>
									<Title> Status </Title>
								</th>
								<th>
									<Title> Update </Title>
								</th>
							</tr>
							{reviewsList.map(item => (
								<POD review={item} />
							))}
						</Table>

						<div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
							<Pagination
								count={penCount}
								variant="outlined"
								shape="rounded"
								onChange={handlePageClick}
								color="primary"
							/>
						</div>

						{loading && <FullScreenLoader />}
					</Content>
				</ContentWrapper>
			</Container>
		</BodyWrapper>
	);
};

export default Admin;
