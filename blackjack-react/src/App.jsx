import React, { useState } from 'react'
import { Deck } from './game/deck';
import Card from './Card';
import {
    calculateHandValue,
    isBust,
    dealerShouldHit,
    determineWinner
} from './game/blackjack';

const App = () => {
    const [deck, setDeck] = useState(null);
    const [player, setPlayer] = useState([]);
    const [dealer, setDealer] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);

    const deal = () => {
        const newDeck = new Deck();
        setDeck(newDeck);

        const playerHand = [newDeck.draw(), newDeck.draw()];
        const dealerHand = [newDeck.draw(), newDeck.draw()];

        setPlayer(playerHand);
        setDealer(dealerHand);

        console.log(calculateHandValue(playerHand));

        if (calculateHandValue(playerHand) === 21){
            setGameOver(true);
            setWinner("Player");
        } else {
            setGameOver(false);
            setWinner(null);
        }
    }

    const hit = () => {
        if (gameOver) return;

        const newHand = [...player, deck.draw()];
        setPlayer(newHand);
        if (isBust(newHand)){
            setGameOver(true);
            setWinner("Dealer");
        }
    }

    const stand = () => {
        let dealerHand = [...dealer];

        while (dealerShouldHit(dealerHand)){
            dealerHand.push(deck.draw());
        }

        setDealer(dealerHand);
        setGameOver(true);
        setWinner(determineWinner(player, dealerHand));
    }

    return (
        <div className='min-h-screen bg-green-800 text-white p-6'>
            <div className='flex justify-center'>
                <div className='px-4 w-2/5 bg-black border-[5px] border-white rounded-[15px] shadow-lg'>
                    <h1 className='text-4xl font-bold text-center m-4'>
                        Blackjack
                    </h1>
                </div>
            </div>

            <div className='flex justify-center gap-4 mb-6 pt-3'>
                <button
                    onClick={deal}
                    className='text-3xl font-bold px-4 py-2 border-[5px] rounded-[15px] bg-black hover:bg-white hover:text-black cursor-pointer'>
                        Deal
                </button>

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
            </div>

            {/* Player */}
            <div className='mb-6'>
                <div className='flex justify-center'>
                    <h2 className='text-2xl mb-2 font-bold'>
                        Player ({calculateHandValue(player)})
                    </h2>
                </div>
                <div className='flex justify-center flex-wrap gap-2'>
                    {player.map((card, i) => (
                        <Card key={i} card={card}/>
                    ))}
                </div>
            </div>

            {/* Dealer */}
            <div>
                <div className='flex justify-center'>
                    <h2 className='text-2xl mb-2 font-bold'>
                        Dealer ({gameOver ? calculateHandValue(dealer) : "?"})
                    </h2>
                </div>
                <div className='flex justify-center flex-wrap gap-2'>
                    {dealer.map((card, i) => (
                        <Card key={i} card={card} hidden={!gameOver && i === 0}/>
                    ))}
                </div>
            </div>

            {gameOver && (
                <div className='mt-6 text-center text-2xl font-bold'>
                    {winner === "Tie"
                        ? "It's a tie"
                        : `${winner} wins!`}
                </div>
            )}
         </div>
    )
}

export default App