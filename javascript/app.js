window.onload = function (){
    var questions = [];
    var count = 45;
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
        // console.log(count);
        if( count < 45 && Number.isInteger(count/15) ){
            $(".notAnswer").eq(marker).css("opacity", 0);
            marker++;
        } 
        if( count === 0){
            wrong++;
            console.log("wrong: "+ wrong);
            reset();
            alert('out of time');
        }
        count --;
    };

    var interval =setInterval(clock, 1000);

    
    newDiv= $("<div>");
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
            newDiv.empty();
            newDiv.append("<h2>Congrats! that was correct!</h2>");
            setTimeout(reset,4000);
           reset();
           right++;
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
        newDiv.empty(); 
        count = 45; 
        getQuestion();
        
        }
    }
    getQuestion();
    
    console.log(questions);
})
};