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

let startGameBtn = document.getElementById("start-game-btn")
let newCardBtn = document.getElementById("new-card-btn")
let standBtn = document.getElementById("stand-btn")
let betInput = document.getElementById("bet-input")
let setBetBtn = document.getElementById("set-bet-btn")

let dealerCards = []
let dealerSum = 0

let player = {
    name: "Player Money",
    chips: 100
}

let bet = 10


let playerEl = document.getElementById("player-el")
playerEl.textContent = player.name + ": $" + player.chips

function setBet() {
    if(isAlive) {
        messageEl.textContent = "Finish the round first!"
        return
    }

    let betInput = document.getElementById("bet-input").value
    let newBet = Number(betInput)

    if (newBet > 0 && newBet <= player.chips) {
        bet = newBet
        document.getElementById("bet-display").textContent = "Current Bet: $" + bet
        messageEl.textContent = "Bet updated!"
    } else {
        messageEl.textContent = "Invalid bet amount!"
    }
}


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
    updateButtons()
}

function renderGame() {

    dealerCardsEl.textContent = "Dealer Cards: "

    if (isAlive) {
        dealerCardsEl.textContent += dealerCards[0] + " ?"
        dealerSumEl.textContent = "Dealer Sum: ?"
    } else {
        for (let i = 0; i < dealerCards.length; i++) {
            dealerCardsEl.textContent += dealerCards[i] + " "
        }
        dealerSumEl.textContent = "Dealer Sum: " + dealerSum
    }

    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }

    sumEl.textContent = "Sum: " + sum
    messageEl.textContent = message
}

function newCard() {

    if (!isAlive) return

    let card = getRandomCard()
    sum += card
    cards.push(card)

    if (sum > 21) {
        message = "You bust!"
        isAlive = false
        checkWinner()
    } else {
        message = "Do you want to draw a new card?"
    }

    renderGame()
}


function dealersTurn() {

    if (!isAlive) return

    isAlive = false


    while (dealerSum < 17) {
        let card = getRandomCard()
        dealerCards.push(card)
        dealerSum += card
    }

    checkWinner()
}

function checkWinner() {
    if (sum > 21) {
        message = "You bust, the dealer wins."
    } else if (dealerSum > 21) {
        message = "The dealer busts! You win!"
        player.chips += bet * 2
    } else if (sum > dealerSum) {
        message = "You win!"
        player.chips += bet * 2
    } else if (sum < dealerSum) {
        message = "Dealer Wins!"
    } else {
        message = "Push! Bet returned."
        player.chips += bet
    }

    isAlive = false

    updateButtons()

    playerEl.textContent = player.name + ": $" + player.chips
    messageEl.textContent = message

    renderGame()
}

function updateButtons() {

    if(isAlive) {
        startGameBtn.disabled = true
        newCardBtn.disabled = false
        standBtn.disabled = false
        betInput.disabled = true
        setBetBtn.disabled = true
    } else {
        startGameBtn.disabled = false
        newCardBtn.disabled = true
        standBtn.disabled = true
        betInput.disabled = false
        setBetBtn.disabled = false
    }
}


let sentence = ["Hello ", "my ", "name ", "is ", "Per"] 
let greetingEl = document.getElementById("greeting-el")

updateButtons()

