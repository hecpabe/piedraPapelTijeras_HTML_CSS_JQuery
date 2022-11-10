

/* Constants Definition */
const MODE_IA_VS_IA = 0;
const MODE_PLAYER_VS_IA = 1;
const MODE_PLAYER_VS_PLAYER = 2;

const options = ["Rock", "Paper", "Scissors"];
const winRules = {

    "Rock":{
        "Rock": "Es un empate!!!",
        "Paper": "Gana el segundo!!!",
        "Scissors": "Gana el primero!!!"
    },

    "Paper":{
        "Rock": "Gana el primero!!!",
        "Paper": "Es un empate!!!",
        "Scissors": "Gana el segundo!!!"
    },

    "Scissors":{
        "Rock": "Gana el segundo!!!",
        "Paper": "Gana el primero!!!",
        "Scissors": "Es un empate!!!"
    }

};

/* Global Declarations */
var hoverActivated = true;
var playerIsPlaying = false;
var currentNumericMode;
var secondPlayerTime = false;
var playerVSPlayerFirstPlayerChoice;

var firstPlayerWins = 0;
var secondPlayerWins = 0;

var currentMode;

/* JQuery */
$(function () {

    // Hide the screens
    $(".game").hide();

    // Event handlers
    $("#homeButton").click(function () {

        let playersNumber = $("#playersNumberSelect :selected").val();
        playersNumber = parseInt(playersNumber);

        $(".home").hide();
        startGame(playersNumber);

    });

    $(".image-container").click(function (event) {

        if(playerIsPlaying){

            let playerChoice = event.target.getAttribute("value");

            if(currentNumericMode == MODE_PLAYER_VS_IA)
                setTimeout(playerMadeChoiceVSIA(playerChoice), 500);
            
            if(currentNumericMode == MODE_PLAYER_VS_PLAYER && !secondPlayerTime)
                setTimeout(firstPlayerMadeChoiceVSPlayer(playerChoice), 500);
            else if(currentNumericMode == MODE_PLAYER_VS_PLAYER && secondPlayerTime)
                setTimeout(secondPlayerMadeChoice(playerChoice), 500);

        }

        if(!secondPlayerTime){
            playerIsPlaying = false;
            deactivateHoverImages();
        }

    });

    $("#nextGameButton").click(function () {
        setTimeout(currentMode, 500);
    });
    $("#restartGameButton").click(function () {
        window.location.reload();
    });

});

/* Functions Code */
/*
    Name: Start Game
    Description: Checks the number of players and start the chosen game
    Parameters: 
        0: INT: Number of human players to play
    Return: None
*/  
function startGame(playersNumber){

    switch(playersNumber){

        case MODE_IA_VS_IA: 
            startGameIAVSIA();
            break;
        
        case MODE_PLAYER_VS_IA:
            startGamePlayerVSIA();
            break;
        
        case MODE_PLAYER_VS_PLAYER:
            startGamePlayerVSPlayer();
            break;

    }

}

function startGameIAVSIA(){

    currentMode = startGameIAVSIA;

    // Text initialization
    updateStats("IA_1", "IA_2");
    $("#gameScreenTitle").text("Piedra | Papel | Tijeras (IA VS IA)");
    $("#gameScreenText").text("Es el turno de IA_1");
    $("#gameScreenText").css({"color":"aqua"});

    // Hover deactivation
    deactivateHoverImages();

    // Hide results and buttons
    deactivateEndGameParts();

    // Show Game
    $(".game").show();

    // IA Choices
    let firstIAChoice = makeIAChoice();
    $("#gameScreenText").text("IA_1 ha elegido, es el turno de IA_2");
    $("#gameScreenText").css({"color":"greenyellow"});

    let secondIAChoice = makeIAChoice();
    $("#gameScreenText").text("Juego finalizado... Compruebe los resultados");
    $("#gameScreenText").css({"color":"orange"});

    let result = winRules[firstIAChoice][secondIAChoice];
    
    // Show results
    $("#gameResultsFirstPlayer").text("Jugada de IA_1: " + firstIAChoice);
    $("#gameResultsSecondPlayer").text("Jugada de IA_2: " + secondIAChoice);
    $("#gameResultsGeneral").text("Resultado: " + result);
    activateEndGameParts();

    // Update stats
    updateStats("IA_1", "IA_2", result);

}

