
const constants = require('../../configs/constants');

const postHandler = fastify => async (req, res) => {
    const { entityId, rating = 0, title = "",  description = "", author = "" } = req.body;
    
    const headers = {
        "Authorization": "Basic ZWxhc3RpYzptRG9HTFA1VmNuU3poNEVWeU4wek1FV0o="
    };

    const reqBody = {
        entityId,
        rating,
        title,
        description,
        author: 12,
        created_date: new Date(),
        modified_date: new Date(),
        isActive:true,
        verifiedPurchase:true,
        helpful_count:0,
        imageLink:[""],
        sentiment_factor:3,
        reviewStatus:"Published"
    }

    const response = await fastify.restClient.post(constants.CREAT_NEW_REVIEW_URL, reqBody, headers)

    return response;
};

const editHandler = fastify => async (req, res) => {
    const { id, rating = 0, title = "",  description = ""} = req.body;
    
    const headers = {
        "Authorization": "Basic ZWxhc3RpYzptRG9HTFA1VmNuU3poNEVWeU4wek1FV0o="
    };

    const reqBody = {
        doc : {
            rating,
            title,
            description,
            modified_date: new Date(),
            imageLink:[""],
            sentiment_factor:3,
            reviewStatus:"Published"
        }
    }

    const url = constants.UPDATE_REVIEW_URL+`/${id}`

    const response = await fastify.restClient.post(url, reqBody, headers)

    return response;
};

const getHandler = fastify => async (req, res) => {
    const { id } = req.params;

    const headers = {
        "Authorization": "Basic ZWxhc3RpYzptRG9HTFA1VmNuU3poNEVWeU4wek1FV0o="
    };

    const url = constants.GET_REVIEW_BYID_URL+`/${id}`;

    const response = await fastify.restClient.get(url, headers);

    console.log("response", response)

    return response
};

const deleteHandler = fastify => async (req, res) => {
    const { id } = req.params;

    const headers = {
        "Authorization": "Basic ZWxhc3RpYzptRG9HTFA1VmNuU3poNEVWeU4wek1FV0o="
    };

    const reqBody = {
        doc : {
            reviewStatus:"removed"
        }
    }

    const url = constants.UPDATE_REVIEW_URL+`/${id}`

    const response = await fastify.restClient.post(url, reqBody, headers)

    return response;
};

const markHelpFul = fastify => async (req, res) => {
    const { id, helpful_count } = req.body;

    const headers = {
        "Authorization": "Basic ZWxhc3RpYzptRG9HTFA1VmNuU3poNEVWeU4wek1FV0o="
    };

    const reqBody = {
        doc : {
            helpful_count
        }
    }

    const url = constants.UPDATE_REVIEW_URL+`/${id}`

    const response = await fastify.restClient.post(url, reqBody, headers)

    return response;
};

module.exports = async fastify => {
  fastify.post("/ratingsAndReviews", postHandler(fastify));
  fastify.post("/ratingsAndReviews/flag", markHelpFul(fastify));
  fastify.post("/ratingsAndReviews/edit", editHandler(fastify));
  fastify.get("/ratingsAndReviews/:id", getHandler(fastify));
  fastify.delete("/ratingsAndReviews/:id", deleteHandler(fastify));
};
