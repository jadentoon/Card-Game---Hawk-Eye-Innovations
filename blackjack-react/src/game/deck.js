import {Card} from "./card";

/**
 * Represents a standard 52-card deck for Blackjack.
 * Handles deck creation, shuffling and drawing cards.
 */
export class Deck {
    /**
     * Creates a new shuffled deck.
     */
    constructor() {
        /** @type {Card[]} Array of Card objects in the deck */
        this.cards = [];

        this.buildDeck();
        this.shuffle();
    }

    /**
     * Builds a standard 52-card deck.
     * Each suit contains cards 2-10, J, Q, K and A.
     */
    buildDeck() {
        const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
        const ranks = [
            ["2", 2], ["3", 3], ["4", 4], ["5", 5],
            ["6", 6], ["7", 7], ["8", 8], ["9", 9],
            ["10", 10], ["J", 10], ["Q", 10],
            ["K", 10], ["A", 11]
        ];

        for (let suit of suits){
            for (let [rank, value] of ranks) {
                this.cards.push(new Card(rank, suit, value));
            }
        }
    }

    /**
     * Shuffles the deck using the Fisher-Yates algorithm.
     */
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    /**
     * Draws a card from the top of the deck.
     * @returns {Card|undefined} The drawn card, or undefined if the deck is empty.
     */
    draw() {
        return this.cards.pop();
    }
}