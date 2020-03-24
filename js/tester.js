
//========================================================using GET to get 5 random questions==============================================================================================//

// total function for selecting the 5 questions ---------------------

function pickQuestions() {
   //total function for selecting and printing the randomely chosen questions ----------------------------

  removeStart();
  printQuiz();
}





function pickOrder(aray) {  // function that rnadomizes the display of the questions------------------------------------------------------//
  var array = [1,2,3,4];
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}




function pickNumber(testers) {  //function that picks the 5 random questions--------------------------------------------------------------------
  var firstPick = Math.floor((Math.random()*(testers.length)) + 0);

  var two = Math.floor((Math.random()*(testers.length)) + 0);
  while (two == firstPick) {
    var two = Math.floor((Math.random()*(testers.length)) + 0);
  }
  var secondPick = two;

  var three = Math.floor((Math.random()*(testers.length)) + 0);
  while (three == firstPick || three == secondPick) {
    var three = Math.floor((Math.random()*(testers.length)) + 0);
  }
  var thirdPick = three;

  var four = Math.floor((Math.random()*(testers.length)) + 0);
  while (four == firstPick || four == secondPick || four == thirdPick) {
    var four = Math.floor((Math.random()*(testers.length)) + 0);
  }
  var fourthPick = four;

  var five = Math.floor((Math.random()*(testers.length)) + 0);
  while (five == firstPick || five == secondPick || five == thirdPick || five == fourthPick) {
    var five = Math.floor((Math.random()*(testers.length)) + 0);
  }
  var fifthPick = five;
  selections = [firstPick, secondPick, thirdPick, fourthPick, fifthPick]

  return selections;
}



//=======================================end of function for GETting 5 random questions=======================================================//
//=======================================function that remove start screen=================================================================================================//
function removeStart() {
  var element = document.getElementById('start');
  element.parentNode.removeChild(element);
}

//===========================================================================================================================================//
//=========================================displays the next quiz using index to denote which quiz number =========================//

function printQuiz() {
  var quizBox = document.querySelector('#quiz');
  var Question = JSON.parse(sessionStorage.QUESTIONS);
  var i = Number(sessionStorage.index);
  console.log(i);

  if (i>0) {   //remove previous quiz
    var element = document.getElementById('submitButton');
    element.parentNode.removeChild(element);
    var element = document.getElementById('optionsBox');
    element.parentNode.removeChild(element);
    var element = document.getElementById('question');
    element.parentNode.removeChild(element);
  }

    if (i<5) {
      var displayQuestion = Question[i].content;
      var question = document.createElement('p');
      let q = displayQuestion;
      question.id = 'question';
      question.innerHTML = String(q);
      question.style.width = '100%';
      question.style.textAlign = 'center';
      question.style.fontSize = '5vw';
      question.style.marginTop = '2vw';

      var order = pickOrder([1,2,3,4])
      var option = ["","","",""]

      for (j=0; j<4; j++) {
        if (order[j]==1) {  // picking the placement of the questions
          option[j] = String(Question[i].answer);
        }
        else if (order[j]==2) {
          option[j] = String(Question[i].optionSelection1);
        }
        else if (order[j]==3) {
          option[j] = String(Question[i].optionSelection2);
        }
        else if (order[j]==4) {
          option[j] = String(Question[i].optionSelection3);
        }
      }

      var options = document.createElement('div');
      options.id = 'optionsBox';

      var option1 = document.createElement('input');
      option1.type = 'button';
      option1.style.backgroundColor = 'white';
      option1.style.float = 'left';
      option1.style.width = '40%';
      option1.style.fontSize = '3vw';
      option1.value = option[0];
      option1.style.margin = '5%'
      option1.id = 'o1';
      option1.onclick = highlight('o1');

      var option2 = document.createElement('input');
      option2.type = 'button';
      option2.style.backgroundColor = 'white';
      option2.style.float = 'right';
      option2.style.width = '40%';
      option2.style.fontSize = '3vw';
      option2.value = option[1];
      option2.style.margin = '5%';
      option2.id = 'o2';
      option2.onclick = highlight('o2');

      var option3 = document.createElement('input');
      option3.type = 'button';
      option3.style.backgroundColor = 'white';
      option3.style.float = 'left';
      option3.style.width = '40%';
      option3.style.fontSize = '3vw';
      option3.value = option[2];
      option3.style.margin = '5%';
      option3.id = 'o3';
      option3.onclick = highlight('o3');

      var option4 = document.createElement('input');
      option4.type = 'button';
      option4.style.backgroundColor = 'white';
      option4.onclick = highlight('o4');
      option4.style.float = 'right';
      option4.style.width = '40%';
      option4.style.fontSize = '3vw';
      option4.value = option[3];
      option4.style.margin = '5%';
      option4.id = 'o4';
      option4.name = '';

      var submitButton = document.createElement('input');
      submitButton.type = 'button';
      submitButton.value = 'submit';
      submitButton.style.fontSize = '3vw';
      submitButton.style.width = '40%';
      submitButton.style.marginLeft = '30%';
      submitButton.style.marginTop = '5%';
      submitButton.id = 'submitButton';
      submitButton.onclick = select();

      options.appendChild(option2);
      options.appendChild(option1);
      options.appendChild(option4);
      options.appendChild(option3);
      quizBox.appendChild(question);
      quizBox.appendChild(options);
      quizBox.appendChild(submitButton);

    }
    else {
      var element = document.getElementById('quitButton');
      element.parentNode.removeChild(element);

      var congrats = document.createElement('p');
      congrats.innerHTML = 'Well done, you have finished';
      congrats.style.width = '100%';
      congrats.style.textAlign = 'center';
      congrats.style.fontSize = '3vw';
      congrats.style.marginTop = '10%';

      var cont = document.createElement('input');
      cont.type = 'button';
      cont.value = 'Finish';
      cont.style.fontSize = '3vw';
      cont.style.width = '60%';
      cont.style.margin = '20%';
      cont.onclick = finish();

      quizBox.appendChild(congrats);
      quizBox.appendChild(cont);
    }
}

