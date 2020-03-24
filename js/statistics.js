// the URI for our local node Library Server
const base_url = "http://127.0.0.1:8888";  //server url

// set up and make a GET request to the users endpoint
var xhttp = new XMLHttpRequest();
var tester_url = base_url + '/questions';
xhttp.open('GET', tester_url);  //get questions from server
xhttp.send();
// when the request is finished, go through the return data
// and add each user to the list
xhttp.addEventListener('load', function() {
              var tester_url = document.querySelector('#testersList');
              var testers = JSON.parse(xhttp.response);  //parsing the response (list of questions)
              //Loop all the testers
              print(testers, tester_url);  //function that displays all the results
})            // end of printing on page



// pie chart drawrer /////////////////////////////////////////////////////////////
function draw(right, wrong, quit, pictureID) {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ['Question', 'stat'],
        ['Correct',right],
        ['Incorrect',wrong],
        ['Incompleted',quit]
      ]);
      var options = {
          backgroundColor:'beige',
          width:600,
          height:550,
          is3D:'true',
          legend:'none',
          pieSliceText:'label',
          chartArea:{width:'100%',height:'100%'},
          fontSize: 30
      };
      var chart = new google.visualization.PieChart(document.getElementById(pictureID));
      chart.draw(data,options);
    };
};
//---------------------------------------Pie chart drawer ----------------------------------------------------------

// pop up confirm delete alert and deletion fcuntion ----------------------------------

function deleteAlert(ID, question) {
  return function() {
    let alert = 'are you sure that you want to delete\n' + question;
    var x = confirm(alert);

    if (x == true) {
      let exetp = new XMLHttpRequest();
      let delete_question_url = base_url + '/Questions/' + ID;
      exetp.open('DELETE', delete_question_url);
      exetp.send();
      location.reload();
    };
  };
};

// pop up confirm clear and clear function ------------------------------

function clearAlert(ID, question) {
  return function() {
    let alert = 'are you sure that you want to clear the statistics for\n' + question;
    var x = confirm(alert);

    if (x == true) {
      var clear_url = base_url + '/Questions/' + ID;
      var enc = 'rightTimes=0&wrongTimes=0&giveUpTimes=0';
    	var xhttp = new XMLHttpRequest();
    	xhttp.open('PUT', clear_url);
    	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    	xhttp.send(enc);
      location.reload();
    };
  };
};






function print(testers, tester_url) {
for (i = 0; i < testers.length; i++) {
      var servID = testers[i].id;
      var right = parseInt(testers[i].rightTimes,10);
      var wrong = parseInt(testers[i].wrongTimes,10);
      var quit = parseInt(testers[i].giveUpTimes,10);
      var total = right + wrong + quit;
      if (total == 0) {
        var winPercent = 0;
        var losePercent = 0;
        var quitPercent = 0;
      }
      else {
        var winPercent = Math.floor((right/total)*100);
        var losePercent = Math.floor((wrong/total)*100);
        var quitPercent = 100 - winPercent - losePercent;
      };

      //creating the elements

      let statShow = document.createElement('div');  //the main box containing all the info forthat question  /////////////////////////////
      statShow.style.clear = 'both';
      statShow.style.marginBottom = '30%'
      statShow.style.overflow = 'auto';
      statShow.style.border = '1px solid black';

      let list_item = document.createElement('div');  //the box where the wordings will be displayed and its elements  ///////////////
      list_item.style.float = 'left';
      let e0 = document.createElement('p');  //the question
      e0.innerHTML = 'Question：' + testers[i].content;
      let e1 = document.createElement('p');  //win score
      e1.innerHTML = 'Correct Attempts: ' + winPercent +  '%' + '  (' + right + ')';
      let e2 = document.createElement('p');  //lose score
      e2.innerHTML = 'Incorrect Attempts: ' + losePercent +  '%' + '  (' + wrong + ')';
      let e3 = document.createElement('p');  //unnnatempted
      e3.innerHTML = 'Unnatempted: ' + quitPercent +  '%' + '  (' + quit + ')';

      let chart = document.createElement('div');  //the box where the pie chrt will be printed  ///////////////////////
      chart.style.float = 'right';
      let e4 = document.createElement('p');
      let stringI = String(i);
      let pictureID = 'picture' + stringI;
      e4.id = pictureID;
      draw(right, wrong, quit, pictureID);

      let b0 = document.createElement('input');  //the delete button  ////////////////////
      b0.type = 'button';
      b0.value = 'Delete';
      b0.id = 'button' + servID;
      b0.style.width = '10%';
      b0.style.fontSize = '100%';
      b0.style.clear = 'both';
      b0.style.float = 'left';
      b0.onclick = deleteAlert (servID, testers[i].content);

      let b1 = document.createElement('input');  // the clear button
      b1.type = 'button'
      b1.value = 'clear';
      b1.style.width = '10%';
      b1.innerHTML = 'Clear';
      b1.style.fontSize = '100%';
      b1.style.clear = 'both';
      b1.style.float = 'left';
      b1.onclick = clearAlert(servID, testers[i].content);

      // constructing the created elements on to the page

      list_item.appendChild(e0);
      list_item.appendChild(e1);
      list_item.appendChild(e2);
      list_item.appendChild(e3);
      chart.appendChild(e4);
      statShow.appendChild(list_item);
      statShow.appendChild(chart);
      statShow.appendChild(b0);
      statShow.appendChild(b1);
      tester_url.appendChild(statShow);

      // adding onclick to buttons





}};  // end of for loop  ------------------------------------------



