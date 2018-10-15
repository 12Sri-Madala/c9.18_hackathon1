$(document).ready(initializeApp);

function initializeApp(){
    create_board();
    display_stats();
    $(".resetBtn").click(reset_game_bttn);
    $(".vsCompEZ").click(startEasyComputerGame);
    $(".vsCompMedium").click(startMediumComputerGame);
    $(".vsCompHard").click(startHardComputerGame);
    startGame();
}

var game_board = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,1,2,0,0,0],
    [0,0,0,2,1,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
];

function create_board(){
    for(var rowIndex =0; rowIndex < game_board.length; rowIndex++){
        var row = $("<div>").addClass("row");
        for(var colIndex = 0; colIndex < game_board.length; colIndex ++){
            var square = $("<div>").addClass("square").attr("row", rowIndex).attr("col", colIndex);
            if(game_board[rowIndex][colIndex] === 1){
                var whiteSquare = $("<div>").addClass("blankSquare whiteSquare");
                square.append(whiteSquare);
            } else if (game_board[rowIndex][colIndex] === 2){
           
                var blackSquare = $("<div>").addClass("blankSquare blackSquare");
                square.append(blackSquare);
            } else if (game_board[rowIndex][colIndex] === 0 ){
                var greenSquare = $("<div>").addClass("blankSquare");
                square.append(greenSquare);
            }
            row.append(square);
        }
        $(".game_board_div").append(row);
    }
}

var blackSquareCounter = null;
var whiteSquareCounter = null;

function display_stats() {
    var blackSquareCounter = 0;
    var whiteSquareCounter = 0;
    for (arrayRow = 0; arrayRow < 8; arrayRow++) {
        for (arrayCol = 0; arrayCol < 8; arrayCol++) {
            var currentPlayer1GameSquare = $("[row = " + arrayRow + "][col = " + arrayCol + "]");
            var currentPlayerContents = currentPlayer1GameSquare.find('div');
            if (currentPlayerContents.hasClass("blackSquare")) {
                blackSquareCounter++;
                $(".blackScore").text(blackSquareCounter);
            } else if (currentPlayerContents.hasClass("whiteSquare")){
                whiteSquareCounter++;
                $(".whiteScore").text(whiteSquareCounter);
            }
        }
    }
}

function reset_game_bttn(){
    $(".game_board_div").empty();
    create_board();
    gameRound = true;
    startGame();
}

function determineWinner() {
    var highlightedSpacesCounter = null;
    for (arrayRow = 0; arrayRow < 8; arrayRow++) {
        for (arrayCol = 0; arrayCol < 8; arrayCol++) {
            var highlightedSquares = $("[row = " + arrayRow + "][col = " + arrayCol + "]");
            var currentSquare = highlightedSquares.find('div');
            if (currentSquare.hasClass('highlight2') || currentSquare.hasClass('highlight')){
                highlightedSpacesCounter++;
            }
        }
    }
    if (highlightedSpacesCounter === null && whiteSquareCounter > blackSquareCounter){
        showModal("black");
    }
    else if ( highlightedSpacesCounter === null && blackSquareCounter > whiteSquareCounter){
        showModal("white");
    }
}

function showModal(color) {
    $('#winModal').removeClass("hide");
    if (color === "white") {
        $('.modal-body').text("Congratulations Player 1!");
    }
    else {
        $('.modal-body').text("Congratulations Player 2!");
    }
    $('.playAgain').on("click", function () {
        $('#winModal').addClass("hide");
    })
}

//////////////////////////////// PLAYER 1 V 1 ////////////////////////////////////

var gameRound = true;
var storePossibleMoves = [];

function applyClicksOnSpaces() {
    $(".highlight").click(flipCoins);
    $(".highlight2").click(flipCoins);
    display_stats();
}


function startGame(){
    if (gameRound === true){
        $('#player1').text('Player 1 Turn').addClass("border");
        $('#player2').text('Player 2 Turn').removeClass("border");
        player1AvailableSpaces();
        applyClicksOnSpaces();
    } else {
        $('#player1').text('Player 1 Turn').removeClass("border");
        $('#player2').text('Player 2 Turn').addClass("border");
        player2AvailableSpaces();
        applyClicksOnSpaces();
    }
}

function player1AvailableSpaces(){
    console.log("hii from player 1 available spaces")
    for (arrayRow = 0; arrayRow<8; arrayRow++){
        for (arrayCol = 0; arrayCol<8; arrayCol++){
            var currentPlayer1GameSquare = $("[row = " + arrayRow + "][col = " + arrayCol + "]");
            var currentPlayerContents = currentPlayer1GameSquare.find('div');
            if ( currentPlayerContents.hasClass("blackSquare") ){
                for (var rowCoordinate = -1; rowCoordinate<2; rowCoordinate++){
                    for (var colCoordinate = -1; colCoordinate<2; colCoordinate++){
                        var currentPosition = { x: arrayRow + rowCoordinate, y: arrayCol + colCoordinate};
                        var adjacentPlayer1Square = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                        var adjacentPlayerContents = adjacentPlayer1Square.find('div');
                        if (adjacentPlayerContents.hasClass("whiteSquare")){
                            while (adjacentPlayer1Square.attr("row")>=0 && adjacentPlayer1Square.attr("row")<8 && adjacentPlayer1Square.attr("col")>=0 && adjacentPlayer1Square.attr("col")<8){
                                currentPosition.x+=rowCoordinate; 
                                currentPosition.y+=colCoordinate;
                                adjacentPlayer1Square = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                                adjacentPlayerContents = adjacentPlayer1Square.find('div');
                                if (adjacentPlayerContents.hasClass("whiteSquare")){
                                    continue;
                                } else if (adjacentPlayerContents.hasClass("blackSquare")){
                                    break;
                                } else if (adjacentPlayer1Square.hasClass("square")){
                                    adjacentPlayerContents.addClass("highlight2");
                                    break;
                                }else if (adjacentPlayer1Square === undefined){
                                    break;
                                }
                            } 
                        }
                    }
                }
            }
        }
    }
    determineWinner();
}

