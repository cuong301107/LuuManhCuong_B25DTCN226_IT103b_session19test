let contacts = [];
let editIndex = -1;

const form = document.getElementById("contact-form");
const tbody = document.getElementById("contact-tbody");
const btnAdd = document.querySelector(".btn-add");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("contact-name").value.trim();
  const phone = document.getElementById("contact-phone").value.trim();
  const email = document.getElementById("contact-email").value.trim();

  // Validate
  if (!name) return alert("Tên không được để trống!");
  if (name.length < 3) return alert("Tên phải có ít nhất 3 ký tự!");
  if (!phone) return alert("Số điện thoại không được để trống!");
  if (!email) return alert("Email không được để trống!");
  const contact = { name, phone, email };

  if (editIndex === -1) {
    // add
    contacts.push(contact);
    alert("Thêm danh bạ thành công!");
  } else {
    // update
    contacts[editIndex] = contact;
    editIndex = -1;
    btnAdd.textContent = "Thêm";
    alert("Cập nhật danh bạ thành công!");
  }

  form.reset();
  renderContacts();
});

// render
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

// fix
function editContact(index) {
  const c = contacts[index];
  document.getElementById("contact-name").value = c.name;
  document.getElementById("contact-phone").value = c.phone;
  document.getElementById("contact-email").value = c.email;
  btnAdd.textContent = "Cập nhật";
  editIndex = index;
}

// delete
function deleteContact(index) {
  if (confirm("Bạn có chắc chắn muốn xóa danh bạ này?")) {
    contacts.splice(index, 1);
    alert("Xóa danh bạ thành công!");
    renderContacts();
  }
}
