const modals = document.querySelectorAll("[data-modal]");

modals.forEach(function (trigger) {
  trigger.addEventListener("click", function (event) {
    event.preventDefault();
    const modal = document.getElementById(trigger.dataset.modal);
    modal.classList.add("open");
    const exits = modal.querySelectorAll(".modal-exit");
    exits.forEach(function (exit) {
      exit.addEventListener("click", function (event) {
        event.preventDefault();
        modal.classList.remove("open");
      });
    });
  });
});

document.getElementById("addRecordForm").addEventListener("submit", (e) => {
  e.preventDefault();
  addRecordRequest();
});

function addRecordRequest() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const productName = document.getElementById("product_name").value;

  const data =
    "title=" +
    encodeURIComponent(title) +
    "&description=" +
    encodeURIComponent(description) +
    "&product_name=" +
    encodeURIComponent(productName);

  const req = new XMLHttpRequest();

  req.onload = function () {
    if (req.status == 200) {
      const resp = JSON.parse(req.responseText);

      if (resp.status == "success") {
        window.location.href = "/app/records";
      }
    }
  };

  req.open("POST", "../api/records.php", true);
  req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  req.send(data);
}

document.addEventListener("DOMContentLoaded", () => {
  getRecords();
});

function getRecords() {
  const req = new XMLHttpRequest();

  req.onload = () => {
    if (req.status == 200) {
      const tbody = document.getElementById("records_body");
      const records = JSON.parse(req.responseText);
      console.log(records);
      tbody.innerHTML = "";
      records.forEach((record) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
        <td>${record.title}</td>
        <td>${record.description}</td>
        <td>${record.product_name}</td>
        <td>${record.created_at}</td>
        `;

        tbody.appendChild(tr);
      });
    }
  };

  req.open("GET", "../api/records.php", true);
  req.send();
}
