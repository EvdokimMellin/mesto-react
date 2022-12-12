import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserCurrent';

export default function EditProfilePopup (props) {
    const [name, setName] = React.useState('Жак-Ив Кусто');
    const [description, setDescription] = React.useState('Исследователь океана');
    const currentUser = React.useContext(CurrentUserContext);

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
    }

    function closeByOverlay (evt) {
        if (evt.target.classList.contains('popup')) {
          props.onClose();
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
          name,
          about: description,
        });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]);

    return(
        <div className={`popup popup_type_edit ${props.isOpened ? "popup_opened" : ""}`} onClick={closeByOverlay}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" onClick={props.onClose}></button>
                <p className="popup__title">Редактировать профиль</p>
                <form className="popup__form" name="edit-form" onSubmit={handleSubmit} noValidate>
                    <input type="text" name="editName" id="edit-name" className="popup__input popup__input_type_name" required minLength="2" maxLength="40" value={name} onChange={handleNameChange} />
                    <span className="popup__input-error edit-name-error"></span>
                    <input type="text" name="editDescription" id="edit-description" className="popup__input popup__input_type_description" required minLength="2" maxLength="200" value={description} onChange={handleDescriptionChange} />
                    <span className="popup__input-error edit-description-error"></span>
                    <button className="popup__save-button">Сохранить</button>
                </form>
            </div>
        </div>
    )
}
