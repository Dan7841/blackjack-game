let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let dealerCardsEl = document.getElementById("dealer-cards-el")
let dealerSumEl = document.getElementById("dealer-sum-el")

let dealerCards = []
let dealerSum = 0

let player = {
    name: "Dan",
    chips: 100
}

let bet = 10


let playerEl = document.getElementById("player-el")
playerEl.textContent = player.name + ": $" + player.chips


function getRandomCard() {
    let randomNumber = Math.floor(Math.random()*13) + 1

    if (randomNumber === 1) {
        return 11
    } else if (randomNumber > 10) {
        return 10
    } else {
        return randomNumber
    }
}


function startGame() {

    isAlive = true
    hasBlackJack = false
    message = ""

    cards = []
    sum = 0
    dealerCards = []
    dealerSum = 0

    //Player Cards
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards.push(firstCard, secondCard)
    sum = firstCard + secondCard

    //Dealer Cards
    let dealerFirstCard = getRandomCard()
    let dealerSecondCard = getRandomCard()
    dealerCards.push(dealerFirstCard, dealerSecondCard)
    dealerSum = dealerFirstCard + dealerSecondCard

    //Betting / Chips Deduction
    if (player.chips >= bet) {
        player.chips -= bet
        playerEl.textContent = player.name + ": $" + player.chips
    } else {
        message = "Not enough chips!"
        return
    }

    renderGame()
}

function renderGame() {

    dealerCardsEl.textContent = "Dealer Cards: "

    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardsEl.textContent += dealerCards[i] + " "
    }

    dealerSumEl.textContent = "Dealer Sum: " + dealerSum

    cardsEl.textContent = "Cards: "

    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }

    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}

function newCard() {

    if (isAlive === true && hasBlackJack === false) {

    let card = getRandomCard()
    sum += card
    cards.push(card)
    renderGame()
    }
}


let sentence = ["Hello ", "my ", "name ", "is ", "Per"] 
let greetingEl = document.getElementById("greeting-el")

