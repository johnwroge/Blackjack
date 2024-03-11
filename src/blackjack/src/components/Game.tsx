import React, { useState, useEffect } from 'react'

import fetchCard from '../hooks/fetchCard';
import fetchDeckId from '../hooks/fetchDeckId';
import shuffleDeck from '../hooks/shuffleDeck';

interface Deck {
deck_id: any,
remaining: number,
shuffled: boolean,
success: boolean
}


const Game = () => {
    const [deck, setDeck] = useState<Deck | null>(null);

    const [cards, setCards] = useState([]);

    useEffect(() => {

      console.log('Game component mounted or re-rendered');
      const fetchData = async () => {
          try {
              const response = await fetchDeckId();
              setDeck(response);
              setTimeout(() => shuffleDeckFunction(response.deck_id), 500); 
            } catch (error) {
              console.error('Error fetching deck ID:', error);
          }
      };

      fetchData();
    }, []);


    const shuffleDeckFunction = async (deck_id: string | undefined) => {
      try {
          if (deck_id) {
              const response = await shuffleDeck(deck_id);
              console.log(response);
              setDeck(response);
          }
      } catch (error) {
          console.error('Error shuffling deck:', error);
      }
  };

  const drawCard = async (deckId: string | undefined) => {
    try {
        if (deckId) {
            const response = await fetchCard(deck?.deck_id);
            console.log(response);
            setCards(response);
        }
    } catch (error) {
        console.error('Error shuffling deck:', error);
    }
};
      

  return (
    <div className='game'>
      {deck ? (
                <>
                    <p>Deck ID: {deck.deck_id}</p>
                    <p>Remaining cards: {deck.remaining}</p>
                    <p>Shuffled: {deck.shuffled ? 'Yes' : 'No'}</p>
                    <button onClick={() => shuffleDeckFunction(deck.deck_id)}>Shuffle Deck</button>
                    <button onClick={() => drawCard(deck.deck_id)}>Draw Card</button>
                </>
            ) : (
                <p>Loading deck...</p>
            )}

      {cards && (
                <div>
                    Cards go Here
                </div>
            )}
    </div>
  )
}

export default Game