function player2AvailableSpaces(){
    // console.log("I'm broken here");
    for (arrayRow = 0; arrayRow<8; arrayRow++){
        for (arrayCol = 0; arrayCol<8; arrayCol++){
            var currentPlayer1GameSquare = $("[row = " + arrayRow + "][col = " + arrayCol + "]");
            var currentPlayerContents = currentPlayer1GameSquare.find('div');
            if ( currentPlayerContents.hasClass("whiteSquare") ){
                for (var rowCoordinate = -1; rowCoordinate<2; rowCoordinate++){
                    for (var colCoordinate = -1; colCoordinate<2; colCoordinate++){
                        var currentPosition = { x: arrayRow + rowCoordinate, y: arrayCol + colCoordinate};
                        var adjacentPlayer1Square = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                        var adjacentPlayerContents = adjacentPlayer1Square.find('div');
                        if (adjacentPlayerContents.hasClass("blackSquare")){
                            while (adjacentPlayer1Square.attr("row")>=0 && adjacentPlayer1Square.attr("row")<8 && adjacentPlayer1Square.attr("col")>=0 && adjacentPlayer1Square.attr("col")<8){
                                currentPosition.x+=rowCoordinate; 
                                currentPosition.y+=colCoordinate;
                                adjacentPlayer1Square = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                                adjacentPlayerContents = adjacentPlayer1Square.find('div');
                                if (adjacentPlayerContents.hasClass("blackSquare")){
                                    continue;
                                } else if (adjacentPlayerContents.hasClass("whiteSquare")){
                                    break;
                                } else if (adjacentPlayer1Square.hasClass("square")){
                                    storePossibleMoves.push(adjacentPlayerContents)
                                    adjacentPlayerContents.addClass("highlight");
                                    break;
                                }else if (adjacentPlayer1Square === undefined){
                                    break;
                                }
                            } 
                        }
                    }
                }
            }
        }
    }
    determineWinner();
}

function flipCoins(){
    var currentPlacedCoin = $(event.currentTarget);
    if (gameRound){
        currentPlacedCoin.addClass("blackSquare");
        $('.highlight2').off();
        $(".highlight2").removeClass("highlight2");
        for (var rowCoordinate = -1; rowCoordinate<2; rowCoordinate++){
            for (var colCoordinate = -1; colCoordinate<2; colCoordinate++){
                coinsToFlip = [];
                var placedCoinRow = parseInt(currentPlacedCoin.parent().attr("row"));
                var placedCoinCol = parseInt(currentPlacedCoin.parent().attr("col"));
                var currentPosition = { x: (placedCoinRow + rowCoordinate), y: (placedCoinCol + colCoordinate)};
                // $(".testing").removeClass("testing");
                var adjacentToCurrent = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                // adjacentToCurrent.addClass("testing");
                var adjCurrentContents = adjacentToCurrent.find('div');
                if (adjCurrentContents.hasClass("whiteSquare")){
                    coinsToFlip.push(adjCurrentContents);
                    while (adjacentToCurrent.attr("row")>=0 && adjacentToCurrent.attr("row")<8 && adjacentToCurrent.attr("col")>=0 && adjacentToCurrent .attr("col")<8){
                        currentPosition.x+=rowCoordinate;
                        currentPosition.y+=colCoordinate;
                        // $(".testing2").removeClass("testing2");
                        adjacentToCurrent = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                        // adjacentToCurrent.addClass("testing2");
                        adjCurrentContents = adjacentToCurrent.find('div');
                        if (adjCurrentContents.hasClass("whiteSquare")){
                            coinsToFlip.push(adjCurrentContents);
                            continue;
                        }  else if (adjCurrentContents.hasClass("blackSquare")){
                            for (flipCoinInd = 0; flipCoinInd<coinsToFlip.length; flipCoinInd++){
                                coinsToFlip[flipCoinInd].removeClass("whiteSquare");
                                coinsToFlip[flipCoinInd].addClass("blackSquare")
                            }
                            break;
                        }else if (adjCurrentContents.hasClass("blankSquare")){
                            break;
                        }
                    }
                }
            }
        }
    } else {
        currentPlacedCoin.addClass("whiteSquare");
        $('.highlight').off();
        $(".highlight").removeClass("highlight");
        for (var rowCoordinate = -1; rowCoordinate<2; rowCoordinate++){
            for (var colCoordinate = -1; colCoordinate<2; colCoordinate++){
                coinsToFlip = [];
                var placedCoinRow = parseInt(currentPlacedCoin.parent().attr("row"));
                var placedCoinCol = parseInt(currentPlacedCoin.parent().attr("col"));
                var currentPosition = { x: (placedCoinRow + rowCoordinate), y: (placedCoinCol + colCoordinate)};
                var adjacentToCurrent = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                var adjCurrentContents = adjacentToCurrent.find('div');
                if (adjCurrentContents.hasClass("blackSquare")){
                    coinsToFlip.push(adjCurrentContents);
                    while (adjacentToCurrent.attr("row")>=0 && adjacentToCurrent.attr("row")<8 && adjacentToCurrent.attr("col")>=0 && adjacentToCurrent .attr("col")<8){
                        currentPosition.x+=rowCoordinate;
                        currentPosition.y+=colCoordinate;
                        adjacentToCurrent = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                        adjCurrentContents = adjacentToCurrent.find('div');
                        if (adjCurrentContents.hasClass("blackSquare")){
                            coinsToFlip.push(adjCurrentContents);
                            continue;
                        } else if (adjCurrentContents.hasClass("whiteSquare")){
                            for (flipCoinInd = 0; flipCoinInd<coinsToFlip.length; flipCoinInd++){
                                coinsToFlip[flipCoinInd].removeClass("blackSquare");
                                coinsToFlip[flipCoinInd].addClass("whiteSquare")
                            }
                            break;
                        } else if (adjCurrentContents.hasClass("blankSquare")){
                            break;
                        }
                    }
                }
            }
        }
    }
        gameRound = !gameRound;
        startGame();
    }

