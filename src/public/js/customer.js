// Handle create info Customer
var create = document.getElementById("create");
var createCustomerForm = document.forms["create-customer-form"];
create.addEventListener("click", () => {
	createCustomerForm.submit();
});

// Handle edit info Customer
var edit = document.getElementById("edit");
var editCustomerForm = document.forms["edit-customer-form"];
edit.addEventListener("click", () => {
	editCustomerForm.submit();
});

// Handle create service note
var createServiceNote = document.getElementById("create-service-note-btn");
var createServiceNoteForm = document.forms["create-service-note-form"];
createServiceNote.addEventListener("click", () => {
	createServiceNoteForm.submit();
});


// Handle select image from modal create
var addImg = document.getElementById('create-img');
var addAvt = document.getElementById('add-avt-customer');
addImg.addEventListener('change', (e) => {
	addAvt.src = URL.createObjectURL(e.target.files[0]);
});

// Handle select image from modal edit
var editImg = document.getElementById('edit-img');
var editAvt = document.getElementById('edit-avt');
editImg.addEventListener('change', (e) => {
	editAvt.src = URL.createObjectURL(e.target.files[0]);
});

// EDIT
var viewCustomer = document.getElementById("edit-customer");
viewCustomer.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;

	// Get data from edit button
	var editID = button.getAttribute('data-id');
	var editImage = button.getAttribute("data-edit-img");
	var firstName = button.getAttribute("data-edit-firstname");
	var lastName = button.getAttribute("data-edit-lastname");
	var birth = button.getAttribute("data-edit-birth");
	var gender = button.getAttribute("data-edit-gender");
	var phone = button.getAttribute("data-edit-phone");
	var email = button.getAttribute("data-edit-email");
	var address = button.getAttribute("data-edit-address");
	var description = button.getAttribute("data-edit-description");

	// Get element need embeded input
	var editAvt = document.getElementById("edit-customer-avt");
	var editFirstName = document.getElementById("edit-firstName")
	var editLastName = document.getElementById("edit-lastName")
	var editBirth = document.getElementById("edit-birth")
	var editGender = document.getElementById("edit-gender")
	var editPhone = document.getElementById("edit-phone")
	var editEmail = document.getElementById("edit-email")
	var editAddress = document.getElementById("edit-address")
	var editdescipt = document.getElementById("edit-description")

	if (editImage === '') {
		editAvt.setAttribute('src', '/img/user-icon.png');
	} else {
		editAvt.setAttribute('src', '/img/uploads/users/' + editImage)
	}
	editCustomerForm.setAttribute('action', `/business/employ/customers/${editID}?_method=PUT`);
	editFirstName.value = firstName;
	// editFirstName.setAttribute('value', firstName);
	editLastName.value = lastName;
	editBirth.value = birth;
	editGender.value = gender;
	editPhone.value = phone;
	editEmail.value = email;
	editAddress.value = address;
	editdescipt.value = description;

});

// Handle create service-note
var createServiceNote = document.getElementById("create-service-note");
createServiceNote.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;
	// Get data from detail button
	// Handle edit info Customer
	var dataServiceNoteID = button.getAttribute('data-service-note-id');
	var dataFirstName = button.getAttribute("data-service-note-firstname");
	var dataLastName = button.getAttribute("data-service-note-lastname");
	var dataBirth = button.getAttribute("data-service-note-birth");
	var dataGender = button.getAttribute("data-service-note-gender");
	var dataPhone = button.getAttribute("data-service-note-phone");
	var dataEmail = button.getAttribute("data-service-note-email");
	var dataAddress = button.getAttribute("data-service-note-address");

	// // Get element need embeded input
	var serviceNoteFirstLastName = document.getElementById("create-service-note-firstLastName");
	var serviceNoteBirth = document.getElementById("create-service-note-birth");
	var serviceNoteGender = document.getElementById("create-service-note-gender");
	var serviceNotePhone = document.getElementById("create-service-note-phone");
	var serviceNoteEmail = document.getElementById("create-service-note-email");
	var serviceNoteAddress = document.getElementById("create-service-note-address");

	createServiceNoteForm.setAttribute('action', `/business/employ/customers/${dataServiceNoteID}/service-note`);
	serviceNoteFirstLastName.value = dataFirstName + ' ' + dataLastName;
	serviceNoteBirth.value = dataBirth;
	serviceNoteGender.value = dataGender;
	serviceNotePhone.value = dataPhone;
	serviceNoteEmail.value = dataEmail;
	serviceNoteAddress.value = dataAddress;

});


document.addEventListener('DOMContentLoaded', function () {
	$(document).ready(function () {
		$('#customer_table').DataTable({
			paging: true,
			reponsive: true
		});
	});
});
