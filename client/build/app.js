document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    const checklistElement = document.getElementById('checklist');
    const newItemText = document.getElementById('new-item-text');
    const addItemButton = document.getElementById('add-item-button');

    socket.on('update-checklist', (checklist) => {
        checklistElement.innerHTML = '';
        checklist.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.text} (${item.status})`;
            checklistElement.appendChild(li);
        });
    });

    addItemButton.addEventListener('click', () => {
        const text = newItemText.value;
        if (text) {
            socket.emit('add-item', { text, status: 'In Planung' });
            newItemText.value = '';
        }
    });
});
