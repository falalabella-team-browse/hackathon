import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FilledButton } from "../../components/Button";
import CircularLoader from "../../components/CircluarLoader";
import Close from "../../components/Close";
import DoneIcon from "../../components/DoneIcon";
import ErrorIcon from "../../components/ErrorIcon";
import Heading from "../../components/Heading";
import ImagePicker from "../../components/ImagePicker";
import RatingView from "../../components/RatingView";
import TextArea from "../../components/TextArea";
import TextInput from "../../components/TextInput";
import WarningIcon from "../../components/WarningIcon";
import { useUser } from "../../Context/UserContext";
import http from "../../http";

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

const STATUS_CONTAINER = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 440px;
  flex-direction: column;
  position: relative;
`;

const STATUS_TEXT = styled.p`
  margin-top: 25px;
  font-weight: 300;
`;

const ErrorText = styled.p`
  font-size: 15px;
  text-align: center;
  background-color: #e24c4b;
  padding: 12px 0;
  color: white;
  border-radius: 5px;
`;

const VIEW_LOADING = "Loading";
const VIEW_ERROR = "Error";
const VIEW_BLOCKED = "Blocked";
const VIEW_LOADED = "Loaded";
const VIEW_SUCCESS = "Success";

const ReviewForm = ({ onClose, onChange, edit, value }) => {
  const [view, setView] = useState(VIEW_LOADED);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const user = useUser();

  const [data, setData] = useState({
    rating: 0,
    title: "",
    content: "",
    id: "",
  });

  const handleChange = (key) => (e) => {
    setData({
      ...data,
      [key]: e.target.value,
    });
  };

  useEffect(() => {
    if (value) {
      setData({
        id: value.id,
        rating: value.rating,
        title: value.title,
        content: value.description,
      });

      setImages(value.imageLink.filter(Boolean));
    }
  }, [value]);

  const onSubmit = () => {
    setError("");

    const { rating, title, content } = data;

    if (!rating) {
      setError("Please provide a rating");
      return;
    }

    if ((title && !content) || (!title && content)) {
      setError("Please provide title and comment");
      return;
    }

    if (title && title.length > 160) {
      setError("Title can be only 160 character long");
      return;
    }

    setView(VIEW_LOADING);

    const promise = edit
      ? http.updateReview(
          data.id,
          data.rating,
          data.title,
          data.content,
          images
        )
      : http.addNewReview(
          user.productId,
          data.rating,
          data.title,
          user.userId,
          data.content,
          images
        );

    promise
      .then((res) => {
        if (!res.success) {
          setView(VIEW_ERROR);
        } else if (res.success && res.body.reviewStatus === "Published") {
          setView(VIEW_SUCCESS);
          onChange();
        } else {
          setView(VIEW_BLOCKED);
        }
      })
      .catch((error) => {
        setView(VIEW_ERROR);
        console.log(error);
      });
  };

  const handleRatingChange = (value) => {
    setData({
      ...data,
      rating: value,
    });
  };

  switch (view) {
    case VIEW_LOADING:
      return (
        <STATUS_CONTAINER>
          <CircularLoader />
        </STATUS_CONTAINER>
      );
    case VIEW_ERROR:
      return (
        <STATUS_CONTAINER>
          <ModalCloseButton onClick={onClose}>
            <Close />
          </ModalCloseButton>
          <ErrorIcon />
          <STATUS_TEXT>Something went wrong! Try Again Later</STATUS_TEXT>
        </STATUS_CONTAINER>
      );
    case VIEW_SUCCESS:
      return (
        <STATUS_CONTAINER>
          <ModalCloseButton onClick={onClose}>
            <Close />
          </ModalCloseButton>
          <DoneIcon />
          <STATUS_TEXT>
            {edit ? "Your review has been updated" : "Thanks for your review"}
          </STATUS_TEXT>
        </STATUS_CONTAINER>
      );
    case VIEW_BLOCKED:
      return (
        <STATUS_CONTAINER>
          <ModalCloseButton onClick={onClose}>
            <Close />
          </ModalCloseButton>
          <WarningIcon />
          <STATUS_TEXT>Your review has been marked for review</STATUS_TEXT>
        </STATUS_CONTAINER>
      );
    default:
      return (
        <Container>
          <Heading.H1>Tu opinión nos importa ¡Evalúa tu producto!</Heading.H1>
          <ModalCloseButton onClick={onClose}>
            <Close />
          </ModalCloseButton>

          <Title>Overall Rating</Title>
          <RatingView
            editable
            rating={data.rating}
            onChange={handleRatingChange}
            gap={4}
          />

          <Title>Título del comentario</Title>
          <TextInput
            placeholder="Ejemplo: ¡Lo puedo llevar a todas partes!"
            value={data.title}
            onChange={handleChange("title")}
          />

          <Title>Comentario</Title>
          <TextArea
            placeholder="Es muy fácil de trasladar, es liviano y se cierra y abre fácilmente…"
            onChange={handleChange("content")}
            value={data.content}
          />

          <Title>Subir foto</Title>
          <ImagePicker images={images} setImages={setImages} />

          {error && <ErrorText>{error}</ErrorText>}

          <FilledButton onClick={onSubmit}>Publicar comentario</FilledButton>
        </Container>
      );
  }
};

export default ReviewForm;
