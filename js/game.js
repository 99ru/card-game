import {CardGame} from './cards.js'

function main(){

  const cardContainer =  document.querySelector(".card-container")
  const scoreContainer =  document.querySelector(".score-container")
  const lowerBtn = document.querySelector(".lower-btn")
  const equalBtn = document.querySelector(".equal-btn")
  const higherBtn = document.querySelector(".higher-btn")

  const game = new CardGame( cardContainer, scoreContainer ) 


  lowerBtn.addEventListener('click', () => game.lower());
  equalBtn.addEventListener('click', () => game.equal());
  higherBtn.addEventListener('click', () => game.higher());

  game.renderCard()
}
main()