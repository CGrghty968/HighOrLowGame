// Create a button object, and add a listener for the start game function
const startBtn = document.getElementById("start");
startBtn.addEventListener('click', startGame);

const newGameBtn = document.getElementById("newGame");
// Score
let score = document.getElementById("score");
let scoreNo = 0;

// Create button objects for the higher and lower guesses, with listeners
const higherBtn = document.getElementById("higherBtn");
const lowerBtn = document.getElementById("lowerBtn");
higherBtn.addEventListener('click', guess);
lowerBtn.addEventListener('click', guess);

// Creating the cards
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");

// Variables to inform the user of the currentRound
let roundCount = 1; // Initialised to 1
const currentRound = document.getElementById("roundCount");

// Variable to store card 1's value
let card1Val = 0;
let card2Val = 0; 

// Generate an array to store all the potential cards
const cardArray = [];
for(let i=1; i <= 52; i++){
    cardArray.push(i);
}// End for loop
console.log(cardArray);


function drawCard(){
    // Generates a random number between 1-52
    let cardNo = Math.floor((Math.random())*52)+1;

    return cardNo;
}// End drawCard()

function startGame(){
    // Disable the start button
    startBtn.disabled = true;

    // Display the score
    score.innerHTML = "Score: "+scoreNo;

    // Reveal the guessing buttons
    higherBtn.hidden = false;
    lowerBtn.hidden = false;

    // Display the first card
    card1Val = drawCard();
    card1.src = "images/"+card1Val+".png";

    // Display the round
    currentRound.innerHTML = "Round: "+roundCount;
}// End startGame()

function reset(){
    // Reset the cards' faces
    card1.src = "images/back.png";
    card2.src = "images/back.png";
}// End reset()

function reveal(){
    // Setting the image of the second card to a randomly generated number
    card2Val = drawCard();
    card2.src = "images/"+card2Val+".png";
}// End reveal()


function guess(event){
    // Reveal the second card's value
    reveal();

    // Rectify the cards' values
    card1Val = rectifyCards(card1Val);
    card2Val = rectifyCards(card2Val);
    console.log("card1: ",card1Val,"card2: ",card2Val);

    // Store the guess of the user
    let guess = event.target.innerHTML;
    
    // Switch and case
    if(guess == "higher"){
        guessHigher();
    }// End if
    else if(guess == "lower"){
        guessLower();
    }// End else

}// End guess()

function guessHigher(){
    if(card1Val > card2Val){
        scoreNo++;
    }// End if
    else if(card1Val == card2Val){
        console.log("was lower");
    }// End else

    // Update the score
    score.innerHTML = "score: "+scoreNo;
}// End guessHigher()

function guessLower(){
    if(card1Val < card2Val){
        scoreNo++;
    }// End if
    else if(card1Val == card2Val){
        console.log("was greater");
    }// End else if

    // Update the score
    score.innerHTML = "score "+scoreNo;
}// End guessLower()

// Function to rectify the values of the cards
function rectifyCards(value){
    console.log(value);
    // Switch and case
    if(value >= 40){
        value -= 39;
        return value;
    }// End if
    if(value >= 27){
        value -= 26;
        return value;
    }// End if
    if(value >= 14){
        value -= 13;
        return value;
    }// End if

    return value;
}// End rectifyCards()