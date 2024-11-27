import { useState } from 'react';

export default function TitleInputBox({ onTitleChange }) {
  const [value, setvalue] = useState('');

  function handlechange(e) {
    setvalue(e.target.value);
    onTitleChange(e.target.value);
  }

  return (
    <>
      <div>
        <h3 className="titleinput-header">Title:-</h3>
        <div className="titleinput-content">
          <input
            name="title"
            value={value}
            onChange={handlechange}
            type="text"
            placeholder="Title"
          />
        </div>
      </div>
    </>
  );
}
