// Initiale Checkliste-Daten
const initialItems = [
    { text: 'Fundament legen', status: 'Fertig' },
    { text: 'Wände hochziehen', status: 'In Bau' },
    { text: 'Dach decken', status: 'In Planung' }
];

// Funktion zum Erstellen eines Listenelements
function createListItem(item, index) {
    const li = document.createElement('li');
    li.classList.add('checklist-item');
    li.innerHTML = `
        <span>${item.text} - ${item.status}</span>
        <button onclick="changeStatus(${index})">Status ändern</button>
    `;
    return li;
}

// Funktion zum Anzeigen der Checkliste
function renderChecklist() {
    const checklist = document.getElementById('checklist');
    checklist.innerHTML = '';
    initialItems.forEach((item, index) => {
        const listItem = createListItem(item, index);
        checklist.appendChild(listItem);
    });
}

// Funktion zum Hinzufügen eines neuen Elements
function addNewItem() {
    const text = prompt('Geben Sie den Text des neuen Elements ein:');
    if (text) {
        initialItems.push({ text, status: 'In Planung' });
        renderChecklist();
    }
}

// Funktion zum Ändern des Status eines Elements
function changeStatus(index) {
    const item = initialItems[index];
    const statuses = ['In Planung', 'In Bau', 'Fertig'];
    const currentStatusIndex = statuses.indexOf(item.status);
    const newStatusIndex = (currentStatusIndex + 1) % statuses.length;
    item.status = statuses[newStatusIndex];
    renderChecklist();
}

// Event Listener zum Hinzufügen eines neuen Elements
document.getElementById('add-item').addEventListener('click', addNewItem);

// Initiale Anzeige der Checkliste
renderChecklist();
