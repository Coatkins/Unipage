var button = document.getElementById('add-to-basket');
button.onclick = function(e) {
	e.preventDefault();
	var basket = [ ];
	var courseID = button.getAttribute('data-course-id');
	var course = {id: courseID, qty: 1, cost: 250};
	basket.push(course);
	localStorage.setItem('basket', JSON.stringify(basket));
	
}

