/**
 * Calculates the total Blackjack value of a hand.
 * Handles Ace Adjustment (11 -> 1) automatically to prevent busting.
 * 
 * @param {Array} hand - Array of card objects { rank, suit, value }. 
 * @returns {number} Final calculated hand value.
 */
export function calculateHandValue(hand) {
    let value = 0;
    let aces = 0;

    // Sum all card values and count aces.
    for (let card of hand) {
        value += card.value;
        if (card.rank === "A"){
            aces++;
        }
    }

    // Downgrade Ace values from 11 to 1 if busting.
    while (value > 21 && aces > 0){
        value -= 10;
        aces--;
    }

    return value;
}

/**
 * Determines whether a hand is bust.
 * 
 * @param {Array} hand 
 * @returns {boolean} True if hand value exceeds 21.
 */
export function isBust(hand) {
    return calculateHandValue(hand) > 21;
}

/**
 * Determines whether a hand is a natural Blackjack.
 * Blackjack requires exactly two cards totaling 21.
 * 
 * @param {Array} hand 
 * @returns {boolean}
 */
export function isBlackjack(hand) {
    return hand.length === 2 && calculateHandValue(hand) === 21;
}

/**
 * Determines whether the dealer should draw another card.
 * Dealer must hit on any total below 17.
 * 
 * @param {Array} hand 
 * @returns {boolean}
 */
export function dealerShouldHit(hand){
    return calculateHandValue(hand) < 17;
}

/**
 * Determines the winner of a Blackjack round.
 * 
 * @param {Array} playerHand 
 * @param {Array} dealerHand 
 * @returns {"Player" | "Dealer" | "Tie"}
 */
export function determineWinner(playerHand, dealerHand){
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(dealerHand);

    // Bust conditions
    if (playerValue > 21) return "Dealer";
    if (dealerValue > 21) return "Player";
    
    // Compare hand values.
    if (playerValue > dealerValue) return "Player";
    if (dealerValue > playerValue) return "Dealer";

    // Equal values result in a tie.
    return "Tie";
}