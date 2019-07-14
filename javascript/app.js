window.onload = function (){
    var questions = [];
    var count = 5;
    var num = 0;
    var marker= 0;
    var right= 0;
    var wrong= 0;
    $.ajax({
        method: "GET",
        url: "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple"
})
.then (function (response){
    console.log(response);
    for (let i = 0; i < response.results.length; i++){
        
        questions.push(response.results[i]); 
        
    }
    function clock(){
        $("#timer").html("<h4>"+ count +"</h4><br><p>Seconds left</p>" );
        count --;
        // console.log(count);
        if( count < 45 && Number.isInteger(count/15) ){
            $(".notAnswer").eq(marker).css("opacity", 0);
            marker++;
        } 
        if( count === 0){
            setTimeout(reset,1000);
            // clearInterval(interval); 
            wrong++;
            $("#timer").empty();
            newDiv.empty();
            newDiv.append("<h2>Out of time</h2>");
            console.log("wrong: "+ wrong);
        }
    };

    
    
    newDiv= $("<div>");
    var interval =setInterval(clock, 1000);
    function getQuestion(){
        $(newDiv).append("<h2> Question: "+ (num +1) +" </h2>");
        $(newDiv).append("<h2>"+ questions[num].question+ "</h2>");
        
        for(let k=0; k < questions[num].incorrect_answers.length; k++){
            var incorrect =$("<h3>");
            incorrect.addClass("notAnswer");
            incorrect.text(questions[num].incorrect_answers[k])
            newDiv.append(incorrect);
            
        }
        
        var correct = $("<h3>");
        correct.addClass("answer");
        correct.text(questions[num].correct_answer);
        newDiv.append(correct);
        $("#questionBox").append(newDiv);
        $(".answer").on("click",()=>{
            right++;
            $("#timer").empty();
            setTimeout(reset,1000);
    
            newDiv.empty();
            newDiv.append("<h2>Congrats! that was correct!</h2>");
            console.log("right: " + right);
        })
            
    };
    function reset (){
        num++; 
        if( num > 9){ 
            $("#timer").empty();
            clearInterval(interval); 
            newDiv.empty();
            newDiv.append("<h2>Congrats!</h2>");
            newDiv.append("<h2>You answered "+ right + " right</h2>");
        }else{
            $("#timer").empty();

            newDiv.empty();  
            count = 45; 
            if (marker < 2){
                marker= num;
            }else{
                marker= 0;
            }
           
            getQuestion();
        
        }
    }
    getQuestion();
    
    console.log(questions);
})
};