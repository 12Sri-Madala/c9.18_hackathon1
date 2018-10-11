$(document).ready(initializeApp);

function initializeApp(){
    // insert functions here to run when DOM is loaded
    create_board();
    applyClickHandlers();
    display_stats();
}

function applyClickHandlers() {
    $(".highlight").click(flipCoins);
    $(".resetBttn").click(reset_game_bttn);
}

function determineWinner(whiteCount, blackCount){
    if (whiteCount > blackCount){
        alert("Player 1 Wins!!!")
    }
    else{
        alert("Player 2 Wins!!!")
    }
}

function player1AvailableSpaces(){
    for (arrayRow = 0; arrayRow<8; arrayRow++){
        for (arrayCol = 0; arrayCol<8; arrayCol++){
            var currentPlayer1GameSquare = $("[row = " + arrayRow + "][col = " + arrayCol + "]");
            if ( currentPlayer1GameSquare.hasClass("blackSquare") ){
                for (var rowCoordinate = -1; rowCoordinate<2; rowCoordinate++){
                    for (var colCoordinate = -1; colCoordinate<2; colCoordinate++){
                        var adjacentPlayer2Square = currentPlayer1GameSquare["row = " + (arrayRow + rowCoordinate) + "][col = " + (arrayCol + colCoordinate) + "]"];
                        if (adjacentPlayer2Square.hasClass("whiteSquare")){
                            while (adjacentPlayer2Square.getAttribute("row")>=0 && adjacentPlayer2Square.getAttribute("row")<8 && adjacentPlayer2Square.getAttribute("col")>=0 && adjacentPlayer2Square.getAttribute("col")<8){
                                adjacentPlayer2Square = adjacentPlayer2Square["row = " + (arrayRow + rowCoordinate) + "][col = " + (arrayCol + colCoordinate) + "]"];
                                if (adjacentPlayer2Square.hasClass("whiteSquare")){
                                    continue;
                                } else if (adjacentPlayer2Square.hasClass("blackSquare")){
                                    break;
                                } else if (adjacentPlayer2Square.hasClass("greenGameSquare")){
                                    adjacentPlayer2Square.css('border', '2px', 'solid', 'white')
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
                        var adjacentPlayer1Square = currentPlayer2GameSquare["row = " + (arrayRow + rowCoordinate) + "][col = " + (arrayCol + colCoordinate) + "]"];
                        if (adjacentPlayer1Square.hasClass("blackSquare")){
                            while (adjacentPlayer1Square.getAttribute("row")>=0 && adjacentPlayer1Square.getAttribute("row")<8 && adjacentPlayer1Square.getAttribute("col")>=0 && adjacentPlayer1Square.getAttribute("col")<8){
                                adjacentPlayer2Square = adjacentPlayer2Square["row = " + (arrayRow + rowCoordinate) + "][col = " + (arrayCol + colCoordinate) + "]"];
                                if (adjacentPlayer2Square.hasClass("blackSquare")){
                                    continue;
                                } else if (adjacentPlayer2Square.hasClass("whiteSquare")){
                                    break;
                                } else if (adjacentPlayer2Square.hasClass("greenGameSquare")){
                                    adjacentPlayer2Square.css('border', '2px', 'solid', 'white')
                                }
                            } 
                        }
                    }
                }
            }
        }
    }
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
        $(".game_board_div").append(row);
    }
}


var playerOneScore = 0;
var playerTwoScore = 0;

function display_stats(){
    $(".whiteScore").text();
    $(".blackScore").text();
}

function reset_game_bttn(){
    
}


