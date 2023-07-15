// switch toggle menu
var burger = document.querySelector('.burger');
var nav = document.querySelector('.nav');
burger.addEventListener('click', function() {
	nav.classList.toggle('active');
});