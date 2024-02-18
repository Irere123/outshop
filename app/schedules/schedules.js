import { format } from "https://cdn.jsdelivr.net/npm/date-fns@3.3.1/+esm";

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
  $("#addScheduleForm").on("submit", (e) => {
    e.preventDefault();

    const event_name = $("#event_name").val();
    const created_at = $("#created_at").val();

    const formData = { event_name, created_at };

    $.ajax("../api/schedules.php", {
      type: "POST",
      data: formData,
      success: (response) => {
        if (response.status == "success") {
          window.location.href = "/app/schedules";
        }
      },
    });
  });

  getSchedules();
});

function getSchedules() {
  $.ajax("../api/schedules.php", {
    type: "GET",
    success: (response) => {
      const tbody = $("#schedules_body");

      $.each(response, (_index, schedule) => {
        const tr = $("<tr></tr>");
        const date = format(new Date(schedule.created_at), "MMM, dd yyyy");
        const time = format(new Date(schedule.created_at), "hh:mm a");

        tr.html(`
          <td>${schedule.event_name}</td>
          <td>${date}</td>
          <td>${time}</td>
        `);

        tbody.append(tr);
      });
    },
  });
}