//////////////////////////////// VS EZ COMPUTER ////////////////////////////////////

// EZ As 12Sri

function startEasyComputerGame(){
    if (gameRound === true){
        $('#player1').text('Player 1 Turn').addClass("border");
        $('#player2').text('EZ Computer').removeClass("border");
        player1AvailableSpacesEasyComputer();
        applyClicksOnSpacesEasyComputer();
    } else {
        $('#player1').text('Player 1 Turn').removeClass("border");
        $('#player2').text('EZ Computer').addClass("border");
        easyComputerAvailableSpaces();
        setTimeout(noPossibleMovesEZ, 1000);
        setTimeout(easyComputerFlipCoins, 3000);
        display_stats();
    }
    console.log("Hi from start EASY computer game");
}

function applyClicksOnSpacesEasyComputer() {
    $(".highlight2").click(easyComputerFlipCoins);
    display_stats();
    console.log("Hi from apply clicks on spaces EASY computer");
}

function noPossibleMovesEZ(){
    var highlightedSpacesCounter = 0
    for (arrayRow = 0; arrayRow < 8; arrayRow++) {
        for (arrayCol = 0; arrayCol < 8; arrayCol++) {
            var currentSquare = $("[row = " + arrayRow + "][col = " + arrayCol + "]");
            var highlightedSquare = currentSquare.find('div');
            if (highlightedSquare.hasClass('highlight')){
                highlightedSpacesCounter++
            }
        }
    }
    if (highlightedSpacesCounter === 0){
        gameRound = !gameRound;
        startEasyComputerGame();
    } 
}

function player1AvailableSpacesEasyComputer(){
    console.log("hii from player 1 EASY Computer available spaces");
    for (arrayRow = 0; arrayRow<8; arrayRow++){
        for (arrayCol = 0; arrayCol<8; arrayCol++){
            var currentPlayer1GameSquare = $("[row = " + arrayRow + "][col = " + arrayCol + "]");
            var currentPlayerContents = currentPlayer1GameSquare.find('div');
            if ( currentPlayerContents.hasClass("blackSquare") ){
                for (var rowCoordinate = -1; rowCoordinate<2; rowCoordinate++){
                    for (var colCoordinate = -1; colCoordinate<2; colCoordinate++){
                        var currentPosition = { x: arrayRow + rowCoordinate, y: arrayCol + colCoordinate};
                        var adjacentPlayer1Square = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                        var adjacentPlayerContents = adjacentPlayer1Square.find('div');
                        if (adjacentPlayerContents.hasClass("whiteSquare")){
                            while (adjacentPlayer1Square.attr("row")>=0 && adjacentPlayer1Square.attr("row")<8 && adjacentPlayer1Square.attr("col")>=0 && adjacentPlayer1Square.attr("col")<8){
                                currentPosition.x+=rowCoordinate; 
                                currentPosition.y+=colCoordinate;
                                adjacentPlayer1Square = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                                adjacentPlayerContents = adjacentPlayer1Square.find('div');
                                if (adjacentPlayerContents.hasClass("whiteSquare")){
                                    continue;
                                } else if (adjacentPlayerContents.hasClass("blackSquare")){
                                    break;
                                } else if (adjacentPlayer1Square.hasClass("square")){
                                    adjacentPlayerContents.addClass("highlight2");
                                    break;
                                }else if (adjacentPlayer1Square === undefined){
                                    break;
                                }
                            } 
                        }
                    }
                }
            }
        }
    }
    determineWinner();
}

function easyComputerAvailableSpaces(){
    console.log("Hi from player 2 available spaces EASY computer")
    for (arrayRow = 0; arrayRow<8; arrayRow++){
        for (arrayCol = 0; arrayCol<8; arrayCol++){
            var currentPlayer1GameSquare = $("[row = " + arrayRow + "][col = " + arrayCol + "]");
            var currentPlayerContents = currentPlayer1GameSquare.find('div');
            if ( currentPlayerContents.hasClass("whiteSquare") ){
                for (var rowCoordinate = -1; rowCoordinate<2; rowCoordinate++){
                    for (var colCoordinate = -1; colCoordinate<2; colCoordinate++){
                        var currentPosition = { x: arrayRow + rowCoordinate, y: arrayCol + colCoordinate};
                        var adjacentPlayer1Square = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                        var adjacentPlayerContents = adjacentPlayer1Square.find('div');
                        if (adjacentPlayerContents.hasClass("blackSquare")){
                            while (adjacentPlayer1Square.attr("row")>=0 && adjacentPlayer1Square.attr("row")<8 && adjacentPlayer1Square.attr("col")>=0 && adjacentPlayer1Square.attr("col")<8){
                                currentPosition.x+=rowCoordinate; 
                                currentPosition.y+=colCoordinate;
                                adjacentPlayer1Square = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                                adjacentPlayerContents = adjacentPlayer1Square.find('div');
                                if (adjacentPlayerContents.hasClass("blackSquare")){
                                    continue;
                                } else if (adjacentPlayerContents.hasClass("whiteSquare")){
                                    break;
                                } else if (adjacentPlayer1Square.hasClass("square")){
                                    storePossibleMoves.push(adjacentPlayerContents)
                                    adjacentPlayerContents.addClass("highlight");
                                    break;
                                }else if (adjacentPlayer1Square === undefined){
                                    break;
                                }
                            } 
                        }
                    }
                }
            }
        }
    }
}

