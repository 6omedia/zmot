// Autocomplete

class AutoFilter {

	
	
	constructor(){

	}

}

// filter stuff

class PostUi {



	constructor(){

	}

}

// Do stuff

// Autocomplete Industries

var ajax = new XMLHttpRequest();
ajax.open("GET", "/data/get_industries", true);
ajax.onload = function() {
	var list = JSON.parse(ajax.responseText).map(function(i) { return i.name; });
	new Awesomplete(document.querySelector("#input_industry"),{ list: list });
};
ajax.send();

// Autocomplete Towns

var ajaxTown = new XMLHttpRequest();
ajaxTown.open("GET", "/data/get_towns", true);
ajaxTown.onload = function() {
	var list = JSON.parse(ajaxTown.responseText).map(function(i) { return i.town; });
	new Awesomplete(document.querySelector("#input_town"),{ list: list });
};
ajaxTown.send();

// Search

$('#go').on('click', function(){
	const industry = $('#input_industry').val();
	const town = $('#input_town').val();
	const link = '/find/' + industry + '/' + town;
	window.location.replace(link);
});