const getBasePath = () => 'http://localhost:3000';

const safeFetch = async (...props) => {
	const response = await fetch(...props);

	if (response.ok) {
		return {
			success: true,
			body: await response.json(),
		};
	}

	return {
		success: false,
		body: await response.text(),
	};
};

const updateStatus = async (reviewId, status) => {
	return safeFetch(`${getBasePath()}/api/v1/ratingsAndReviews/updateStatus`, {
		method: 'POST',
		body: JSON.stringify({ reviewId, status }),
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

const getAllReviewsForEntity = async (entityId, pageNo) => {
	return safeFetch(`${getBasePath()}/api/v1/ratingsAndReviews`, {
		method: 'POST',
		body: JSON.stringify({ pageNo, entityId }),
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

const getAllReviews = async (query = '') => {
	const url = query
		? `${getBasePath()}/api/v1/ratingsAndReviews?${query}`
		: `${getBasePath()}/api/v1/ratingsAndReviews`;
	return safeFetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

const restClients = {
	updateStatus,
	getAllReviewsForEntity,
	getAllReviews,
};

export default restClients;
