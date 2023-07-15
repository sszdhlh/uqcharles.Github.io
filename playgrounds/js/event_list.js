
window.onload = function(){
	// alert("this is window.onload"); 
	$.ajax({
		url: 'http://127.0.0.1:3000/get_data',
		type: 'get',
		dataType: 'json',
		// data: data,
		success: function (data) {
			// response = data;
			console.log('success');
			if(data != null){
				iterateRecords(data);
			}
		},
		error:function(err){
			alert('err')
		}
	});
}



function iterateRecords(results) {
	var total = 0; // Use the counter to ensure the number of meeting isn't bigger than the limit
	// Iterate over each record and add a marker using the Latitude field (also containing longitude)
	$.each(results, function() {
		console.log(results)
			$("#meetings").append(
				$('<div class="box">').append(
					$('<div class="image">').append( // recordImage1, recordName, recordAddress1, recordImage1description
						$('<img>').attr("src", "images/pic_default.jpg"),
						$('<h3>').text(this.Title)
					),

					$('<div class="content">').append(
						$('<div class="meeting-detail">').append(
							// $('').text(recordDate),
							$('<span>').text(this.Name),
							$('<br />'),
							$('<span>').text(this.Place),
							$('<br />'),
							$('<span>').text(this.Facilities),
							$('<p>').text(this.Details),
							$('<span>').text(this.Date),
							// $('<p>').text(results.id),
						)
					)
				)
			)
			total += 1; // Counter
		}
	);
}
