
const constants = require('../../configs/constants');

const handleResponse = (response, reply) => {
    if(response && response.error) {
        reply.code(response.status || 500).send({
            error : response.error
        });
        return
    }

    return reply.code(200).send({
        data : response
    });
};

const badRequest = (code = 400, reply,  msg = "Bad Request") => {
    return reply.code(code).send({
        error : {
            reason: msg
        }
    });
};

const postHandler = fastify => async (req, reply) => {
    const { entityId, rating = 0, title = "",  description = "", author = "" } = req.body;

    if(rating < 1 || rating > 5){
        badRequest(400, reply, "Invalid Rating")
    }
    
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

    handleResponse(response, reply)
};

const editHandler = fastify => async (req, reply) => {
    const { id, rating = 0, title = "",  description = ""} = req.body;

    if(rating < 1 || rating > 5){
        badRequest(400, reply)
    }
    
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

    handleResponse(response, reply)
};

const getHandler = fastify => async (req, reply) => {
    const { id } = req.params;

    const headers = {
        "Authorization": "Basic ZWxhc3RpYzptRG9HTFA1VmNuU3poNEVWeU4wek1FV0o="
    };

    const url = constants.GET_REVIEW_BYID_URL+`/${id}`;

    const response = await fastify.restClient.get(url, headers);

    handleResponse(response, reply)
};

const deleteHandler = fastify => async (req, reply) => {
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

    handleResponse(response, reply)
};

const markHelpFul = fastify => async (req, reply) => {
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

    handleResponse(response, reply)
};

const averageRatings = fastify => async (req, reply) => {

}

module.exports = async fastify => {
  fastify.post("/ratingsAndReviews", postHandler(fastify));
  fastify.post("/ratingsAndReviews/flag", markHelpFul(fastify));
  fastify.post("/ratingsAndReviews/edit", editHandler(fastify));
  fastify.get("/ratingsAndReviews/:id", getHandler(fastify));
  fastify.delete("/ratingsAndReviews/:id", deleteHandler(fastify));
  fastify.post("/averageRatings", averageRatings(fastify));
};
