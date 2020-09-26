import React, { useState } from "react";
import styled from "styled-components";
import { ImagePicker } from "react-file-picker";
import Camera from "./Camera";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100px;
  height: 100px;
  background-color: #e7e7e7;
  border: none;
  cursor: pointer;
  outline: none;
  border-radius: 5px;
`;

const ReviewImagePicker = ({ images, setImages }) => {
  const onNewImage = (img) => {
    setImages([...images, img]);
  };

  return (
    <Container>
      {images.map((img) => (
        <Image src={img} key={img.substr(0, 100)}></Image>
      ))}

      {images.length < 5 && (
        <ImagePicker
          extensions={["jpg", "jpeg", "png"]}
          dims={{
            minWidth: 100,
            maxWidth: 50000,
            minHeight: 100,
            maxHeight: 50000,
          }}
          onChange={onNewImage}
          onError={(errMsg) => console.log(errMsg)}
        >
          <Button>
            <Camera />
          </Button>
        </ImagePicker>
      )}
    </Container>
  );
};

export default ReviewImagePicker;
