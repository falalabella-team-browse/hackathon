import React, { useEffect } from "react";
import styled from "styled-components";

const BodyWrapper = styled.div`
  background-color: #eee;
  padding-bottom: 20px;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 1280px;
  width: 100%;
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
    width : 100%;
    padding: 15px;
    display : flex;
    flex-direction : column;
    border: 1px solid #f0f0f0;
    background-color: #fff;
    position: relative;
`

const TabContainer = styled.div`
    display : flex;
    background-color: #fff;
    position: relative;
    width: 100%;
`

const Tabs = styled.div`
    width : 33%;
    margin : 0.15%;
    border: 1px solid #f0f0f0;
`

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
`

const Table = styled.table`
   width : 100%;

   tr {
       padding: 5px;
   }

   td {
      padding: 5px 15px;
      font-size : 12.5px;
   }
`

const Span = styled.span`
  font-size: 14px;
  color: #333;
  padding: 2px;
`;

const DangerText = styled.span`
  font-size: 14px;
  color: #e4022d;
  font-weight : bold;
  padding: 2px;
`;

const FlexWrapper = styled.div`
   display : flex;
   flex-direction: row;
   justify-content: flex-start;
   align-items: center;
`

const FilterContainer = styled.div`
    display : flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 20px 0;

    div {
        padding : 10px;
    }

    select {
        border : none;
        padding : 3px 10px;
        background : #eee;
        border-radius : 5px;
        margin-left : 5px;
    }

    input {
        border : none;
        padding : 3px 10px;
        border-bottom : 1px solid #ddd;
    }
`


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
     font-size: 12px
   }

   &.warning {
    background: #ffc107;
    font-size: 12px
   }

   &.success {
    background: #28a745;
    font-size: 12px
   }
`

const abused = [
    {
        "reviewId": "123",
        "author": "12",
        "entityId": "prod123",
        "title": "Good Product",
        "description": "very satisfied with the quality",
        "rating": 5,
        "helpful_count":0,
        "sentiment_factor":4,
        "reviewStatus": "Abusive"
    },
    {
        "reviewId": "123",
        "author": "12",
        "entityId": "prod123",
        "title": "Good Product",
        "description": "very satisfied with the quality",
        "rating": 5,
        "helpful_count":0,
        "sentiment_factor":4,
        "reviewStatus": "Published"
    },
    {
        "reviewId": "123",
        "author": "12",
        "entityId": "sku456",
        "title": "Bad Really",
        "description": "very annoyed",
        "rating": 5,
        "helpful_count":0,
        "sentiment_factor": 2,
        "reviewStatus": "Published"
    },
    {
        "reviewId": "123",
        "author": "12",
        "entityId": "prod123",
        "title": "Good Product",
        "description": "very satisfied with the quality",
        "rating": 5,
        "helpful_count":0,
        "sentiment_factor":4,
        "reviewStatus": "Published"
    },
    {
        "reviewId": "123",
        "author": "12",
        "entityId": "sku456",
        "title": "Bad Really",
        "description": "very annoyed",
        "rating": 5,
        "helpful_count":0,
        "sentiment_factor": -2,
        "reviewStatus": "Abusive"
    },
    {
        "reviewId": "123",
        "author": "12",
        "entityId": "prod123",
        "title": "Good Product",
        "description": "very satisfied with the quality",
        "rating": 5,
        "helpful_count":0,
        "sentiment_factor":4,
        "reviewStatus": "Abusive"
    },{
        "reviewId": "123",
        "author": "12",
        "entityId": "prod123",
        "title": "Good Product",
        "description": "very satisfied with the quality",
        "rating": 5,
        "helpful_count":0,
        "sentiment_factor":4,
        "reviewStatus": "Abusive"
    },
    {
        "reviewId": "123",
        "author": "12",
        "entityId": "prod123",
        "title": "Good Product",
        "description": "very satisfied with the quality",
        "rating": 5,
        "helpful_count":0,
        "sentiment_factor":4,
        "reviewStatus": "Published"
    },
    {
        "reviewId": "123",
        "author": "12",
        "entityId": "sku456",
        "title": "Bad Really",
        "description": "very annoyed",
        "rating": 5,
        "helpful_count":0,
        "sentiment_factor": 2,
        "reviewStatus": "Published"
    },
    {
        "reviewId": "123",
        "author": "12",
        "entityId": "prod123",
        "title": "Good Product",
        "description": "very satisfied with the quality",
        "rating": 5,
        "helpful_count":0,
        "sentiment_factor":4,
        "reviewStatus": "Published"
    },
    {
        "reviewId": "123",
        "author": "12",
        "entityId": "prod123",
        "title": "Good Product",
        "description": "very satisfied with the quality",
        "rating": 5,
        "helpful_count":0,
        "sentiment_factor":4,
        "reviewStatus": "Removed"
    },
    {
        "reviewId": "123",
        "author": "12",
        "entityId": "sku456",
        "title": "Bad Really",
        "description": "very annoyed",
        "rating": 5,
        "helpful_count":0,
        "sentiment_factor": -2,
        "reviewStatus": "Removed"
    },
    {
        "reviewId": "123",
        "author": "12",
        "entityId": "prod123",
        "title": "Good Product",
        "description": "very satisfied with the quality",
        "rating": 5,
        "helpful_count":0,
        "sentiment_factor":4,
        "reviewStatus": "Removed"
    },{
        "reviewId": "123",
        "author": "12",
        "entityId": "prod123",
        "title": "Good Product",
        "description": "very satisfied with the quality",
        "rating": 5,
        "helpful_count":0,
        "sentiment_factor":4,
        "reviewStatus": "Removed"
    },
    {
        "reviewId": "123",
        "author": "12",
        "entityId": "prod123",
        "title": "Good Product",
        "description": "very satisfied with the quality",
        "rating": 5,
        "helpful_count":0,
        "sentiment_factor":4,
        "reviewStatus": "Published"
    },
    {
        "reviewId": "123",
        "author": "12",
        "entityId": "sku456",
        "title": "Bad Really",
        "description": "very annoyed",
        "rating": 5,
        "helpful_count":0,
        "sentiment_factor": 2,
        "reviewStatus": "Published"
    },
    {
        "reviewId": "123",
        "author": "12",
        "entityId": "prod123",
        "title": "Good Product",
        "description": "very satisfied with the quality",
        "rating": 5,
        "helpful_count":0,
        "sentiment_factor":4,
        "reviewStatus": "Published"
    },{
        "reviewId": "123",
        "author": "12",
        "entityId": "prod123",
        "title": "Good Product",
        "description": "very satisfied with the quality",
        "rating": 5,
        "helpful_count":0,
        "sentiment_factor":4,
        "reviewStatus": "Published"
    }
]

