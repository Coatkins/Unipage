var button = document.getElementById('add-to-basket');
if (button) {
	button.onclick = function(e) {
		e.preventDefault();
	
		var basket = getBasketIfExists();
		var courseID = button.getAttribute('data-course-id');
		var courseName = button.getAttribute('data-course-name');
		var course = {id: courseID, name: courseName, qty: 1, cost: 250};
		basket.push(course);
		localStorage.setItem('basket', JSON.stringify(basket));
		updateBasketDisplay();
	}
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
	if (basketDisplay) {
	basketDisplay.innerText = basket.length;
}

}
updateBasketDisplay();

function writeCoursesToPage() {
	var element = document.getElementById('basket-courses');
	if (!element) {
console.log("No element");
		return;
	}
console.log("HI");
	var basket = getBasketIfExists();
	var template = '<div class="basket-item">{{ name }} ({{ id }}): {{ price }}</div>'
	var html = " ";
	basket.forEach(function(course) {
		course.name = course.name || "unknown";
		html += Mustache.render(template, course);
	})
	element.innerHTML = html;
}
writeCoursesToPage();
