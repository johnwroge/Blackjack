import{ useState, useEffect } from 'react'
import fetchCard from '../hooks/fetchCard';
import fetchDeckId from '../hooks/fetchDeckId';
import shuffleDeck from '../hooks/shuffleDeck';
import Card from './Card';

import { Deck, CardType } from '../types/types';




const Game = () => {
    const [buttonClicked, setButtonClicked] = useState<boolean>(false);

    const [deck, setDeck] = useState<Deck | null>(null);
    const [cards, setCards] = useState<CardType[]>([]);

    const [playerCards, setPlayerCards] = useState<CardType[]>([]);
    const [computerCards, setComputerCards] = useState<CardType[]>([]);

    const [playerScore, setPlayerScore] = useState<number>(0);
    const [computerScore, setComputerScore] = useState<number>(0);

    const [winner, setWinner] = useState<string>('');
    const [resetCount, setResetCount] = useState<number>(0); 


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
    }, [resetCount]);


    const shuffleDeckFunction = async (deck_id: string | undefined) => {
      try {
          if (deck_id) {
              const response = await shuffleDeck(deck_id);
              console.log(response)
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
 
  const calculateScore = (cards: CardType[]): number => {
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
    let winner: string;
    if (playerScore === computerScore || ((playerScore < computerScore) && (playerScore < 21))){
      winner = 'Dealer wins'
      setWinner(winner);
    }
    if (playerScore < 21 && playerScore > computerScore){
      winner = 'You win'
      setWinner(winner);
    } 
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


  const resetGame = () => {
    setButtonClicked(false);
    setWinner('');
    setResetCount(prevCount => prevCount + 1);
    setCards([]);
    setComputerCards([]);
    setPlayerCards([]);
    setPlayerScore(0);
    setComputerScore(0);
    setDeck(null); 
  };

  const handleReplay = () => {
    resetGame();
  };



  return (
    <div className='border'>
    <div className='game'>
   {!buttonClicked &&  <button onClick={dealCardsToPlayers} disabled={buttonClicked}>Start Game</button> }
      <div className='game_wrapper'>
      
        <div className='game_computer'>
         {buttonClicked && <h2> Dealer </h2>}
          {display_computer_cards}
          {!buttonClicked || <h2>{computerScore}</h2>}
        </div>
        
        <div className='game_player'>
          {!buttonClicked || <h2>{playerScore}</h2>}
          {display_player_cards}
        </div>
       
        <div className='winner-text'>{winner && <h1>{winner}!</h1>}</div>
        
      </div>
     
    </div>
    <div className='buttons'>
      {buttonClicked && <button onClick={() => shuffleDeckFunction(deck?.deck_id)} disabled={winner.length > 0}>Shuffle Deck</button>}
      {buttonClicked && <button onClick={() => drawCard(deck?.deck_id)} disabled={winner.length > 0}>Hit</button>}
      {buttonClicked &&  <button onClick={() => findWinner()} disabled={winner.length > 0 && playerScore <= 21}>Stand</button>}
      {winner && <button onClick={handleReplay}>Replay</button>}
    </div>
</div>

  )
}

export default Game

