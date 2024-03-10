Summary 

Designing a game of blackjack where you are playing against computer. 
Goal of game is to get as close to 21 points as possible without going over. 

Point Values
Jack, Queen, King: 10 points

If the player has a Jack and a Queen, and then draws an Ace, the Ace will be worth 1 point to add up to 21

If the player has a Queen and an Ace, the Ace will be worth 11 points to add up to 21

If the player has a 2 and an Ace, the Ace will be worth 11 points to get closer to 21

If the player has a 2 and a 5, and then draws an Ace, the Ace will be worth 11 points to get closer to 21. If the player then draws a 10, the 

Ace will now be worth 1 point


Winning Conditions:

your current total is < 21 but higher than the House’s total
Your current total is 21 and the House’s total is not 21

Losing Conditions:

Your current total totals over 21 (don’t forget to factor in the different edge cases of the Ace card!)
You current total is < 21 but lower than the House’s total
You tie with the House


Todos:

Components

Need a card component that renders the png picture and holds a point value

Need a game wrapper component that starts the game containing logic to:

1. start game 
2. end game and display a winner by calculating current running totals
3. Hit (get an additional card)

Hooks

1. To get a deck of cards id
2. Shuffle cards 
3. Draw a card





