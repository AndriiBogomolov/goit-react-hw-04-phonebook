import { useState, useEffect } from 'react';
import Filter from './Filter';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Notification from './Notification';

export function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    if (
      !contacts.find(
        ({ name }) => name.toLocaleLowerCase() === contact.name.toLowerCase()
      )
    ) {
      setContacts(prevContacts => [...prevContacts, contact]);
    } else {
      alert(`${contact.name} is already in contacts.`);
    }
  };
  const findContact = e => {
    setFilter(e.currentTarget.value);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts => contacts.filter(({ id }) => id !== contactId));
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2> Contacts</h2>
      {contacts.length !== 0 && (
        <Filter value={filter} onChange={findContact} />
      )}
      <ContactList contacts={filterContacts()} deleteContact={deleteContact} />
      {contacts.length === 0 && <Notification />}
    </div>
  );
}
