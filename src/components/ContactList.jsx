export const ContacList = ({
  persons,
  showFilteredPersons,
  handleDeleteContact,
}) => {
  return (
    <>
      {showFilteredPersons.length === 0 ? (
        <table>
          <tbody>
            {persons.map(person => (
              <tr key={person.name}>
                <td>{person.name}</td>
                <td>{person.phone}</td>
                <td>
                  <button
                    onClick={() => handleDeleteContact(person.id, person.name)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table>
          <tbody>
            {showFilteredPersons.map(person => (
              <tr key={person.name}>
                <td>{person.name}</td>
                <td>{person.phone}</td>
                <td>
                  <button
                    onClick={() => handleDeleteContact(person.id, person.name)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
