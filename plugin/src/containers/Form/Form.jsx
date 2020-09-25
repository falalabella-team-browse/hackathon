import React from "react";
import styled from "styled-components";
import { FilledButton } from "../../components/Button";
import Close from "../../components/Close";
import Heading from "../../components/Heading";
import ImagePicker from "../../components/ImagePicker";
import RatingView from "../../components/RatingView";
import TextArea from "../../components/TextArea";
import TextInput from "../../components/TextInput";

const Container = styled.div`
  position: relative;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  right: 4px;
  top: -4px;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Title = styled.p`
  margin-top: 18px;
  font-size: 15px;
  letter-spacing: 0.5px;
  margin-bottom: 7px;
`;

const ReviewForm = ({ onClose }) => {
  return (
    <Container>
      <Heading.H1>Tu opinión nos importa ¡Evalúa tu producto!</Heading.H1>
      <ModalCloseButton onClick={onClose}>
        <Close />
      </ModalCloseButton>

      <Title>Overall Rating</Title>
      <RatingView />

      <Title>Título del comentario</Title>
      <TextInput placeholder="Ejemplo: ¡Lo puedo llevar a todas partes!" />

      <Title>Comentario</Title>
      <TextArea placeholder="Es muy fácil de trasladar, es liviano y se cierra y abre fácilmente…" />

      <Title>Subir foto</Title>
      <ImagePicker />

      <FilledButton>Publicar comentario</FilledButton>
    </Container>
  );
};

export default ReviewForm;
