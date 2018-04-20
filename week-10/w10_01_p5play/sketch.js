// code 2
// section a
// bfa dt
// spring 2018
// bryan ma

// week 10
// p5 play with an API

// this example uses https://dog.ceo/dog-api/

var allBreeds = [];	// used to store all the breeds data from the API request
var breedSelectElement; // gives the user an option to select a breed
var buttonElement; // gives the user a button to press after selecting the breed 
var imgElement;	// the reference to the image element we'll be using to show the doggo
var selectedDoggo; // variable storing the string to the currently selected breed

function setup() {
  noCanvas();

  loadJSON('https://dog.ceo/api/breeds/list/all', gotAllBreeds);

  createElement('h1', 'Welcome to the doggo image thingie!');
  createElement('h3', 'Select a breed and press the button below to make a doggo of that breed:');

  buttonElement = createButton('show me the doggo');
  buttonElement.mousePressed(onButtonPressed);

  breedSelectElement = createSelect();

  createElement('br');
  createElement('br');

  imgElement = createImg('https://dog.ceo/api/img/stbernard/n02109525_3388.jpg');
}

// callback for loading the initial data of all the breeds.
// sets up the select element and its options.
function gotAllBreeds(data) {
	allBreeds = Object.keys(data.message);
	for (var i = 0; i < allBreeds.length; i++) {
		breedSelectElement.option(allBreeds[i]);
	}
	selectedDoggo = breedSelectElement.value();
	breedSelectElement.changed(selectEvent);
}

// callback for changing the select element, on line 46
function selectEvent() {
	selectedDoggo = breedSelectElement.value();
	console.log(selectedDoggo);
}

// callback for pressing the button, and sending a request to the API to give back a picture of the selected breed
function onButtonPressed() {
	loadJSON('https://dog.ceo/api/breed/' + selectedDoggo + '/images/random', onGotDoggo);
}

// callback for line 58, when the API request is completed, display the new image and delete the old one.
function onGotDoggo(data) {
	imgElement.remove();
	imgElement = createImg(data.message);
}