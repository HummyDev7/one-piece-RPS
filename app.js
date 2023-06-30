//This array is for rock, paper and scissor values that the computer will select
const choices = ["rock", "paper", "scissor"];

//Arrays that contains lot of quote for winning and losing an tie
const winningText = [
  "Unveiling victory, one gesture at a time.",
  "You triumphed, shattering your opponent's hopes and claiming victory.",
  "With your single gesture defies fate, showcasing the mind's power and the artistry of victory",
];
const lossingText = [
  "As defeated hand reveals it's choice, the taste of loss lingers in the air",
  "In the unpredictable realm of R.P.S the defeated learn the art of resilience",
  "Failure is not bad it's actually a good learning experience",
];
const tieText = [
  "A tie in Rock, Paper, Scissors stands as a bridge between victory and defeat",
  "In the enthralling game of Rock, Paper, Scissors, a tie evokes a sense of camaraderie",
  "A tie in R.P.S showcases the game's unpredictable nature when neither side receives favor from fate.",
];

let button = document.querySelectorAll(".btn");
let accessModal = document.querySelector(".result-modal");
let startButton = document.querySelector(".start-btn");
let playAgainBtn = document.querySelector(".playagain-btn");
let onButton = document.querySelector(".on-btn");
let offButton = document.querySelector(".off-btn");
let bgMusic = document.querySelector(".bg-music");

let playerScore = 0;
let computerScore = 0;

let playerWinMusic = new Audio('images/audio/luffy-winner.mp3');
let computerWinMusic = new Audio('images/audio/kaido-winner.mp3');

//This function randomly select any quote in the array
const quoteSelector = (toShuffle) => {
  
  const random = Math.floor(Math.random() * toShuffle.length);

  return toShuffle[ random ];
};

const typingEffect = ( element, speed, txt ) => {

	let i = 0;
	let timer = setInterval(function() {
    if (i < txt.toString().length) {
      element.append(txt.charAt(i));
      i++;

      if ( i == txt.toString().length ) {
        setTimeout( () => { 
          element.textContent = " "; 
        }, 1000);
      }

    } else {
      clearInterval( timer );
    }
  }, speed);
}

//This function will be responsible for the choice of the computer it will randomly pick
const computerSelection = function () {
  //Shuffled the array using map and sort
  let shuffled = choices
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  //Pick random element in the array
  const random = Math.floor(Math.random() * shuffled.length);
  //Return the picked random array element
  return choices[random];
};

let resultMessage = ( text ) => {
  let x = document.querySelector("#result-message");
  let spd = 25;

  if (text != " ") {
    typingEffect(x, spd, text);

  } else if (text == "" || text == " ") {
    console.error("Please input something string should not be empty");
  }
};

//This function show the result screen
const showResult = ( compWin, pWin ) => {
  accessModal.classList.toggle("show-result");
  //access the result-text to change the text who win
  let resText = document.querySelector(".result-text");
  let resQuote = document.querySelector(".result-quote");

  if (compWin) {
    resText.textContent = "You Lose!";
    resQuote.textContent =
      "Our greatest glory is not in never falling, but in rising every time we fall.";

  } else if (pWin) {
    resText.textContent = "You Win!";
    resQuote.textContent = "Winning isn't everything, it's the only thing.";
  }
};

const removeHelper = ( scores, variable ) => {

  switch ( scores ) {

    case 1:
      variable.classList.add("remove-health");
      break;

    case 2:
      variable.classList.add("remove-health");
      break;

    case 3:
      variable.classList.add("remove-health");
      break;

    case 4:
      variable.classList.add("remove-health");
      break;

    case 5:
      variable.classList.add("remove-health");
      break;
  }
};

const removeHealth = ( remove, score) => {
  let computerHeart = document.querySelector(`.computer-health-${ score }`);
  let playerHeart = document.querySelector(`.player-health-${ score }`);

  if ( remove ) {
    removeHelper( score, computerHeart );

  } else {
    removeHelper( score, playerHeart );
  }
};

