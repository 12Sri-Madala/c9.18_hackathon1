$(document).ready(initializeApp);

function initializeApp(){
    // insert functions here to run when DOM is loaded

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