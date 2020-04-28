console.log("HELLLO");



var btnClick = function(event){
  console.log("BUTTON CLIKED: SONG ID")
  console.log(event.target.innerText)

  // make a new request
  var request = new XMLHttpRequest();
  // listen for the request response
  // what to do when we recieve the request
  var responseHandler = function() {
    console.log("response text", this.responseText);

    // check to make sure if the request went ok
    event.target.style="display:none";
    // var data = JSON.parse(this.responseText);
  };

  request.addEventListener("load", responseHandler);
  // ready the system by calling open, and specifying the url
  // request.open("GET", "https://swapi.co/api/people/1");
  // request.open("GET", "http://api.tvmaze.com/search/shows?q=girls");
  request.open("GET", "https://quotes.rest/qod?language=en");
  // send the request
  request.send();
//   var data = {
//     song_id : event.target.innerText
//   };

//   request.open("POST", '/favorite');
//   request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

//   request.send(JSON.stringify(data));
}

var buttons = document.querySelectorAll('.btn');

for( var i=0; i<buttons.length; i++){
  var button = buttons[i]
  button.addEventListener('click', btnClick)
}