function startGamePlayerVSIA(){

    currentMode = startGamePlayerVSIA;
    playerIsPlaying = true;
    currentNumericMode = MODE_PLAYER_VS_IA;

    // Text initialization
    updateStats("Player_1", "IA_1");
    $("#gameScreenTitle").text("Piedra | Papel | Tijeras (Player VS IA)");
    $("#gameScreenText").text("Es el turno de Player_1");
    $("#gameScreenText").css({"color":"aqua"});

    // Hover activation
    activateHoverImages();

    // Hide results and buttons
    deactivateEndGameParts();

    // Show Game
    $(".game").show();

}

function startGamePlayerVSPlayer(){

    currentMode = startGamePlayerVSPlayer;
    playerIsPlaying = true;
    secondPlayerTime = false;
    currentNumericMode = MODE_PLAYER_VS_PLAYER;

    // Text initialization
    updateStats("Player_1", "Player_2");
    $("#gameScreenTitle").text("Piedra | Papel | Tijeras (Player VS Player)");
    $("#gameScreenText").text("Es el turno de Player_1");
    $("#gameScreenText").css({"color":"aqua"});

    // Hover activation
    activateHoverImages();

    // Hide results and buttons
    deactivateEndGameParts();

    // Show Game
    $(".game").show();

}

function playerMadeChoiceVSIA(playerChoice){

    $("#gameScreenText").text("Player_1 ha elegido, es el turno de IA_1");
    $("#gameScreenText").css({"color":"greenyellow"});

    let iaChoice = makeIAChoice();
    $("#gameScreenText").text("Juego finalizado... Compruebe los resultados");
    $("#gameScreenText").css({"color":"orange"});

    let result = winRules[playerChoice][iaChoice];

    // Show results
    $("#gameResultsFirstPlayer").text("Jugada de Player_1: " + playerChoice);
    $("#gameResultsSecondPlayer").text("Jugada de IA_1: " + iaChoice);
    $("#gameResultsGeneral").text("Resultado: " + result);
    activateEndGameParts();

    // Update stats
    updateStats("Player_1", "IA_1", result);

}

function firstPlayerMadeChoiceVSPlayer(playerChoice){

    playerIsPlaying = true;
    secondPlayerTime = true;
    playerVSPlayerFirstPlayerChoice = playerChoice;
    activateHoverImages();

    $("#gameScreenText").text("Player_1 ha elegido, es el turno de Player_2");
    $("#gameScreenText").css({"color":"greenyellow"});

}

function secondPlayerMadeChoice(playerChoice){

    $("#gameScreenText").text("Juego finalizado... Compruebe los resultados");
    $("#gameScreenText").css({"color":"orange"});

    let result = winRules[playerVSPlayerFirstPlayerChoice][playerChoice];

    // Show results
    $("#gameResultsFirstPlayer").text("Jugada de Player_1: " + playerVSPlayerFirstPlayerChoice);
    $("#gameResultsSecondPlayer").text("Jugada de Player_2: " + playerChoice);
    $("#gameResultsGeneral").text("Resultado: " + result);
    activateEndGameParts();

    // Update stats
    updateStats("Player_1", "Player_2", result);

}

function activateHoverImages(){

    if(!hoverActivated){
        $(".image-container").toggleClass("image-container-hover");
        hoverActivated = true;
    }

}

function deactivateHoverImages(){

    if(hoverActivated){
        $(".image-container").toggleClass("image-container-hover");
        hoverActivated = false;
    }

}

function activateEndGameParts(){

    $(".game-results").show();
    $(".game-buttons").show();

}

function deactivateEndGameParts(){

    $(".game-results").hide();
    $(".game-buttons").hide();

}

function updateStats(firstPlayerName, secondPlayerName, result = ""){

    if(result == "Gana el primero!!!")
        firstPlayerWins++;
    
    if(result == "Gana el segundo!!!")
        secondPlayerWins++;

    $("#scoreboardScreenFirstPlayerStats").text(firstPlayerName + ": " + firstPlayerWins);
    $("#scoreboardScreenSecondPlayerStats").text(secondPlayerName + ": " + secondPlayerWins);

}

function makeIAChoice(){

    let random = Math.floor(Math.random() * options.length);
    return options[random];

}