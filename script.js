const allowedCodes = ["code123", "ami456", "classe789"]; // Codes valides pour les élèves
const adminPassword = "moncodeadmin"; // Change ceci !

// Dépôt d'idée
const form = document.getElementById('ideaForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const code = document.getElementById('code').value.trim();
    const idea = document.getElementById('idea').value.trim();
    const message = document.getElementById('message');

    if (!allowedCodes.includes(code)) {
      message.textContent = "Code invalide.";
      return;
    }

    const allIdeas = JSON.parse(localStorage.getItem("ideas") || "[]");
    allIdeas.push({ code, idea, date: new Date().toLocaleString() });
    localStorage.setItem("ideas", JSON.stringify(allIdeas));

    message.textContent = "Merci pour votre idée !";
    form.reset();
  });
}

// Admin login et affichage des idées
const adminForm = document.getElementById('adminLogin');
if (adminForm) {
  adminForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const entered = document.getElementById('adminCode').value;
    if (entered !== adminPassword) {
      alert("Code admin incorrect !");
      return;
    }

    document.getElementById('ideasSection').style.display = 'block';
    const ideasList = document.getElementById('ideasList');
    ideasList.innerHTML = "";

    const allIdeas = JSON.parse(localStorage.getItem("ideas") || "[]");

    if (allIdeas.length === 0) {
      ideasList.innerHTML = "<li>Aucune idée pour l'instant.</li>";
      return;
    }

    allIdeas.forEach(entry => {
      const li = document.createElement("li");
      li.textContent = `[${entry.date}] ${entry.code} : ${entry.idea}`;
      ideasList.appendChild(li);
    });
  });
}
