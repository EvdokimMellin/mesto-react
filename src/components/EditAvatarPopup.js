import React from "react";

export default function EditAvatarPopup (props) {
    const avatarInputRef = React.useRef();

    function closeByOverlay (evt) {
        if (evt.target.classList.contains('popup')) {
          props.onClose();
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(avatarInputRef.current.value);
      }

    return(
        <div className={`popup popup_type_avatar ${props.isOpened ? "popup_opened" : ""}`} onClick={closeByOverlay}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" onClick={props.onClose}></button>
                <p className="popup__title">Обновить аватар</p>
                <form className="popup__form" name="avatar-form" onSubmit={handleSubmit} noValidate>
                    <input ref={avatarInputRef}  type="url" name="avatarLink" id="avatar-link" className="popup__input popup__input_type_link popup__avatar-link" placeholder="Ссылка на картинку" required/>
                    <span className="popup__input-error avatar-link-error"></span>
                    <button className="popup__save-button">Сохранить</button>
                </form>
            </div>
        </div>
    )
}
