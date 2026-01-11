/**
 * MoneyScreen Component
 * ---------------------
 * Entry screen for the Blackjack game.
 * Allows the player to enter a bet amount and start a round.
 * Displays current balance and prevents invalid bets.
 * If the player runs out of money, a restart modal is shown.
 * 
 * 
 * @param {number} money - Current player balance.
 * @param {string | number} bet - Current bet input value.
 * @param {function} setBet - Setter for bet input state.
 * @param {function} onBet - Callback when player confirms bet.
 * @param {function} onRestart - Callback to reset game balance.
 */
const MoneyScreen = ({ money, bet, setBet, onBet, onRestart }) => {

    /**
     * Determines whether the current bet is valid.
     * Bet must be at least £0.01 and not exceed available balance.
     */
    const isValidBet = bet >= 0.01 && bet <= money;

    /**
     * Indicates whether the player has run out of money.
     * Used to trigger the restart modal and disable betting.
     */
    const isBroke = money <= 0;

    return (
        <div className='min-h-screen bg-green-800 text-white p-6'>
            
            {/* Header / Balance Display */}
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

            {/* Bet Input Section */}
            <div className='flex justify-center pt-3'>
                <div className='px-4 w-3/5 bg-black border-[5px] border-white rounded-[15px] shadow-lg mr-5'>
                    <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        max={money}
                        disabled={isBroke}
                        value={bet}

                        /**
                         * Sanitises user input:
                         * - Allows only numbers and single decimal point.
                         * - Limits decimal places to 2.
                         */
                        onChange={(e) => {
                            let value = e.target.value;

                            value = value.replace(/[^0-9.]/g, "");

                            if (value.includes(".")) {
                                const [intPart, decPart] = value.split(".");
                                value = intPart + "." + decPart.slice(0, 2);
                            }

                            setBet(value);
                        }}

                        placeholder='Enter bet amount (£)'
                        className='
                            w-full 
                            text-3xl font-bold
                            bg-transparent
                            outline-none
                            text-white
                            placeholder-gray-400
                            pt-1'
                    />
                </div>

                {/* Bet Button */}
                <button
                    className='text-3xl w-1/5 font-bold px-4 py-2 border-[5px] rounded-[15px]
                                bg-black hover:bg-white hover:text-black
                                disabled:bg-gray-500 disabled:text-gray-300 disabled:border-gray-400 
                                cursor-pointer disabled:cursor-not-allowed'
                    disabled={!isValidBet}
                    onClick={onBet}
                >
                    Bet
                </button>
            </div>

            {/* Out of Money Modal */}
            {isBroke && (
                <div className="fixed inset-0 bg-green-800 bg-opacity-80 flex justify-center items-center z-50">
                    <div className="bg-black border-[5px] border-white rounded-[20px] p-8 shadow-lg text-center w-1/2 animate-pulse">

                        <h2 className="text-4xl font-bold text-red-500 mb-4">
                            You're out of money!
                        </h2>

                        <p className="text-2xl text-gray-300 mb-6">
                            Restart with £100?
                        </p>

                        <button
                            onClick={onRestart}
                            className="text-3xl font-bold px-6 py-3 border-[5px] rounded-[15px]
                         bg-green-600 hover:bg-white hover:text-black cursor-pointer"
                        >
                            Restart Game
                        </button>

                    </div>
                </div>
            )}
        </div>
    )
}

export default MoneyScreen