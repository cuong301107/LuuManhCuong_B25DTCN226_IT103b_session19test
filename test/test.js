let contacts = [
  {
    name: "Nguyễn Văn An",
    phone: "0901234567",
    email: "nguyenvanan@email.com",
  },
  {
    name: "Trần Thị Bình",
    phone: "0912345678",
    email: "tranthibinh@email.com",
  },
  { name: "Lê Văn Cường", phone: "0923456789", email: "levancuong@email.com" },
  {
    name: "Phạm Thị Dung",
    phone: "0934567890",
    email: "phamthidung@email.com",
  },
  { name: "Hoàng Văn Em", phone: "0945678901", email: "hoangvanem@email.com" },
];
let editIndex = -1;

const form = document.getElementById("contact-form");
const tbody = document.getElementById("contact-tbody");
const btnAdd = document.querySelector(".btn-add");

// Lấy dữ liệu mẫu từ HTML và đưa vào mảng contacts
function loadInitialData() {
  const rows = tbody.querySelectorAll("tr");
  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    if (cells.length >= 4) {
      contacts.push({
        name: cells[1].textContent.trim(),
        phone: cells[2].textContent.trim(),
        email: cells[3].textContent.trim(),
      });
    }
  });
}

// Render lại danh sách từ mảng contacts
function renderContacts() {
  tbody.innerHTML = "";
  contacts.forEach((c, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${c.name}</td>
      <td>${c.phone}</td>
      <td>${c.email}</td>
      <td>
        <div class="action-buttons">
          <button onclick="editContact(${index})" class="btn-edit">Sửa</button>
          <button onclick="deleteContact(${index})" class="btn-delete">Xóa</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Xử lý submit form
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("contact-name").value.trim();
  const phone = document.getElementById("contact-phone").value.trim();
  const email = document.getElementById("contact-email").value.trim();

  // Validation
  if (!name) return alert("Tên không được để trống!");
  if (name.length < 3) return alert("Tên phải có ít nhất 3 ký tự!");
  if (!phone) return alert("Số điện thoại không được để trống!");
  if (!/^[0-9]{9,11}$/.test(phone))
    return alert("Số điện thoại phải từ 9-11 chữ số!");
  if (!email) return alert("Email không được để trống!");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return alert("Email không hợp lệ!");

  const contact = { name, phone, email };

  if (editIndex === -1) {
    contacts.push(contact);
    alert("Thêm danh bạ thành công!");
  } else {
    contacts[editIndex] = contact;
    editIndex = -1;
    btnAdd.textContent = "Thêm";
    alert("Cập nhật danh bạ thành công!");
  }

  form.reset();
  renderContacts();
});

// Sửa danh bạ
function editContact(index) {
  const c = contacts[index];
  document.getElementById("contact-name").value = c.name;
  document.getElementById("contact-phone").value = c.phone;
  document.getElementById("contact-email").value = c.email;
  btnAdd.textContent = "Cập nhật";
  editIndex = index;
}

// Xóa danh bạ
function deleteContact(index) {
  if (confirm("Bạn có chắc chắn muốn xóa danh bạ này?")) {
    contacts.splice(index, 1);
    alert("Xóa danh bạ thành công!");
    renderContacts();
  }
}

// Khi trang load: lấy dữ liệu mẫu và render lại
window.onload = function () {
  loadInitialData();
  renderContacts();
};
