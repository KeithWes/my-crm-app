import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';

const socket = socketIOClient('http://localhost:3000');

function App() {
    const [checklist, setChecklist] = useState([]);
    const [newItemText, setNewItemText] = useState('');

    useEffect(() => {
        socket.on('update-checklist', (updatedChecklist) => {
            setChecklist(updatedChecklist);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const addItem = () => {
        if (newItemText.trim()) {
            socket.emit('add-item', { text: newItemText, status: 'In Planung' });
            setNewItemText('');
        }
    };

    const updateStatus = (id, status) => {
        socket.emit('update-status', { id, status });
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Checklist</h1>
                <ul>
                    {checklist.map(item => (
                        <li key={item.id}>
                            {item.text} - {item.status}
                            <button onClick={() => updateStatus(item.id, 'Fertig')}>Fertig</button>
                            <button onClick={() => updateStatus(item.id, 'In Bau')}>In Bau</button>
                            <button onClick={() => updateStatus(item.id, 'In Planung')}>In Planung</button>
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                />
                <button onClick={addItem}>Add Item</button>
            </header>
        </div>
    );
}

export default App;
