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

document.getElementById("addScheduleForm").addEventListener("submit", (e) => {
  e.preventDefault();
  addScheduleRequest();
});

function addScheduleRequest() {
  const event_name = document.getElementById("event_name").value;
  const created_at = document.getElementById("created_at").value;

  const data =
    "event_name=" +
    encodeURIComponent(event_name) +
    "&created_at=" +
    encodeURIComponent(created_at);

  const req = new XMLHttpRequest();

  req.onload = function () {
    if (req.status == 200) {
      const resp = JSON.parse(req.responseText);

      if (resp.status == "success") {
        window.location.href = "/app/schedules";
      }
    }
  };

  req.open("POST", "../api/schedules.php", true);
  req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  req.send(data);
}

document.addEventListener("DOMContentLoaded", () => {
  getSchedules();
});

function getSchedules() {
  const req = new XMLHttpRequest();

  req.onload = () => {
    if (req.status == 200) {
      const tbody = document.getElementById("schedules_body");
      const schedules = JSON.parse(req.responseText);

      tbody.innerHTML = "";
      schedules.forEach((schedule) => {
        const tr = document.createElement("tr");
        const date = format(new Date(schedule.created_at), "MMM, dd yyyy");
        const time = format(new Date(schedule.created_at), "hh:mm a");

        tr.innerHTML = `
        <td>${schedule.event_name}</td>
        <td>${date}</td>
        <td>${time}</td>
        `;

        tbody.appendChild(tr);
      });
    }
  };

  req.open("GET", "../api/schedules.php", true);
  req.send();
}
