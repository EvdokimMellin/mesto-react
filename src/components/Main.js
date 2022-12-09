import React, { useEffect } from 'react';
import addButton from '../images/add-button.svg';
import avatarPlaceholder from '../images/avatar-placeholder.svg';
import avatarPencil from '../images/avatar-pencil.svg';
import { api } from '../utils/Api';
import Card from './Card';

function Main (props) {
  const [userName, setUserName] = React.useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = React.useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = React.useState(avatarPlaceholder);
  const [cards, setCards] = React.useState([])

  useEffect(() => {
    api.getUserInfo()
      .then(userData => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    api.getInitialCards()
      .then(initialCards => {
        return initialCards.map(initialCard => {
          return(<Card card={initialCard} onCardClick={props.onCardClick}/>);
        })
      })
      .then((cardElements) => {setCards(cardElements)})
      .catch((err) => {
        console.log(err);
      })
  }, [])



  return (
    <main className="content">
       <section className="profile">
         <img src={userAvatar} alt="Аватар" className="profile__avatar"/>
         <div className="profile__avatar-hover" onClick={props.onEditAvatar}>
           <img src={avatarPencil} alt="Редактировать" className="profile__avatar-pencil"/>
         </div>
         <div className="profile__info">
           <div className="profile__name-container">
             <h1 className="profile__name">{userName}</h1>
             <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
           </div>
           <p className="profile__description">{userDescription}</p>
         </div>
         <button className="profile__add-button" type="button" onClick={props.onAddPlace}><img src={addButton} alt="Добавить" className="profile__add-image"/></button>
       </section>
       <section className="cards">
         <ul className="cards__list">
            {cards}
         </ul>
       </section>
    </main>
  )
}

export default Main;
