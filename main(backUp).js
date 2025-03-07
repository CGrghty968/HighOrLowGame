//          Declaration of Variables

// Generate an array to store all the used card's values
const cardArray = [];

// Create a flag to indicate whether or not a card is larger, lower or equal to the previous card
let larger = 0;

// Connecting to the p-tag on the HTML document
const prevRounds = document.getElementById("prevRounds");

// Creating reference for the div tag that stores the previously drawn cards    
let div = document.getElementById("prevCardsDiv");

// Variables to inform the user of the currentRound
let roundCount = 1; // Initialised to 1
// Storing the p-tag of the round
const currentRound = document.getElementById("roundCount");

// Creating functionality to quit game, through a button with a listener for clicks
const quitGameBtn = document.getElementById("quitGame");
quitGameBtn.addEventListener('click', gameOver);
// This button begins as disabled
quitGameBtn.disabled = true;

// Create button objects for the higher and lower guesses, with listeners
const higherBtn = document.getElementById("higherBtn");
const lowerBtn = document.getElementById("lowerBtn");
// Adding listeners for the buttons
higherBtn.addEventListener('click', guess);
lowerBtn.addEventListener('click', guess);


// Initialising the score, and its container (p-tag) variable
let score = document.getElementById("score");
let scoreNo = 0;

// Initialise the dealer score, and its container
let dScore = document.getElementById("dealerScore");
let dScoreNo = 0;

// Create a class Card for easier containment of data regarding the cards
class Card{
    constructor(id){
        this.cardVal = this.drawCard();
        this.cardValR = this.rectifyCards(this.cardVal);
        this.reference = document.getElementById(id);
        this.suite = this.getSuite(this.cardVal);
    }// End constructor

    // Class Methods

    // Method to generate the card number
    drawCard(){
    // Generates a random number between 1-52
    let cardNo = Math.floor((Math.random())*52)+1;
    
    // Boolean flag to determine if the card is used or not
    let usedVal = true;
    do{
        // Escape clause when all cards are drawn
        if(cardArray.length == 52){
            // console.log("All cards have been drawn");
            return false;
        }// End if
        // If the array includes that generated value
        if(cardArray.includes(cardNo)){
            // Regenerate it
            cardNo = Math.floor((Math.random())*52)+1;
        }// End if
        else{
            // Add the value of that card to the array
            cardArray.push(cardNo);
            // Set boolean flag to false, as the new value is (hopefully) not used
            usedVal = false;
            // Print the array for testing purposes
            // console.log(cardArray);
        }// End else
    }while(usedVal); // While the card's value has been used, loop

    // Verify that the card is not a black ace

    return cardNo;
    }// End drawCard()

