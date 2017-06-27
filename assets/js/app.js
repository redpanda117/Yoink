

//Initialize Facebook API
window.fbAsyncInit = function() {
	FB.init({
	  appId      : '679455808909655',
	  cookie     : true,
	  xfbml      : true,
	  version    : 'v2.8'
	});
	FB.AppEvents.logPageView();
	FB.getLoginStatus(function(response) {
	  var loginButton = document.getElementById('navLoginBtn');
	  var postButton = document.getElementById('navPostBtn');

	  if (response.status === 'connected') {
		loginButton.style.display = 'none';
		} else {
		postButton.style.display = 'none';
		}
	});

};

 (function(d, s, id){
	 var js, fjs = d.getElementsByTagName(s)[0];
	 if (d.getElementById(id)) {return;}
	 js = d.createElement(s); js.id = id;
	 js.src = "//connect.facebook.net/en_US/sdk.js";
	 fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

//Creates a Facebook login button
(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=1679455808909655";
	  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

 //If Faceback callback for login status is connected, redirect to main html page
 var checkLogin = function() {
	document.location.href = 'grid.html';
	}

//Initialize GoogleMaps API	
 function initMap() {
	var florida = {lat: 28.54, lng: -81.38};
	var map = new google.maps.Map(document.getElementById('map'), {

	zoom: 7,

	center: florida
	});
	var marker = new google.maps.Marker({
	position: florida,
	map: map
	});

	var input = document.getElementById('location-input');
	var autocomplete = new google.maps.places.SearchBox(input);
}

//Initialize Firebase
var config = {
	apiKey: "AIzaSyBRk12SsqUScaiXgY2oUgVRIhHRpKqzPq0",
	authDomain: "yoink-1b31d.firebaseapp.com",
	databaseURL: "https://yoink-1b31d.firebaseio.com",
	projectId: "yoink-1b31d",
	storageBucket: "yoink-1b31d.appspot.com",
	messagingSenderId: "426906359481"
  };
  firebase.initializeApp(config);


  
//End of initialization


//Redirect on click
$("#search").click(function() {
	window.location.href = 'grid.html';
});

//Image upload function
function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object
	//loop for picture
	for (var i = 0, f; f = files[i]; i++) {
		var reader = new FileReader();
		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			return function(e) {
				// Render thumbnail.
				var span = document.createElement('span');
				span.innerHTML = ['<img class="inputPic" src="', e.target.result,
					'" title="', escape(theFile.name), '"/>'
				].join('');
				document.getElementById('list').insertBefore(span, null);
			};
		})(f);
		// Read in the image file as a data URL.
		reader.readAsDataURL(f);
	}
}
document.getElementById('files').addEventListener('change', handleFileSelect, false);

$(document).on("click",".inputPic", function(){
   $( ".inputPic" ).remove();
   $("#files").val("")
});



        var location = "";
        var item= "";
        var description = "";
        var pic = "";


        //captures information from input section when user hits the submit button  
 
        $(document).on("click", "#submitButton", function (event) {
            $("#location-input").focus();            
            location = $("#location-input").val().trim();
            item = $("#item-input").val().trim();
            description = $("#description-input").val().trim();

            event.preventDefault();
            
            
            //adds information to database
            firebase.database().ref().push({
                  location: location,
                  item: item,
                  description: description,
                  pic: pic,
                  dateAdded:firebase.database.ServerValue.TIMESTAMP
            });

  
  