import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const PdpBody = styled.div`
  background-color: #eee;
  padding-bottom: 20px;
  min-height: 100vh;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 1280px;
  width: 100%;
  padding: 25px;
`;

const AdditionInformationContainer = styled.div`
  background-color: #fff;
  padding-top: 30px;
`;

const UserLanding = () => {
  const { userId, productId } = useParams();

  useEffect(() => {
    const timer = setInterval(() => {
      if (RNR) {
        clearInterval(timer);

        const element = document.getElementById("reviews");
        RNR.setHost(process.env.BASE_URL);
        RNR.loadUserPanel(element, {
          userId: userId,
        });
      }
    }, 300);
  });

  return (
    <PdpBody>
      <Container>
        <AdditionInformationContainer>
          <div id="reviews"></div>
        </AdditionInformationContainer>
      </Container>
    </PdpBody>
  );
};

export default UserLanding;