    // Method to retrieve the correct suite of the card, based on the corrected card's value
    getSuite(value){
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

    // Method to calculate the card's real value (value on the card)
    rectifyCards(value){
        // The two black ace values are 1 and 40
        if(value == 1 || value == 40){
            // Returning 14 as the rectified value for all the black aces as they are the highest in the game
            return 14
        }// End if
        // console.log(value);
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
}


// Initialise the cards' variables, (using keyword let, as they will mutate throughout the game)
let card1 = {}; // Instantiated as empty objects, so they can be assigned to card Objects
let card2 = {}; // later on throughout the program



// Create a button object, and add a listener for the start game function
const startBtn = document.getElementById("start");
startBtn.addEventListener('click', startGame);


// Including an option to play the next round
const nextRoundBtn = document.getElementById("nextRound");
nextRoundBtn.addEventListener('click', nextRound); 




//          Functions/Methods

//                      Card functionality - How they behave

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
    // console.log(card2);
    card2.reference.src = "images/"+card2.cardVal+".png";
}// End reveal()



//              Game functionality - How the game behaves and cards interact
// Function to start the game
function startGame(){
    // If the game is starting, reset the container for the previous cards
    if(roundCount == 1){
        div.innerHTML = ""; 
    }
    // Reset the larger variable
    larger = 0;

    // Re-enable the option to quit game
    quitGameBtn.disabled = false
    higherBtn.disabled = false;
    lowerBtn.disabled = false;

    // Reveal the guessing buttons
    higherBtn.hidden = false;
    lowerBtn.hidden = false;

    // Construct the first card object, card1
    card1 = new Card("card1");

    // Disable the start button
    startBtn.disabled = true;

    // Display the scores
    score.innerHTML = "User Score: "+scoreNo;
    dScore.innerHTML = "Dealer Score: "+dScoreNo;

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
    if(roundCount > 5){
        gameOver();
    }
}//End nextRound

// Function to handle the event of the overall guess of the user
function guess(event){
    // Reveal the second card's value
    reveal();

    // Store the guess of the user
    let guess = event.target.value;

    // Switch and case for the players guess
    switch(guess){
        // Call the guessHigher function when the guess value is "higher"
        case ("higher"):
            guessHigher(card1, card2);
            break;
        // Call the guessLower function when the guess value is "lower"
        case ("lower"):
            guessLower(card1, card2);
            break;
    }// End case
    
    // Disable the higher or lower buttons and prepare for next round
    higherBtn.disabled = true;
    lowerBtn.disabled = true;
    nextRoundBtn.hidden = false;

    results();
}// End guess()


// Function to handle the event where the player guesses higher
function guessHigher(card1, card2){
    // Capture both of the card's values and suites
    card2Val = card2.cardValR;
    card2Suite = card2.suite;
    card1Val = card1.cardValR;
    card1Suite = card1.suite;

    if(card1Val < card2Val){
        // User chose correctly, the second card is higher
        scoreNo++
        larger = 1 // The second card is larger
    }// End else if
    else if(card1Val > card2Val){
        // User chose wrong
        dScoreNo++;
    }// End else if
    // Cards must be equal in value
    else{
        if((card2Suite == "Spades" || card2Suite == "Clubs") && (card1Suite == "Diamonds" || card1Suite == "Hearts")){
            // 2nd Card is larger
            scoreNo++
            larger = 1
        }// End if
        else{
            // Both cards are of the same colour and value
            larger = -1;
        }// End else
    }// End else
    // Update the score
    score.innerHTML = "User Score: "+scoreNo;
    dScore.innerHTML = "Dealer Score: "+dScoreNo;
}// End guessHigher()

// Function to handle the event where the player guesses lower
function guessLower(card1, card2){
    card2Val = card2.cardValR;
    card2Suite = card2.suite;
    card1Val = card1.cardValR;
    card1Suite = card1.suite;

    if(card1Val < card2Val){
        // Incorrect guess
        dScoreNo++;
        larger = 1; // Second card is larger
    }// End else if
    else if(card1Val > card2Val){
        // Correct answer
        scoreNo++; // As the second card's value is indeed lower
    }
    // Else the card values are equal
    else{
        if((card1Suite == "Clubs" || card1Suite == "Spades") && (card2Suite == "Diamonds" || card2Suite == "Hearts")){
            // Reds are lower, so the second card being red will lead to a correct answer when lower is chosen
            scoreNo++;
            larger = 0;
        }// End if
        else{
            // Both are equal
            larger = -1;
        }// End else
    }// End else
    score.innerHTML = "Score: "+scoreNo;
    dScore.innerHTML = "Dealer Score: "+dScoreNo;    
}// End guessLower()

// Functionality to display the previous cards
function results(){
    
    let result = document.createElement("p")
    counter = 1
    while(counter <= 2){
        let card = document.createElement("img");
        card.src = "images/"+cardArray[cardArray.length-counter]+".png";
        div.appendChild(card);
        counter++;
    }// End while
    result.innerHTML = "The "+cardName(card2.cardValR)+" of "+card2.suite+" is "+isLarger(larger)+" the "+cardName(card1.cardValR)+" of "+card1.suite;
    div.appendChild(result); 
    prevRounds.append(div)
    

}// End results()

// Function to reset the game when the game is finishes
function gameOver(){
    // Reset the faces of the two cards
    reset();

    // Update round to indicate the status of the game
    currentRound.innerHTML = "Game Over";

    // Disable/hide irrelevant buttons
    higherBtn.hidden = true;
    lowerBtn.hidden = true;
    quitGameBtn.disabled = true;
    nextRoundBtn.hidden = true;

    // Re-enable the option to start a new game
    startBtn.disabled = false;

    // If else logic ladder for the outcome of the game
    if(scoreNo > dScoreNo){
        alert("Congratulations, you won!\nScore: "+scoreNo+"\nComputer score: "+dScoreNo);
    }// End if
    else if(dScoreNo > scoreNo){
        alert("Condolences, you lost!\nScore: "+scoreNo+"\nComputer score: "+dScoreNo);
    }// End else if
    else{
        alert("It's a tie\nScore: "+scoreNo+"\nComputer score: "+dScoreNo);
    }// End else

    // Reset all game values
    roundCount = 1;
    scoreNo = 0;
    dScoreNo = 0;

    // Empty the cardArray 
    cardArray.length = 0;
}// End gameOver()

// Arrow function for the card values
let cardName = val => {
    switch(val){
        case 1: case 14:
            return "Ace";
        case 11:
            return "Jack";
        case 12:
            return "Queen";
        case 13:
            return "King";
        default:
            return val;
    }// End switch/case
}// End cardName

let isLarger = larger => {
        switch(larger){
            case 1:
                return "larger than";
            case 0: 
                return "lower than";
            default:
                return "equal to";
        }// End switch
    }// End isLarger

// Create function for determining whether or not a card is a black ace
function isBlackAce(suite){
    switch(suite){
        case ("Diamonds" || "Clubs"):
            return 14;
        default:
            return suite;
    }// End switch/case
}// End method
