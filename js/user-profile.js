function setupUploader(triggerId, inputId, targetElement) {
	const trigger = document.getElementById(triggerId);
	const input = document.getElementById(inputId);

	trigger.addEventListener("click", () => input.click());

	input.addEventListener("change", (event) => {
		const file = event.target.files[0];
		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = function (e) {
				targetElement.style.backgroundImage = `url('${e.target.result}')`;
			};
			reader.readAsDataURL(file);
		}
	});
}

// Hero-img background
setupUploader(
	"uploadTriggerHero",
	"uploadInputHero",
	document.getElementById("hero-img")
);

// Brand-logo background
setupUploader(
	"uploadTriggerLogo",
	"uploadInputLogo",
	document.getElementById("brand-logo")
);


document.querySelectorAll(".section").forEach((section) => {
	const editBtn = section.querySelector(".edit");
	const inputs = section.querySelectorAll("input");

	editBtn.addEventListener("click", () => {
		const isEditing = editBtn.textContent.trim().startsWith("Save");

		if (isEditing) {
			// Save mode → disable inputs
			inputs.forEach((input) => input.setAttribute("disabled", true));
			editBtn.innerHTML = `Edit <span><i class="fa-solid fa-pen-to-square"></i></span>`;
			console.log(
				"Saved:",
				Object.fromEntries([...inputs].map((i) => [i.name, i.value]))
			);
		} else {
			// Edit mode → enable inputs
			inputs.forEach((input) => input.removeAttribute("disabled"));
			editBtn.innerHTML = `Save <span><i class="fa-solid fa-check"></i></span>`;
		}
	});
});
