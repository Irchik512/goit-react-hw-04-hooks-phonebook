import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Notification from './Notification/Notification';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const formSubmitHandler = (name, number) => {
    const newContact = { name, number, id: nanoid() };
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
    } else {
      setContacts(prevState => [newContact, ...prevState]);
    }
  };

  const inputChangeHandle = evt => setFilter(evt.currentTarget.value);

  const delButtonClickHandle = contactId =>
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );

  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  useEffect(() => {
    const savedContact = JSON.parse(localStorage.getItem('contacts'));
    if (savedContact) {
      setContacts(savedContact);
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <Section>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={formSubmitHandler} />
      </Section>
      <Section>
        <h2>Contacts</h2>
        {contacts.length < 1 ? (
          <Notification message="There is no contact yet." />
        ) : (
          <>
            <Filter value={filter} onChange={inputChangeHandle} />
            <ContactList
              contacts={filteredContacts()}
              onClick={delButtonClickHandle}
            />
          </>
        )}
      </Section>
    </>
  );
}
