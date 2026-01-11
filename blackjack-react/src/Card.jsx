/**
 * Card Component
 * --------------
 * Displays a single playing card for the Blackjack game.
 * Supports a hidden state for dealer cards.
 * 
 * @param {Object} card - Object containing { rank, suit }.
 * @param {boolean} hidden - Indicates whether the card should be face-down. 
 */
const Card = ( { card, hidden = false }) => {

    /**
     * If the card is hidden (dealer face-down card),
     * render the card back design.
     */
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

    /**
     * Determines whether the card should be displayed in red
     * based on its suit.
     */
    const isRed =
        card.suit === "Hearts" || card.suit === "Diamonds";

    return (
        <div className='
            w-20 h-28 
            bg-white 
            rounded-lg 
            border-2 border-black 
            p-2 
            flex flex-col justify-between 
            shadow-[0px_1px_6px_rgb(0,0,0)]'
        >
            {/* Card Rank */}
            <span className={`text-lg font-bold ${isRed ? "text-red-600" : "text-black"}`}>
                {card.rank}
            </span>

            {/* Card Suit */}
            <span className={`text-sm ${isRed ? "text-red-600" : "text-black"}`}>
                {card.suit}
            </span>

        </div>
    )
}

export default Card;