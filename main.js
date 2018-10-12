$(document).ready(initializeApp);

function initializeApp(){
    create_board();
    display_stats();
    $(".resetBtn").click(reset_game_bttn);
    startGame();
}

function applyClicksOnSpaces() {
    $(".highlight").click(flipCoins);
    $(".highlight2").click(flipCoins);
    display_stats();
}

//Future feature set to work on
function determineWinner(whiteScore, blackScore){
    if (whiteScore > blackScore){
        //showModal("white");
    }
    else{
        //showModal("black");
    }
}

//Future feature to work on
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

var gameRound = true;

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
}

function player2AvailableSpaces(){
    console.log("I'm broken here");
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
                var adjacentToCurrent = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
                var adjCurrentContents = adjacentToCurrent.find('div');
                if (adjCurrentContents.hasClass("whiteSquare")){
                    coinsToFlip.push(adjCurrentContents);
                    while (adjacentToCurrent.attr("row")>=0 && adjacentToCurrent.attr("row")<8 && adjacentToCurrent.attr("col")>=0 && adjacentToCurrent .attr("col")<8){
                        currentPosition.x+=rowCoordinate;
                        currentPosition.y+=colCoordinate;
                        adjacentToCurrent = $("[row = " + (currentPosition.x) + "][col = " + (currentPosition.y) + "]");
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
