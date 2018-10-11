$(document).ready(initializeApp);

function initializeApp(){
    // insert functions here to run when DOM is loaded
    create_board();

    display_stats();
    $(".resetBttn").click(reset_game_bttn);
  
    startGame();
}

function applyClicksOnSpaces() {
    $(".highlight").click(test);
    $(".highlight2").click(test);
    playerTurn();
    display_stats();
}


function determineWinner(whiteScore, blackScore){
    if (whiteScore > blackScore){
        showModal("white");
    }
    else{
        showModal("black");
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
                                currentPosition.x+=rowCoordinate; currentPosition.y+=colCoordinate;
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
        debugger;
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
                                currentPosition.x+=rowCoordinate; currentPosition.y+=colCoordinate;
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
        for (var rowCoordinate = -1; rowCoordinate<2; rowCoordinate++){
            for (var colCoordinate = -1; colCoordinate<2; colCoordinate++){
                var placedCoinRow = currentPlacedCoin.getAttribute("row");
                var placedCoinCol = currentPlacedCoin.getAttribute("col");
                var adjacentToCurrent = currentPlacedCoin["row = " + (placedCoinRow + rowCoordinate) + "][col = " + (placedCoinCol + colCoordinate)];
                if (adjacentToCurrent.hasClass("whiteSquare")){
                    while (adjacentToCurrent.getAttribute("row")>=0 && adjacentToCurrent.getAttribute("row")<8 && adjacentToCurrent.getAttribute("col")>=0 && adjacentToCurrent.getAttribute("col")<8){
                        var adjacentCoinRow = adjacentToCurrent.getAttribute("row");
                        var adjacentCoinCol = adjacentToCurrent.getAttribute("col");
                        adjacentToCurrent = adjacentToCurrent["row = " + (adjacentCoinRow + rowCoordinate) + "][col = " + (adjacentCoinCol + colCoordinate)];
                        if (adjacentToCurrent.hasClass("whiteSquare")){
                            continue;
                        } else if (adjacentToCurrent.hasClass("greenGameSquare")){
                            break;
                        } else if (adjacentToCurrent.hasClass("blackSquare")){
                            var flipRowCoordinate = rowCoordinate * -1;
                            var flipColCoordinate = colCoordinate * -1;
                            var finalCoinToFlip = adjacentToCurrent;
                            for (flipCoinInd = 0; flipCoinInd<6; flipCoinInd++){
                            var finalCoinRow = finalCoinToFlip.getAttribute("row");
                            var finalCoinCol = finalCoinToFlip.getAttribute("col");
                            finalCoinToFlip = finalCoinToFlip["row = " + (finalCoinRow + flipRowCoordinate) + "][col = " + (finalCoinCol + flipColCoordinate)];
                                if(finalCoinToFlip.hasClass("whiteSquare")){
                                    finalCoinToFlip.removeClass("whiteSquare");
                                    finalCoinToFlip.addClass("blackSquare");
                                } else if (finalCoinToFlip === undefined){
                                    break;
                                }
                            }
                        }
                    }
                } 
            }
        } 
    } else {
        currentPlacedCoin.addClass("whiteSquare");
        for (var rowCoordinate = -1; rowCoordinate<2; rowCoordinate++){
            for (var colCoordinate = -1; colCoordinate<2; colCoordinate++){
                var placedCoinRow = currentPlacedCoin.getAttribute("row");
                var placedCoinCol = currentPlacedCoin.getAttribute("col");
                var adjacentToCurrent = currentPlacedCoin["row = " + (placedCoinRow + rowCoordinate) + "][col = " + (placedCoinCol + colCoordinate)];
                if (adjacentToCurrent.hasClass("blackSquare")){
                    while (adjacentToCurrent.getAttribute("row")>=0 && adjacentToCurrent.getAttribute("row")<8 && adjacentToCurrent.getAttribute("col")>=0 && adjacentToCurrent.getAttribute("col")<8){
                        var adjacentCoinRow = adjacentToCurrent.getAttribute("row");
                        var adjacentCoinCol = adjacentToCurrent.getAttribute("col");
                        adjacentToCurrent = adjacentToCurrent["row = " + (adjacentCoinRow + rowCoordinate) + "][col = " + (adjacentCoinCol + colCoordinate)];
                        if (adjacentToCurrent.hasClass("blackSquare")){
                            continue;
                        } else if (adjacentToCurrent.hasClass("greenGameSquare")){
                            break;
                        } else if (adjacentToCurrent.hasClass("whiteSquare")){
                            var flipRowCoordinate = rowCoordinate * -1;
                            var flipColCoordinate = colCoordinate * -1;
                            var finalCoinToFlip = adjacentToCurrent;
                            for (flipCoinInd = 0; flipCoinInd<6; flipCoinInd++){
                            var finalCoinRow = finalCoinToFlip.getAttribute("row");
                            var finalCoinCol = finalCoinToFlip.getAttribute("col");
                            finalCoinToFlip = finalCoinToFlip["row = " + (finalCoinRow + flipRowCoordinate) + "][col = " + (finalCoinCol + flipColCoordinate)];
                                if(finalCoinToFlip.hasClass("blackSquare")){
                                    finalCoinToFlip.removeClass("blackSquare");
                                    finalCoinToFlip.addClass("whiteSquare");
                                } else if (finalCoinToFlip === undefined){
                                    break;
                                }
                            }
                        }
                    }
                } 
            } 
        } 
    }
    gameRound = !gameRound;
}

function test(){

    var currentPlacedCoin = $(event.currentTarget);
    if (gameRound === true){

        currentPlacedCoin.addClass("blackSquare");
        $('.highlight2').off();
        $(".highlight2").removeClass("highlight2");
        display_stats()
    } else if(gameRound === false){

        currentPlacedCoin.addClass("whiteSquare");
        $('.highlight').off();
        $(".highlight").removeClass("highlight");
        display_stats()
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
                var whiteSquare = $("<div>").addClass("whiteSquare");
                square.append(whiteSquare);
            } else if (game_board[rowIndex][colIndex] === 2){
                var blackSquare = $("<div>").addClass("blackSquare");
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
var blackSquareCounter = 0;
var whiteSquareCounter = 0;

function display_stats() {


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
    
}



