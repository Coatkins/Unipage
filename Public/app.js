var button = document.getElementById('add-to-basket');
button.onclick = function(e) {
	e.preventDefault();
	
	var basket = getBasketIfExists();
	var courseID = button.getAttribute('data-course-id');
	var course = {id: courseID, qty: 1, cost: 250};
	basket.push(course);
	localStorage.setItem('basket', JSON.stringify(basket));
	updateBasketDisplay();
}
function getBasketIfExists() {
	var basket;
	var stored = localStorage.getItem('basket');
	try{
		basket = JSON.parse(stored);
	} catch (e) {
		basket = [ ];
	}
	if (basket instanceof Array) {
		return basket;
	} else {
		return [ ];
	}
}

function updateBasketDisplay() {
	var basket = getBasketIfExists();
	var basketDisplay = document.getElementById('basket-count');
	basketDisplay.innerText = basket.length;
}
updateBasketDisplay();