const hurt = ( win ) => {
  let computerHurt = document.querySelector('.computer');
  let userHurt = document.querySelector('.player');
  
  if ( win ) {
    computerHurt.classList.add('hurt');
    setTimeout( ()=> { computerHurt.classList.remove("hurt")}, 200 );
    computerHurt.classList.add('hitted');
    setTimeout( ()=> { computerHurt.classList.remove("hitted")}, 200 );

  } else {
    userHurt.classList.add('hurt');
    setTimeout( ()=> { userHurt.classList.remove("hurt")}, 200 );
    userHurt.classList.add('hitted');
    setTimeout( ()=> { userHurt.classList.remove("hitted")}, 200 );
  }
}

const selectWinner = ( playerChoice, computerChoice ) => {

  let allChoice = [ playerChoice, computerChoice ];
  let userWin;

  switch ( allChoice.join(" ") ) {
    case "rock scissor":
    case "scissor paper":
    case "paper rock":
      userWin = true;
      break;
    case "scissor rock":
    case "paper scissor":
    case "rock paper":
      userWin = false;
      break;
    case "paper paper":
    case "scissor scissor":
    case "rock rock":
      //Create a undefined behavaiour so in that way it will result as tie
      break;
  }
  return userWin;

};

const checkWinner = () => {

  if ( playerScore == 5 ) {
    showResult(false, true);
    bgMusic.pause();
    playerWinMusic.play();

  } else if ( computerScore == 5 ) {
    showResult(true, false);
    bgMusic.pause();
    computerWinMusic.play();
  }
};

const checkWhoWin = ( winner ) => {

  if ( winner ) {
    playerScore = playerScore + 1;
    resultMessage( quoteSelector( winningText ) );
    removeHealth( true, playerScore);
    hurt( true );

  } else if ( winner == false ) {
    computerScore = computerScore + 1;
    resultMessage( quoteSelector( lossingText ) );
    removeHealth( false, computerScore);
    hurt( false );

  } else if ( winner !== null ) {
    resultMessage( quoteSelector( tieText ) );
  }
};

const selectChoice = ( value ) => {

  let playerChoice = value;
  let computerChoice = computerSelection();
  shoot( playerChoice, computerChoice );
  setTimeout( () => { checkWhoWin( selectWinner( playerChoice, computerChoice ) ); }, 1000 );
  setTimeout( () => { checkWinner(); }, 1000 );
};

const toggleScreen = ( cl, toggle ) => {

  let elem = document.querySelector( cl );
  let dis = toggle ? "block" : "none";
  elem.style.display = dis;
};

const startGame = () => {

  console.log( "start game" );
  toggleScreen( ".start-screen-bg", false );
  toggleScreen( ".stage-screen", true );
};

function shoot( choiceOfPlayer, choiceOfComputer ) {

  let playerHand = document.querySelector(".player-choice-img");
  let computerHand = document.querySelector(".computer-choice-img");

  playerHand.src = `images/choices/${ choiceOfPlayer }.png`;
  computerHand.src = `images/choices/${ choiceOfComputer }.png`;

  playerHand.classList.add('shoot');
  setTimeout( ()=> { playerHand.classList.remove("shoot") }, 1000 );
  computerHand.classList.add('shoot');
  setTimeout( ()=> { computerHand.classList.remove("shoot") }, 1000 );
}

//This allow to disable the button and disallow several click on the button until the 4second time
const disableButton = () => {

  button.forEach( ( buttons ) => {

    buttons.disabled = true;
    setTimeout( function() {
      buttons.disabled = false
    }, 4000 );
  });
}

//Eventlisteners

//Selecting all of the button and iterating it
button.forEach( ( buttons ) => {

  buttons.addEventListener("click", function() {
    selectChoice( buttons.value );
    disableButton();
  });

});

startButton.addEventListener("click", function () {
  startGame();
});

//this event listener will refresh the page and restart the game when clicked
playAgainBtn.addEventListener("click", function () {
  window.location.reload();
  //pause the music if the user click the play again button
  playerWinMusic.pause();
  computerWinMusic.pause();
});

onButton.addEventListener('click', function() {
  onButton.style.display = 'none';
  offButton.style.display = 'block'
  bgMusic.pause();
});

offButton.addEventListener('click', function () {
  offButton.style.display = 'none';
  onButton.style.display = 'block';
  bgMusic.play();
});

bgMusic.addEventListener("ended", () => {
  bgMusic.currentTime = 0; 
  bgMusic.play();
});