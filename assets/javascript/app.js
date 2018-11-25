var config = {
  apiKey: "AIzaSyB0feVXLxknVu_5UHTA14NJQJskRKclY8A",
  authDomain: "train-time-assignment-ea900.firebaseapp.com",
  databaseURL: "https://train-time-assignment-ea900.firebaseio.com",
  projectId: "train-time-assignment-ea900",
  storageBucket: "",
  messagingSenderId: "679748614399"
};
firebase.initializeApp(config);
var database = firebase.database();

//make the user input//
$("#submitbtn").on("click", function(e) {
  e.preventDefault();
  var trainName = $("#train_name")
    .val()
    .trim();
  var trainTime = $("#train-input")
    .val()
    .trim();
  var destination = $("#destination-input")
    .val()
    .trim();
  var frequency = $("#frequency-input")
    .val()
    .trim();

  var newTrain = {
    name: trainName,
    time: trainTime,
    start: destination,
    freq: frequency
  };

  database.ref().push(newTrain);
  console.log(newTrain);
  $("#train_name").val("");
  $("#train-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  var newName = childSnapshot.val().name;
  var newTime = childSnapshot.val().time;
  var newDest = childSnapshot.val().start;
  var newFreq = childSnapshot.val().freq;
  $("#train-table>tbody").append(
    "<tr> <td>" +
      newName +
      "</td><td>" +
      newTime +
      "</td> <td>" +
      newDest +
      "</td><td>" +
      newFreq +
      "</td><td>" +
      nextTrain +
      " </td></tr>"
  );
  var currentTime = moment();

  var diffTime = moment().diff(moment(currentTime), "minutes");

  var MinutesTillTrain = moment().subtract(newTime - diffTime);
  console.log("MINUTES TILL TRAIN: " + MinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(MinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  // console.log(newName);
  // console.log(newTime);
  // console.log(newDest);
  // console.log(newFreq);
});

// create a database
//populate database/
// push the database/
// get the database/
//display on DOM
//change using MOMENT
//