//================displaying the new question ================================================================================
//=========================== function for submitting their answer===============================================






//==================================================================================================================================
//====================function t0 hglight a selected option ========================================================================

function highlight(p) {  // function to highlighted the selected option
  return function() {
  document.getElementById(p).style.backgroundColor = 'green';
  document.getElementById('question').value = document.getElementById(p).value;


  for (i=1; i<5; i++) {
    var j = 'o' + String(i);
    if (j!=String(p)) {
      document.getElementById(j).style.backgroundColor = 'white';
    }
  }
  }
}

//====================================================================================================================
//=======================submitting the selected answer ===========================================================

function select() {
  return function() {
    var i = sessionStorage.index;
    console.log(i);
    var mark = JSON.parse(sessionStorage.QUESTIONS)[i];
    console.log(mark.content)
    var givenAnswer = document.getElementById('question').value;
    console.log(givenAnswer)


    if (givenAnswer) {
      if (givenAnswer==mark.answer){
        var new_right = parseInt(mark.rightTimes)+1;
        var emb_url = 'rightTimes=' + String(new_right);
      }
      else {
        var new_wrong = parseInt(mark.wrongTimes)+1;
        var emb_url = 'wrongTimes=' + String(new_wrong);
      }

      post_url = "http://127.0.0.1:8888/questions/" + String(mark.id);
      var xhttp = new XMLHttpRequest();
    	xhttp.open('PUT', post_url);
    	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    	xhttp.send(emb_url);
      sessionStorage.index = Number(sessionStorage.index) + 1;
      printQuiz();
    }
    else {
      alert('please select an option')
    }


  }
}

function loadPage () {
  sessionStorage.index = 0;
  const base_url = "http://127.0.0.1:8888"
  var xhttp = new XMLHttpRequest();
  var tester_url = base_url + '/questions';
  xhttp.open('GET', tester_url);  //get questions from server
  xhttp.send();
  selec = xhttp.addEventListener('load', function() {
                let tester_url = document.querySelector('#testersList');
                let testers = JSON.parse(xhttp.response);
                var selections = pickNumber(testers);  // generates 5 random questions
                var questions = [
                  testers[selections[0]],
                  testers[selections[1]],
                  testers[selections[2]],
                  testers[selections[3]],
                  testers[selections[4]]
                ]

                sessionStorage.QUESTIONS = JSON.stringify(questions);
  });
}

function finish() {
  return function() {
  window.location.href = "index.html"
}}

function quitAlert() {

  var x = confirm('are you sure that you want to quit the quiz?')

  if (x==true) {
    quit();
  }
}

function quit() {
    var i = sessionStorage.index;
    var mark = JSON.parse(sessionStorage.QUESTIONS)[i];
    post_url = "http://127.0.0.1:8888/questions/" + String(mark.id);
    var newQuit = parseInt(mark.giveUpTimes)+1;
    emb_url = 'giveUpTimes=' + String(newQuit);
    console.log(emb_url)
    var xhttp = new XMLHttpRequest();
    xhttp.open('PUT', post_url);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(emb_url);
    window.location.href = "index.html";

}
