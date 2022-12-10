import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';



function App() {
  const [isEditProfilePopupOpen, setProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});

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

  return (
    <div>
      <div className="page" onKeyDown={closePopupByEscape}>
        <PopupWithForm title="Новое место" name="add" isOpened={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText="Создать" children={
          <>
            <input type="text" name="addName" id="add-name" className="popup__input popup__input_type_name" placeholder="Название" required minLength="2" maxLength="30"/>
            <span className="popup__input-error add-name-error"></span>
            <input type="url" name="addDescription" id="add-description" className="popup__input popup__input_type_description" placeholder="Ссылка на картинку" required/>
            <span className="popup__input-error add-description-error"></span>
          </>
        }/>
        <PopupWithForm title="Редактировать профиль" name="edit" isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} buttonText="Сохранить" children={
          <>
            <input type="text" name="editName" id="edit-name" className="popup__input popup__input_type_name" required minLength="2" maxLength="40"/>
            <span className="popup__input-error edit-name-error"></span>
            <input type="text" name="editDescription" id="edit-description" className="popup__input popup__input_type_description" required minLength="2" maxLength="200"/>
            <span className="popup__input-error edit-description-error"></span>
          </>
        }/>
        <PopupWithForm title="Вы уверены?" name="confirm" isOpened={false} onClose={closeAllPopups} buttonText="Да" children={<></>}/>
        <PopupWithForm title="Обновить аватар" name="avatar" isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText="Сохранить" children={
          <>
            <input type="url" name="avatarLink" id="avatar-link" className="popup__input popup__input_type_link popup__avatar-link" placeholder="Ссылка на картинку" required/>
            <span className="popup__input-error avatar-link-error"></span>
          </>
        }/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <Header/>
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick.bind(this)} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
