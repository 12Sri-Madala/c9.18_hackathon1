
function determineWinner(whiteCount, blackCount){
    if (whiteCount > blackCount){
    showModal("white");
    }
    else{
    showModal("black");
    }
}

function showModal(color) {
    $('#winModal').removeClass("hide");
    if (color === "white") {
        $('.modal-body').text("Congratulations White Player!")
    }
    else {
        $('.modal-body').text("Congratulations Black Player!")
    }
    $('.playAgain').on("click", function () {
        $('#winModal').addClass("hide");
    })
}

$(document).ready(initializeApp);

function initializeApp(){
    // insert functions here to run when DOM is loaded
    create_board();
}

var gameRound = true;

if (gameRound === true){
    player1AvailableSpaces();
    applyClicksOnSpaces();
}

if (gameRound === false){
    player2AvailableSpaces();
    applyClicksOnSpaces();
}

function player1AvailableSpaces(){
    for (arrayRow = 0; arrayRow<8; arrayRow++){
        for (arrayCol = 0; arrayCol<8; arrayCol++){
            var currentPlayer1GameSquare = $("[row = " + arrayRow + "][col = " + arrayCol + "]");
            if ( currentPlayer1GameSquare.hasClass("blackSquare") ){
                for (var rowCoordinate = -1; rowCoordinate<2; rowCoordinate++){
                    for (var colCoordinate = -1; colCoordinate<2; colCoordinate++){
                        var adjacentPlayer1Square = currentPlayer1GameSquare["row = " + (arrayRow + rowCoordinate) + "][col = " + (arrayCol + colCoordinate)];
                        if (adjacentPlayer1Square.hasClass("whiteSquare")){
                            while (adjacentPlayer1Square.getAttribute("row")>=0 && adjacentPlayer1Square.getAttribute("row")<8 && adjacentPlayer1Square.getAttribute("col")>=0 && adjacentPlayer1Square.getAttribute("col")<8){
                                adjacentPlayer1Square = adjacentPlayer1Square["row = " + (arrayRow + rowCoordinate) + "][col = " + (arrayCol + colCoordinate)];
                                if (adjacentPlayer1Square.hasClass("whiteSquare")){
                                    continue;
                                } else if (adjacentPlayer1Square.hasClass("blackSquare")){
                                    break;
                                } else if (adjacentPlayer1Square.hasClass("greenGameSquare")){
                                    adjacentPlayer1Square.addClass("highlight");
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
    for (arrayRow = 0; arrayRow<8; arrayRow++){
        for (arrayCol = 0; arrayCol<8; arrayCol++){
            var currentPlayer2GameSquare = $("[row = " + arrayRow + "][col = " + arrayCol + "]")
            if ( currentPlayer2GameSquare.hasClass("whiteSquare") ){
                for (var rowCoordinate = -1; rowCoordinate<2; rowCoordinate++){
                    for (var colCoordinate = -1; colCoordinate<2; colCoordinate++){
                        var adjacentPlayer2Square = currentPlayer2GameSquare["row = " + (arrayRow + rowCoordinate) + "][col = " + (arrayCol + colCoordinate)];
                        if (adjacentPlayer2Square.hasClass("blackSquare")){
                            while (adjacentPlayer2Square.getAttribute("row")>=0 && adjacentPlayer2Square.getAttribute("row")<8 && adjacentPlayer2Square.getAttribute("col")>=0 && adjacentPlayer2Square.getAttribute("col")<8){
                                adjacentPlayer2Square = adjacentPlayer2Square["row = " + (arrayRow + rowCoordinate) + "][col = " + (arrayCol + colCoordinate)];
                                if (adjacentPlayer2Square.hasClass("blackSquare")){
                                    continue;
                                } else if (adjacentPlayer2Square.hasClass("whiteSquare")){
                                    break;
                                } else if (adjacentPlayer2Square.hasClass("greenGameSquare")){
                                    adjacentPlayer2Square.addClass("highlight");
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
            }
            row.append(square);
        }
        //add class name between quotes. Maybe .game_area?
        $(".game_board_div").append(row);
    }
}

