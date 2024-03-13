  export interface Deck {
    deck_id: any;
    remaining: number;
    shuffled: boolean;
    success: boolean;
  }
  
  export interface CardType {
    value: string;
    code: string;
    image: string;
    suit: string;
  }

  export interface CardProps {
    code: string;
    image: string;
    value: string;
    suit: string;
  }

