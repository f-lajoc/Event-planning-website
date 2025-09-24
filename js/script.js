  document.addEventListener('DOMContentLoaded', () => {
            const data = [
							{
								name: "Gift Ushering Service",
								description: "No.1 ushering service in Lagos giving you deserved luxury",
								location: "Lagos",
								reviews: 237,
								stars: 4,
								image: "./images/card1.png",
							},
							{
								name: "Lola's Hall",
								description:
									"Event Hall for Birthdays, Weddings, different ceremonies",
								location: "Abuja",
								reviews: 19,
								stars: 5,
								image: "./images/card2.png",
							},
							{
								name: "Flexy Ushers",
								description:
									"Ushering Service for Birthdays, Weddings, different ceremonies",
								location: "Ibadan",
								reviews: 22,
								stars: 3,
								image: "./images/card3.jpeg",
							},
							{
								name: "Catering Masters",
								description: "Exquisite catering for any event size. Satisfaction is guaranteed",
								location: "Lagos",
								reviews: 150,
								stars: 5,
								image: "./images/card4.jpg",
							},
							{
								name: "Decorate Your Day",
								description: "Stunning event decoration services. Jawdropping and Droolworthy is goal",
								location: "Abuja",
								reviews: 98,
								stars: 4,
								image: "./images/card5.jpg",
							},
							{
								name: "Sound & Light Co.",
								description:
									"Professional sound and lighting for your special day.",
								location: "Ibadan",
								reviews: 45,
								stars: 4,
								image: "./images/card6.jpeg",
							},
						];

	const vendorsGrid = document.getElementById("vendors-grid");
	const plannersGrid = document.getElementById("planners-grid");

	function generateStarHTML(count) {
		let stars = "";
		for (let i = 0; i < 5; i++) {
			stars += i < count ? "&#9733;" : "&#9734;";
		}
		return stars;
	}

	function createCard(item) {
		return `
                    <div class="vendor-card">
       <div class="image-container">
        <img src="${item.image}" alt="${item.name} Image">

														<div class="badge-container">
        <span class="badge">Available</span>
														<p><i class="fa-regular fa-bookmark"></i></p>
						</div>
                            <div class="brand-logo"></div>
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

	data.forEach((item) => {
		vendorsGrid.innerHTML += createCard(item);
		plannersGrid.innerHTML += createCard(item);
	});
});

// Sidenav
/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

// HAMBURGER MENU
function myFunction() {
	const x = document.getElementById("myLinks");
	x.style.left = "0"; // open sidebar
}

function myFunction2() {
	const x = document.getElementById("myLinks");
	x.style.left = "-250px"; // close sidebar
}