function filterOptions () {
  var disp = document.getElementById('filterOptions');
  if (disp.style.display == 'none') {
    disp.style.display = 'block';
  }
  else {
    disp.style.display = 'none';
  };
};


function chtl () {
  const base_url = "http://127.0.0.1:8888";
  var fxhttp = new XMLHttpRequest();
  var tester_url = base_url + '/questions';
  fxhttp.open('GET', tester_url);
  fxhttp.send();
  fxhttp.addEventListener('load', function() {
      var tester_url = document.querySelector('#testersList');
      var testers = JSON.parse(xhttp.response);

      testers.sort(function(a,b){
        var one = parseInt(b.rightTimes);
        var two = parseInt(a.rightTimes);
        if(one == two)
          return 0;
        if(one < two)
          return -1;
        if(one > two)
          return 1;
        });
        clearElements();
        print(testers, tester_url);
        filterOptions();
  });
};

function clth () {
  const base_url = "http://127.0.0.1:8888";
  var fxhttp = new XMLHttpRequest();
  var tester_url = base_url + '/questions';
  fxhttp.open('GET', tester_url);
  fxhttp.send();
  fxhttp.addEventListener('load', function() {
      var tester_url = document.querySelector('#testersList');
      var testers = JSON.parse(xhttp.response);

      testers.sort(function(a,b){
        var one = parseInt(a.rightTimes);
        var two = parseInt(b.rightTimes);
        if(one == two)
          return 0;
        if(one < two)
          return -1;
        if(one > two)
          return 1;
        });
        clearElements();
        print(testers, tester_url)
        filterOptions();
  });
};

function ahtl () {
  const base_url = "http://127.0.0.1:8888";
  var fxhttp = new XMLHttpRequest();
  var tester_url = base_url + '/questions';
  fxhttp.open('GET', tester_url);
  fxhttp.send();
  fxhttp.addEventListener('load', function() {
      var tester_url = document.querySelector('#testersList');
      var testers = JSON.parse(xhttp.response);

      testers.sort(function(a,b){
        var one = (parseInt(b.wrongTimes) + parseInt(b.rightTimes) + parseInt(b.giveUpTimes));
        var two = (parseInt(a.wrongTimes) + parseInt(a.rightTimes) + parseInt(a.giveUpTimes));
        if( one == two )
          return 0;
        if(one < two)
          return -1;
        if(one > two)
          return 1;
        });
        clearElements();
        print(testers, tester_url)
        filterOptions();
  });
};

function alth () {
  const base_url = "http://127.0.0.1:8888";
  var fxhttp = new XMLHttpRequest();
  var tester_url = base_url + '/questions';
  fxhttp.open('GET', tester_url);
  fxhttp.send();
  fxhttp.addEventListener('load', function() {
      var tester_url = document.querySelector('#testersList');
      var testers = JSON.parse(xhttp.response);

      testers.sort(function(a,b){
        var one = (parseInt(a.wrongTimes) + parseInt(a.rightTimes) + parseInt(a.giveUpTimes));
        var two = (parseInt(b.wrongTimes) + parseInt(b.rightTimes) + parseInt(b.giveUpTimes));
        console.log(one);
        console.log(two);
        if( one == two )
          return 0;
        if(one < two)
          return -1;
        if(one > two)
          return 1;
        });
        clearElements();
        print(testers, tester_url)
        filterOptions();
  });
};

function clearElements() {
  var stat = document.getElementById('testersList');
  var box = stat.lastElementChild;
  while (box) {
    stat.removeChild(box);
    box =  stat.lastElementChild;
  }
}
