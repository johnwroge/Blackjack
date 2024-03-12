
async function fetchCard (deck_id: any) {

    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
 
    if (!response.ok){
     throw new Error(`fetchCard not okay`);
    };
    
    return response.json();
   };
 
   export default fetchCard;