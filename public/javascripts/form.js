var propertyText = document.getElementById("property_name")

function submitClick(){
  window.alert("Working")
  var usertext = propertyText.value;

  var firebaseRef = firebase.database().ref() //.child('posts').push().key;
  firebaseRef.push().set(usertext);

}
