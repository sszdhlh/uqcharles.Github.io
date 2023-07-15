var meetingLimit = 150; // Number of meetings to show on the main page (can be changed by user)
var editMap = false; // The parameter that controls whether to redraw the map
var suburbCondition = "";
var nameCondition = "";
var address1Condition = "";
var address2Condition = "";
var facilitiesCondition = "";
var playgroundfeaturesCondition = "";
var postcodeCondition = "";




function iterateRecords(results, editMap, suburbCondition, nameCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition) {

	var total = 0; // Use the counter to ensure the number of story isn't bigger than the limit

	if (editMap) {
		$("#map_information").prepend($('<div id="mapid">'));
	}


	// Setup the map as per the Leaflet instructions:
	// https://leafletjs.com/examples/quick-start/

	var myMap = L.map("mapid").setView([-21, 148], 4);

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: 18,
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(myMap);


	// Iterate over each record and add a marker using the Latitude field (also containing longitude)
	$.each(results.result.records, function(recordID, recordValue) {

		var recordId = recordValue["_id"];
		var recordLatitude = recordValue["Latitude"];
		var recordLongitude = recordValue["Longitude"];
		var recordName = recordValue["Name"];
		var recordAddress1 = recordValue["Address1"];
		var recordAddress2 = recordValue["Address2"];
		var recordSuburb = recordValue["Suburb"];
		var recordPostcode = recordValue["Postcode"];
		var recordPlaygroundFeatures = recordValue["Playground features"];
		var recordFacilities = recordValue["Facilities"];
		var recordWeblink = recordValue["Weblink"];
		var recordImage1 = recordValue["Image 1"];
		var recordImage1description = recordValue["Image 1 description"];
		var recordImage2 = recordValue["Image 2"];
		var recordImage2description = recordValue["Image 2 description"];
		var recordImage3 = recordValue["Image 3"];
		var recordImage3description = recordValue["Image 3 description"];
		var recordImage4 = recordValue["Image 4"];
		var recordImage4description = recordValue["Image 4 description"];
		var recordContact = recordValue["Contact"];


		if (recordId && recordName && recordAddress1 && recordAddress2 && recordSuburb
		&& recordPostcode && recordPlaygroundFeatures && recordFacilities && recordWeblink
		&& recordImage1 && recordImage1description && recordImage2 &&
		recordImage2description && recordImage3 && recordImage3description && recordImage4
		&& recordImage4description && recordContact && recordLatitude && recordLongitude) {

		// Filter conditions
		// if ((String(recordName).indexOf(nameCondition) != -1) &&
		// 	(String(recordSuburb).indexOf(suburbCondition) != -1) &&
		// 	(String(recordAddress1).indexOf(address1Condition) != -1) &&
		// 	((String(recordAddress2).indexOf(address2Condition) != -1) ||
		// 	 (String(recordFacilities).indexOf(facilitiesCondition) != -1) ||
		// 	 (String(recordPlaygroundFeatures).indexOf(playgroundfeaturesCondition) != -1))) {
		//
		// 	// Add a marker with the corresponding information on the map
		//
		//
		// 	total += 1; // Counter increases by one in each iteration
		// }
	}
		if((String(recordName).indexOf(nameCondition) != -1) &&
			(String(recordPostcode).indexOf(postcodeCondition) != -1) &&
			(String(recordSuburb).indexOf(suburbCondition) != -1) &&
			(String(recordAddress1).indexOf(address1Condition) != -1) &&
			((String(recordAddress2).indexOf(address2Condition) != -1) ||
			 (String(recordFacilities).indexOf(facilitiesCondition) != -1) ||
			 (String(recordPlaygroundFeatures).indexOf(playgroundfeaturesCondition) != -1))) {

			// Position the marker and add to map
			var marker = L.marker([recordLatitude, recordLongitude]).addTo(myMap);

			// Associate a popup with the record's information

			var popupText = "<strong><em>Name: </em></strong>" + recordName +
				"<br>" + "<em><strong>Suburb: </strong></em>" + recordSuburb + "<br>" +
				"<strong><em>Address1: </em></strong>" + recordAddress1 + "<br>" +
				"<em><strong>Address2: </strong></em>" + recordAddress2 + "<br>" +
				"<em><strong>Facilities: </strong></em>" + recordFacilities + "<br>"+"<em><strong>Postcode: </strong></em>" + recordPostcode + "<br>" +
				"<em><strong>PlaygroundFeatures: </strong></em>" + recordPlaygroundFeatures + "<br>"+
				"<em><strong>Weblink: </strong></em>" + recordWeblink +
				"<br>"+"<em><strong>Image1description: </strong></em>" + recordImage1description + "<br>"+
				"<br>"+"<em><strong>Contact: </strong></em>" + recordContact + "<br>";
			var imageText = "<img src='https://www.qld.gov.au" + recordImage1+ ".jpg' width='150' height='100'/><br>";

			marker.bindPopup(popupText + imageText).openPopup();



		}
		
	});

}



