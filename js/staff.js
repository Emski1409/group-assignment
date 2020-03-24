// the URI for our local node Questionnaire Server
const base_url = "http://127.0.0.1:8888";

//A function of get the input staff information
var loginButton = document.getElementById("login_button");
loginButton.addEventListener('click', function () {
    //set up and make a GET request to the staffs endpoint
    let xhttp = new XMLHttpRequest();
    //Get values from input[text]
    let username = document.getElementById("username").value;
    let password1 = document.getElementById("password").value;

    //Determine if the username and password is correct
    if (username === null) {
        alert("Can not search a username without parameter");
    } else {
        var staff_url = base_url + '/search?type=staff&username=' + username;
    };
    //when the request is finished, go through the return data
    xhttp.addEventListener('load', function () {
        let text = JSON.parse(this.response);
        let staff=text[0];
        let password2 = staff.password;
        if (password2 === password1) {
            alert('Login success');
            window.location.href='system.html'
        }else {
            alert('The password is wrong');
        };
    });
    xhttp.open("GET", staff_url);
    xhttp.send();
    document.getElementById('password').value = '';
});