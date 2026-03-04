import React from "react";
import ContactItem from "./ContactItem";

export default function ContactList({
  contacts,
  deleteContact,
  setSelected,
  setShowEdit,
  setShowDetails,
}) {
  return (
    <div className="space-y-3">
      {contacts.map((contact, index) => (
        <ContactItem
          key={contact.id}
          index={index}
          contact={contact}
          deleteContact={deleteContact}
          setSelected={setSelected}
          setShowEdit={setShowEdit}
          setShowDetails={setShowDetails}
        />
      ))}
    </div>
  );
}
