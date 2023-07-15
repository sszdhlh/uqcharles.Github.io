
// The information typed in by the user
var createTitle = "";
var createSponsor = "";
var createDate = "";
var createPlace = "";
var createFacilities = "";
var createDetails = "";
var photoInfo = ""; // The information of the photo that was shown on the map currently.
var newPhotoInfo = ""; // The information of the photo that was newly uploaded by the user.


/**
 * The code below has been adapted from examples supplied by 'Leaflet Quick Start Guide' 
 * (https://leafletjs.com/examples/quick-start/) created by Vladimir Agafonkin (2010-2021). 
 * We added more information to the popup window to show on the map.
 */
var map = L.map('mapid').setView([-21, 148], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
				'contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">' +
				'Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/"' +
				' target="_blank">OpenStreetMap France</a>'
}).addTo(map);


var marker = L.marker([-27.027816, 134.907787], {draggable: true}); // Add a marker at the center place on the map
var latlng = marker.getLatLng(); // Initialize the information of the latitude and longitude of the marker


marker
	    .addTo(map)
	    .bindPopup("<strong><em>Drag to the position you want to locate.</em></strong>")
		.on('dragend', function (e) { // Event happens after each drag
			var thisMarker = e.target;
			latlng = thisMarker.getLatLng();
			thisMarker.openPopup();
			markerUpdate();
		});
marker.openPopup();


// Update the pop-up information of the marker on the map
function markerUpdate() {
		marker.bindPopup("<strong><em>Drag to the position you want to locate.</em></strong><br>" + "<strong><em>Your location:&nbsp;&nbsp;</em></strong>" + latlng
		+ "<br><br>" +"<em><strong>Title:&nbsp;&nbsp;</strong></em>" + createTitle + "<br>" + "<em><strong>Sponsor:&nbsp;&nbsp;</strong></em>"+ createSponsor
		+ "<br>" +"<strong><em>Place:&nbsp;&nbsp;</em></strong>" + createPlace + "<br>" +"<strong><em>Date:&nbsp;&nbsp;</em></strong>" + createDate + "<br>" 
		+ "<em><strong>Facilities:&nbsp;&nbsp;</strong></em>" + createFacilities + "<br>" + "<em><strong>Story:&nbsp;&nbsp;</strong></em>" + createDetails
		+ "<br><br>" + photoInfo);
}


// Events happen when user types in the create field

$("#form-title").keyup(function () {
	createTitle = $(this).val();
	markerUpdate();
})

$("#form-sponsor").keyup(function () {
	createSponsor = $(this).val();
	markerUpdate();
})

$("#form-date").keyup(function () {
	createDate = $(this).val();
	markerUpdate();
})

$("#form-place").keyup(function () {
	createPlace = $(this).val();
	markerUpdate();
})

$("#form-facilities").keyup(function () {
	createFacilities = $(this).val();
	markerUpdate();
})

$("#form-details").keyup(function () {
	createDetails = $(this).val();
	markerUpdate();
})


$("#form-photos").change(function (e) {
	$.each(e.currentTarget.files, function(index, val) {
		if (this.type.indexOf("image") < 0) {
			alert("The file you uploaded is not an image.");
		} else {
			var reader = new FileReader(); // Read the uploaded photo using file reader.
			reader.readAsDataURL(val);

			reader.onload = function() {
				newPhotoInfo += "<img src=" + this.result + " width='150' height='100' />" + "<br>";
				photoInfo = newPhotoInfo;
				markerUpdate();
			}
		}
	})
	newPhotoInfo = "";
})

$("#create-meeting").click(function () {
	if ($("#form-title").val() && $("#form-author").val() && $("#form-place").val() 
	&& $("#form-date").val() && $("#form-keywords").val() && $("#form-details").val()) {
		
		var data = {
			'Title': $("#form-title").val(), 
			'Name': $("#form-author").val(), 
			'Place': $("#form-place").val(), 
			'Date': $("#form-date").val(), 
			'Facilities' : $("#form-facilities").val(), 
			'Photos': 'photo',
			'Details':$("#form-details").val()
		}

		$.ajax({
			url: 'http://127.0.0.1:3000/insert_data',
			type: 'get',
			dataType: 'json',
			data: data,
			success: function (data) {
				console.log('成功')
			}
		  });
		alert("Creat successfully!");
	} else {
		alert("You haven't finished creating yet!");
	}
})