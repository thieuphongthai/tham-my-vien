
// Handle create service note
var createServiceNote = document.getElementById("create-service-note-btn");
var createServiceNoteForm = document.forms["create-service-note-form"];
createServiceNote.addEventListener("click", () => {
  createServiceNoteForm.submit();
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


