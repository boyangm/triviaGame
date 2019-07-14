window.onload = function (){
    var questions = [];
    var count = 45;
    var num = 0;
    var marker= 0;
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
        $("#timer").html("<h1>"+ count +"</h1>");
        // console.log(count);
        if( count < 45 && Number.isInteger(count/15) ){
            $(".notAnswer").eq(marker).css("opacity", 0);
            marker++;
        } 
        if( count === 0){
            alert('out of time');
            reset();
        }
        count --;
    };

    setInterval(clock, 1000);

    
    newDiv= $("<div>");
    function getQuestion(){
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
           alert('correct');
           reset();
        
        })
    };
    function reset (){
        num++; 
        newDiv.empty(); 
        count = 45; 
        getQuestion();
    }
    getQuestion();
    
    console.log(questions);
})
};