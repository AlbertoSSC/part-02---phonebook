export const AddNewContactForm = ({
  newName,
  newPhone,
  handleNameInput,
  handlePhoneInput,
  handleNewContact,
}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNameInput} />
      </div>
      <div>
        phone: <input value={newPhone} onChange={handlePhoneInput} />
      </div>
      <div>
        <button type="submit" onClick={handleNewContact}>
          add
        </button>
      </div>
    </form>
  );
};
