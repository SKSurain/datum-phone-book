import React, { useReducer, useState } from 'react';
import { validatePhoneNumber, validateEmail } from './utils';

const initialState = {
  entries: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ENTRY':
      return { ...state, entries: [...state.entries, action.entry] };
    case 'DELETE_ENTRY':
      return { ...state, entries: state.entries.filter((_, index) => index !== action.index) };
    case 'UPDATE_ENTRY':
      const updatedEntries = [...state.entries];
      updatedEntries[action.index] = action.entry;
      return { ...state, entries: updatedEntries };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleSubmit = (e) => {
    e.preventDefault();

    const entry = {
      firstName: document.querySelector('input[name="name"]').value,
      lastName: document.querySelector('input[name="lastName"]').value,
      phoneNumber: document.querySelector('input[name="phoneNumber"]').value,
      email: document.querySelector('input[name="email"]').value,
      address: document.querySelector('input[name="address"]').value
    };

    if (!validatePhoneNumber(entry.phoneNumber)) {
      alert('Invalid phone number');
      return;
    }

    if (!validateEmail(entry.email)) {
      alert('Invalid email');
      return;
    }

    if (editingIndex >= 0) {
      dispatch({ type: 'UPDATE_ENTRY', index: editingIndex, entry });
    } else {
      dispatch({ type: 'ADD_ENTRY', entry });
    }
    setEditingIndex(-1);
    e.target.reset();
  }

  const handleEdit = (index) => {
    const entry = state.entries[index];
    document.querySelector('input[name="name"]').value = entry.firstName;
    document.querySelector('input[name="lastName"]').value = entry.lastName;
    document.querySelector('input[name="phoneNumber"]').value = entry.phoneNumber;
    document.querySelector('input[name="email"]').value = entry.email;
    document.querySelector('input[name="address"]').value = entry.address;
    setEditingIndex(index);
  }

  return (
    <div>
      <header>

        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input type="text" name="name" />
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName" />
          </label>
          <label>
            Phone Number:
            <input type="text" name="phoneNumber" />
          </label>
          <label>
            Email:
            <input type="text" name="email" />
          </label>
          <label>
            Address:
            <input type="text" name="address" />
          </label>

          <button type='submit'>SUBMIT</button>
        </form>

      </header>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {state.entries.map((entry, index) => (
          <div key={index} style={{ border: '1px solid black', padding: '10px' }}>
            <p>First Name: {entry.firstName}</p>
            <p>Last Name: {entry.lastName}</p>
            <p>Phone Number: {entry.phoneNumber}</p>
            <p>Email: {entry.email}</p>
            <p>Address: {entry.address}</p>
            <button onClick={() => dispatch({ type: 'DELETE_ENTRY', index })}>Delete</button>
            <button onClick={() => handleEdit(index)}>Update</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
