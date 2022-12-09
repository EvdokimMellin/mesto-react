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
  const [selectedCard, setSelectedCard] = React.useState('');

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
    setSelectedCard('')
  }

  function closePopupByEscape (evt) {
    if ((isAddPlacePopupOpen || isEditAvatarPopupOpen || isEditProfilePopupOpen || selectedCard) && evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  return (
    <div>
      <div className="page" onKeyDown={closePopupByEscape}>
        <PopupWithForm title="Новое место" name="add" isOpened={isAddPlacePopupOpen} onClose={closeAllPopups} children={
          <>
            <input type="text" name="addName" id="add-name" className="popup__input popup__input_type_name" placeholder="Название" required minLength="2" maxLength="30"/>
            <span className="popup__input-error add-name-error"></span>
            <input type="url" name="addDescription" id="add-description" className="popup__input popup__input_type_description" placeholder="Ссылка на картинку" required/>
            <span className="popup__input-error add-description-error"></span>
            <button type="submit" className="popup__save-button" id="add-save-button">Создать</button>
          </>
        }/>
        <PopupWithForm title="Редактировать профиль" name="edit" isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} children={
          <>
            <input type="text" name="editName" id="edit-name" className="popup__input popup__input_type_name" required minLength="2" maxLength="40"/>
            <span className="popup__input-error edit-name-error"></span>
            <input type="text" name="editDescription" id="edit-description" className="popup__input popup__input_type_description" required minLength="2" maxLength="200"/>
            <span className="popup__input-error edit-description-error"></span>
            <button className="popup__save-button" id="edit-save-button">Сохранить</button>
          </>
        }/>
        <PopupWithForm title="Вы уверены?" name="confirm" isOpened={false} onClose={closeAllPopups} children={
          <>
            <button type="submit" className="popup__save-button popup__confirm-button" id="confirm-button">Да</button>
          </>
        }/>
        <PopupWithForm title="Обновить аватар" name="avatar" isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups} children={
          <>
            <input type="url" name="avatarLink" id="avatar-link" className="popup__input popup__input_type_link popup__avatar-link" placeholder="Ссылка на картинку" required/>
            <span className="popup__input-error avatar-link-error"></span>
            <button type="submit" className="popup__save-button popup__avatar-button" id="avatar-save-button">Сохранить</button>
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
