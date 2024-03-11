import React, { useState, useEffect } from 'react'
import fetchCard from '../hooks/fetchCard';
import fetchDeckId from '../hooks/fetchDeckId';
import shuffleDeck from '../hooks/shuffleDeck';
import Card from './Card';

interface Deck {
deck_id: any,
remaining: number,
shuffled: boolean,
success: boolean
}


const Game = () => {
    const [deck, setDeck] = useState<Deck | null>(null);
    const [cards, setCards] = useState<any[]>([]);

    const [playerCards, setPlayerCards] = useState<any[]>([]);
    const [computerCards, setComputerCards] = useState<any[]>([]);

    const [playerScore, setPlayerScore] = useState<number>(0);
    const [computerScore, setComputerScore] = useState<number>(0);



    useEffect(() => {
      console.log('Game component mounted or re-rendered');
      const fetchData = async () => {
          try {
              const response = await fetchDeckId();
              setDeck(response);
              setCards(response.cards);
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
            //   dealCardsToPlayers();
          }
      } catch (error) {
          console.error('Error shuffling deck:', error);
      }
  };

  const dealCardsToPlayers = () => {
    // Check if there are enough cards in the array
    
    if (Array.isArray(cards) && cards.length >= 4) {
      for (let i = 0; i < 2; i++) {
        setComputerCards(prevCards => [...prevCards, cards[i]]);
        setPlayerCards(prevCards => [...prevCards, cards[i + 2]]);
      }
      setPlayerScore(playerCards.reduce((accumulator, card) => accumulator + Number(card.value), 0));
      setComputerScore(computerCards.reduce((accumulator, card) => accumulator + Number(card.value), 0));
    } else {
      console.error("Not enough cards to deal.");
    }
  };
 

  const drawCard = async (deck_id: string | undefined) => {
    try {
        if (deck_id) {
            const response = await fetchCard(deck_id);
            setPlayerCards(prevCards => [...prevCards, ...response.cards]);
        }
    } catch (error) {
        console.error('Error shuffling deck:', error);
    }
};

  const display_player_cards = playerCards.map((card, index) => (
    <Card
      key={index} 
      code={card.code}
      image={card.image}
      value={card.value}
      suit={card.suit}
    />
  ));

  const display_computer_cards = computerCards.map((card, index) => (
    <Card
      key={index} 
      code={card.code}
      image={card.image}
      value={card.value}
      suit={card.suit}
    />
  ));





  return (
    <> 
    <div className='game'>
            <div className='game_wrapper'>

            <div className='game_computer'>
                <p> computer cards</p>   
                <h2>{computerScore}</h2>
                {display_computer_cards}

            </div>
            <div className='game_player'>
                <p>player cards</p>
                <h2>{playerScore}</h2>
                {display_player_cards}
            </div>

            </div>
            <button onClick={() => shuffleDeckFunction(deck?.deck_id)}>Shuffle Deck</button>
            <button onClick={() => drawCard(deck?.deck_id)}>Draw Card</button>
    </div>

    <button onClick={dealCardsToPlayers}> Start Game </button>
    
    </>
  )
}

export default Game

