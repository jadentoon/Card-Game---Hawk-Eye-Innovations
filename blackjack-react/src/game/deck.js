import {Card} from "./card";

export class Deck {
    constructor() {
        this.cards = []
        this.buildDeck();
        this.shuffle();
    }

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

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    draw() {
        return this.cards.pop();
    }
}