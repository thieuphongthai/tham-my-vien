//PATCH: load form and submit push performer forms
var pushPerformerBtn = document.getElementById("add-performer-btn");
var performerForm = document.forms['add-performer-form'];
pushPerformerBtn.addEventListener("click", () => {
	performerForm.submit();
})

var performerModal = document.getElementById("add-performer-modal");
performerModal.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;
	// Get data from edit button
	var id = button.getAttribute("data-id");
	var name = button.getAttribute("data-name");
	var birth = button.getAttribute("data-birth");
	var gender = button.getAttribute("data-birth");
	var email = button.getAttribute("data-email");
	var phone = button.getAttribute("data-phone");
	var address = button.getAttribute("data-address");
	var createName = button.getAttribute("data-createName");
	var service = button.getAttribute("data-service");
	var schedule = button.getAttribute("data-schedule");
	var comment = button.getAttribute("data-comment");

	// Get element need embeded input
	var modalName = document.getElementById("add-performer-firstLastName");
	var modalBirth = document.getElementById("add-performer-birth");
	var modalGender = document.getElementById("add-performer-gender");
	var modalEmail = document.getElementById("add-performer-email");
	var modalPhone = document.getElementById("add-performer-phone");
	var modalAddress = document.getElementById("add-performer-address");
	var modalCreateName = document.getElementById("add-performer-createName");
	var modalService = document.getElementById("add-performer-service");
	var modalSchedule = document.getElementById("add-performer-schedule");
	var modalComment = document.getElementById("add-performer-comment");

	performerForm.setAttribute('action', `/reception/employ/service-note/${id}?_method=PATCH`)

	modalName.value = name;
	modalBirth.value = birth; 
	modalGender.value = gender; 
	modalEmail.value = email; 
	modalPhone.value = phone; 
	modalAddress.value = address; 
	modalCreateName.value = createName; 
	modalService.value = service; 
	modalSchedule.value = schedule; 
	modalComment.value = comment; 

})

//END PATCH: load form and submit push performer forms










document.addEventListener("DOMContentLoaded", function () {
	$(document).ready(function () {
		$("#customer_table").DataTable({
			paging: true,
			reponsive: true,
		});
	});
});

// Handle message
// var alertMessage = document.getElementById('alert-message');