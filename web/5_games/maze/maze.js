var start = false;
var path1 = false, path2 = false, path3 = false, path4 = false; path5 = false, path6 = false; path7 = false;
var outside = false;


// judge whether cheat
function cheat() {
    outside = true;
}
function crashWall(temp) {
    if (start) {
        var id;
        switch (temp) {
            case 1:
                id = document.getElementById("left-top-wall");
                break;
            case 2:
                id = document.getElementById("top-wall");
                break;
            case 3:
                id = document.getElementById("center-wall");
                break;
            case 4:
                id = document.getElementById("right-top-wall");
                break;
            case 5:
                id = document.getElementById("bottom-wall");
                break;
        }
        if (temp == 3) document.getElementById("center-middle-wall").className = "crashedWall";
        id.className = "crashedWall";
        var screen = document.getElementById("result");
        screen.innerHTML = "You Lose";
    }
}
function resetGray(temp) {
    var id;
    switch (temp) {
        case 1:
            id = document.getElementById("left-top-wall");
            break;
        case 2:
            id = document.getElementById("top-wall");
            break;
        case 3:
            id = document.getElementById("center-wall");
            break;
        case 4:
            id = document.getElementById("right-top-wall");
            break;
        case 5:
            id = document.getElementById("bottom-wall");
            break;
    }
    if (temp == 3) document.getElementById("center-middle-wall").className = "wall";
    id.className = "wall";
    reset();
}
function reachPath(temp) {
    switch (temp) {
        case 1:
            path1 = true;
            start = true;
            break;
        case 2:
            path2 = true;
            break;
        case 3:
            path3 = true;
            break;
        case 4:
            path4 = true;
            break;
        case 5:
            path5 = true;
            break;
        case 6:
            path6 = true;
            break;
        case 7:
            path7 = true;
            end = true;
    }
}
function reset() {
    start = false;
    path1 = false;
    paht2 = false;
    path3 = false;
    path4 = false;
    path4 = false;
    path5 = false;
    path6 = false;
    paht7 = false;
    end = false;
    outside = false;
    var screen = document.getElementById("result");
    screen.innerHTML = "";
}
function judge() {
    if (start == true) {
        var screen = document.getElementById("result");
        if (outside) {
            screen.innerHTML = "Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!";
        }
        else if (path1 && path2 && path3 && path4 && path5 && path6 && path7) {
            screen.innerHTML = "You Win!";
        }
    }
}