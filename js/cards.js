// import class to game.js
export class Card {
  constructor(value, suite, faceDown = false) {
    this.value = value;
    this.suite = suite;
    this.faceDown = faceDown;
  }

  static SUITES = ["hearts", "spades", "clubs", "diamonds"];

  getValue() {
    switch (this.value) {
      case 1:
        return "A";
      case 11:
        return "J";
      case 12:
        return "Q";
      case 13:
        return "K";
      default:
        return this.value;
    }
  }
  
  getSuite() {
    return this.suite;
  }
  
  // creating symbols for the card
  getSymbol() {
    switch (this.suite){
      case "hearts": return "♥";
      case "spades": return "♠";
      case "clubs": return "♣";
      case "diamonds": return "♦";
    }
  }
  
  // creating a template for the card
  template() {
    return `
    <article class="card ${this.getSuite()}">
    <aside class="top">${this.getSymbol()}<span>${this.getValue()}</span></aside>
    ${this.getSymbol()}
    <aside class="bottom">${this.getSymbol()}<span>${this.getValue()}</span></aside>
    </article>
    `
  }
}


// import class to game.js
export class Deck {
  constructor() {
    this.cards = [];
  }

  static generateDeck() {
    const deck = new Deck();
    for (let suite of Card.SUITES) {
      for (let i = 1; i <= 13; i++) {
        deck.addCard(new Card(i, suite));
      }
    }
    return deck;
  }

  // push a card to the "Deck"
  addCard(card) {
    this.cards.push(card);
  }

  // pop draws the top/last card from the deck
  newCard() {
    return this.cards.pop();
  }

  noCard() {
    return this.cards.length === 0;
  }

  // shuffles the deck, random number from -0.5 to 0.5
  shuffleDeck() {
    this.cards.sort(() => Math.random() - 0.5);
  }
}

// import class to game.js
export class CardGame{
  constructor(cardContainer, scoreContainer){
    this.cardContainer = cardContainer;
    this.scoreContainer = scoreContainer;
    this.restartGame()
  }

  restartGame(){
    this.score = 0;
    this.deck = Deck.generateDeck();
    this.deck.shuffleDeck();
    this.currentCard = this.deck.newCard();
  }

  renderCard(){
    this.cardContainer.innerHTML = this.currentCard.template();
    this.scoreContainer.innerText = `Score: ${this.score}`
  }

  lower(){
    const nextCard = this.deck.newCard();
    if (nextCard.value < this.currentCard.value){
      this.score++;
    }
    this.currentCard = nextCard;
    if(this.deck.noCard()){
      this.restartGame();
    }
    this.renderCard()
  }

  equal(){
    const nextCard = this.deck.newCard();
    if (nextCard.value == this.currentCard.value){
      this.score++;
    }
    this.currentCard = nextCard;
    if(this.deck.noCard()){
      this.restartGame();
    }
    this.renderCard()
  }

  higher(){
    const nextCard = this.deck.newCard()
    if (nextCard.value > this.currentCard.value){
      this.score++;
    }
    this.currentCard = nextCard;
    if(this.deck.noCard()){
      this.restartGame();
    }
    this.renderCard()
  }
 
}
