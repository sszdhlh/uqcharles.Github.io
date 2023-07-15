var meetingLimit = 150; // Number of meetings to show on the main page (can be changed by user)
var editMap = false; // The parameter that controls whether to redraw the map
var suburbCondition = "";
var nameCondition = "";
var address1Condition = "";
var address2Condition = "";
var facilitiesCondition = "";
var playgroundfeaturesCondition = "";




// the condition can be changed to another item
function iterateRecords(data, editMap, stateCondition, placeCondition, dateCondition, keywordsCondition, storyLimit) { 

	var total = 0; // Use the counter to ensure the number of meeting isn't bigger than the limit

	if (editMap) {
		$("#map_information").prepend($('<div id="mapid">'));
	}
	

	/**
	 * The code below has been adapted from examples supplied by 'Leaflet Quick Start Guide' 
	 * (https://leafletjs.com/examples/quick-start/) created by Vladimir Agafonkin (2010-2021). 
	 * We added more information to the popup window to show on the map.
	 */
	var myMap = L.map("mapid").setView([-21, 148], 4);

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: 18,
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(myMap);

	/**
	 * The code below has been adapted from examples supplied by 'Leaflet.OverlapMarkerPopup' 
	 * (https://github.com/gisarmory/Leaflet.OverlapMarkerPopup) created by gisarmory (2010). 
	 * We added more information to the popup window to show on the map.
	 */
	var popupListLayer = new L.popupListLayer().addTo(map);

	$.each(data.result.records, function (recordKey, recordValue) {

		if (total < meetingLimit) {
			var recordId = recordValue["_id"];
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
			var recordLatitude = recordValue["Latitude"];
			var recordLongitude = recordValue["Longitude"];
			
			if (recordId && recordName && recordAddress1 && recordAddress2 && recordSuburb
				&& recordPostcode && recordPlaygroundFeatures && recordFacilities && recordWeblink
				&& recordImage1 && recordImage1description && recordImage2 &&
				recordImage2description && recordImage3 && recordImage3description && recordImage4
				&& recordImage4description && recordContact && recordLatitude && recordLongitude) {

				// Filter conditions 
				if ((String(recordName).indexOf(nameCondition) != -1) &&
					(String(recordSuburb).indexOf(suburbCondition) != -1) &&
					(String(recordAddress1).indexOf(address1Condition) != -1) &&
					(String(recordAddress2).indexOf(address2Condition) != -1) &&
			 		(String(recordFacilities).indexOf(facilitiesCondition) != -1) &&
			 		(String(recordPlaygroundFeatures).indexOf(playgroundfeaturesCondition) != -1)) {

					// Add a marker with the corresponding information on the map 
					var marker = L.marker([recordLatitude, recordLongitude]); 
					
					var popupText = "<strong><em>Suburb: </em></strong>" + recordSuburb + "<br>" + "<em><strong>Name: </strong></em>" + recordName + "<br>"
					+ "<strong><em>Address1: </em></strong>" + recordAddress1 + "<br>" + "<em><strong>Address2: </strong></em>" + recordAddress2 + "<br>";

					var imageText = "<img src='" + recordImage1 + "' width='150' height='100'/><br>";


					var URLText = "<a href='javascript:;' onClick='openPage(\"" + recordURL + "\")'> Read more </a>";

					popupListLayer.addMarker(marker, popupText + imageText + URLText);
					
					total += 1; // Counter increases by one in each iteration
				}
			}
		}
	});
}

// Function to be called when clicking on the "read more" button
function openPage(url) {
	window.open(url, "_blank", 
	"height = 600, width = 770, screenX=680, screenY=100, directories=no, depended=yes, scrollbars=yes, location=yes, menubar=yes, toolbar=no, status=no");
}


// Events happen when user types in the search field

$('#search-state').change(function(){
	var searchSuburb = $(this).val();
  	
	$("#mapid").remove();

	suburbCondition = searchSuburb;
	getData(true, suburbCondition, nameCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition);
})

$("#search-place").keyup(function () {
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




/**
* The code below has been adapted from examples supplied by DECO1800/7180.
* Specifically, this code is sourced from the Workshop-week5 example.
* We added some other parameters which help to filter the datasets.
*/
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
		success: function (data) {
			localStorage.setItem("StoryLibraryData", JSON.stringify(data));
			console.log(data);
			console.log("The total space occupied by local storage is: " + JSON.stringify(localStorage).length); 
			iterateRecords(data, editMap, suburbCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition);
		}
	});
}


$(document).ready(function () {
	getData(editMap, suburbCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition);
});