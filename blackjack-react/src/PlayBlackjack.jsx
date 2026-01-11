import { useEffect, useState } from 'react'
import { Deck } from './game/deck';
import Card from './Card';
import {
    calculateHandValue,
    isBust,
    dealerShouldHit,
    determineWinner
} from './game/blackjack';

/**
 * PlayBlackjack Component
 * -----------------------
 * Component representing the main Blackjack game screen.
 * 
 * @param {number} money - The player's current balance.
 * @param {number|string} bet - The current bet amount.
 * @param {function} setMoney - Function to update the player's balance.
 * @param {function} onReset - Callback to reset the game and return to the betting screen. 
 */
const PlayBlackjack = ({ money, bet, setMoney, onReset }) => {
    /** @type {Deck|null} The deck of cards used in the game. */
    const [deck, setDeck] = useState(null);

    /** @type {Card[]} Player's hand */
    const [player, setPlayer] = useState([]);

    /** @type {Card[]} Dealer's hand */
    const [dealer, setDealer] = useState([]);

    /** @type {boolean} Whether the game round is over */
    const [gameOver, setGameOver] = useState(false);

    /** @type {"Player"|"Dealer"|"Tie"|null} The winner of the round */
    const [winner, setWinner] = useState(null);

    /** @type {boolean} Whether the player got a blackjack */
    const [isBlackjack, setIsBlackjack] = useState(false);

    /** @type {string} Formatted bet to display */
    const [displayBet, setDisplayBet] = useState(Number(bet).toFixed(2));

    /** @type {number|null} Tracks money won/lost during the round */
    const [moneyChange, setMoneyChange] = useState(null);

    /**
     * Runs on component mount.
     * Deducts the bet from money and deals the initial cards.
     */
    useEffect(() => {
        setMoney(money - Number(bet));
        deal();
    }, []);

    /**
     * Updates the player's money after the round ends.
     * Calculates winnings/losses including blackjack multiplier.
     */
    useEffect(() => {
        if (!gameOver || !winner) return;

        const numericBet = Number(bet);
        let change = 0;

        if (winner === "Player") {
            change = numericBet + (isBlackjack ? numericBet * 1.5 : numericBet); 
        } else if (winner === "Tie") {
            change = 0; 
        } else {
            change = -numericBet; 
        }

        setMoneyChange(change);

        setMoney(prevMoney => parseFloat((prevMoney + numericBet + change).toFixed(2)));
    }, [gameOver, winner, isBlackjack])

    /**
     * Deals initial hands for the player and dealer.
     * Automatically checks for player blackjack.
     */
    const deal = () => {
        const newDeck = new Deck();
        setDeck(newDeck);

        const playerHand = [newDeck.draw(), newDeck.draw()];
        const dealerHand = [newDeck.draw(), newDeck.draw()];

        setPlayer(playerHand);
        setDealer(dealerHand);

        if (calculateHandValue(playerHand) === 21) {
            setGameOver(true);
            setWinner("Player");
            setIsBlackjack(true);
        } else {
            setGameOver(false);
            setWinner(null);
            setIsBlackjack(false);
        }
    }

    /**
     * Player takes a hit (draws one card).
     * Ends the round if player busts.
     */
    const hit = () => {
        if (gameOver) return;

        const newHand = [...player, deck.draw()];
        setPlayer(newHand);
        if (isBust(newHand)) {
            setGameOver(true);
            setWinner("Dealer");
        }
    }

    /**
     * Player stands. Dealer plays automatically according to rules.
     * Determines the winner at the end.
     */
    const stand = () => {
        let dealerHand = [...dealer];

        while (dealerShouldHit(dealerHand)) {
            dealerHand.push(deck.draw());
        }

        setDealer(dealerHand);
        setGameOver(true);
        setWinner(determineWinner(player, dealerHand));
    }

    /**
     * Resets the current round and clears moneyChange animation.
     */
    const handleReset = () => {
        setMoneyChange(null);
        onReset();
    }

    return (
        <div className='min-h-screen bg-green-800 text-white p-6'>

            {/* Header */}
            <div className='flex justify-center'>
                <div className='px-4 w-3/5 bg-black border-[5px] border-white rounded-[15px] shadow-lg mr-5'>
                    <h1 className='text-4xl font-bold text-center m-4'>
                        Blackjack
                    </h1>
                </div>
                <div className='px-4 w-2/5 bg-black border-[5px] border-white rounded-[15px] shadow-lg'>
                    <h1 className='text-4xl font-bold text-center m-4'>
                        £{Number(money).toFixed(2)}
                    </h1>
                </div>
            </div>

            {/* Controls */}
            <div className='flex justify-center gap-4 mb-6 pt-3'>
                <button
                    onClick={hit}
                    disabled={gameOver || !deck || calculateHandValue(player) === 21}
                    className='text-3xl font-bold px-4 py-2 border-[5px] rounded-[15px]
                                bg-black hover:bg-white hover:text-black
                                disabled:bg-gray-500 disabled:text-gray-300 disabled:border-gray-400 
                                cursor-pointer disabled:cursor-not-allowed'>
                    Hit
                </button>

                <button
                    onClick={stand}
                    disabled={gameOver || !deck}
                    className='text-3xl font-bold px-4 py-2 border-[5px] rounded-[15px]
                                bg-black hover:bg-white hover:text-black
                                disabled:bg-gray-500 disabled:text-gray-300 disabled:border-gray-400 
                                cursor-pointer disabled:cursor-not-allowed'>
                    Stand
                </button>

                <button
                    onClick={handleReset}
                    disabled={!gameOver}
                    className='text-3xl font-bold px-4 py-2 border-[5px] rounded-[15px]
                                bg-black hover:bg-white hover:text-black
                                disabled:bg-gray-500 disabled:text-gray-300 disabled:border-gray-400 
                                cursor-pointer disabled:cursor-not-allowed w-1/5'>
                    Reset
                </button>
            </div>

            {/* Current bet & Money Change */}
            <div className='flex justify-center mb-4 gap-4'>
                <div className="flex justify-center mb-4 gap-4">
                    <div className="px-4 py-2 bg-black border-[5px] border-white rounded-[15px] shadow-lg">
                        <h2 className="text-2xl font-bold text-center">
                            Current Bet: £{displayBet}
                        </h2>
                    </div>

                    {moneyChange !== null && (
                        <div className={`px-4 py-2 border-[5px] border-white rounded-[15px] shadow-lg animate-pulse 
                            ${moneyChange < 0 ? 'bg-red-600' : moneyChange === 0 ? 'bg-gray-400' :'bg-green-600'}`}>
                            <h2 className="text-2xl font-bold text-center text-white">
                                {moneyChange < 0 
                                    ? '-£' +Math.abs(moneyChange).toFixed(2)
                                    : moneyChange === 0 
                                        ? '£' +moneyChange.toFixed(2)
                                        : '+£' +moneyChange.toFixed(2)
                                }
                            </h2>
                        </div>
                    )}
                </div>

            </div>

            {/* Player Hand */}
            <div className='mb-6'>
                <div className='flex justify-center'>
                    <h2 className='text-2xl mb-2 font-bold'>
                        Player ({calculateHandValue(player)})
                    </h2>
                </div>
                <div className='flex justify-center flex-wrap gap-2'>
                    {player.map((card, i) => (
                        <Card key={i} card={card} />
                    ))}
                </div>
            </div>

            {/* Dealer Hand */}
            <div>
                <div className='flex justify-center'>
                    <h2 className='text-2xl mb-2 font-bold'>
                        Dealer ({gameOver ? calculateHandValue(dealer) : "?"})
                    </h2>
                </div>
                <div className='flex justify-center flex-wrap gap-2'>
                    {dealer.map((card, i) => (
                        <Card key={i} card={card} hidden={!gameOver && i === 0} />
                    ))}
                </div>
            </div>

            {/* Result Message */}
            <div className='mt-6 text-center text-2xl font-bold'>
                {gameOver && (
                    winner === "Tie"
                        ? "It's a tie"
                        : `${winner} wins!`
                )}
            </div>
        </div>
    )
}

export default PlayBlackjack;