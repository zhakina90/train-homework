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
  var destination = $("#destination-input")
    .val()
    .trim();
  var trainTime = $("#train-input")
    .val()
    .trim();

  var frequency = $("#frequency-input")
    .val()
    .trim();

  var newTrain = {
    name: trainName,
    start: destination,
    time: trainTime,
    freq: frequency
  };

  database.ref().push(newTrain);
  // console.log(newTrain);
  $("#train_name").val("");
  $("#destination-input").val("");
  $("#train-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  var newName = childSnapshot.val().name;
  var newDest = childSnapshot.val().start;
  var newTime = childSnapshot.val().time;
  var newFreq = childSnapshot.val().freq;

  var currTime = moment();
  // console.log(currTime);
  var firstTime = moment(newTime, "HH:mm").subtract(1, "day");
  // console.log(firstTime);

  var diffTime = moment().diff(moment(firstTime), "minutes");
  // console.log("show me:" + diffTime);
  var reminder = diffTime % newFreq;
  // console.log("show reminder:" + reminder);
  var minAway = newFreq - reminder;
  // console.log("show me min:" + minAway);
  var nextTrain = moment()
    .add(minAway, "minutes")
    .format("hh:mm");

  $("#train-table>tbody").append(
    "<tr> <td>" +
      newName +
      "</td><td>" +
      newDest +
      "</td> <td>" +
      newFreq +
      "</td><td>" +
      nextTrain +
      "</td><td>" +
      minAway +
      " </td></tr>"
  );

  // console.log("show me next train:" + nextTrain);

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
