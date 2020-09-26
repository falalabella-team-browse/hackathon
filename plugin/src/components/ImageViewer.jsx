import React, { useState } from "react";
import styled from "styled-components";
import http from "../http";
import Close from "./Close";
import DownArrow from "./DownArrow";

const Container = styled.div`
  display: flex;
  margin: 12px 0;
`;

const Images = styled.div`
  height: 60px;
  width: 60px;
  background: #d9d9d9 url(${(props) => props.src});
  margin-right: 10px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;

const FullscreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
  position: fixed;
  top: 0;
  right: 0;
  background-color: #414040;
  border: none;
  outline: none;
  padding: 15px;
  cursor: pointer;
  z-index: 10;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  transform: translateX(-${(props) => props.index * 100}vw);
  transition: 0.3s all ease-in-out;
`;

const ImageWrapper = styled.div`
  min-width: 100vw;
  text-align: center;
`;

const Image = styled.img`
  max-width: 90vh;
`;

const ActionButtonLeft = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: #414040;
  padding: 30px 12px;
  z-index: 10;
  cursor: pointer;
`;
const ActionButtonRight = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: #414040;
  padding: 30px 12px;
  z-index: 10;
  cursor: pointer;
`;

const ImageViewer = ({ links }) => {
  const urls = http.getImageUrls(links);

  const [fullscreen, setFullscreen] = useState(false);
  const [selected, setSelected] = useState(0);

  const onImageClick = (i) => () => {
    setSelected(i);
    setFullscreen(true);
  };

  const handleClose = () => {
    setFullscreen(false);
  };

  const changeImage = (delta) => () => {
    setSelected(selected + delta);
  };

  return (
    <Container>
      {urls.map((url, i) => (
        <Images key={url} src={url} onClick={onImageClick(i)} />
      ))}
      {fullscreen && (
        <FullscreenContainer>
          <CloseButton onClick={handleClose}>
            <Close size="25px" fill="#b9b9b9" />
          </CloseButton>

          {selected !== 0 && (
            <ActionButtonLeft onClick={changeImage(-1)}>
              <DownArrow fill="#b9b9b9" rotate="90" />
            </ActionButtonLeft>
          )}

          <ImageContainer index={selected}>
            {urls.map((url, i) => (
              <ImageWrapper key={url}>
                <Image src={url}></Image>
              </ImageWrapper>
            ))}
          </ImageContainer>

          {selected !== urls.length - 1 && (
            <ActionButtonRight onClick={changeImage(1)}>
              <DownArrow fill="#b9b9b9" rotate="-90" />
            </ActionButtonRight>
          )}
        </FullscreenContainer>
      )}
    </Container>
  );
};

export default ImageViewer;
