

export const shuffleDeckFunction = async (deck_id: string | undefined) => {
    try {
        if (deck_id) {
            const response = await shuffleDeck(deck_id);
            console.log(response)
        }
    } catch (error) {
        console.error('Error shuffling deck:', error);
    }
};