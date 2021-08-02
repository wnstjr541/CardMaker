import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import Editor from '../editor/editor';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ authService }) => {
  const [cards, setCards] = useState({
    '1' :  {
      id: '1',
      name: 'jun',
      company: 'Samsung',
      theme: 'dark',
      title: 'Software Engineer',
      email: 'wnstjr541@naver.com',
      message: 'go for it',
      fileName: 'jun',
      fileURL: null,
    },
    '2' :   {
      id: '2',
      name: 'jun2',
      company: 'Samsung',
      theme: 'light',
      title: 'Software Engineer',
      email: 'wnstjr541@naver.com',
      message: 'go for it',
      fileName: 'jun',
      fileURL: 'jun.png',
    },
  }
  );
  const history = useHistory();
  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    authService.onAuthChange(user => {
      if (!user) {
        history.push('/CardMaker');
      }
    });
  });

  const createOrUpdateCard = card => {
    setCards(cards => {
      const updated = {...cards};
      updated[card.id] = card;
      return updated;
    })
  }
    const deleteCard = card => {
      setCards(cards => {
        const updated = {...cards};
        delete updated[card.id];
        return updated;
      })
  }

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor cards={cards} addCard={createOrUpdateCard} updateCard={createOrUpdateCard} deleteCard={deleteCard} />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
