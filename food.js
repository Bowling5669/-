const tableContainer = document.getElementById("tablesContainer");
const reservations = JSON.parse(localStorage.getItem("reservations")) || {};
const popup = document.getElementById("popup");
const resName = document.getElementById("resName");
const resDate = document.getElementById("resDate");
const resTime = document.getElementById("resTime");
const popupTableId = document.getElementById("popupTableId");

let selectedTableId = null;

const images = [
  "https://media.istockphoto.com/id/936385254/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%9E%E0%B8%93%E0%B8%B5%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B8%A0%E0%B8%B2%E0%B8%84%E0%B9%80%E0%B8%AB%E0%B8%99%E0%B8%B7%E0%B8%AD-%E0%B8%9A%E0%B8%99%E0%B9%82%E0%B8%95%E0%B9%8A%E0%B8%B0%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B8%A1%E0%B8%B8%E0%B8%A1%E0%B8%A1%E0%B8%AD%E0%B8%87%E0%B8%94%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%9A%E0%B8%99.jpg?s=612x612&w=0&k=20&c=7p2pOSsj2O4s1m823gGnrI63UuLK_hPTGQqQqznTSDY=",
  "https://media.istockphoto.com/id/474337754/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=5elexhcAODWJ4OJkOGJR3FqceCiqwIpg8YOV90TsuXM=",
  "https://media.istockphoto.com/id/506434706/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%8B%E0%B8%B9%E0%B8%8A%E0%B8%B4%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%95%E0%B8%8B%E0%B8%B2%E0%B8%8A%E0%B8%B4%E0%B8%A1%E0%B8%B4%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%8B%E0%B8%B9%E0%B8%8A%E0%B8%B4%E0%B9%82%E0%B8%A3%E0%B8%A5.jpg?s=1024x1024&w=is&k=20&c=e2X7VWz38hW-5LbBwGXzNq6NLhbXY303T4i3TOdu92c=",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeZ0MURW8IScUeU5wTta_5G0MZnVFz5uZXpg&s",
  "https://media.istockphoto.com/id/816802380/photo/fisheye-photo-of-restaurant-dining-table.jpg"
];

const prices = [499, 599, 799, 899, 999];
const menus = [
  "เซ็ตอาหารไทย",
  "เซ็ตอาหารอีสาน",
  "เซ็ตอาหารญี่ปุ่น",
  "เซ็ตอาหารอิตาเลียน",
  "เซ็ตอาหารนานาชาติ"
];

for (let i = 1; i <= 20; i++) {
  const row = Math.ceil(i / 5);
  const table = document.createElement("div");
  table.className = `table row-${row}`;
  table.dataset.id = i;

  const img = document.createElement("img");
  img.src = images[row - 1];

  const name = document.createElement("h3");
  name.textContent = `โต๊ะ ${i}`;

  const price = document.createElement("p");
  price.textContent = `ราคา: ฿${prices[row - 1]}`;

  const menu = document.createElement("p");
  menu.textContent = `ชุด: ${menus[row - 1]}`;

  const btn = document.createElement("button");
  const info = document.createElement("p");

  if (reservations[i]) {
    btn.textContent = "จองแล้ว";
    btn.disabled = true;
    info.textContent = `โดย ${reservations[i].name} วันที่ ${reservations[i].date} เวลา ${reservations[i].time}`;
  } else {
    btn.textContent = "จองโต๊ะ";
    btn.onclick = () => {
      selectedTableId = i;
      popupTableId.textContent = i;
      popup.style.display = "block";
    };
  }

  table.append(img, name, price, menu, btn, info);
  tableContainer.appendChild(table);
}

function closePopup() {
  popup.style.display = "none";
  resName.value = "";
  resDate.value = "";
  resTime.value = "";
}

function submitReservation() {
  const name = resName.value.trim();
  const date = resDate.value.trim();
  const time = resTime.value.trim();

  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (!name) return alert("กรุณากรอกชื่อ");
  if (!datePattern.test(date)) return alert("วันที่ไม่ถูกต้อง (ตัวอย่าง: 2025-08-01)");
  if (!timePattern.test(time)) return alert("เวลาไม่ถูกต้อง (ตัวอย่าง: 18:00)");

  reservations[selectedTableId] = { name, date, time };
  localStorage.setItem("reservations", JSON.stringify(reservations));
  closePopup();
  location.reload();
}

document.getElementById("adminBtn").addEventListener("click", () => {
  window.location.href = "admin.html";
});
