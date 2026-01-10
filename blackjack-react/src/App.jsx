import { useState } from 'react'
import PlayBlackjack from './PlayBlackjack'
import MoneyScreen from './MoneyScreen'

const App = () => {
    const [money, setMoney] = useState(100);
    const [bet, setBet] = useState("");
    const [screen, setScreen] = useState("money"); // "money" | "game"

    const restartGame = () => {
        setMoney(100);
        setBet("");
    }

    return (
        <>
            {screen === "money" && (
                <MoneyScreen 
                    money = {money}
                    bet = {bet}
                    setBet = {setBet}
                    onBet = {() => setScreen ("game")}  
                    onRestart={restartGame}
                />
            )}

            {screen === "game" && (
                <PlayBlackjack
                    money = {money}
                    bet = {bet}
                    setMoney = {setMoney}
                    onReset = {() => {
                        setBet("");
                        setScreen("money");
                    }}
                />
            )}
        </>
    )
}

export default App