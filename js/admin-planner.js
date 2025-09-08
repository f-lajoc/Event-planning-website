const vendors = [
	{
		sn: 1,
		name: "Edward Planner",
		email: "edward.planner@gmail.com",
		location: "Abuja",
		status: "Available",
		ratings: "Excellent",
	},
	{
		sn: 2,
		name: "Sophia Events",
		email: "sophia.events@yahoo.com",
		location: "Lagos",
		status: "Busy",
		ratings: "Very Good",
	},
	{
		sn: 3,
		name: "Michael Decor",
		email: "michael.decor@gmail.com",
		location: "Port Harcourt",
		status: "Available",
		ratings: "Good",
	},
	{
		sn: 4,
		name: "Grace Caterers",
		email: "grace.caterers@hotmail.com",
		location: "Ibadan",
		status: "Available",
		ratings: "Excellent",
	},
	{
		sn: 5,
		name: "Kingsley Sounds",
		email: "kingsley.sounds@gmail.com",
		location: "Enugu",
		status: "Unavailable",
		ratings: "Average",
	},
	{
		sn: 6,
		name: "Lola Makeover",
		email: "lola.makeover@gmail.com",
		location: "Benin City",
		status: "Available",
		ratings: "Very Good",
	},
	{
		sn: 7,
		name: "Daniel Rentals",
		email: "daniel.rentals@yahoo.com",
		location: "Kaduna",
		status: "Busy",
		ratings: "Good",
	},
	{
		sn: 8,
		name: "Amaka Lights",
		email: "amaka.lights@gmail.com",
		location: "Jos",
		status: "Available",
		ratings: "Excellent",
	},
	{
		sn: 9,
		name: "Chinedu Photography",
		email: "chinedu.photos@gmail.com",
		location: "Owerri",
		status: "Available",
		ratings: "Good",
	},
	{
		sn: 10,
		name: "Fatima Fashion",
		email: "fatima.fashion@yahoo.com",
		location: "Kano",
		status: "Unavailable",
		ratings: "Average",
	},
	{
		sn: 11,
		name: "Victor Security",
		email: "victor.security@gmail.com",
		location: "Ilorin",
		status: "Available",
		ratings: "Excellent",
	},
	{
		sn: 12,
		name: "Ngozi Cakes",
		email: "ngozi.cakes@gmail.com",
		location: "Abeokuta",
		status: "Busy",
		ratings: "Very Good",
	},
	{
		sn: 13,
		name: "Ifeanyi Transport",
		email: "ifeanyi.transport@gmail.com",
		location: "Akure",
		status: "Available",
		ratings: "Good",
	},
	{
		sn: 14,
		name: "Bola Ushers",
		email: "bola.ushers@yahoo.com",
		location: "Osogbo",
		status: "Available",
		ratings: "Excellent",
	},
];
function renderVendors(vendorList) {
	const tableBody = document.getElementById("vendorTableBody");
	tableBody.innerHTML = "";
	vendorList.forEach((vendor) => {
		const row = document.createElement("tr");

		row.innerHTML = `
                    <td >${vendor.sn}</td>
                    <td >${vendor.name}</td>
                    <td >${vendor.email}</td>
                    <td >${vendor.location}</td>
                    <td>${vendor.status}</td>
                    <td>${vendor.ratings}</td>
                `;
		tableBody.appendChild(row);
	});
}

function searchVendors() {
	const searchTerm = document.getElementById("searchInput").value.toLowerCase();
	const filteredVendors = vendors.filter((vendor) => {
		return Object.values(vendor).some((value) =>
			String(value).toLowerCase().includes(searchTerm)
		);
	});
	renderVendors(filteredVendors);
}

// Initial render on page load
document.addEventListener("DOMContentLoaded", () => {
	renderVendors(vendors);
});





// HAMBURGER MENU
function myFunction() {
	const x = document.getElementById("myLinks");
	x.style.left = "0"; // open sidebar
}

function myFunction2() {
	const x = document.getElementById("myLinks");
	x.style.left = "-250px"; // close sidebar
}