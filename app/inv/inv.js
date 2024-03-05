$(document).ready(() => {
  const modals = document.querySelectorAll("[data-modal]");
  const tableBody = document.querySelector("tbody");
  const searchInput = document.getElementById("searchInput");
  const paginationDiv = document.getElementById("pagination");
  const deleteBtn = document.getElementById("deleteBtn");

  let currentPage = 1;
  let rowsPerPage = 4;

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

  function displayData(data) {
    if (data.length) {
      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      const paginatedData = data.slice(startIndex, endIndex);
      tableBody.innerHTML = "";

      paginatedData.forEach((item) => {
        const row = document.createElement("tr");

        row.innerHTML = `
              <td onclick="push(${item.id})">${item.id}</td>
              <td onclick="push(${item.id})">${item.item}</td>
              <td onclick="push(${item.id})">${item.category}</td>
              <td onclick="push(${item.id})">${item.quantity}</td>
              <td onclick="push(${item.id})">${item.price}</td>
              <td><input type="checkbox" class="deleteCheckbox" data-id="${item.id}"></td>
          `;
        tableBody.appendChild(row);
      });
    } else {
      tableBody.innerHTML =
        "<p class='no-data'>There were no records of data in your inventory</p>";
    }
  }

  $("#delete").on("click", () => {
    deleteRows();
  });

  function searchTable() {
    $.ajax({
      url: "../api/inventory.php",
      type: "GET",
      success: (tableData) => {
        const searchText = searchInput.value.toLowerCase();
        const filteredData = tableData.filter((item) => {
          return (
            item.category.toLowerCase().includes(searchText) ||
            item.item.toLowerCase().includes(searchText) ||
            item.quantity.toLowerCase().includes(searchText) ||
            item.price.toLowerCase().includes(searchText)
          );
        });
        displayData(filteredData);
        const totalPages = Math.ceil(filteredData.length / rowsPerPage);
        displayPagination(totalPages);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  function deleteRows() {
    $.ajax({
      url: "../api/inventory.php",
      type: "GET",
      success: (tableData) => {
        const checkboxes = document.querySelectorAll(".deleteCheckbox:checked");
        checkboxes.forEach((checkbox) => {
          const id = parseInt(checkbox.getAttribute("data-id"));
          tableData.splice(
            tableData.findIndex((item) => item.id === id),
            1
          );
          deleteOneRow(id);
        });
        displayData(tableData);
        const totalPages = Math.ceil(tableData.length / rowsPerPage);
        displayPagination(totalPages);
      },
    });
  }

  function deleteOneRow(id) {
    $.ajax({
      url: "../api/inventory.php",
      type: "DELETE",
      data: { id },
    });
  }

  function displayPagination(totalPages) {
    $.ajax({
      url: "../api/inventory.php",
      type: "GET",
      success: (tableData) => {
        paginationDiv.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
          const btn = document.createElement("button");
          btn.innerText = i;
          btn.classList.add("pagination-btn");
          if (i === currentPage) {
            btn.classList.add("active");
          }
          btn.addEventListener("click", function () {
            currentPage = i;
            displayData(tableData);
            displayPagination(totalPages);
          });
          paginationDiv.appendChild(btn);
        }
      },
    });
  }

  $.ajax("../api/inventory.php", {
    type: "GET",
    success: (response) => {
      displayData(response);
      const totalPages = Math.ceil(response.length / rowsPerPage);
      displayPagination(totalPages);
    },
  });

  searchInput.addEventListener("keyup", searchTable);
});

function push(id) {
  window.location.href = `inv/detail/index.html?id=${id}`;
}