const ReviewStatus = ({status}) => {
    if(status === 'Abusive'){
        return <DangerText>{status}</DangerText>
    }
    return status;
}

const EditReviewButtons = ({review}) => {
    if(review.reviewStatus === 'Abusive') {
        return(
            <FlexWrapper>
                <Button className="danger"> Remove </Button>
                <Button className="success"> Publish </Button>
            </FlexWrapper>
        )
    }

    if(review.reviewStatus === 'Removed') {
        return(
            <FlexWrapper>
                <Button className="success"> Publish </Button>
            </FlexWrapper>
        )
    }

    return(
        <FlexWrapper>
            <Button className="danger"> Remove </Button>
            <Button className="warning"> Abusive </Button>
        </FlexWrapper>
    )
}


const POD = ({review}) => {
    return (
        <tr>
            <td>{review.entityId}</td>
            <td>{review.title}</td>
            <td>{review.description}</td>
            <td>{review.sentiment_factor}</td>
            <td><ReviewStatus status={review.reviewStatus}></ReviewStatus></td>
            <td><EditReviewButtons review={review}></EditReviewButtons></td>
        </tr>
    )
}

const Admin = () => {
    return(
        <BodyWrapper>
            <Container>
                <ContentWrapper>
                    <Content>
                        <FilterContainer>
                            <div>
                                <label for="cars">Review Status:</label>
                                <select>
                                    <option> Abusive </option>
                                    <option> Removed </option>
                                    <option> Published </option>
                                </select>
                            </div>

                            <div>
                                <label for="cars">Sort By:</label>
                                <select>
                                    <option> Recent </option>
                                    <option> Helpul </option>
                                    <option> Sentiment </option>
                                </select>
                            </div>

                            <div>
                                <label for="cars">Search By Entity:</label>
                                <input  />
                            </div>

                            <div>
                                 <Button className="big success"> Search </Button>
                            </div>
                        </FilterContainer>

                        <Table>
                           <tr>
                             <th><Title> Entity </Title></th>
                             <th><Title> Title </Title></th>
                             <th><Title> Description </Title></th>
                             <th><Title> Sentiment </Title></th>
                             <th><Title> Status </Title></th>
                             <th><Title> Update </Title></th>
                            </tr>
                            {abused.map((item)=>(
                                <POD review={item} />
                            ))}
                        </Table>
                    </Content>
                </ContentWrapper>
            </Container>
        </BodyWrapper>
    )
}

export default Admin;