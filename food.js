const tableContainer = document.getElementById("tablesContainer");
const reservations = JSON.parse(localStorage.getItem("reservations")) || {};
const images = [
  "https://media.istockphoto.com/id/1202072198/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B9%82%E0%B8%95%E0%B9%8A%E0%B8%B0%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B9%88%E0%B8%B2%E0%B8%9E%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B9%82%E0%B8%95%E0%B9%8A%E0%B8%B0%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%9A%E0%B8%A5%E0%B8%AD.jpg?s=1024x1024&w=is&k=20&c=oML3uoRaOdR2I7v4LWFi-WR_ryoslscwODHUQXrT6xg=", // row 1
  "https://media.istockphoto.com/id/1457259222/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B9%82%E0%B8%95%E0%B9%8A%E0%B8%B0%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%80%E0%B8%95%E0%B9%87%E0%B8%A1%E0%B9%84%E0%B8%9B%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%94%E0%B8%AB%E0%B8%A5%E0%B8%B2%E0%B8%81%E0%B8%AB%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%AB%E0%B8%A3%E0%B8%B9%E0%B8%AB%E0%B8%A3%E0%B8%B2%E0%B8%97%E0%B8%B1%E0%B8%99%E0%B8%AA%E0%B8%A1%E0%B8%B1%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1.jpg?s=1024x1024&w=is&k=20&c=blFWjBqhOO_tIRz9pqsf7FfV0ZvLmnGRe7BbNH0umWQ=", // row 2
  "https://media.istockphoto.com/id/146027161/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B9%82%E0%B8%95%E0%B9%8A%E0%B8%B0%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B9%80%E0%B8%9B%E0%B8%B4%E0%B8%94%E0%B9%82%E0%B8%A5%E0%B9%88%E0%B8%87%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%8A%E0%B8%B2%E0%B8%A2%E0%B8%AB%E0%B8%B2%E0%B8%94%E0%B8%AA%E0%B8%B5%E0%B8%9F%E0%B9%89%E0%B8%B2%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%AA%E0%B8%A7%E0%B8%A2%E0%B8%87%E0%B8%B2%E0%B8%A1.jpg?s=1024x1024&w=is&k=20&c=hSGBLyFDg6Z2WEuWz2ZSe7Bozn_9XFceprALUIahlE0=", // row 3
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeZ0MURW8IScUeU5wTta_5G0MZnVFz5uZXpg&s", // row 4
  "https://media.istockphoto.com/id/816802380/photo/fisheye-photo-of-restaurant-dining-table.jpg?s=612x612&w=is&k=20&c=BShMm9fnbPydkTXxvotH1F4APFEpNgZyuo-8i1qa8qE=", // row 5
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

  const btn = document.createElement("button");
  const info = document.createElement("p");

  if (reservations[i]) {
    btn.textContent = "จองแล้ว";
    btn.disabled = true;
    info.textContent = `โดย ${reservations[i].name} วันที่ ${reservations[i].date} เวลา ${reservations[i].time}`;
  } else {
    btn.textContent = "จองโต๊ะ";
btn.onclick = () => {
  const name = prompt("ชื่อผู้จอง (ห้ามเว้นว่าง):");
  if (!name || name.trim() === "") {
    alert("กรุณากรอกชื่อให้ถูกต้อง");
    return;
  }

  const date = prompt("วันที่ (รูปแบบ: YYYY-MM-DD):");
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(date)) {
    alert("กรุณากรอกวันที่ให้ถูกต้อง (ตัวอย่าง: 2025-08-01)");
    return;
  }

  const time = prompt("เวลา (รูปแบบ: HH:MM เช่น 18:00):");
  const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timePattern.test(time)) {
    alert("กรุณากรอกเวลาให้ถูกต้อง (ตัวอย่าง: 18:00)");
    return;
  }

  reservations[i] = { name: name.trim(), date, time };
  localStorage.setItem("reservations", JSON.stringify(reservations));
  location.reload();
};


  }

  table.append(img, name, btn, info);
  tableContainer.appendChild(table);
}
document.getElementById("adminBtn").addEventListener("click", () => {
    window.location.href = "admin.html";
    /*
  const pass = prompt("กรุณาใส่รหัสผ่านผู้ดูแล:");
  if (!pass) {
    alert("คุณไม่ได้กรอกรหัสผ่าน");
    return;
  }

  if (pass === "admin123") {
    window.location.href = "admin.html";
  } else {
    alert("รหัสผ่านไม่ถูกต้อง");
  }
  */
});
