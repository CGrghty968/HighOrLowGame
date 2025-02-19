//          Declaration of Variables

// Generate an array to store all the potential cards
const cardArray = [];
for(let i=1; i <= 52; i++){
    cardArray.push(i);
}// End for loop
// Printing the Array for testing purposes
// console.log(cardArray);


// Variables to inform the user of the currentRound
let roundCount = 1; // Initialised to 1
// Storing the p-tag of the round
const currentRound = document.getElementById("roundCount");


// Create button objects for the higher and lower guesses, with listeners
const higherBtn = document.getElementById("higherBtn");
const lowerBtn = document.getElementById("lowerBtn");
// Adding listeners for the buttons
higherBtn.addEventListener('click', guess);
lowerBtn.addEventListener('click', guess);


// Initialising the score, and its container (p-tag) variable
let score = document.getElementById("score");
let scoreNo = 0;


// Create a class Card for easier containment of data regarding the cards
class Card{
    constructor(id){
        this.cardVal = drawCard();
        this.cardValR = rectifyCards(this.cardVal);
        this.reference = document.getElementById(id);
        this.suite = getSuite(this.cardVal);
    }// End constructor
}// End class


// Initialise the cards' variables, (using keyword let, as they will mutate throughout the game)
let card1 = {};
let card2 = {};



// Create a button object, and add a listener for the start game function
const startBtn = document.getElementById("start");
startBtn.addEventListener('click', startGame);


// Including an option to play the next round
const nextRoundBtn = document.getElementById("nextRound");
nextRoundBtn.addEventListener('click', nextRound); 

const quitGameBtn = document.getElementById("quitGame");
quitGameBtn.addEventListener('click', gameOver);
// This button begins as disabled
quitGameBtn.disabled = true;


//          Functions/Methods

//                      Card functionality - How they behave
// Function for the generation of the card number
function drawCard(){
    // Generates a random number between 1-52
    let cardNo = Math.floor((Math.random())*cardArray.length)+1;

    return cardNo;
}// End drawCard()

// Function to get the suite of the card
function getSuite(value){
    if(value >= 40){
        return "Spades";
    }// End if
    if(value >= 27){
        return "Hearts";
    }// End if
    if(value >= 14){
        return "Diamonds";
    }// End if
    else{
        return "Clubs";
    }// End else
}// End getSuite()

// Function to rectify the values of the cards, ensure they match the values on the images
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

// Function to reset the images of the cards
function reset(){
    // Reset the cards' faces
    card1.reference.src = "images/back.png";
    card2.reference.src = "images/back.png";
}// End reset()

// Function to reveal the second card, the dealers card
function reveal(){
    // Setting the image of the second card to a randomly generated number
    card2 = new Card("card2");
    console.log(card2);
    card2.reference.src = "images/"+card2.cardVal+".png";
}// End reveal()

// Function to validate the card number (Ensure it was not drawn before)
function validCard(cardVal){
    // Create a boolean flag for if the cardValue is valid(in the array)
    let inArray = false;
    // DoWhile loop to iterate through the array
    do{
        for(let i=0; i<cardArray.length; i++){
            // If any of the values within the array are equal to the cardValue
            if(cardArray[i] == cardVal){
                inArray = true;
                delete cardArray[i];
                console.log(cardVal);
                
            }// End if
            else{
                cardVal = drawCard();
            }// End else
        }
    }while(!(inArray));
    return cardVal;
}// End validCard()


//              Game functionality - How the game behaves and cards interact
// Function to start the game
function startGame(){
    // Re-enable the option to quit game
    quitGameBtn.disabled = false
    higherBtn.disabled = false;
    lowerBtn.disabled = false;

    // Construct the first card object, card1
    card1 = new Card("card1");
    console.log(card1);

    // Disable the start button
    startBtn.disabled = true;

    // Display the score
    score.innerHTML = "Score: "+scoreNo;

    // Reveal the guessing buttons
    higherBtn.hidden = false;
    lowerBtn.hidden = false;

    // Display the first card
    card1.reference.src = "images/"+card1.cardVal+".png";

    // Display the round
    currentRound.innerHTML = "Round: "+roundCount;
}// End startGame()

// Function to continue to the next round of the game
function nextRound(){
    // Update the round info 
    roundCount++;
    currentRound.innerHTML = "Round: "+roundCount;

    // Return both of the cards face down
    reset();

    // Restart the game
    startGame();
    
    // Re-enable the higher/lower buttons
    higherBtn.disabled = false;
    lowerBtn.disabled = false;
    nextRoundBtn.hidden = true;
}//End nextRound

// Function to handle the event of the overall guess of the user
function guess(event){
    // Reveal the second card's value
    reveal();

    // Store the guess of the user
    let guess = event.target.value;

    // Switch and case for the players guess
    switch(guess){
        case ("higher"):
            guessHigher(card1.cardValR, card2.cardValR);
            break;
        
        case ("lower"):
            guessLower(card1.cardValR, card2.cardValR);
            break;
    }// End case
    
    // Disable the higher or lower buttons and prepare for next round
    higherBtn.disabled = true;
    lowerBtn.disabled = true;
    nextRoundBtn.hidden = false;
}// End guess()


// Function to handle the event where the player guesses higher
function guessHigher(card1Val, card2Val){
    // If the next card's value is greater than the first one
    if(card2Val > card1Val){
        // The player guessed correctly, +1 point
        scoreNo++;
    }// End if
    // Else they are incorrect
    else if(card2Val < card1Val){
        console.log("Dealer's point");
    }// End else
    else{
        console.log("Was a tie");
    }// End else
    // Update the score
    score.innerHTML = "Score: "+scoreNo;
}// End guessHigher()

// Function to handle the event where the player guesses lower
function guessLower(card1Val, card2Val){
    // If the next card's value is lower than the first card
    if(card2Val < card1Val){
        // The players score increments by 1
        scoreNo++;
    }// End if
    // Else, they don't get the point
    else if(card2Val > card1Val){
        console.log("Dealer's point");
    }// End else if
    else{
        console.log("was a tie")
    }// End else
    // Update the score, to reflect the new score after a guess
    score.innerHTML = "Score: "+scoreNo;
}// End guessLower()

function gameOver(){
    reset();

    // Update round to indicate the status of the game
    currentRound.innerHTML = "Game Over";

    // Disable/hide irrelevant buttons
    higherBtn.disabled = true;
    lowerBtn.disabled = true;
    quitGameBtn.disabled = true;
    nextRoundBtn.hidden = true;

    // Re-enable the option to start a new game
    startBtn.disabled = false;

    // Reset all values
    roundCount = 0;
    scoreNo = 0;
}// End gameOver()




