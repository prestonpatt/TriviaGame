var questions = [{
    question: "What is the title of the first released Star Wars movie?",
    answersList: ["A New Hope", "The Phantom Menace", "The Last Jedi", "The Force Awakens"],
    answer: 0
},{
    question: "How many parsecs did Han Solo make the Kessle run in?",
    answersList: [10, 11, 12, 13],
    answer: 2
},{
    question: "What color is Luke Skywalker's lightsaber in Return of the Jedi",
    answersList: ["Blue", "Purple", "Red", "Green"],
    answer: 3
},{
    question: "What planet is Chewbacca from?",
    answersList: ["Dagobah", "Kashyyyk", "Ahch-To", "Alderaan"],
    answer: 1
},{
    question: "How many thrusters are on an X-Wing?",
    answersList: [2, 3, 4, 5],
    answer: 2
},{
    question: "What race were the spies who sacrificed themselves for plans to the second Death Star?",
    answersList: ["Bothan", "Mandalore", "Genosian", "Ewok"],
    answer: 0
},{
    question: "Who was secretly behind the Trade Federation invasion of Naboo?",
    answersList: ["Chancellor Valorum", "Senator Palpatine", "Mace Windu", "Queen Amidala"],
    answer: 1
},{
    question: "What planet is Rey from?",
    answersList: ["Tatooine", "Dantooine", "Kamino", "Jakku"],
    answer: 3
},{
    question: "Who is responsible for transmitting the plans to the first Death Star to Leia Organa?",
    answersList: ["K-2SO", "Jyn Erso", "Cassian Andor", "Chirrut Imwe"],
    answer: 1
},{
    question: "What droid did Leia store the Death Star plans in?",
    answersList: ["R2-D2", "BB-8", "C-3PO", "IG-88"],
    answer: 0
},{
    question: "What creature almost eats Luke Skywalker inside Jabba the Hut's palace?",
    answersList: ["Sarlacc", "Rancor", "Twi'lek", "Gamorrean" ],
    answer: 1
},{
    question: "The possibility of successfully navigating an asteroid field is approximately what?",
    answersList: ["1,280,976 to 1", "0", "3720 to 1", "7 to 1"],
    answer: 2
},{
    question: "In the Empire Strikes Back, what creatures attach themselves to the Millenium Falcon inside a large hole in an asteroid?",
    answersList: ["Porgs", "Tauntauns", "Jawas", "Mynocks"],
    answer: 3
},{
    question: "What forest moon does the Rebellion encounter Ewoks?",
    answersList: ["Jedha", "Yavin IV", "Nar Shaddaa", "Endor"],
    answer: 3
},{
    question: "Who kills the Emperor in Return of the Jedi?",
    answersList: ["Luke Skywalker", "Darth Vader", "Princess Leia", "Han Solo"],
    answer: 1
}]
var currentQuestion;
var rightCount = 0;
var wrongCount = 0;
var timeoutCount = 0;
var timer;
var time; 
var answered; 
var userSelect;
var output = {
    right: "The Force is strong with this one.",
    wrong: "My disappointment in your performance cannot be overstated.",
    timeout: "Do or do not, there is no try.",
    finish: "Chewie, we're home."
}

$('#start').on('click', function(){
    $(this).hide();
    newGame();
});

$('#restart').on('click', function(){
    $(this).hide();
    newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#rightCounts').empty();
	$('#wrongCounts').empty();
	$('#timeoutCount').empty();
	currentQuestion = 0;
	rightCount = 0;
	wrongCount = 0;
	timeoutCount = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
    answered = true;
    $('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+questions.length);
	$('.question').html('<h2>' + questions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(questions[currentQuestion].answersList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answersList').append(choices);
	}
	countdown();
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	timer = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + timer + '</h3>');
	answered = true;
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	timer--;
	$('#timeLeft').html('<h3>Time Remaining: ' + timer + '</h3>');
	if(timer < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty();
	$('.question').empty();

	var rightAnswerText = questions[currentQuestion].answersList[questions[currentQuestion].answer];
	var rightAnswerIndex = questions[currentQuestion].answer;
	
	if((userSelect == rightAnswerIndex) && (answered == true)){
		rightCount++;
		$('#message').html(output.right);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		wrongCount++;
		$('#message').html(output.wrong);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		timeoutCount++;
		$('#message').html(output.timeout);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (questions.length-1)){
		setTimeout(score, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function score(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#finalMessage').html(output.finish);
	$('#rightCounts').html("Correct Answers: " + rightCount);
	$('#wrongCounts').html("Incorrect Answers: " + wrongCount);
	$('#timeoutCount').html("timeoutCount: " + timeoutCount);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}