function countNumberOfFlippedCoinsEasy(){
    var listOfMoves = [];
    var currentMoveToCheck = null;
    for (flipCoinInd = 0; flipCoinInd<storePossibleMoves.length; flipCoinInd++){
        var findBestMove = {};
        var coinsToFlip = [null];
        currentMoveToCheck = storePossibleMoves[flipCoinInd];
        // $(".testing").removeClass("testing");
        // $(currentMoveToCheck).parent().addClass("testing");
        for (var rowCoordinate = -1; rowCoordinate<2; rowCoordinate++){
            for (var colCoordinate = -1; colCoordinate<2; colCoordinate++){
                var numberOfFlippedCoins = 0;
                var placedCoinRow = parseInt(currentMoveToCheck.parent().attr("row"));
                var placedCoinCol = parseInt(currentMoveToCheck.parent().attr("col"));
                var currentPosition = { x: (placedCoinRow + rowCoordinate), y: (placedCoinCol + colCoordinate)};
                // $(".testing").removeClass("testing");
                var adjacentToCurrent = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                // adjacentToCurrent.addClass("testing");
                var adjCurrentContents = adjacentToCurrent.find('div');
                if (adjCurrentContents.hasClass("blackSquare")){
                    numberOfFlippedCoins++;
                    while (adjacentToCurrent.attr("row")>=0 && adjacentToCurrent.attr("row")<8 && adjacentToCurrent.attr("col")>=0 && adjacentToCurrent .attr("col")<8){
                        currentPosition.x+=rowCoordinate;
                        currentPosition.y+=colCoordinate;
                        // $(".testing2").removeClass("testing2");
                        adjacentToCurrent = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                        // adjacentToCurrent.addClass("testing2");
                        adjCurrentContents = adjacentToCurrent.find('div');
                        if (adjCurrentContents.hasClass("blackSquare")){
                            numberOfFlippedCoins++;
                            continue;
                        } else if (adjCurrentContents.hasClass("whiteSquare")){
                            coinsToFlip[0] += numberOfFlippedCoins;
                            break;
                        } else if (adjCurrentContents.hasClass("blankSquare")){
                            break;
                        }
                    }
                }
            }
        }
        findBestMove.value = coinsToFlip[0];
        findBestMove.element = currentMoveToCheck;
        listOfMoves.push(findBestMove);
    }
    var worstMove = listOfMoves.sort(function(a,b){
        return b.value - a.value
    })
        return worstMove[worstMove.length - 1].element;
}

function easyComputerFlipCoins(){
    console.log("hi from EASY computer flip coins");
    if (gameRound){
        var currentPlacedCoin = $(event.currentTarget);
        currentPlacedCoin.addClass("blackSquare");
        $('.highlight2').off();
        $(".highlight2").removeClass("highlight2");
        for (var rowCoordinate = -1; rowCoordinate<2; rowCoordinate++){
            for (var colCoordinate = -1; colCoordinate<2; colCoordinate++){
                coinsToFlip = [];
                var placedCoinRow = parseInt(currentPlacedCoin.parent().attr("row"));
                var placedCoinCol = parseInt(currentPlacedCoin.parent().attr("col"));
                var currentPosition = { x: (placedCoinRow + rowCoordinate), y: (placedCoinCol + colCoordinate)};
                // $(".testing").removeClass("testing");
                var adjacentToCurrent = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                // adjacentToCurrent.addClass("testing");
                var adjCurrentContents = adjacentToCurrent.find('div');
                if (adjCurrentContents.hasClass("whiteSquare")){
                    coinsToFlip.push(adjCurrentContents);
                    while (adjacentToCurrent.attr("row")>=0 && adjacentToCurrent.attr("row")<8 && adjacentToCurrent.attr("col")>=0 && adjacentToCurrent .attr("col")<8){
                        currentPosition.x+=rowCoordinate;
                        currentPosition.y+=colCoordinate;
                        // $(".testing2").removeClass("testing2");
                        adjacentToCurrent = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                        // adjacentToCurrent.addClass("testing2");
                        adjCurrentContents = adjacentToCurrent.find('div');
                        if (adjCurrentContents.hasClass("whiteSquare")){
                            coinsToFlip.push(adjCurrentContents);
                            continue;
                        }  else if (adjCurrentContents.hasClass("blackSquare")){
                            for (flipCoinInd = 0; flipCoinInd<coinsToFlip.length; flipCoinInd++){
                                coinsToFlip[flipCoinInd].removeClass("whiteSquare");
                                coinsToFlip[flipCoinInd].addClass("blackSquare")
                            }
                            break;
                        }else if (adjCurrentContents.hasClass("blankSquare")){
                            break;
                        }
                    }
                }
            }
        }
    } else {
        var worstMove = countNumberOfFlippedCoinsEasy();
        $(".highlight3").removeClass("highlight3");
        worstMove.addClass("whiteSquare");
        worstMove.parent().addClass("highlight3");
        storePossibleMoves = [];
        $('.highlight').off();
        $(".highlight").removeClass("highlight");
        for (var rowCoordinate = -1; rowCoordinate<2; rowCoordinate++){
            for (var colCoordinate = -1; colCoordinate<2; colCoordinate++){
                coinsToFlip = [];
                var placedCoinRow = parseInt(worstMove.parent().attr("row"));
                var placedCoinCol = parseInt(worstMove.parent().attr("col"));
                var currentPosition = { x: (placedCoinRow + rowCoordinate), y: (placedCoinCol + colCoordinate)};
                var adjacentToCurrent = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                var adjCurrentContents = adjacentToCurrent.find('div');
                if (adjCurrentContents.hasClass("blackSquare")){
                    coinsToFlip.push(adjCurrentContents);
                    while (adjacentToCurrent.attr("row")>=0 && adjacentToCurrent.attr("row")<8 && adjacentToCurrent.attr("col")>=0 && adjacentToCurrent .attr("col")<8){
                        currentPosition.x+=rowCoordinate;
                        currentPosition.y+=colCoordinate;
                        adjacentToCurrent = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                        adjCurrentContents = adjacentToCurrent.find('div');
                        if (adjCurrentContents.hasClass("blackSquare")){
                            coinsToFlip.push(adjCurrentContents);
                            continue;
                        } else if (adjCurrentContents.hasClass("whiteSquare")){
                            for (flipCoinInd = 0; flipCoinInd<coinsToFlip.length; flipCoinInd++){
                                coinsToFlip[flipCoinInd].removeClass("blackSquare");
                                coinsToFlip[flipCoinInd].addClass("whiteSquare")
                            }
                            break;
                        } else if (adjCurrentContents.hasClass("blankSquare")){
                            break;
                        }
                    }
                }
            }
        }
    }
        gameRound = !gameRound;
        startEasyComputerGame();
}

