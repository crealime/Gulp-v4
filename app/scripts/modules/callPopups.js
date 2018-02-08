function callPopups() {
	const container = ".popup-container";
	

	$('.callPopup').click(function(e) {
		e.preventDefault();
		$(container).css('display', 'flex').hide().fadeIn();
	});


	$('.closePopup').click(function() {
	  $(container).fadeOut();
	  $('#player').attr('src', $('#player').attr('src'));
	});


	$(document).mouseup(function (e) {
	  if ($(".popup-body").has(e.target).length === 0){
		  $(container).fadeOut();
	  }
	});


	$(document).keyup(function (e) {
		if (e.keyCode == 27) {
			$(container).fadeOut();
		}
	});

	
};