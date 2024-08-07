export const Notification = ({ message, notificationClass }) => {
  const notificationBorderStyle = {
    width: 'max-content',
    border: '3px solid green',
    borderRadius: '8px',
    marginBottom: '1rem',
  };

  const legendStyle = {
    fontWeight: 'bold',
    color: 'green',
    padding: '0 0.5rem',
  };

  const textStyle = {
    color: 'green',
  };

  if (notificationClass === 'error') {
    notificationBorderStyle.border = '3px solid red';
    legendStyle.color = 'red';
    textStyle.color = 'red';
  }
  return (
    <div>
      <fieldset style={notificationBorderStyle}>
        <legend style={legendStyle}>Notification</legend>
        <span style={textStyle}>{message}</span>
      </fieldset>
    </div>
  );
};
