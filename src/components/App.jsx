import { useState, useEffect } from "react";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function App() {
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [currentUser, setCurrentUser] = useState([]);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  async function handleUpdateUser(data) {
    await api
      .setUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((err) => console.log(err));
  }

  async function handleUpdateAvatar(data) {
    await api
      .setUserAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((err) => console.log(err));
  }

  async function handleCardLike(card) {
    const isLiked = card.isLiked;

    if (isLiked) {
      await api
        .deleteLiked(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((currentCard) =>
              currentCard._id === card._id ? newCard : currentCard
            )
          );
        })
        .catch((err) => console.log(err));
    } else {
      await api
        .isLiked(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((currentCard) =>
              currentCard._id === card._id ? newCard : currentCard
            )
          );
        })
        .catch((err) => console.log(err));
    }
  }

  async function handleCardDelete(card) {
    await api
      .deleteCard(card._id)
      .then((resp) => {
        setCards((state) =>
          state.filter((currentCard) => {
            return currentCard._id != card._id;
          })
        );
        console.log(resp.message);
        handleClosePopup();
      })
      .catch((err) => console.log(err));
  }

  async function handleAddPlaceSubmit(card) {
    await api
      .addNewPlace(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    (async () => {
      await api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await api
        .getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
        handleCardDelete,
      }}
    >
      <div className="page">
        <Header />
        <Main
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          popup={popup}
          cards={cards}
          onCardLike={handleCardLike}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
