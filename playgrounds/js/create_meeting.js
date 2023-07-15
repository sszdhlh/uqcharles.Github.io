
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

$("#form-keywords").keyup(function () {
	createFacilities = $(this).val();
	markerUpdate();
})

$("#form-details").keyup(function () {
	createDetails = $(this).val();
	markerUpdate();
})

var result_Photo;
$("#form-photos").change(function (e) {
	$.each(e.currentTarget.files, function(index, val) {
		if (this.type.indexOf("image") < 0) {
			alert("The file you uploaded is not an image.");
		} else {
			var reader = new FileReader(); // Read the uploaded photo using file reader.
			reader.readAsDataURL(val);

			reader.onload = function() {
				result_Photo = this.result
				newPhotoInfo += "<img src=" + this.result + " width='150' height='100' />" + "<br>";
				photoInfo = newPhotoInfo;
				markerUpdate();
			}
		}
	})
	newPhotoInfo = "";
})
// default photos
var event_Photos = 'images/pic_default.jpg'; 

//将base64转换为blob

// function dataURLtoBlob(dataurl) { 
// 	var arr = dataurl.split(','),
// 		mime = arr[0].match(/:(.*?);/)[1],
// 		bstr = atob(arr[1]),
// 		n = bstr.length,
// 		u8arr = new Uint8Array(n);
// 	while (n--) {
// 		u8arr[n] = bstr.charCodeAt(n);
// 	}
// 	return new Blob([u8arr], { type: mime });
// };

//将blob转换为file

// function blobToFile(theBlob, fileName){
//    theBlob.lastModifiedDate = new Date();
//    theBlob.name = fileName;
//    return theBlob;
// };

$("#create-meeting").click(function () {
	if ($("#form-title").val() && $("#form-author").val() && $("#form-place").val() 
	&& $("#form-date").val() && $("#form-keywords").val() && $("#form-details").val()) {
		if ($("#form-photos").val()){

			event_Photos = $("#form-photos").val();

			// theblob = dataURLtoBlob(result_Photo);
			// fileblob = blobToFile(theblob, event_Photos);
			// console.log(fileblob);

			// var imageType = event_Photos.slice(-3); // 照片类型
			// var fileName = event_Photos; // 照片名称

			// var base64_photo = result_Photo.slice(22);
			// var raw = window.atob(base64_photo);
			// var rawLength = raw.length;
			// var uInt8Array = new Uint8Array(rawLength);

			// for(var i = 0; i < rawLength; ++i) {
			// 	uInt8Array[i] = raw.charCodeAt(i);
			// }
			// var blob = new Blob([uInt8Array], {type:'images/'+imageType});
			// console.log(blob);

			// var aLink = document.createElement('a');
			// var evt = document.createEvent("HTMLEvents");
			// evt.initEvent("click", true, true);
			// aLink.download = fileName;
			// aLink.href = URL.createObjectURL(blob);
			// aLink.click();
		};
		
		var data = {
			'Title': $("#form-title").val(), 
			'Name': $("#form-author").val(), 
			'Place': $("#form-place").val(), 
			'Date': $("#form-date").val(), 
			'Facilities' : $("#form-keywords").val(), 
			'Photos': event_Photos,
			'Details':$("#form-details").val()
		}

		$.ajax({
			url: 'http://127.0.0.1:3000/insert_data',
			type: 'get',
			dataType: 'json',
			data: data,
			success: function (data) {
				console.log('success')
			},
			error:function(err){
				alert('error')
			}
		  });
		alert("Creat successfully!");
	} else {
		alert("You haven't finished creating yet!");
	}
})