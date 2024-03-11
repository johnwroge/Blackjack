
async function shuffleDeck (deck_id: any) {

    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/?remaining=true`);

    if (!response.ok){
     throw new Error(`shuffleDeck not okay`);
    };
 
    return response.json();
   };
 
   export default shuffleDeck;