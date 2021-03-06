var app = function(){
  var url = 'https://api.spotify.com/v1/search?q=crabs&type=album'
  var textbox = document.querySelector('#search-query')
  var albumlist = document.querySelector('#albums')

  makeRequest(url,callbackAfterRequestFinished)
}

var makeRequest = function(url,callback){
  //initialise the request
  var request = new XMLHttpRequest();
  //setup the request to 'get' from the URL
  request.open("GET", url);
  //set the callback function to act once the request is finished loading
  request.onload = callback;
  //send the request
  request.send();
}

var callbackAfterRequestFinished = function(){
  //check status and quit if not 200
  if (this.status !== 200){
    console.log('Quit - no HTTP 200 status.')
    return
  }

  //all good. get the response text - the JSON string object
  var jsonString = this.responseText;

  //de-stringify it

  var albums = JSON.parse(jsonString)

  //populate the html page with the search results using populatePage function

  populatePage(albums)
}

var populatePage = function(albums){
  //each item in the URL's albums array is an album represented as a hash
  //the albums themselves are in albums.albums.items
  
  albums.albums.items.forEach(function(album){
    //get your all-albums div to append to
    var allAlbums = document.getElementById('albums')

    //make your individual album div
    var albumDiv = document.createElement('div')
    albumDiv.id = "album"
    albumDiv.class = "album"

    //the album name is at...
    //album.name
    var pName = document.createElement('a')
    pName.innerText = "Album: " + album.name
    pName.href = album.external_urls.spotify

    //the album artists are at...
    //album.artists
    var pArtist = document.createElement('p')

    var allArtistsString = "Artists: "

    album.artists.forEach(function(artist){
      console.log(artist.name)
      allArtistsString += artist.name + " "
    })

    pArtist.innerText = allArtistsString

    //the album cover is at...
    //album.images[1]
    var pImg = document.createElement('img')
    pImg.src = album.images[1].url

    //now make a break for the point between albums

    var br = document.createElement('br')

    //now append them all
    allAlbums.appendChild(pName)
    allAlbums.appendChild(pArtist)
    allAlbums.appendChild(pImg)
    allAlbums.appendChild(br)
  })
}


window.onload = app;