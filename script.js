
const backgroundImage = ["images/congratulation.webp", "images/sad.webp", "images/fireWork.webp"]
const userScore = document.getElementById("user-score")
const opponentScore = document.getElementById("opponent-score")
const messageEL= document.getElementById("message-el")
const cardsEL = document.getElementById("cards-el")
const startBtn = document.getElementById("start-btn")
const cardBtn = document.getElementById("card-btn")
const sumEl = document.getElementById("sum-el")
const contianer = document.getElementById("contianer")
const headEl = document.getElementById("head-el")
const enoughCardBtn = document.getElementById("enoughCard-btn")
const winnerBtn = document.getElementById("winner-btn")
const playerName = document.getElementById("user-name")
const playerChips = document.getElementById("user-chips")
const userSubmitBtn = document.getElementById("user-btn")
const user = document.getElementById("user")
const opponentName = document.getElementById("opponent-name")
const opponentChips = document.getElementById("opponent-chips")
const opponentSubmitBtn = document.getElementById("opponent-btn")
const opponent = document.getElementById("opponent")
const body = document.querySelector("body")
const help = document.getElementById("help")
const gameBox = document.getElementById("game-box")
const finalMessage = `<h1> GAME OVER!</h1>`
let cards = []
let sum = 0
let isAlive = false
let message = ""
let currentPlayer = "user"
let chips = getRandomChips()
let playerCost = chips
let opponentCost = chips
let userScoreValue = 0
let opponentScoreValue = 0
let finalWinner = ""



function submition(name, chipsValue, contain){
     
        startBtn.disabled = false
        chipsValue.textContent= `${name.value} : $${chips}`
        contain.textContent = chipsValue.textContent
        name.value = name.value.trim()

}
//start game with this function
function runGame(){
    if(playerCost === 0 || opponentCost === 0){
        startBtn.disabled = true
    }else{
        isAlive = true
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard , secondCard]
        sum = firstCard + secondCard
        headEl.style.color = `goldenrod`
        messageEL.style.color = `white`
        startBtn.disabled = false
        enoughCardBtn.disabled = false
        headEl.innerHTML = `21 Card Game`
        renderGame()
        changeBackground()
    }
}

function getRandomChips(){
    let randomChips = Math.floor((Math.random() * 100 ) + 120)
    if (randomChips < 120) {
        return 100
        
    } else if (randomChips < 140) {
        return 120
    }else if (randomChips < 160) {
        return 140
        
    }else if (randomChips < 180){
        return 160
        
    }else if (randomChips < 200) {
        return 180
    }else {
        return 200
    }

    return randomChips  
   
}

function changeBackground(){
        
        if (sum === 21) {
            body.style.backgroundImage = `url(${backgroundImage[0]})`
            headEl.style.color = ` red `
            messageEL.style.color = ` red `
           
            }else if(sum> 21){
                body.style.backgroundImage = `url(${backgroundImage[1]})`
                 
            }else{
                body.style.backgroundImage = `url("images/green back.avif")`
            }

        if(playerCost === 0 || opponentCost === 0){
                body.style.backgroundImage = `url(${backgroundImage[2]})`
        }
}

function getRandomCard(){
    let randomNumber = Math.floor( Math.random() * 13 ) + 1
      if (randomNumber> 10) {
         return 10
        
      } else if (randomNumber === 1) {
        return 11
        
      }else {
        return randomNumber

      }
        
}
//This function tells us how the game works
function renderGame(){
    
    cardsEL.textContent = "cards: " 
    for (let i = 0; i < cards.length; i++) {
        cardsEL.textContent += cards[i] + " "
        
    }
    sumEl.textContent = "sum: " + sum
       if(sum <= 20){
            message = "do you want draw a new card?"
                

            }else if(sum === 21){
                message = "You've got 21 !"
                     if (currentPlayer === "user") {
                        playerCost += 20
                        playerChips.textContent = `${playerName.value}: $${playerCost}`
                        opponentCost -= 20
                        opponentChips.textContent = `${opponentName.value}: $${opponentCost}`
                        user.textContent = playerChips.textContent
                        opponent.textContent = opponentChips.textContent
                        userScoreValue = 0
                        opponentScoreValue = 0
                        headEl.innerHTML = `${playerName.value} is the winner and ${playerName.value} get starts`

                            
                    } else {
                        playerCost -=  20
                        playerChips.textContent = `${playerName.value}: $${playerCost}`
                        opponentCost += 20
                        opponentChips.textContent = `${opponentName.value}: $${opponentCost}`
                        opponent.textContent = opponentChips.textContent
                        user.textContent = playerChips.textContent
                        userScoreValue = 0
                        opponentScoreValue = 0
                        currentPlayer = "opponent"
                        headEl.innerHTML = `${opponentName.value} is the winner and ${opponentName.value} get starts`

                  }
                
                
            }else{
                message = "You're out of the game!"
                if (currentPlayer === "user") {
                    playerCost -=  20
                    playerChips.textContent = `${playerName.value}: $${playerCost}`
                    opponentCost += 20
                    opponentChips.textContent = `${opponentName.value}: $${opponentCost}`
                    opponent.textContent = opponentChips.textContent
                    user.textContent = playerChips.textContent
                    userScoreValue = 0
                    opponentScoreValue = 0
                    currentPlayer = "opponent"
                    headEl.innerHTML = `${opponentName.value} is the winner and ${opponentName.value} get starts`

                    
                } else {
                    playerCost += 20
                    playerChips.textContent = `${playerName.value}: $${playerCost}`
                    opponentCost -=  20
                    opponentChips.textContent = `${opponentName.value}: $${opponentCost}`
                    user.textContent = playerChips.textContent
                    opponent.textContent = opponentChips.textContent
                    userScoreValue = 0
                    opponentScoreValue = 0
                    currentPlayer = "user"
                    headEl.innerHTML = `${playerName.value} is the winner and ${playerName.value} get starts`
                }
                
            }
            if(playerCost === 0 || opponentCost === 0){
                win()
            }
        messageEL.textContent = message
  
}

