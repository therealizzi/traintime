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
$(document).on("click", ".btn", function(event){
	event.preventDefault();

	trainName = $("#TrainName").val().trim();
	trainDest = $("#TrainDest").val().trim();
	trainStart = $("#FirstTrain").val().trim();
	trainFreq = $("#Frequency").val().trim();

	var addTrain = {
		Train : trainName,
		Dest : trainDest,
		Start : trainStart,
		Freq : trainFreq
	};

	database.ref().push(addTrain);
});

//Must have an "on value" event to display results in firebase
database.ref().on("child_added", function(response) {
	console.log(response.val());

	//Must convert start time into "moment" format
	var trainStartConverted = moment(response.val().Start, "HH:mm").subtract(1, "years");

	//Must find out difference in current time and start time
	var diffTime = moment().diff(moment(trainStartConverted), "minutes");

	//Must find time between trains (remainder)
	var tRemainder = diffTime % response.val().Freq;

	//Must find minutes until next train
	var minutesTillTrain = response.val().Freq - tRemainder;

	//Must find next train time
	var nextTrain = moment().add(minutesTillTrain, "minutes");

	$(".add-trains-here").append("<tr class=prepend-here><td>"+response.val().Train+
		"</td><td>"+response.val().Dest+
		"</td><td>"+response.val().Freq+
		"</td><td>"+moment(nextTrain).format("HH:mm")+
		"</td><td>"+minutesTillTrain+
		"</td></tr>");
});