//////////////////////////////// VS MEDIUM-RARE COMPUTER ////////////////////////////////////

function startMediumComputerGame(){
    if (gameRound === true){
        $('#player1').text('Player 1 Turn').addClass("border");
        $('#player2').text('Medium-Rare Computer').removeClass("border");
        player1AvailableSpacesComputer();
        applyClicksOnSpacesComputer();
    } else {
        $('#player1').text('Player 1 Turn').removeClass("border");
        $('#player2').text('Medium-Rare Computer').addClass("border");
        computerAvailableSpaces();
        setTimeout(noPossibleMovesMedium, 1000);
        setTimeout(computerFlipCoins, 3000);
        display_stats();
    }
    console.log("Hi from start computer game");
}

function applyClicksOnSpacesComputer() {
    // $(".highlight").click(computerFlipCoins);
    $(".highlight2").click(computerFlipCoins);
    // setTimeout(computerFlipCoins, 3000)
    // $('.highlight').off();
    display_stats();
    console.log("Hi from apply clicks on spaces computer");
}

function noPossibleMovesMedium(){
    var highlightedSpacesCounter = 0
    for (arrayRow = 0; arrayRow < 8; arrayRow++) {
        for (arrayCol = 0; arrayCol < 8; arrayCol++) {
            var currentSquare = $("[row = " + arrayRow + "][col = " + arrayCol + "]");
            var highlightedSquare = currentSquare.find('div');
            if (highlightedSquare.hasClass('highlight')){
                highlightedSpacesCounter++
            }
        }
    }
    if (highlightedSpacesCounter === 0){
        gameRound = !gameRound;
        startMediumComputerGame();
    } 
}

function player1AvailableSpacesComputer(){
    console.log("hii from player 1 Computer available spaces");
    for (arrayRow = 0; arrayRow<8; arrayRow++){
        for (arrayCol = 0; arrayCol<8; arrayCol++){
            var currentPlayer1GameSquare = $("[row = " + arrayRow + "][col = " + arrayCol + "]");
            var currentPlayerContents = currentPlayer1GameSquare.find('div');
            if ( currentPlayerContents.hasClass("blackSquare") ){
                for (var rowCoordinate = -1; rowCoordinate<2; rowCoordinate++){
                    for (var colCoordinate = -1; colCoordinate<2; colCoordinate++){
                        var currentPosition = { x: arrayRow + rowCoordinate, y: arrayCol + colCoordinate};
                        var adjacentPlayer1Square = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                        var adjacentPlayerContents = adjacentPlayer1Square.find('div');
                        if (adjacentPlayerContents.hasClass("whiteSquare")){
                            while (adjacentPlayer1Square.attr("row")>=0 && adjacentPlayer1Square.attr("row")<8 && adjacentPlayer1Square.attr("col")>=0 && adjacentPlayer1Square.attr("col")<8){
                                currentPosition.x+=rowCoordinate; 
                                currentPosition.y+=colCoordinate;
                                adjacentPlayer1Square = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                                adjacentPlayerContents = adjacentPlayer1Square.find('div');
                                if (adjacentPlayerContents.hasClass("whiteSquare")){
                                    continue;
                                } else if (adjacentPlayerContents.hasClass("blackSquare")){
                                    break;
                                } else if (adjacentPlayer1Square.hasClass("square")){
                                    adjacentPlayerContents.addClass("highlight2");
                                    break;
                                }else if (adjacentPlayer1Square === undefined){
                                    break;
                                }
                            } 
                        }
                    }
                }
            }
        }
    }
}

function computerAvailableSpaces(){
    console.log("Hi from player 2 available spaces computer")
    for (arrayRow = 0; arrayRow<8; arrayRow++){
        for (arrayCol = 0; arrayCol<8; arrayCol++){
            var currentPlayer1GameSquare = $("[row = " + arrayRow + "][col = " + arrayCol + "]");
            var currentPlayerContents = currentPlayer1GameSquare.find('div');
            if ( currentPlayerContents.hasClass("whiteSquare") ){
                for (var rowCoordinate = -1; rowCoordinate<2; rowCoordinate++){
                    for (var colCoordinate = -1; colCoordinate<2; colCoordinate++){
                        var currentPosition = { x: arrayRow + rowCoordinate, y: arrayCol + colCoordinate};
                        var adjacentPlayer1Square = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                        var adjacentPlayerContents = adjacentPlayer1Square.find('div');
                        if (adjacentPlayerContents.hasClass("blackSquare")){
                            while (adjacentPlayer1Square.attr("row")>=0 && adjacentPlayer1Square.attr("row")<8 && adjacentPlayer1Square.attr("col")>=0 && adjacentPlayer1Square.attr("col")<8){
                                currentPosition.x+=rowCoordinate; 
                                currentPosition.y+=colCoordinate;
                                adjacentPlayer1Square = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                                adjacentPlayerContents = adjacentPlayer1Square.find('div');
                                if (adjacentPlayerContents.hasClass("blackSquare")){
                                    continue;
                                } else if (adjacentPlayerContents.hasClass("whiteSquare")){
                                    break;
                                } else if (adjacentPlayer1Square.hasClass("square")){
                                    storePossibleMoves.push(adjacentPlayerContents)
                                    adjacentPlayerContents.addClass("highlight");
                                    break;
                                }else if (adjacentPlayer1Square === undefined){
                                    break;
                                }
                            } 
                        }
                    }
                }
            }
        }
    }
}

