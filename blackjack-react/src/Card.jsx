const Card = ( { card }) => {
    const isRed =
        card.suit === "Hearts" || card.suit === "Diamonds";

    return (
        <div className='w-20 h-28 bg-white rounded-lg border-2 border-black p-2 flex flex-col justify-between'>
            <span className={`text-lg font-bold ${isRed ? "text-red-600" : "text-black"}`}>
                {card.rank}
            </span>
            <span className={`text-sm ${isRed ? "text-red-600" : "text-black"}`}>
                {card.suit}
            </span>

        </div>
    )
}

export default Card