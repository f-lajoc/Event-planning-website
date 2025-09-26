const vendorsData = [
	{
		name: "Gift Ushering Service",
		description: "No.1 ushering service in Lagos giving you deserved luxury",
		location: "Lagos",
		category: "Ushering",
		reviews: 237,
		stars: 4,
		image: "./images/card1.png",
	},
	{
		name: "Lola's Hall",
		description: "Event Hall for Birthdays, Weddings, different ceremonies",
		location: "Abuja",
		category: "Event Hall",
		reviews: 19,
		stars: 5,
		image: "./images/card2.png",
	},
	{
		name: "Flexy Ushers",
		description:
			"Ushering Service for Birthdays, Weddings, different ceremonies",
		location: "Ibadan",
		category: "Ushering",
		reviews: 22,
		stars: 3,
		image: "./images/card3.jpeg",
	},
	{
		name: "Catering Masters",
		description:
			"Exquisite catering for any event size. Satisfaction is guaranteed",
		location: "Lagos",
		category: "Catering",
		reviews: 150,
		stars: 5,
		image: "./images/card4.jpg",
	},
	{
		name: "Decorate Your Day",
		description: "Stunning event decoration services.",
		location: "Abuja",
		category: "Decoration",
		reviews: 98,
		stars: 4,
		image: "./images/card5.jpg",
	},
	{
		name: "Sound & Light Co.",
		description: "Professional sound and lighting for your special day.",
		location: "Ibadan",
		category: "Sound & Lighting",
		reviews: 45,
		stars: 4,
		image: "./images/card6.jpeg",
	},
];

// Dummy planners data
const plannersData = [
	{
		name: "Elite Event Planners",
		description: "Experts in weddings, birthdays and corporate events.",
		location: "Lagos",
		category: "Weddings",
		reviews: 120,
		stars: 5,
		image: "./images/luxe1.jpg",
	},
	{
		name: "Classy Planners",
		description: "Making your events glamorous and stress-free.",
		location: "Abuja",
		category: "Corporate",
		reviews: 80,
		stars: 4,
		image: "./images/luxe3.jpg",
	},
	{
		name: "Ibadan Perfect Events",
		description: "Affordable yet professional planning services.",
		location: "Ibadan",
		category: "Birthdays",
		reviews: 40,
		stars: 3,
		image: "./images/serv3.webp",
	},
	{
		name: "Sound & Light Co.",
		description: "Professional sound and lighting for your special day.",
		location: "Ibadan",
		category: "Sound & Lighting",
		reviews: 45,
		stars: 4,
		image: "./images/work4.png",
	},
	{
		name: "Catering Masters",
		description:
			"Exquisite catering for any event size. Satisfaction is guaranteed",
		location: "Lagos",
		category: "Catering",
		reviews: 150,
		stars: 5,
		image: "./images/luxe8.jpg",
	},
	{
		name: "Gift Ushering Service",
		description: "No.1 ushering service in Lagos giving you deserved luxury",
		location: "Lagos",
		category: "Ushering",
		reviews: 237,
		stars: 4,
		image: "./images/work1.png",
	}
];

const vendorsGrid = document.getElementById("vendors-grid");
const plannersGrid = document.getElementById("planners-grid");

// Dropdowns
const vendorFilter = document.querySelector(
	'.vendors-section select[name="categories"]'
);
const plannerFilter = document.querySelector(
	'#planners-section-container select[name="categories"]'
);
const allCategories = document.getElementById("all-categories");
const searchInput = document.getElementById("search");

// Bookmarks from localStorage
let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

function generateStarHTML(count) {
	let stars = "";
	for (let i = 0; i < 5; i++) {
		stars += i < count ? "&#9733;" : "&#9734;";
	}
	return stars;
}

