/**
 * Represents a single playing card.
 * Used by the Deck and Blackjack game logic.
 */
export class Card {
    /**
     * Creates a new Card instance.
     * 
     * @param {string} rank - Card rank (e.g. "A", "2", "10", "J", "Q", "K") 
     * @param {string} suit - Card suit (e.g. "Hearts", "Diamonds", "Clubs", "Spades") 
     * @param {number} value - Blackjack numeric value of the card. 
     */
    constructor(rank, suit, value){
        this.rank = rank,
        this.suit = suit,
        this.value = value
    }
}