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
            row.append(square);
        }

        //add class name between quotes. Maybe .game_area?
        $(".game_board_div").append(row);
    }

    $(game_board[3][3]).append()
    $(game_board[3][4])
    $(game_board[4][3])
    $(game_board[4][4])
}