function createCard(item) {
	const isBookmarked = bookmarks.includes(item.name);
	return `
    <div class="vendor-card">
      <div class="image-container">
        <img src="${item.image}" alt="${item.name} Image">
        <div class="badge-container">
          <span class="badge">Available</span>
          <p class="bookmark-icon" data-name="${item.name}">
            <i class="fa-${isBookmarked ? "solid" : "regular"} fa-bookmark"></i>
          </p>
        </div>
      </div>
      <div class="vendor-card-content">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>
      <div class="vendor-card-footer">
        <div class="location-container">
          <div class="location"><i class="fa-solid fa-location-dot"></i> ${
						item.location
					}</div>
          <span><i class="fa-solid fa-phone"></i>+2347047297315</span>
        </div>
        <div class="reviews">
          <div class="stars">${generateStarHTML(item.stars)}</div>
          <span>${item.reviews} Reviews</span>
        </div>
      </div>
      <div class="vendor-card-footer-buttons">
        <button>Learn more</button>
        <a href="/pages/chatbox.html"><button class="book-service">Book Service</button></a>
      </div>
    </div>
  `;
}

// Render cards into grid
function renderGrid(grid, items) {
	grid.innerHTML = "";
	items.forEach((item) => {
		grid.innerHTML += createCard(item);
	});
	attachBookmarkEvents();
}

// Populate dropdowns with unique locations
function populateDropdown(dropdown, dataset) {
	const locations = [...new Set(dataset.map((item) => item.location))];
	dropdown.innerHTML = `<option value="All">All</option>`;
	locations.forEach((loc) => {
		dropdown.innerHTML += `<option value="${loc}">${loc}</option>`;
	});
}

// Initial dropdown setup
populateDropdown(vendorFilter, vendorsData);
populateDropdown(plannerFilter, plannersData);

// Initial render
renderGrid(vendorsGrid, vendorsData);
renderGrid(plannersGrid, plannersData);

// Filter function
function filterByLocation(selected, grid, dataset) {
	const filtered =
		selected === "All"
			? dataset
			: dataset.filter((item) => item.location === selected);
	renderGrid(grid, filtered);
}

// Search function
function searchVendors(query, grid, dataset) {
	const filtered = dataset.filter(
		(item) =>
			item.name.toLowerCase().includes(query.toLowerCase()) ||
			item.description.toLowerCase().includes(query.toLowerCase())
	);
	renderGrid(grid, filtered);
}

// Bookmark toggle
function attachBookmarkEvents() {
	document.querySelectorAll(".bookmark-icon").forEach((icon) => {
		icon.addEventListener("click", () => {
			const name = icon.getAttribute("data-name");
			if (bookmarks.includes(name)) {
				bookmarks = bookmarks.filter((b) => b !== name);
			} else {
				bookmarks.push(name);
			}
			localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
			renderGrid(vendorsGrid, vendorsData);
			renderGrid(plannersGrid, plannersData);
		});
	});
}

// Attach event listeners
vendorFilter.addEventListener("change", (e) =>
	filterByLocation(e.target.value, vendorsGrid, vendorsData)
);
plannerFilter.addEventListener("change", (e) =>
	filterByLocation(e.target.value, plannersGrid, plannersData)
);

searchInput.addEventListener("input", (e) => {
	searchVendors(e.target.value, vendorsGrid, vendorsData);
	searchVendors(e.target.value, plannersGrid, plannersData);
});

// All Categories Dropdown
function populateAllCategories(select) {
	const categories = [
		...new Set([...vendorsData, ...plannersData].map((item) => item.category)),
	];
	select.innerHTML = `
    <option value="All">All Categories</option>
    <option value="Bookmarks">Bookmarks</option>
  `;
	categories.forEach((cat) => {
		select.innerHTML += `<option value="${cat}">${cat}</option>`;
	});
}

allCategories.addEventListener("change", (e) => {
	const val = e.target.value;
	if (val === "All") {
		renderGrid(vendorsGrid, vendorsData);
		renderGrid(plannersGrid, plannersData);
	} else if (val === "Bookmarks") {
		const filteredVendors = vendorsData.filter((item) =>
			bookmarks.includes(item.name)
		);
		const filteredPlanners = plannersData.filter((item) =>
			bookmarks.includes(item.name)
		);
		renderGrid(vendorsGrid, filteredVendors);
		renderGrid(plannersGrid, filteredPlanners);
	} else {
		const filteredVendors = vendorsData.filter((item) => item.category === val);
		const filteredPlanners = plannersData.filter(
			(item) => item.category === val
		);
		renderGrid(vendorsGrid, filteredVendors);
		renderGrid(plannersGrid, filteredPlanners);
	}
});

populateAllCategories(allCategories);
