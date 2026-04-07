function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* SEARCH */
const data = [
  {name: "Brand A", status: "Pending", type: "Word"},
  {name: "Logo X", status: "Approved", type: "Logo"}
];

function searchData() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const status = document.getElementById("statusFilter").value;
  const type = document.getElementById("typeFilter").value;

  const results = data.filter(item =>
    item.name.toLowerCase().includes(query) &&
    (!status || item.status === status) &&
    (!type || item.type === type)
  );

  const list = document.getElementById("results");
  list.innerHTML = "";

  results.forEach(r => {
    const li = document.createElement("li");
    li.textContent = `${r.name} - ${r.status} - ${r.type}`;
    list.appendChild(li);
  });
}

/* CARD SELECTION */
let selectedType = null;

function selectType(event, type) {
  selectedType = type;

  document.querySelectorAll(".card").forEach(card => {
    card.classList.remove("selected");
  });

  event.currentTarget.classList.add("selected");

  document.getElementById("autosaveStatus").textContent = "Auto-saved just now";
  localStorage.setItem("draftType", type);
}

/* NEXT STEP */
function nextStep() {
  if (!selectedType) {
    alert("Please select a type first");
    return;
  }

  alert("Proceeding with: " + selectedType);
}

/* LOAD DRAFT */
function loadDraft() {
  const saved = localStorage.getItem("draftType");

  if (!saved) {
    alert("No draft found");
    return;
  }

  showSection("form");

  document.querySelectorAll(".card").forEach(card => {
    if (card.innerText.toLowerCase().includes(saved.toLowerCase())) {
      card.classList.add("selected");
      selectedType = saved;
    }
  });
}

/* PAYMENT */
function payNow() {
  document.getElementById("paymentMessage").textContent = "Payment Successful!";
  localStorage.removeItem("payment");
}

function savePayment() {
  localStorage.setItem("payment", "pending");
  document.getElementById("paymentMessage").textContent = "Payment saved. Resume later.";
  document.getElementById("paymentStatus").textContent = "1 pending payment";
}

/* INIT */
window.onload = () => {
  showSection("dashboard");

  if (localStorage.getItem("draftType")) {
    document.getElementById("draftStatus").textContent = "1 draft available";
  }

  if (localStorage.getItem("payment")) {
    document.getElementById("paymentStatus").textContent = "1 pending payment";
  }
};