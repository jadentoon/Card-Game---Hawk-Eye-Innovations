import { useState } from 'react'
import PlayBlackjack from './PlayBlackjack'
import MoneyScreen from './MoneyScreen'

/**
 * App Component
 * -------------
 * Root component of the Blackjack application.
 * Manages global game state including:
 * - Player balance
 * - Current bet
 * - Active screen (bet screen or game screen)
 * 
 * Controls navigation between MoneyScreen and PlayBlackjack.
 */
const App = () => {

    /**
     * Player's current balance.
     * Default starting balance is £100.
     */
    const [money, setMoney] = useState(100);

    /**
     * Current bet input value.
     * Stored as a string to preserve decimal formatting.
     */
    const [bet, setBet] = useState("");

    /**
     * Determines which screen is currently displayed.
     * "money" = bet input screen.
     * "game" = blackjack gameplay screen.
     */
    const [screen, setScreen] = useState("money");

    /**
     * Resets the entire game state.
     * Used when the player runs out of money and restarts.
     */
    const restartGame = () => {
        setMoney(100);
        setBet("");
    }

    return (
        <>
            {/* Betting Screen */}
            {screen === "money" && (
                <MoneyScreen 
                    money = {money}
                    bet = {bet}
                    setBet = {setBet}

                    /**
                     * Moves to the gameplay screen once a valid bet is placed.
                     */
                    onBet = {() => setScreen ("game")}
                    
                    /**
                     * Resets the game when the player is broke.
                     */
                    onRestart={restartGame}
                />
            )}

            {/* Gameplay Screen */}
            {screen === "game" && (
                <PlayBlackjack
                    money = {money}
                    bet = {bet}
                    setMoney = {setMoney}

                    /**
                     * Returns to the betting screen after a round finishes.
                     * Clears the previous bet.
                     */
                    onReset = {() => {
                        setBet("");
                        setScreen("money");
                    }}
                />
            )}
        </>
    )
}

export default App;