function computerFlipCoins(){
    console.log("hi from computer flip coins");
    if (gameRound){
        var currentPlacedCoin = $(event.currentTarget);
        currentPlacedCoin.addClass("blackSquare");
        $('.highlight2').off();
        $(".highlight2").removeClass("highlight2");
        for (var rowCoordinate = -1; rowCoordinate<2; rowCoordinate++){
            for (var colCoordinate = -1; colCoordinate<2; colCoordinate++){
                coinsToFlip = [];
                var placedCoinRow = parseInt(currentPlacedCoin.parent().attr("row"));
                var placedCoinCol = parseInt(currentPlacedCoin.parent().attr("col"));
                var currentPosition = { x: (placedCoinRow + rowCoordinate), y: (placedCoinCol + colCoordinate)};
                // $(".testing").removeClass("testing");
                var adjacentToCurrent = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                // adjacentToCurrent.addClass("testing");
                var adjCurrentContents = adjacentToCurrent.find('div');
                if (adjCurrentContents.hasClass("whiteSquare")){
                    coinsToFlip.push(adjCurrentContents);
                    while (adjacentToCurrent.attr("row")>=0 && adjacentToCurrent.attr("row")<8 && adjacentToCurrent.attr("col")>=0 && adjacentToCurrent .attr("col")<8){
                        currentPosition.x+=rowCoordinate;
                        currentPosition.y+=colCoordinate;
                        // $(".testing2").removeClass("testing2");
                        adjacentToCurrent = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                        // adjacentToCurrent.addClass("testing2");
                        adjCurrentContents = adjacentToCurrent.find('div');
                        if (adjCurrentContents.hasClass("whiteSquare")){
                            coinsToFlip.push(adjCurrentContents);
                            continue;
                        }  else if (adjCurrentContents.hasClass("blackSquare")){
                            for (flipCoinInd = 0; flipCoinInd<coinsToFlip.length; flipCoinInd++){
                                coinsToFlip[flipCoinInd].removeClass("whiteSquare");
                                coinsToFlip[flipCoinInd].addClass("blackSquare")
                            }
                            break;
                        }else if (adjCurrentContents.hasClass("blankSquare")){
                            break;
                        }
                    }
                }
            }
        }
    } else {
        var randomNumber = null;
        randomNumber = parseInt(Math.random()*storePossibleMoves.length);
        var randomMove = storePossibleMoves[randomNumber];
        $(randomMove).addClass("whiteSquare");
        $(".highlight3").removeClass("highlight3");
        $(randomMove).parent().addClass("highlight3");
        storePossibleMoves = [];
        $('.highlight').off();
        $(".highlight").removeClass("highlight");
        for (var rowCoordinate = -1; rowCoordinate<2; rowCoordinate++){
            for (var colCoordinate = -1; colCoordinate<2; colCoordinate++){
                coinsToFlip = [];
                var placedCoinRow = parseInt(randomMove.parent().attr("row"));
                var placedCoinCol = parseInt(randomMove.parent().attr("col"));
                var currentPosition = { x: (placedCoinRow + rowCoordinate), y: (placedCoinCol + colCoordinate)};
                var adjacentToCurrent = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                var adjCurrentContents = adjacentToCurrent.find('div');
                if (adjCurrentContents.hasClass("blackSquare")){
                    coinsToFlip.push(adjCurrentContents);
                    while (adjacentToCurrent.attr("row")>=0 && adjacentToCurrent.attr("row")<8 && adjacentToCurrent.attr("col")>=0 && adjacentToCurrent .attr("col")<8){
                        currentPosition.x+=rowCoordinate;
                        currentPosition.y+=colCoordinate;
                        adjacentToCurrent = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                        adjCurrentContents = adjacentToCurrent.find('div');
                        if (adjCurrentContents.hasClass("blackSquare")){
                            coinsToFlip.push(adjCurrentContents);
                            continue;
                        } else if (adjCurrentContents.hasClass("whiteSquare")){
                            for (flipCoinInd = 0; flipCoinInd<coinsToFlip.length; flipCoinInd++){
                                coinsToFlip[flipCoinInd].removeClass("blackSquare");
                                coinsToFlip[flipCoinInd].addClass("whiteSquare")
                            }
                            break;
                        } else if (adjCurrentContents.hasClass("blankSquare")){
                            break;
                        }
                    }
                }
            }
        }
    }
        gameRound = !gameRound;
        startMediumComputerGame();
}
    
//////////////////////////////// VS SUPER-SAIYAN COMPUTER ////////////////////////////////////

function startHardComputerGame(){
    if (gameRound === true){
        $('#player1').text('Player 1 Turn').addClass("border");
        $('#player2').text('Super Saiyan Computer').removeClass("border");
        player1AvailableSpacesHardComputer();
        applyClicksOnSpacesHardComputer();
    } else {
        $('#player1').text('Player 1 Turn').removeClass("border");
        $('#player2').text('Super Saiyan Computer').addClass("border");
        hardComputerAvailableSpaces();
        setTimeout(noPossibleMovesHard, 1000);
        setTimeout(hardComputerFlipCoins, 3000);
        // hardComputerFlipCoins();
        display_stats();
    }
    console.log("Hi from start HARD computer game");
}

