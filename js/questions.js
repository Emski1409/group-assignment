// the URI for our local node Library Server
const base_url = "http://127.0.0.1:8888";

// set up and make a GET request to the users endpoint
var xhttp = new XMLHttpRequest();
var question_url = base_url + '/questions';
xhttp.open("GET", question_url);

// when the request is finished, go through the return data
// and add each user to the list
xhttp.addEventListener('load', function () {
    let question_list = document.querySelector('#questionsList');

    let questions = JSON.parse(this.response);
    //Loop through all the questions
    for (i = 0; i < questions.length; i++) {
        //create a list for each question and add it to the list
        let box = document.createElement('div');
        box.id = 'box';
        box.style.marginTop = '50px';
        let leftPart = document.createElement('div');
        leftPart.style.cssFloat = 'left';
        let rightPart = document.createElement('div');
        rightPart.style.cssFloat = 'right';
        rightPart.style.marginRight = '400px';

        let list_item = document.createElement('tr');
        let ePicture = document.createElement('td');
        ePicture.innerHTML = '<img id="questionPicture" src="../img/question.jpg" alt="slogan" style="height: 200px;width: 200px">';
        let e0 = document.createElement('td');
        e0.innerHTML = ' ID: ' + questions[i].id;
        let e1 = document.createElement('td');
        e1.innerHTML = ' Content: ' + questions[i].content;
        let e2 = document.createElement('td');
        e2.innerHTML = ' Answer: ' + questions[i].answer;
        let e3 = document.createElement('td');
        e3.innerHTML = ' The number of answering right: ' + questions[i].rightTimes;
        let e4 = document.createElement('td');
        e4.innerHTML = ' The number of answering wrong: ' + questions[i].wrongTimes;
        let e5 = document.createElement('td');
        e5.innerHTML = ' The number of giving up answering questions: ' + questions[i].giveUpTimes;
        let e6 = document.createElement('td');
        e6.innerHTML = ' OptionSelection1: ' + questions[i].optionSelection1;
        let e7 = document.createElement('td');
        e7.innerHTML = ' OptionSelection2: ' + questions[i].optionSelection2;
        let e8 = document.createElement('td');
        e8.innerHTML = ' OptionSelection3: ' + questions[i].optionSelection3;

        //create a button for updating question information
        let updateButton = document.createElement('input');
        updateButton.type = 'button';
        updateButton.onclick = getUpdateQuestionFunction(questions[i].id, questions[i].content, questions[i].answer);
        updateButton.value = 'update';
        updateButton.style.marginLeft = '20px';
        updateButton.style.marginRight = '10px';
        updateButton.style.marginTop = '100px';

        //create a button for deleting question information
        let deleteButton = document.createElement('input');
        deleteButton.type = 'button';
        deleteButton.onclick = getDeleteQuestionFunction(questions[i].id);
        deleteButton.value = 'delete';
        deleteButton.style.marginLeft = '20px';
        deleteButton.style.marginTop = '100px';

        list_item.appendChild(ePicture);
        list_item.appendChild(e0);
        list_item.appendChild(e1);
        list_item.appendChild(e2);
        list_item.appendChild(e6);
        list_item.appendChild(e7);
        list_item.appendChild(e8);
        list_item.appendChild(e3);
        list_item.appendChild(e4);
        list_item.appendChild(e5);
        leftPart.appendChild(list_item);
        rightPart.appendChild(updateButton);
        rightPart.appendChild(deleteButton);
        box.appendChild(leftPart);
        box.appendChild(rightPart);
        question_list.appendChild(box);
    }
    ;
});

xhttp.send();

