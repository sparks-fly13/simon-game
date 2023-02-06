var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var flag = 1;
var level = 0;

$(".btn").click(function () { 
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    var randomNumber = Math.floor((Math.random()*4));
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    $("h1").text("Level " + level);
    level++;
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColor).removeClass("pressed");
    },100)
}

$(document).keydown(function () {
    if(flag===1){
        nextSequence();
        flag=0;
    }
})

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function () {
                nextSequence()
            }, 1000);
            userClickedPattern = [];
        }
    }
    else{
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over. Press any key to restart");
        gamePattern=[];
        userClickedPattern=[];
        level=0;
        flag=1;
    }
}
