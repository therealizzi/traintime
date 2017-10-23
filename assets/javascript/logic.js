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
var trainNext = 0;
var trainMins = 0;

//Must define onclick event to load variables and send to firebase
$(document).on("click",".btn",function(){
	trainName = $("#TrainName").val().trim();
	trainDest = $("#TrainDest").val().trim();
	trainStart = $("#FirstTrain").val().trim();
	trainFreq = $("#Frequency").val().trim();
	
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

	//Must define time of the load
	var currentTime = moment();

	//Must convert start time into "moment" format
	var trainStartConverted = moment(response.val().Start, "hh:mm").subtract(1, "years");

	//Must find out difference in current time and start time
	var diffTime = moment().diff(moment(trainStartConverted), "minutes");

	//Must find time apart (remainder)
	var tRemainder = diffTime % response.val().Freq;

	//Must find minutes until next train
	var minutesTillTrain = response.val().Freq - tRemainder;

	//Must find next train time
	var nextTrain = moment().add(minutesTillTrain, "minutes");

	$(".add-trains-here").html("<tr class=prepend-here><tr>")
	$(".prepend-here").prepend("<td>"+minutesTillTrain+"</td>")
	$(".prepend-here").prepend("<td>"+moment(nextTrain).format("hh:mm")+"</td>")
	$(".prepend-here").prepend("<td>"+response.val().Freq+"</td>")
	$(".prepend-here").prepend("<td>"+response.val().Dest+"</td>")
	$(".prepend-here").prepend("<td>"+response.val().Train+"</td>")
});
