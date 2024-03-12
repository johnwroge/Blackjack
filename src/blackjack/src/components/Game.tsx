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

interface Card {
  value: string; 
}


const Game = () => {
    const [buttonClicked, setButtonClicked] = useState(false);

    const [deck, setDeck] = useState<Deck | null>(null);
    const [cards, setCards] = useState<Card[]>([]);

    const [playerCards, setPlayerCards] = useState<any[]>([]);
    const [computerCards, setComputerCards] = useState<any[]>([]);

    const [playerScore, setPlayerScore] = useState<number>(0);
    const [computerScore, setComputerScore] = useState<number>(0);

    const [winner, setWinner] = useState('');


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
          }
      } catch (error) {
          console.error('Error shuffling deck:', error);
      }
  };


  const dealCardsToPlayers = async () => {
    setComputerCards((prevCards) => [...prevCards, cards[0], cards[1]]);
    setPlayerCards((prevCards) => [...prevCards, cards[2], cards[3]]);
  
    setComputerCards((prevCards) => {
      const newComputerScore = calculateScore(prevCards);
      setComputerScore(newComputerScore);
      return prevCards;
    });
  
    setPlayerCards((prevCards) => {
      const newPlayerScore = calculateScore(prevCards);
      setPlayerScore(newPlayerScore);
      if (newPlayerScore > 21){
        setWinner('Dealer wins')
      }
      return prevCards;
    });
  
    setButtonClicked(true);
  };
 
  const calculateScore = (cards: Card[]): number => {
    let score = 0;
    let hasAce = false;

    for (const card of cards) {
      const cardValue = card.value?.toUpperCase();
  
      if (cardValue === 'ACE') {
        hasAce = true;
        score += 11;
      } else if (['KING', 'QUEEN', 'JACK'].includes(cardValue)) {
        score += 10;
      } else {
        score += parseInt(cardValue, 10);
      }
    }
  
    while (hasAce && score > 21) {
      score -= 10;
      hasAce = false;
    }

     return score;
  };

  const drawCard = async (deck_id: string | undefined) => {
    try {
      if (deck_id) {
        const response = await fetchCard(deck_id);
          const newCards = Array.isArray(response.cards) ? response.cards : [];
  
        setPlayerCards((prevCards) => {
          const newPlayerScore = calculateScore([...prevCards, ...newCards]);
          setPlayerScore(newPlayerScore);
          if (newPlayerScore > 21){
            setWinner('Dealer wins')
          }
          return [...prevCards, ...newCards];
        });
      }
    } catch (error) {
      console.error('Error drawing card:', error);
    }
  };

  const findWinner = () => {
    const winner = 21 - playerScore < 21 - computerScore ? 'You win' : 'Dealer wins';
    setWinner(winner);
  }
  


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
      {winner && <h1> {winner}! </h1>}

     <button onClick={dealCardsToPlayers} disabled={buttonClicked}> Start Game </button>
    <div className='game'>
            <div className='game_wrapper'>

            <div className='game_computer'>
                <p> Computer </p>   
                <h2>{computerScore}</h2>
                {display_computer_cards}

            </div>
            <div className='game_player'>
                <p>Player 1</p>
                <h2>{playerScore}</h2>
                {display_player_cards}
            </div>

            </div>

    </div>
            <button onClick={() => shuffleDeckFunction(deck?.deck_id)}>Shuffle Deck</button>
            <button onClick={() => drawCard(deck?.deck_id)}>Hit</button>
            <button onClick={() => findWinner()} >Stand</button>
    </>
  )
}

export default Game

