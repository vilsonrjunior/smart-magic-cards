const cardsWrapper = document.querySelector('.cards-wrapper');
const suits = ['hearts', 'spades', 'diamonds', 'clubs'];

// creates cards by passing each suit through the loop and push card to cards array
function createCards() {
  const cards = [];
  suits.forEach((suit) => {
    for (let i = 1; i <= 13; i += 1) {
      const cardObject = {
        value: i,
        suit,
      };
      cards.push(cardObject);
    }
  });
  return cards;
}
// reusable func to create arranged and shuffled decks
function createDecks(deck) {
  deck.forEach((card, i) => {
    const interval = 50;
    setTimeout(() => {
      const positionFromLeft = i * 25;
      const cardElement = document.createElement('div');
      cardElement.setAttribute('data-value', card.value);
      cardElement.classList.add('card', `${card.suit}-${card.value}`);
      cardElement.style.left = `${positionFromLeft}px`;
      cardsWrapper.append(cardElement);
    }, interval * i);
  });
}
// adds hidden css class to div
function hideShow() {
  cardsWrapper.classList.toggle('hidden');
}

document.getElementById('show-hide').addEventListener('click', hideShow);

// remove previous cards from dom
function removeDeck() {
  while (cardsWrapper.firstChild) {
    cardsWrapper.removeChild(cardsWrapper.firstChild);
  }
}

// alg to shuffle array
function arrShuffle(array) {
  let place,
      temp;
  for (let i = array.length - 1; i > 0; i--) {
    place = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[place];
    array[place] = temp;
  }
  return array;
};

// func to pass cards through arrShuffle and create shuffled deck
function shuffledCards() {
  removeDeck();
  const newCards = createCards();
  const shuffled = arrShuffle(newCards);
  createDecks(shuffled);
}

document.getElementById('shuffle').addEventListener('click', shuffledCards);

// func to remove shuffled deck and create a new arranged one
function magic() {
  removeDeck();
  const deck = createCards();
  createDecks(deck);
}

document.getElementById('magic').addEventListener('click', magic);
// removes start game btn and unhiddes btns
function createButtons() {
  const startGameBtn = document.getElementById('start-game');
  startGameBtn.parentNode.removeChild(startGameBtn);
  document.getElementById('btns').style.visibility = 'visible';
}
// also creates 1st deck displaying cards in cards
function startGame() {
  createButtons();
  const firstDeck = createCards();
  createDecks(firstDeck);
}

document.getElementById('start-game').addEventListener('click', startGame);