function applyClicksOnSpacesHardComputer() {
    $(".highlight2").click(hardComputerFlipCoins);
    display_stats();
    console.log("Hi from apply clicks on spaces HARD computer");
}

function noPossibleMovesHard(){
    var highlightedSpacesCounter = 0
    for (arrayRow = 0; arrayRow < 8; arrayRow++) {
        for (arrayCol = 0; arrayCol < 8; arrayCol++) {
            var currentSquare = $("[row = " + arrayRow + "][col = " + arrayCol + "]");
            var highlightedSquare = currentSquare.find('div');
            if (highlightedSquare.hasClass('highlight')){
                highlightedSpacesCounter++
            }
        }
    }
    if (highlightedSpacesCounter === 0){
        gameRound = !gameRound;
        startHardComputerGame();
    } 
}

function player1AvailableSpacesHardComputer(){
    console.log("hii from player 1 HARD Computer available spaces");
    for (arrayRow = 0; arrayRow<8; arrayRow++){
        for (arrayCol = 0; arrayCol<8; arrayCol++){
            var currentPlayer1GameSquare = $("[row = " + arrayRow + "][col = " + arrayCol + "]");
            var currentPlayerContents = currentPlayer1GameSquare.find('div');
            if ( currentPlayerContents.hasClass("blackSquare") ){
                for (var rowCoordinate = -1; rowCoordinate<2; rowCoordinate++){
                    for (var colCoordinate = -1; colCoordinate<2; colCoordinate++){
                        var currentPosition = { x: arrayRow + rowCoordinate, y: arrayCol + colCoordinate};
                        var adjacentPlayer1Square = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                        var adjacentPlayerContents = adjacentPlayer1Square.find('div');
                        if (adjacentPlayerContents.hasClass("whiteSquare")){
                            while (adjacentPlayer1Square.attr("row")>=0 && adjacentPlayer1Square.attr("row")<8 && adjacentPlayer1Square.attr("col")>=0 && adjacentPlayer1Square.attr("col")<8){
                                currentPosition.x+=rowCoordinate; 
                                currentPosition.y+=colCoordinate;
                                adjacentPlayer1Square = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                                adjacentPlayerContents = adjacentPlayer1Square.find('div');
                                if (adjacentPlayerContents.hasClass("whiteSquare")){
                                    continue;
                                } else if (adjacentPlayerContents.hasClass("blackSquare")){
                                    break;
                                } else if (adjacentPlayer1Square.hasClass("square")){
                                    adjacentPlayerContents.addClass("highlight2");
                                    break;
                                }else if (adjacentPlayer1Square === undefined){
                                    break;
                                }
                            } 
                        }
                    }
                }
            }
        }
    }
}

function hardComputerAvailableSpaces(){
    console.log("Hi from player 2 available spaces HARD computer")
    for (arrayRow = 0; arrayRow<8; arrayRow++){
        for (arrayCol = 0; arrayCol<8; arrayCol++){
            var currentPlayer1GameSquare = $("[row = " + arrayRow + "][col = " + arrayCol + "]");
            var currentPlayerContents = currentPlayer1GameSquare.find('div');
            if ( currentPlayerContents.hasClass("whiteSquare") ){
                for (var rowCoordinate = -1; rowCoordinate<2; rowCoordinate++){
                    for (var colCoordinate = -1; colCoordinate<2; colCoordinate++){
                        var currentPosition = { x: arrayRow + rowCoordinate, y: arrayCol + colCoordinate};
                        var adjacentPlayer1Square = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                        var adjacentPlayerContents = adjacentPlayer1Square.find('div');
                        if (adjacentPlayerContents.hasClass("blackSquare")){
                            while (adjacentPlayer1Square.attr("row")>=0 && adjacentPlayer1Square.attr("row")<8 && adjacentPlayer1Square.attr("col")>=0 && adjacentPlayer1Square.attr("col")<8){
                                currentPosition.x+=rowCoordinate; 
                                currentPosition.y+=colCoordinate;
                                adjacentPlayer1Square = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                                adjacentPlayerContents = adjacentPlayer1Square.find('div');
                                if (adjacentPlayerContents.hasClass("blackSquare")){
                                    continue;
                                } else if (adjacentPlayerContents.hasClass("whiteSquare")){
                                    break;
                                } else if (adjacentPlayer1Square.hasClass("square")){
                                    storePossibleMoves.push(adjacentPlayerContents)
                                    adjacentPlayerContents.addClass("highlight");
                                    break;
                                }else if (adjacentPlayer1Square === undefined){
                                    break;
                                }
                            } 
                        }
                    }
                }
            }
        }
    }
}

