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

document.getElementById("addItemForm").addEventListener("submit", (e) => {
  e.preventDefault();
  addItemRequest();
});

function addItemRequest() {
  const item = document.getElementById("item").value;
  const category = document.getElementById("category").value;
  const price = document.getElementById("price").value;
  const quantity = document.getElementById("quantity").value;

  const data =
    "item=" +
    encodeURIComponent(item) +
    "&category=" +
    encodeURIComponent(category) +
    "&price=" +
    encodeURIComponent(price) +
    "&quantity=" +
    encodeURIComponent(quantity);

  const req = new XMLHttpRequest();

  req.onload = function () {
    if (req.status == 200) {
      const resp = JSON.parse(req.responseText);

      if (resp.status == "success") {
        window.location.href = "/app/inv";
      }
    }
  };

  req.open("POST", "../api/inventory.php", true);
  req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  req.send(data);
}

document.addEventListener("DOMContentLoaded", () => {
  getInventory();
});

function getInventory() {
  const req = new XMLHttpRequest();

  req.onload = () => {
    if (req.status == 200) {
      const tbody = document.getElementById("inventory_tbody");
      const items = JSON.parse(req.responseText);
      tbody.innerHTML = "";
      items.forEach((item) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
        <td onclick="push(${item.id})">${item.item}</td>
        <td onclick="push(${item.id})">${item.category}</td>
        <td onclick="push(${item.id})">${item.quantity}</td>
        <td onclick="push(${item.id})">${item.price}</td>
        `;

        tbody.appendChild(tr);
      });
    }
  };

  req.open("GET", "../api/inventory.php", true);
  req.send();
}

function push(id) {
  window.location.href = `inv/detail/index.html?id=${id}`;
}
