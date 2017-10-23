//Must configure firebase

  var config = {
    apiKey: "AIzaSyCTarygMxiW0OIef12fPIBmTvPZktJyLe0",
    authDomain: "trains-6b1a9.firebaseapp.com",
    databaseURL: "https://trains-6b1a9.firebaseio.com",
    projectId: "trains-6b1a9",
    storageBucket: "",
    messagingSenderId: "559325335903"
  };
  firebase.initializeApp(config);

//Must define global variables

var database = firebase.database();
var trainName = "";
var trainDest = "";
var trainStart = "";
var trainFreq = "";

//Must define onclick event to load variables and send to firebase

$(document).on("click",".btn",function(){
	trainName = $("#TrainName").val();
	trainDest = $("#TrainDest").val();
	trainStart = $("#FirstTrain").val();
	trainFreq = $("#Frequency").val();
	console.log(trainName)
	console.log(trainDest)
	console.log(trainStart)
	console.log(trainFreq)

	database.ref().set({
		Train : trainName,
		Dest : trainDest,
		Start : trainStart,
		Freq : trainFreq
	});
});

//Must have an "on value" event to display results in firebase

database.ref().on("value", function(response) {
	console.log(response.val());
	$(".add-trains-here").html("<tr class=prepend-here><tr>")
	$(".prepend-here").prepend("<td>"+response.val().Freq+"</td>")
	$(".prepend-here").prepend("<td>"+response.val().Start+"</td>")
	$(".prepend-here").prepend("<td>"+response.val().Freq+"</td>")
	$(".prepend-here").prepend("<td>"+response.val().Dest+"</td>")
	$(".prepend-here").prepend("<td>"+response.val().Train+"</td>")
})