import { useState } from 'react'

const MoneyScreen = ({ money, bet, setBet, onBet }) => {
    const isValidBet = bet >= 0.01 && bet <= money;
    return (
        <div className='min-h-screen bg-green-800 text-white p-6'>
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

            <div className='flex justify-center pt-3'>
                <div className='px-4 w-3/5 bg-black border-[5px] border-white rounded-[15px] shadow-lg mr-5'>
                    <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        max={money}
                        value={bet}
                        onChange={(e) => {
                            let value = e.target.value;
                            
                            value = value.replace(/[^0-9.]/g, "");

                            if (value.includes(".")){
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
        </div>
    )
}

export default MoneyScreen