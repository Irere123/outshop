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

$("#addItemForm").on("submit", (e) => {
  e.preventDefault();

  const item = $("#item").val();
  const category = $("#category").val();
  const price = $("#price").val();
  const quantity = $("#quantity").val();

  const formData = { item, price, category, quantity };

  $.ajax("../api/inventory.php", {
    type: "POST",
    data: formData,
    success: (response) => {
      console.log(response);
      if (response.status == "success") {
        window.location.href = "/app/inv";
      }
    },
  });
});

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

$(document).ready(function () {
  var rowsPerPage = 5;
  var currentPage = 1;

  showPage(currentPage);

  $("#prev").on("click", function () {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
    }
  });

  $("#next").on("click", function () {
    if (currentPage < totalPages()) {
      currentPage++;
      showPage(currentPage);
    }
  });

  function showPage(page) {
    var startIndex = (page - 1) * rowsPerPage;
    var endIndex = startIndex + rowsPerPage - 1;

    $("#myTable tbody tr")
      .hide()
      .slice(startIndex, endIndex + 1)
      .fadeIn();
  }

  function totalPages() {
    return Math.ceil($("#myTable tbody tr").length / rowsPerPage);
  }
});
