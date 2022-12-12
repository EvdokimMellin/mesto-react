import React, { useEffect, useRef } from "react";

export default function AddPlacePopup (props) {
    const nameInputRef = useRef();
    const linkInputRef = useRef();

    function closeByOverlay (evt) {
        if (evt.target.classList.contains('popup')) {
          props.onClose();
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace(nameInputRef.current.value, linkInputRef.current.value);
    }

    useEffect(() => {
        nameInputRef.current.value = '';
        linkInputRef.current.value = '';
    }, [props.isOpened])

    return(
        <div className={`popup popup_type_add ${props.isOpened ? "popup_opened" : ""}`} onClick={closeByOverlay}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" onClick={props.onClose}></button>
                <p className="popup__title">Новое место</p>
                <form className="popup__form" name="add-form" onSubmit={handleSubmit} >
                    <input type="text" name="addName" id="add-name" className="popup__input popup__input_type_name" placeholder="Название" required minLength="2" maxLength="30" ref={nameInputRef} />
                    <span className="popup__input-error add-name-error"></span>
                    <input type="url" name="addDescription" id="add-description" className="popup__input popup__input_type_description" placeholder="Ссылка на картинку" required ref={linkInputRef}/>
                    <span className="popup__input-error add-description-error"></span>
                    <button className="popup__save-button">Создать</button>
                </form>
            </div>
        </div>
    )
}