function countNumberOfFlippedCoinsHard(){
    var listOfMoves = [];
    var currentMoveToCheck = null;
    for (flipCoinInd = 0; flipCoinInd<storePossibleMoves.length; flipCoinInd++){
        var findBestMove = {};
        var coinsToFlip = [null];
        currentMoveToCheck = storePossibleMoves[flipCoinInd];
        // $(".testing").removeClass("testing");
        // $(currentMoveToCheck).parent().addClass("testing");
        for (var rowCoordinate = -1; rowCoordinate<2; rowCoordinate++){
            for (var colCoordinate = -1; colCoordinate<2; colCoordinate++){
                var numberOfFlippedCoins = 0;
                var placedCoinRow = parseInt(currentMoveToCheck.parent().attr("row"));
                var placedCoinCol = parseInt(currentMoveToCheck.parent().attr("col"));
                var currentPosition = { x: (placedCoinRow + rowCoordinate), y: (placedCoinCol + colCoordinate)};
                // $(".testing").removeClass("testing");
                var adjacentToCurrent = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                // adjacentToCurrent.addClass("testing");
                var adjCurrentContents = adjacentToCurrent.find('div');
                if (adjCurrentContents.hasClass("blackSquare")){
                    numberOfFlippedCoins++;
                    while (adjacentToCurrent.attr("row")>=0 && adjacentToCurrent.attr("row")<8 && adjacentToCurrent.attr("col")>=0 && adjacentToCurrent .attr("col")<8){
                        currentPosition.x+=rowCoordinate;
                        currentPosition.y+=colCoordinate;
                        // $(".testing2").removeClass("testing2");
                        adjacentToCurrent = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                        // adjacentToCurrent.addClass("testing2");
                        adjCurrentContents = adjacentToCurrent.find('div');
                        if (adjCurrentContents.hasClass("blackSquare")){
                            numberOfFlippedCoins++;
                            continue;
                        } else if (adjCurrentContents.hasClass("whiteSquare")){
                            coinsToFlip[0] += numberOfFlippedCoins;
                            break;
                        } else if (adjCurrentContents.hasClass("blankSquare")){
                            break;
                        }
                    }
                }
            }
        }
        findBestMove.value = coinsToFlip[0];
        findBestMove.element = currentMoveToCheck;
        listOfMoves.push(findBestMove);
    }
    var bestMove = listOfMoves.sort(function(a,b){
        return b.value - a.value
    })
        return bestMove[0].element;
}




function hardComputerFlipCoins(){
    console.log("hi from HARD computer flip coins");
    if (gameRound){
        var currentPlacedCoin = $(event.currentTarget);
        currentPlacedCoin.addClass("blackSquare");
        $('.highlight2').off();
        $(".highlight2").removeClass("highlight2");
        for (var rowCoordinate = -1; rowCoordinate<2; rowCoordinate++){
            for (var colCoordinate = -1; colCoordinate<2; colCoordinate++){
                coinsToFlip = [];
                var placedCoinRow = parseInt(currentPlacedCoin.parent().attr("row"));
                var placedCoinCol = parseInt(currentPlacedCoin.parent().attr("col"));
                var currentPosition = { x: (placedCoinRow + rowCoordinate), y: (placedCoinCol + colCoordinate)};
                // $(".testing").removeClass("testing");
                var adjacentToCurrent = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                // adjacentToCurrent.addClass("testing");
                var adjCurrentContents = adjacentToCurrent.find('div');
                if (adjCurrentContents.hasClass("whiteSquare")){
                    coinsToFlip.push(adjCurrentContents);
                    while (adjacentToCurrent.attr("row")>=0 && adjacentToCurrent.attr("row")<8 && adjacentToCurrent.attr("col")>=0 && adjacentToCurrent .attr("col")<8){
                        currentPosition.x+=rowCoordinate;
                        currentPosition.y+=colCoordinate;
                        // $(".testing2").removeClass("testing2");
                        adjacentToCurrent = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                        // adjacentToCurrent.addClass("testing2");
                        adjCurrentContents = adjacentToCurrent.find('div');
                        if (adjCurrentContents.hasClass("whiteSquare")){
                            coinsToFlip.push(adjCurrentContents);
                            continue;
                        }  else if (adjCurrentContents.hasClass("blackSquare")){
                            for (flipCoinInd = 0; flipCoinInd<coinsToFlip.length; flipCoinInd++){
                                coinsToFlip[flipCoinInd].removeClass("whiteSquare");
                                coinsToFlip[flipCoinInd].addClass("blackSquare")
                            }
                            break;
                        }else if (adjCurrentContents.hasClass("blankSquare")){
                            break;
                        }
                    }
                }
            }
        }
    } else {
        var bestMove = countNumberOfFlippedCoinsHard();
        $(".highlight3").removeClass("highlight3");
        bestMove.addClass("whiteSquare")
        bestMove.parent().addClass("highlight3");
        storePossibleMoves = [];
        $('.highlight').off();
        $(".highlight").removeClass("highlight");
        for (var rowCoordinate = -1; rowCoordinate<2; rowCoordinate++){
            for (var colCoordinate = -1; colCoordinate<2; colCoordinate++){
                coinsToFlip = [];
                var placedCoinRow = parseInt(bestMove.parent().attr("row"));
                var placedCoinCol = parseInt(bestMove.parent().attr("col"));
                var currentPosition = { x: (placedCoinRow + rowCoordinate), y: (placedCoinCol + colCoordinate)};
                var adjacentToCurrent = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                var adjCurrentContents = adjacentToCurrent.find('div');
                if (adjCurrentContents.hasClass("blackSquare")){
                    coinsToFlip.push(adjCurrentContents);
                    while (adjacentToCurrent.attr("row")>=0 && adjacentToCurrent.attr("row")<8 && adjacentToCurrent.attr("col")>=0 && adjacentToCurrent .attr("col")<8){
                        currentPosition.x+=rowCoordinate;
                        currentPosition.y+=colCoordinate;
                        adjacentToCurrent = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                        adjCurrentContents = adjacentToCurrent.find('div');
                        if (adjCurrentContents.hasClass("blackSquare")){
                            coinsToFlip.push(adjCurrentContents);
                            continue;
                        } else if (adjCurrentContents.hasClass("whiteSquare")){
                            for (flipCoinInd = 0; flipCoinInd<coinsToFlip.length; flipCoinInd++){
                                coinsToFlip[flipCoinInd].removeClass("blackSquare");
                                coinsToFlip[flipCoinInd].addClass("whiteSquare")
                            }
                            break;
                        } else if (adjCurrentContents.hasClass("blankSquare")){
                            break;
                        }
                    }
                }
            }
        }
    }
        gameRound = !gameRound;
        startHardComputerGame();
}