//Defines the final winner
function win(){
    if(playerCost === 0){
        finalWinner = `<h2>${opponentName.value} is the winner</h2>`
        gameBox.innerHTML = finalMessage + finalWinner
        startBtn.disabled = true
        enoughCardBtn.disabled = true
        isAlive = false
       
    }     
    if(opponentCost === 0){
        finalWinner = `<h2>${playerName.value} is the winner</h2>`
        gameBox.innerHTML = finalMessage + finalWinner
        startBtn.disabled = true
        enoughCardBtn.disabled = true
        isAlive = false
        
    }
}
//Defines the winner of each hand of the game
function defineWinner(){
    if (userScoreValue > opponentScoreValue) {
        playerCost += 20
        playerChips.textContent = `${playerName.value}: $${playerCost}`
        opponentCost -=  20
        opponentChips.textContent = `${opponentName.value}: $${opponentCost}`
        user.innerHTML =` ${playerChips.textContent}`
        opponent.innerHTML = `${opponentChips.textContent}`
        userScoreValue = 0
        opponentScoreValue = 0
        currentPlayer = "user"
        headEl.innerHTML = `${playerName.value} is the winner and ${playerName.value} get starts`
            
} else if(userScoreValue === opponentScoreValue){
    headEl.innerHTML = `"It's tied, play again"`
    playerChips.textContent = `${playerName.value}: $${playerCost}`
    opponentChips.textContent = `${opponentName.value}: $${opponentCost}`
    user.innerHTML =` ${playerChips.textContent}`
    opponent.innerHTML = `${opponentChips.textContent}`
    userScoreValue = 0
    opponentScoreValue = 0
    currentPlayer = "user"

}else{
        opponentCost += 20
        opponentChips.textContent = `${opponentName.value}: $${opponentCost}`
        playerCost -=  20
        playerChips.textContent = `${playerName.value}: $${playerCost}`
        user.innerHTML =` ${playerChips.textContent}`
        opponent.innerHTML = `${opponentChips.textContent}`
        userScoreValue = 0
        opponentScoreValue = 0
        currentPlayer = "opponent"
        headEl.innerHTML = `${opponentName.value} is the winner and ${opponentName.value} get starts`
        }

}

function updateData(){
    sum = 0
    cards = []
    messageEL.textContent = "Want to play a round?"
    cardsEL.textContent = "cards: "
    sumEl.textContent ="sum: "
    headEl.style.color = `goldenrod`
    messageEL.style.color = `white`

}

function enoughCard(){
    if (currentPlayer === "user") {
        playerChips.textContent = `${playerName.value}: $${playerCost}`
        userScore.textContent = "sum: " + sum
        userScoreValue += sum
        user.innerHTML =` ${playerChips.textContent} 
        ${ userScore.textContent}`
        currentPlayer = "opponent"
        isAlive = false 
        
    } else {
        opponentChips.textContent = `${opponentName.value}: $${opponentCost}`
        opponentScore.textContent = "sum: " + sum
        opponentScoreValue += sum
        opponent.innerHTML = `${opponentChips.textContent}
        ${opponentScore.textContent}`
        currentPlayer = "user"
        isAlive = false
    } 

}

help.addEventListener("click" , function howToPlay(){
    window.open("help-index.html" , "popup" , "width = 500, height = 300, top = 100, left = 100")
})

userSubmitBtn.addEventListener("click" ,  function userSubmitionButton(){
    try{
        if(playerName.value === ""){
            throw new Error("please enter your name")
        }
        submition(playerName, playerChips, user)

    }catch(error){
        headEl.innerHTML = error.message
        headEl.style.color = `black`
    }

})

opponentSubmitBtn.addEventListener("click", function opponentSubmitButton(){
    try{
        if(opponentName.value === ""){
            throw new Error("please enter your name")
        }
        submition(opponentName, opponentChips, opponent)

    }catch(error){
        headEl.innerHTML = error.message
        headEl.style.color = `black`

    }
   
})

startBtn.addEventListener("click", function startGame(){
    
        try{
            if (playerName.value === "" || opponentName.value === "") {
                throw new Error("please enter your name")
            }
              runGame() 
            
        }catch(error){
                console.log(error.message)
            }
     
})

cardBtn.addEventListener("click",function newCard(){
    if(isAlive === true){
        let card = getRandomCard()
        cards.push(card)
        sum += card
        renderGame()
        changeBackground()   
    }  
    
})

enoughCardBtn.addEventListener("click", function enoughCardBtn(){
    enoughCard()
    updateData()    
})

winnerBtn.addEventListener("click", function winnerBtn(){
        
    if (userScoreValue !== 0 && opponentScoreValue !== 0 && userScoreValue <= 20 && opponentScoreValue <= 20){
        defineWinner()
        updateData()
        win()
        changeBackground()
        }
       
})
