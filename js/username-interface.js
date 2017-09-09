//custom js file
//var apiKey = "d7c82bf02f2aa3b923efbc2aef62cf02bc17432d";

/*ar apiKey = require('./../.env').apiKey;
var Repo = require ("./../js/username-backend.js").userProfile; 


$(document).ready(function() {
  var user = new userProfile();
  $("button#submit").submit(function(event) {
    event.preventDefault();
    var userName = $("#userInput").val();
    $("#username").val();
    user.userInfo(userName);
  });
});*/

var apiKey = "d7c82bf02f2aa3b923efbc2aef62cf02bc17432d";



$(document).ready(function() {
  
  $("#submit").click(function(event) {
    event.preventDefault();
    //front-end  
    var userName = $("#username").val();
    $("#username").val("");


    //backend
    //first api call to get usrname and no or repos plus image
    $.get("https://api.github.com/users/" + userName + "?access_token=" + apiKey).then(function(response) {
      console.log(JSON.stringify(response));
      $("#displayImage").append("<img src=" + response.avatar_url + ">");
      $("#divName").text(response.login);
      $("#divRepo").text(response.public_repos);
      $("#display").slideToggle();
    //$("#divRepoName").text();
    //$("#repoLinks").text();  
    }).fail(function(error) {
      console.log(error.responseJSON.message);
    });

    //second api call to get repo mames description and links to github
    $.get('https://api.github.com/users/' + userName + '/repos?access_token=' + apiKey).then(function(response){
    for(var i = 0; i < response.length; i++){
      $("#divRepoName").append("<h4>" + response[i].name + "</h4><p>" + response[i].description + "<a href=" + response[i].html_url + 
        "><br><h5>view on github</h5></a>" + "</p><br><br>");
    }
    }).fail(function(error) {
      console.log(error.responseJSON.message);
    });
  });
});