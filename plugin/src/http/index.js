const getBasePath = () => window.RNR.basePath || "http://localhost:3000";

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
    method: "POST",
    body: JSON.stringify({ id, rating, title, description: comment, author }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const http = {
  addNewReview,
};

export default http;