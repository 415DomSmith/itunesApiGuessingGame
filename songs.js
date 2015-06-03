$(function() {

  var songIds = ["995535015", "966411602", "823593456", "956689796", "943946671","982388023", "907242704", "201281527", "656801339", "910038357","250038575", "878000348",  "794095205",  "1645339",  "400835962", "325618", "191924084",  "376116617",  "169003415",  "51958108", "76532142", "192688540", "684811768", "344799464", "217633921", "192811017", "258404365", "71068886", "640047583", "517438248" ];
  var currentSongs = [];
  //var choice1 = "", choice2 = "", choice3 = "", choice4 = "";
  var playingSong = "",
  		score = 0;

	$('#startButton').on('click', function(){
		var songBank = shuffle(songIds);  //calls shuffle function, and saves result to an array.
		var songBank4 = songBank.slice(0, 4) //take first 4 songs from shuffled array and create a new array with just those 4.
		currentSongs = shuffle(songBank4); //shuffles those 4 songs again, just for more randomization
		$('#startButton').text("Next Song");	
		var getDivs = document.getElementsByClassName("options");
		shuffleDivs(getDivs);
		getData();
	});

	function getData (){
		$.ajax({
			   url: "https://itunes.apple.com/lookup?id=" + currentSongs[0],
			   jsonp: "callback",
			   dataType: "jsonp"
				}).done(function(data) {
					$("#option1").text(data.results[0].artistName)
					$("#option1").addClass("rightAnswer")			
					playingSong = data.results[0].previewUrl;
					
					$("#audio_preview").attr("src", playingSong);
					
					$("#audio_preview").on("canplay", function() {
						$("#audio_preview")[0].play();
					});
				});
			
		$.ajax({
	   url: "https://itunes.apple.com/lookup?id=" + currentSongs[1],
	   jsonp: "callback",
	   dataType: "jsonp"
		}).done(function(data) {
	  	$("#option2").text(data.results[0].artistName)
			//console.log(data.results[0].artistName);
			});

		$.ajax({
	   url: "https://itunes.apple.com/lookup?id=" + currentSongs[2],
	   jsonp: "callback",
	   dataType: "jsonp"
		}).done(function(data) {
			//console.log(data);
	  	$("#option3").text(data.results[0].artistName)
			//console.log(data.results[0].artistName);
			});

		$.ajax({
	   url: "https://itunes.apple.com/lookup?id=" + currentSongs[3],
	   jsonp: "callback",
	   dataType: "jsonp"
		}).done(function(data) {
	  	$("#option4").text(data.results[0].artistName)
			//console.log(data.results[0].artistName);
			});

		var buttons = $('.options')
		buttons.each(function(){
		this.addEventListener("click", function(){
			if($(this).hasClass("rightAnswer")){
				$("#rightSound")[0].play();
				$("#message").text("Correct! +100 points!");
				score+= 100;
				$("#audio_preview")[0].pause();
				$("#score").text(score)
			} else {
				$("#wrongSound")[0].play();
				$("#audio_preview")[0].pause();
				$("#message").text("Wrong! -50 points.")
				score-= 50;
				$("#score").text(score)
				// var getDivs = document.getElementsByClassName("options");
				// shuffleDivs(getDivs);
				// getData();
			}
		})
	});
}


	function shuffle(arr) {
		var randomizedArr = arr;
	  for(var i = 0; i < randomizedArr.length; i++) {
	    var arrVal = randomizedArr[i];
	    var randoNum = Math.floor(Math.random()* randomizedArr.length);
	    var randoIndex = randomizedArr[randoNum];
	    randomizedArr[i] = randoIndex;
	    randomizedArr[randoNum] = arrVal; 
	  }
	  return randomizedArr;
	};



	function shuffleDivs(elems) {
	 
	  allElems = (function(){
			var ret = [], 
			l = elems.length;
				while (l--) { 
					ret[ret.length] = elems[l]; 
				}
				return ret;
	  })();
	 
	  var shuffled = (function(){
	    var l = allElems.length, 
	    ret = [];
	      while (l--) {
	        var random = Math.floor(Math.random() * allElems.length),
	            randEl = allElems[random].cloneNode(true);
	        allElems.splice(random, 1);
	        ret[ret.length] = randEl;
	      }
	        return ret; 
	    })(), 
	    l = elems.length;
	    	while (l--) {
	        elems[l].parentNode.insertBefore(shuffled[l], elems[l].nextSibling);
	        elems[l].parentNode.removeChild(elems[l]);
	    	}
	 
	}

});

