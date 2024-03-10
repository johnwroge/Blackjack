


async function shuffleDeck ({id}) {

    const response = await fetch(`https://deckofcardsapi.com/api/deck/<<${id}>>/shuffle/?remaining=true`);
 
    if (!response.ok){
     throw new Error(`fetchCard not okay`);
    };
 
    return response.json();
   };
 
   export default shuffleDeck;