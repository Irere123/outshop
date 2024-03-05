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

$(document).ready(() => {
  getRecords();

  $("#addRecordForm").on("submit", (e) => {
    e.preventDefault();

    const title = $("#title").val();
    const description = $("#description").val();
    const productName = $("#product_name").val();

    const formData = { title, description, productName };

    $.ajax("../api/records.php", {
      type: "POST",
      data: formData,
      success: (response) => {
        if (response.status == "success") {
          window.location.href = "/app/records";
        }
      },
    });
  });
});

function getRecords() {
  const tbody = $("#records_body");

  $.ajax("../api/records.php", {
    type: "GET",
    success: (response) => {
      $.each(response, (idx, record) => {
        const tr = $("<tr></tr>");

        tr.html(`
        <td>${record.title}</td>
        <td>${record.description}</td>
        <td>${record.product_name}</td>
        <td>${record.created_at}</td>
        `);

        tbody.append(tr);
      });
    },
  });
}
