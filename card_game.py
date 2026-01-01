import random

# ---------------
# Card Class
# ---------------
class Card:
    def __init__(self, rank, suit, value):
        self.rank = rank
        self.suit = suit
        self.value = value
    
    def __str__(self):
        return f"{self.rank} of {self.suit}"
    
# ---------------
# Deck Class
# ---------------
class Deck:
    def __init__(self):
        self.cards = []
        self.build_deck()
    
    def build_deck(self):
        suits = ["Hearts", "Diamonds", "Clubs", "Spades"]
        ranks = [
            ("2", 2), ("3", 3), ("4", 4), ("5", 5),
            ("6", 6), ("7", 7), ("8", 8), ("9", 9),
            ("10", 10), ("Jack", 10), ("Queen", 10),
            ("King", 10), ("Ace", 11)
        ]

        for suit in suits:
            for rank, value in ranks:
                self.cards.append(Card(rank, suit, value))

    def shuffle(self):
        random.shuffle(self.cards)
    
    def draw_card(self):
        return self.cards.pop()
    
# ---------------
# Hand Class
# ---------------
class Hand:
    def __init__(self):
        self.cards = []
    
    def add_card(self, card):
        self.cards.append(card)
    
    def get_value(self):
        value = sum (card.value for card in self.cards)
        aces = sum (1 for card in self.cards if card.rank == "Ace")

        # Convert Ace from 11 to 1 if bust
        while value > 21 and aces > 0:
            value -= 10
            aces -= 1
        
        return value
    
    def __str__(self):
        return ", ".join(str(card) for card in self.cards)

# ---------------
# Deck Class
# ---------------
def play_blackjack():
    deck = Deck()
    deck.shuffle()

    player_hand = Hand()
    dealer_hand = Hand()

    # Initial deal
    for _ in range(2):
        player_hand.add_card(deck.draw_card())
        dealer_hand.add_card(deck.draw_card())
    
    print("\nWelcome to Blackjack!")
    print(f"Your hand: {player_hand} (Value: {player_hand.get_value()})")
    print(f"Dealer shows: {dealer_hand.cards[0]}")

    # Player turn
    while player_hand.get_value() < 21:
        choice = input("Hit or Stand? (H/S): ").upper()
        if choice == "H":
            player_hand.add_card(deck.draw_card())
            print(f"Your hand: {player_hand} (Value: {player_hand.get_value()})")
        elif choice == "S":
            break
        else:
            print("Invalid input.")
    
    if player_hand.get_value() > 21:
        print("You busted! Dealer wins.")
        return
    
    # Dealer turn
    print(f"\nDealer's hand: {dealer_hand} (Value: {dealer_hand.get_value()})")
    while dealer_hand.get_value() < 17:
        dealer_hand.add_card(deck.draw_card())
        print(f"Dealer hits: {dealer_hand} (Value: {dealer_hand.get_value()})")

    player_value = player_hand.get_value()
    dealer_value = dealer_hand.get_value()

    print("\nFinal Results:")
    print(f"Your hand ({player_value}): {player_hand}")
    print(f"Dealer hand ({dealer_value}): {dealer_hand}")

    if dealer_value > 21 or player_value > dealer_value:
        print("You win!")
    elif player_value < dealer_value:
        print("Dealer wins.")
    else:
        print("It's a tie!")

# ---------------
# Run Game
# ---------------
if __name__ == "__main__":
    play_blackjack()