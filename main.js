$(document).ready(initializeApp);

function initializeApp(){
    // insert functions here to run when DOM is loaded
    create_board();
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

