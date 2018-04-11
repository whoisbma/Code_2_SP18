// code 2
// section a
// bfa dt
// spring 2018
// bryan ma

// week 8
// giphy API
// based on example by Dan Shiffman

var giphySearch = 'https://api.giphy.com/v1/gifs/search?'
var query = 'q=doge'
var apiKey = '&api_key=W6EoCb8070RoeMOEg3CTCdAPcugZv2Rc&limit=5'

function setup() {
  noCanvas();
  var url = giphySearch + query + apiKey;
  loadJSON(url, gotData);
}

function gotData(data) {
  console.log(data);

  for (var i = 0; i < data.data.length; i++) {
    createImg(data.data[i].images.original.url);    
  }

}
