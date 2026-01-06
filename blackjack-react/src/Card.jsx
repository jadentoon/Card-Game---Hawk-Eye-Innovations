const Card = ( { card, hidden = false }) => {
    if (hidden) {
        return (
            <div className="
                w-20 h-28
                rounded-lg
                border-2 border-black
                flex items-center justify-center
                shadow-[0px_1px_6px_rgb(0,0,0)]
                bg-[linear-gradient(176deg,#ffffff_8.33%,#ff0000_8.33%,#ff0000_50%,#ffffff_50%,#ffffff_58.33%,#ff0000_58.33%,#ff0000_100%)]
                bg-size-[40px_3px]">
                </div>
        );
    }

    const isRed =
        card.suit === "Hearts" || card.suit === "Diamonds";

    return (
        <div className='w-20 h-28 bg-white rounded-lg border-2 border-black p-2 flex flex-col justify-between shadow-[0px_1px_6px_rgb(0,0,0)]'>
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