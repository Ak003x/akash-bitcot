import React from "react";

export default function ContactItem({
  index,
  contact,
  deleteContact,
  setSelected,
  setShowEdit,
  setShowDetails,
}) {
  return (
    <div className="bg-white p-3 rounded flex justify-between items-center">
      <div>
        <p className="font-semibold">
          {index + 1}. {contact.name} 
        </p>

        <p>{contact.mobile}</p>
      </div>

      <div className="space-x-2">
        <button
          onClick={() => {
            setSelected(contact);
            setShowDetails(true);
          }}
        >
          👁
        </button>

        <button onClick={() => deleteContact(contact.id)}>🗑</button>

        <button
          onClick={() => {
            setSelected(contact);
            setShowEdit(true);
          }}
        >
          ✏
        </button>
      </div>
    </div>
  );
}
