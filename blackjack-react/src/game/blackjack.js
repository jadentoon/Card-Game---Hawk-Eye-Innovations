export function calculateHandValue(hand) {
    let value = 0;
    let aces = 0;

    for (let card of hand) {
        value += card.value;
        if (card.rank === "A"){
            aces++;
        }
    }

    while (value > 21 && aces > 0){
        value -= 10;
        aces--;
    }

    return value;
}

export function isBust(hand) {
    return calculateHandValue(hand) > 21;
}

export function isBlackjack(hand) {
    return hand.length === 2 && calculateHandValue(hand) === 21;
}

export function dealerShouldHit(hand){
    return calculateHandValue(hand) < 17;
}

export function determineWinner(playerHand, dealerHand){
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(dealerHand);

    if (playerValue > 21) return "Dealer";
    if (dealerValue > 21) return "Player";

    if (playerValue > dealerValue) return "Player";
    if (dealerValue > playerValue) return "Dealer";

    return "Tie";
}