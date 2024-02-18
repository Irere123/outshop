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

$("addItemForm").on("submit", (e) => {
  e.preventDefault();
  addItemRequest();
});

function addItemRequest() {
  const item = $("#item").val();
  const category = $("#category").val();
  const price = $("#price").val();
  const quantity = $("quantity").val();

  const formData = { item, price, category, quantity };

  $.ajax("../api/inventory.php", {
    type: "POST",
    data: formData,
    success: (response) => {
      if (response.status == "success") {
        window.location.href = "/app/inv";
      }
    },
  });
}

$(document).ready(() => {
  $.ajax("../api/inventory.php", {
    type: "GET",
    success: (response) => {
      const tbody = $("#inventory_tbody");
      $.each(response, (_idx, item) => {
        const tr = $("<tr></tr>");

        tr.html(`
          <td onclick="push(${item.id})">${item.item}</td>
          <td onclick="push(${item.id})">${item.category}</td>
          <td onclick="push(${item.id})">${item.quantity}</td>
          <td onclick="push(${item.id})">${item.price}</td>
        `);

        tbody.append(tr);
      });
    },
  });
});

function push(id) {
  window.location.href = `inv/detail/index.html?id=${id}`;
}