// Function to be called when clicking on the "read more" button
function openPage(url) {
	window.open(url, "_blank",
	"height = 600, width = 770, screenX=680, screenY=100, directories=no, depended=yes, scrollbars=yes, location=yes, menubar=yes, toolbar=no, status=no");
}


// Events happen when user types in the search field

$('#search-suburb').change(function(){
	var searchSuburb = $(this).val();

	$("#mapid").remove();

	suburbCondition = searchSuburb;
	getData(true, suburbCondition, nameCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition);
})

$('#search-postcode').change(function(){
	var searchPostcode = $(this).val();

	$("#mapid").remove();

	postcodeCondition = searchPostcode;
	getData(true, suburbCondition, nameCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition);
})

$("#search-name").keyup(function () {
	var searchName = $(this).val();

	$("#mapid").remove();

	nameCondition = searchName;
	getData(true, suburbCondition, nameCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition);
})

$("#search-address1").keyup(function () {
	var searchAddress1 = $(this).val();

	$("#mapid").remove();

	address1Condition = searchAddress1;
	getData(true, suburbCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition);
})

$("#search-address2").keyup(function () {
	var searchAddress2 = $(this).val();

	$("#mapid").remove();

	address2Condition = searchAddress2;
	getData(true, suburbCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition);
})

$("#search-facilities").keyup(function () {
	var searchFacilities = $(this).val();

	$("#mapid").remove();

	facilitiesCondition = searchFacilities;
	getData(true, suburbCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition);
})

$("#search-playgroundsFeatures").keyup(function () {
	var searchPlaygroundFeatures = $(this).val();

	$("#mapid").remove();

	playgroundfeaturesCondition = searchPlaygroundFeatures;
	getData(true, suburbCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition);
})

function getData(editMap, suburbCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition) {

	var playgroundsMeetingData = JSON.parse(localStorage.getItem("playgroundsMeetingData"));

	if (playgroundsMeetingData) {
		console.log("Source: localStorage");
		console.log(playgroundsMeetingData);
		iterateRecords(playgroundsMeetingData, editMap, suburbCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition);

	} else {
		console.log("Source: ajax call");
		localStorage.clear(); // Clear the local storage to ensure that there is enough space.
		var data = {
			resource_id: "b6d053f3-7df4-4cb1-938a-33b5995d6e3f",
			/** The default value is 100 if we don't set this attribute. There are 8500 records in our dataset but
			 * we choose to show 5000 records because of the size limit (5M) of the local storage. */
			limit: 5000
		}
	}

	$.ajax({
		url: "https://www.data.qld.gov.au/api/3/action/datastore_search",
		data: data,
		dataType: "jsonp",
		cache: true,
		success: function (results) {
			localStorage.setItem("playgroundsMeetingData", JSON.stringify(results));
			console.log(results);
			console.log("The total space occupied by local storage is: " + JSON.stringify(localStorage).length);
			iterateRecords(playgroundsMeetingData, editMap, stateCondition, placeCondition, dateCondition, keywordsCondition, storyLimit);
		}
	});
}

$(document).ready(function() {

	getData(editMap, suburbCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition);

});