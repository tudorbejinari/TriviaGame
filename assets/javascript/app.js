var openScreen;
    var gameHTML;
    var counter = 30;
    var questionArray = 
    [ "Denver, Colorado, is at a higher altitude than Los Angeles, California. Which of these statements is correct?", 
    "Which of these terms is defined as the study of how the positions of stars and planets can influence human behavior?", 
    "There are how many oceans in the world?", 
    "Which is the largest ocean in the world ?"];
    
    var answerArray = [
        ["Water boils at a lower temperature in Denver than Los Angeles.", "Water boils at a higher temperature in Denver than Los Angeles.", "Water boils at the same temperature in both Denver and Los Angeles.","Water doesnt boil."], 
        ["Astrology","Alchemy","Astronomy","Meterology"], 
        ["4", "5", "6", "7"], 
        ["Pacific", "Atlantic", "Indian", "Arctic"],];
    
    var correctAnswers = 
    [ "A. Water boils at a lower temperature in Denver than Los Angeles", 
    "C. Astrology", 
    "B. 5", 
    "A. Pacific"];
    
    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0; 
   


$(document).ready(function() {
    
    function openingPage() {
        openScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-md btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $("#mainArea").append(openScreen);
    }
    
    openingPage();
    

    
    $("#mainArea").on("click", ".start-button", function(event){
        event.preventDefault();  
        $('.jumbotron').hide();
        generateQuestions();
        timerWrapper();
    });
    

    
    $("body").on("click", ".answer", function(event){
        selectedAnswer = $(this).text();
        selectedAnswer === correctAnswers[questionCounter] ? (
            clearInterval(theClock),
            generateWin()) :
            clearInterval(theClock),
            generateLoss()
    
    }); 
    

    
    $("body").on("click", ".reset-button", function(event){
        resetGame();
    }); 
    
    
    });  
    
    



    function timeoutLoss() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 3000); 
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>";
        $("#mainArea").html(gameHTML);
        
        setTimeout(wait, 3000);  
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 3000); 
    }
    



    function generateQuestions() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $("#mainArea").html(gameHTML);
    }; 
    



    function wait() {
    questionCounter < 4 ? 
        (questionCounter++,
        generateQuestions(),
        counter = 30,
        timerWrapper() ):
        
       (finalScreen())
    }; 
    


    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                timeoutLoss();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    


    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $("#mainArea").html(gameHTML);
    }
    



    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 30;
        generateQuestions();
        timerWrapper();
    }
    