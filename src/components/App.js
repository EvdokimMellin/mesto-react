import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import React, { useEffect, useState } from 'react';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserCurrent';



function App() {
  const [isEditProfilePopupOpen, setProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards(cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
}

  function handleCardDelete (card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id != card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    api.getInitialCards()
      .then(initialCards => {
        setCards(initialCards.map(initialCard => {return {
          name: initialCard.name,
          link: initialCard.link,
          _id: initialCard._id,
          owner: initialCard.owner,
          likes: initialCard.likes
        }}))
        })
      .then(() => api.getUserInfo())
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  function handleCardClick (card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick () {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick () {
    setProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups () {
    setEditAvatarPopupOpen(false);
    setProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({name: '', link: ''})
  }

  function closePopupByEscape (evt) {
    if ((isAddPlacePopupOpen || isEditAvatarPopupOpen || isEditProfilePopupOpen || selectedCard) && evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handleUpdateUser ({name, about}) {
    api.updateUserInfo(name, about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {console.log(err);})
  }

  function handleUpdateAvatar (avatarInputValue) {
    api.updateAvatar(avatarInputValue)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {console.log(err)});
  }

  function handleAddPlace (name, link) {
    api.addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {console.log(err)});
  }

  return (
    <div className="page" onKeyDown={closePopupByEscape}>
      <CurrentUserContext.Provider value={currentUser}>
        <AddPlacePopup isOpened={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
        <EditProfilePopup isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <PopupWithForm title="Вы уверены?" name="confirm" isOpened={false} onClose={closeAllPopups} buttonText="Да" children={<></>}/>
        <EditAvatarPopup isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <Header/>
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick.bind(this)} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardDelete={handleCardDelete} onCardLike={handleCardLike}/>
        <Footer/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
