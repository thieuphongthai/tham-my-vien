// Handle create info Customer
var create = document.getElementById("create");
var createServiceNoteForm = document.forms["create-service-note-form"];
create.addEventListener("click", () => {
	createServiceNoteForm.submit();
});

// Handle edit info Customer
var edit = document.getElementById("edit");
var editServiceNoteForm = document.forms["edit-service-note-form"];
edit.addEventListener("click", () => {
	editServiceNoteForm.submit();
});


// Handle push data to edit modal
var editCustomer = document.getElementById("edit-customer");
editCustomer.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;
	// Get data from edit button
	var idEdit = button.getAttribute('data-id');
	var imageEdit = button.getAttribute("data-edit-img");
	var firstName = button.getAttribute("data-first-name");
	var lastName = button.getAttribute("data-last-name");
	var birth = button.getAttribute("data-birth");
	var gender = button.getAttribute("data-gender");
	var phone = button.getAttribute("data-phone");
	var email = button.getAttribute("data-email");
	var address = button.getAttribute("data-address");
	var department = button.getAttribute("data-department");
	var position = button.getAttribute("data-position");
	var desciption = button.getAttribute("data-description");
	var account = button.getAttribute("data-account");
	var password = button.getAttribute("data-password");
	var role = button.getAttribute("data-role");

	// Get element need embeded input
	var editAvt = document.getElementById("edit-avt");
	var editFirstName = document.getElementById("edit-firstName");
	var editLastName = document.getElementById("edit-lastName");
	var editBirth = document.getElementById("edit-birth");
	var editGender = document.getElementById("edit-gender");
	var editPhone = document.getElementById("edit-phone");
	var editEmail = document.getElementById("edit-email");
	var editAddress = document.getElementById("edit-address");
	var editDepartment = document.getElementById("edit-department");
	var editPosition = document.getElementById("edit-position");
	var editDescription = document.getElementById("edit-description");
	var editAccount = document.getElementById("edit-account");
	var editPassword = document.getElementById("edit-password");
	var editRole = document.getElementById("edit-role");

	editFirstName.focus();

	if (imageEdit === '') {
		editAvt.setAttribute('src', '/img/user-icon.png');
	} else {
		editAvt.setAttribute('src', '/img/uploads/Customers/' + imageEdit);
	}
	editCustomer.setAttribute('action', `/root/Customer/${idEdit}?_method=PUT`);
	editFirstName.value = firstName;
	editLastName.value = lastName;
	editBirth.value = birth;
	editGender.value = gender;
	editPhone.value = phone;
	editEmail.value = email;
	editAddress.value = address;
	editDepartment.value = department;
	editPosition.value = position;
	editDescription.value = desciption;
	editAccount.value = account;
	editPassword.value = password;
	editRole.value = role;
});

// Handle detail Customer
var detailCustomer = document.getElementById("detail-customer");
detailCustomer.addEventListener("show.bs.modal", function (event) {
	// Button that triggered the modal
	var button = event.relatedTarget;
	// Get data from detail button
	var imageDetail = button.getAttribute("data-detail-img");
	var firstNameDetail = button.getAttribute("data-detail-first-name");
	var lastNameDetail = button.getAttribute("data-detail-last-name");
	var birthDetail = button.getAttribute("data-detail-birth");
	var genderDetail = button.getAttribute("data-detail-gender");
	var phoneDetail = button.getAttribute("data-detail-phone");
	var emailDetail = button.getAttribute("data-detail-email");
	var addressDetail = button.getAttribute("data-detail-address");
	var departmentDetail = button.getAttribute("data-detail-department");
	var positionDetail = button.getAttribute("data-detail-position");
	var desciptionDetail = button.getAttribute("data-detail-description");
	var accountDetail = button.getAttribute("data-detail-account");
	var roleDetail = button.getAttribute("data-detail-role");

	// // Get element need embeded input

	var detailAvt = document.getElementById("detail-avt");
	var detailFirstName = document.getElementById("detail-firstLastName");
	var detailBirth = document.getElementById("detail-birth");
	var detailGender = document.getElementById("detail-gender");
	var detailPhone = document.getElementById("detail-phone");
	var detailEmail = document.getElementById("detail-email");
	var detailAddress = document.getElementById("detail-address");
	var detailDepartment = document.getElementById("detail-department");
	var detailPosition = document.getElementById("detail-position");
	var detailDescription = document.getElementById("detail-description");
	var detailAccount = document.getElementById("detail-account");
	var detailRole = document.getElementById("detail-role");
	if (imageDetail === '') {
		detailAvt.setAttribute('src', '/img//Customer-icon.png');
	} else {
		detailAvt.setAttribute('src', '/img/uploads/Customers/' + imageDetail)
	}
	detailFirstName.innerHTML = firstNameDetail + " " + lastNameDetail;
	detailBirth.innerHTML = '<strong>Ngày sinh: </strong> ' + birthDetail;
	detailGender.innerHTML = '<strong>Giới tính: </strong>' + genderDetail;
	detailPhone.innerHTML = '<strong>Điện thoại: </strong>' + phoneDetail;
	detailEmail.innerHTML = '<strong>Email: </strong>' + emailDetail;
	detailAddress.innerHTML = '<strong>Địa chỉ: </strong>' + addressDetail;
	detailDepartment.innerHTML = '<strong>Phòng ban: </strong>' + departmentDetail;
	detailPosition.innerHTML = '<strong>Chức vụ: </strong>' + positionDetail;
	detailDescription.innerHTML = desciptionDetail;
	detailAccount.innerHTML = '<strong>Tài khoản: </strong>' + accountDetail;
	detailRole.innerHTML = '<strong>Quyền hạn: </strong>' + roleDetail;
});



// document.addEventListener('DOMContentLoaded', function () {
// 	$(document).ready(function () {
// 		$('#Customer_table').DataTable({});
// 	});
// });


