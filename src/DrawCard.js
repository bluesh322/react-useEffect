import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import Card from './Card';

const DrawCard = () => {
  const INITIAL_STATE = null;
  const [deck, setDeck] = useState(INITIAL_STATE);
  const [drawPile, setDrawPile] = useState([]);
  const [count, setCount] = useState(0);
  const url = "http://deckofcardsapi.com/api/deck"

  useEffect(() => {
    const newDeck = async () => {
        const res = await axios.get(`${url}/new/shuffle/`);
        setDeck(res.data);
    };
    newDeck();
  }, [])
    
  const handleDraw = (e) => {
    e.preventDefault();
    console.log(count);
    setCount(count => count + 1);
  }

  useEffect(() => {
    const drawCard = async () => {
      try {
        console.log(deck);
        let res = await axios.get(`${url}/${deck.deck_id}/draw/`);
        if (count === 52) {
          throw new Error("no cards remaining!");
        }

        const card = res.data.cards[0];
        setDrawPile(d => [
          ...d,
          {
            id: card.code,
            name: `${card.suit} ${card.value}`,
            image: card.image,
          }
        ]);
        console.log(drawPile);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    };

    if(count > 0) {
    drawCard();
    }
  }, [count, deck]);


  return (
    <div className="Deck">
      <button onClick={handleDraw}>Draw a card</button>
      <div className="cardArea">
        {deck ? drawPile.map((c) => <Card key={c.id} name={c.name} image={c.image} />) : <h2>Loading</h2>}
      </div>
    </div>
  );
};

export default DrawCard;
