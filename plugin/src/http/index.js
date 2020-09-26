const getBasePath = () => window.RNR.basePath || 'http://localhost:3000';

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

const addNewReview = async (id, rating, title, author, comment, images) => {
	return safeFetch(`${getBasePath()}/api/v1/ratingsAndReviews`, {
		method: 'POST',
		body: JSON.stringify({
			entityId: id,
			rating,
			title,
			description: comment,
			author,
			images,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

const getAllReviews = async (entityId, pageNo, sort) => {
	return safeFetch(
		`${getBasePath()}/api/v1/ratingsAndReviews?entityId=${entityId}&sort=${sort}&reviewStatus=Published&pageNo=${pageNo}`,
		{
			method: 'GET',
		}
	);
};

const increamenHelpfulCount = async body => {
	return safeFetch(`${getBasePath()}/api/v1/ratingsAndReviews/flag`, {
		method: 'POST',
		body: JSON.stringify({
			...body,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

const http = {
	addNewReview,
	getAllReviews,
	increamenHelpfulCount,
};

export default http;