//A function of update the user
function getUpdateQuestionFunction(id, content, answer) {
    return function () {
        document.getElementById('questionsList').innerHTML = '';
        //When click the update button,create two input[text] to get updated information
        let question_list = document.querySelector('#questionsList')

        let newContent = document.createElement('input');
        newContent.type = 'text';
        newContent.placeholder = 'newContent:'
        newContent.id = 'newUpdateContent';
        newContent.style.marginRight = '10px';

        let newAnswer = document.createElement('input');
        newAnswer.type = 'text';
        newAnswer.placeholder = 'newAnswer';
        newAnswer.id = 'newUpdateAnswer';
        newAnswer.style.marginRight = '10px';

        let option1 = document.createElement('input');
        option1.type = 'text';
        option1.placeholder = 'optionSelection1';
        option1.id = 'newOption1';
        option1.style.marginRight = '10px';

        let option2 = document.createElement('input');
        option2.type = 'text';
        option2.placeholder = 'optionSelection2';
        option2.id = 'newOption2';
        option2.style.marginRight = '10px';

        let option3 = document.createElement('input');
        option3.type = 'text';
        option3.placeholder = 'optionSelection3';
        option3.id = 'newOption3';
        option3.style.marginRight = '10px';

        let updateQuestionButton = document.createElement('input');
        updateQuestionButton.type = 'button';
        updateQuestionButton.value = 'updateQuestion';
        updateQuestionButton.onclick = updateQuestionInformation(id);
        updateQuestionButton.style.marginLeft = '20px';
        updateQuestionButton.style.marginRight = '10px';

        question_list.appendChild(newContent);
        question_list.appendChild(newAnswer);
        question_list.appendChild(option1);
        question_list.appendChild(option2);
        question_list.appendChild(option3);
        question_list.appendChild(updateQuestionButton);
    }
};

//A function of put the new information of the question to the API endpoint
function updateQuestionInformation(id) {
    return function () {
        // set up and make a PUT request to the questions endpoint
        let xhttp = new XMLHttpRequest();
        let question_url = base_url + '/questions/' + id;
        xhttp.open('PUT', question_url);

        // Get input values from the input[text] which id is newUpdateContent newUpdateAnswer
        let content = document.getElementById('newUpdateContent').value;
        let answer = document.getElementById('newUpdateAnswer').value;
        let o1 = document.getElementById('newOption1').value;
        let o2 = document.getElementById('newOption2').value;
        let o3 = document.getElementById('newOption3').value;

        if (content === '' & answer === '') {
            alert('Can not update a question without information');
        } else if (content === '') {
            alert('Can not update a null content');
        } else if (answer === '') {
            alert('Can not update a null answer');
        } else {
            // remember to set the content type header
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            let paras = 'content=' + content + '&answer=' + answer + '&optionSelection1=' + o1 + '&optionSelection2=' + o2 + '&optionSelection3=' + o3;
            xhttp.send(paras);
            alert('Update success');
            window.location.href = 'questions.html';
        }
    }
}

//A function of delete a question
function getDeleteQuestionFunction(id) {
    return function () {
        if (confirm("Are you sure to delete the question")) {
            //set up and make a DELETE request to eh questions endpoints
            let xhttp = new XMLHttpRequest();
            let question_url = base_url + '/questions/' + id;
            xhttp.open('DELETE', question_url);
            xhttp.send();
            alert('Delete success');
            //clear the page
            window.location.href = 'questions.html';
        } else {

        }
    }
};


//A function of add a new question to the questions list
var addButton = document.getElementById('addQuestion_button');
addButton.addEventListener('click', function () {
    //set up and make a POST request to the questions endpoint
    let question_url = base_url + '/questions';
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', question_url);

    //get values from the input part
    let content = document.getElementById('content').value;
    let answer = document.getElementById('answer').value;
    let o1 = document.getElementById('optionSelection1').value;
    let o2 = document.getElementById('optionSelection2').value;
    let o3 = document.getElementById('optionSelection3').value;

    let rightTimes = 0;
    let wrongTimes = 0;
    let giveUpTimes = 0;
    //Alarm that can not add a null content or answer
    if (content === '' && answer === '') {
        alert('Can not add null content and answer');
    } else if (content === '') {
        alert('Can not add question without content');
    } else if (answer === '') {
        alert('Can not add a null answer');
    } else {
        // remember to set the content type header
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //the parameters that sent to the API endpoint
        let paras = 'content=' + content + '&answer=' + answer + '&optionSelection1=' + o1 + '&optionSelection2=' + o2 + '&optionSelection3=' + o3 + '&rightTimes=' + rightTimes + '&wrongTimes=' + wrongTimes + '&giveUpTimes=' + giveUpTimes;
        xhttp.send(paras);
        alert('add question success');
        window.location.href = 'questions.html';
    }


})