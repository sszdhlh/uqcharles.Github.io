var meetingLimit = 150; // Number of meetings to show on the main page (can be changed by user)
var suburbCondition = "";
var nameCondition = "";
var address1Condition = "";
var address2Condition = "";
var facilitiesCondition = "";
var playgroundfeaturesCondition = "";
var postcodeCondition = "";




function iterateRecords(results, suburbCondition, nameCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition) {

	var total = 0; // Use the counter to ensure the number of meeting isn't bigger than the limit





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

					$("#meetings").append(

						$('<div class="box">').append(
							$('<div class="image">').append(
								$('<img>').attr("src", "https://www.qld.gov.au"+recordImage1+".jpg"),
								$('<h3>').text(recordName)
							),

							$('<div class="content">').append(
								$('<div class="meeting-detail">').append(
									// $('').text(recordDate),
									$('<span> <br>').text(recordName + ", " + recordAddress1),
									$('<p>').text(recordImage1description),
									$("<a>").attr({"href": "javascript:;", "onClick": "openPage(\'" + recordContact + "\')"})
										.addClass("btn").text("Join now")

								)
							)
						)
					)

					total += 1; // Counter



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

	$("#meetings .box").hide();

	suburbCondition = searchSuburb;
	getData(suburbCondition, nameCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition);
})

$('#search-postcode').change(function(){
	var searchPostcode = $(this).val();

	$("#meetings .box").hide();

	postcodeCondition = searchPostcode;
	getData(suburbCondition, nameCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition);
})

$("#search-name").keyup(function () {
	var searchName = $(this).val();

	$("#meetings .box").hide();

	nameCondition = searchName;
	getData(suburbCondition, nameCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition);
})

$("#search-address1").keyup(function () {
	var searchAddress1 = $(this).val();

	$("#meetings .box").hide();

	address1Condition = searchAddress1;
	getData(suburbCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition);
})

$("#search-address2").keyup(function () {
	var searchAddress2 = $(this).val();

	$("#meetings .box").hide();

	address2Condition = searchAddress2;
	getData(suburbCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition);
})

$("#search-facilities").keyup(function () {
	var searchFacilities = $(this).val();

	$("#meetings .box").hide();

	facilitiesCondition = searchFacilities;
	getData(suburbCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition);
})

$("#search-playgroundsFeatures").keyup(function () {
	var searchPlaygroundFeatures = $(this).val();

	$("#meetings .box").hide();

	playgroundfeaturesCondition = searchPlaygroundFeatures;
	getData(suburbCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition);
})

function getData(suburbCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition) {

	var playgroundsMeetingData = JSON.parse(localStorage.getItem("playgroundsMeetingData"));

	if (playgroundsMeetingData) {
		console.log("Source: localStorage");
		iterateRecords(playgroundsMeetingData, suburbCondition, address1Condition, address2Condition, facilitiesCondition,
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
			iterateRecords(results, suburbCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition);
		}
	});
}

$(document).ready(function() {

	getData(suburbCondition, address1Condition, address2Condition, facilitiesCondition,
		playgroundfeaturesCondition);

});