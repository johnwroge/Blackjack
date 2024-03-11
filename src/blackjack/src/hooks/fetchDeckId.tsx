async function fetchDeckId () {
   const response = await fetch('https://deckofcardsapi.com/api/deck/new/');

   if (!response.ok){
    throw new Error(`fetchDeckId not okay`);
   };
  
   return response.json();
  };

  export default fetchDeckId;