import { useEffect, useState } from 'react';

import { FilterList } from './components/FilterList';
import { AddNewContactForm } from './components/AddNewContact';
import { ContacList } from './components/ContactList';
import { Notification } from './components/Notification';

import contactService from './services/contact.service';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [showFilteredPersons, setShowFilteredPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationClass, setNotificationClass] = useState('');

  useEffect(() => {
    contactService.getContactList().then(data => {
      setPersons(data);
      setShowFilteredPersons(data);
    });
  }, []);

  const handleNameInput = event => {
    setNewName(event.target.value);
  };

  const handlePhoneInput = event => {
    setNewPhone(event.target.value);
  };

  const handleNewContact = event => {
    event.preventDefault();

    const newContact = {
      name: newName,
      phone: newPhone,
    };

    for (const person of persons) {
      if (person.name === newContact.name) {
        if (
          window.confirm(
            `${newContact.name} it's already added.
             Do you want to update the current number ${person.phone} 
             with the new one: ${newContact.phone}`
          )
        ) {
          contactService
            .updateContact(person.id, newContact)
            .then(() => {
              setPersons(prevPersons =>
                prevPersons.map(p => (p.id === person.id ? newContact : p))
              );
              setNotificationMessage(`${newName} modified`);
              setTimeout(() => {
                setNotificationMessage(null);
              }, 3000);
            })
            .catch(error => {
              setNotificationMessage(
                `Information of ${newName} has already been remove from the server`
              );

              setNotificationClass('error');

              setTimeout(() => {
                setNotificationMessage(null);
                setNotificationClass('');
              }, 4000);

              setPersons(persons.filter(p => p.id !== person.id));
            });

          setNewName('');
          setNewPhone('');
        }
        return;
      } else if (person.phone === newContact.phone) {
        return alert(
          `// ${newContact.phone} // is already added to phonebook,
           and it's assigned to ${person.name}`
        );
      }
    }

    contactService
      .addContact(newContact)
      .then(response =>
        setPersons(prevPersons => prevPersons.concat(response))
      );

    setNotificationMessage(`Added ${newName}`);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 3000);

    setNewName('');
    setNewPhone('');
  };

  const handleDeleteContact = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      contactService.deleteContact(id);
      setPersons(persons.filter(person => person.id !== id));
    }
  };

  const onFilter = event => {
    const filterValue = event.target.value;
    const filteredPersons = persons.filter(person =>
      person.name.toLowerCase().includes(filterValue.toLowerCase())
    );
    setShowFilteredPersons(filteredPersons);
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <FilterList handleFilter={onFilter} />

      <h2>Add new</h2>
      {notificationMessage !== null ? (
        <Notification
          message={notificationMessage}
          notificationClass={notificationClass}
        />
      ) : null}
      <AddNewContactForm
        handleNewContact={handleNewContact}
        newName={newName}
        newPhone={newPhone}
        handleNameInput={handleNameInput}
        handlePhoneInput={handlePhoneInput}
      />

      <h2>Contacts</h2>
      <ContacList
        persons={persons}
        showFilteredPersons={showFilteredPersons}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
