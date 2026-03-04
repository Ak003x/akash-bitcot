"use client";
import React, { useState } from "react";
import useContacts from "../hooks/useContacts";
import useContactList from "../components/ContactList";
import SearchBar from "@/components/SearchBar";
import AddEditContactModal from "@/components/AddEditContactModal";
import ContactDetailsModal from "@/components/ContactDetailsModal";
import ContactList from "../components/ContactList";

export default function Home() {
  const { contacts, setContacts } = useContacts();
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selected, setSelected] = useState(null);

  const filteredContacts = contacts.filter(
    (contact) =>
      (contact.name || "").toLowerCase().includes(search.toLowerCase()) || 
      (contact.mobile || "").includes(search), 
  );
  function deleteContact(id) {
    const updated = contacts.filter((c) => c.id !== id);
    setContacts(updated);
  }

  function addContact(contact) {
    setContacts([...contacts, contact]);
  }

  function updateContact(updatedContact) {
    const updated = contacts.map((c) =>
      c.id === updatedContact.id ? updatedContact : c,
    );

    setContacts(updated);
  }

  return (
    <div className="min-h-screen flex justify-center  bg-gray-200">
      <div className="w-100 p-4 rounded-lg">
        <div className="bg-blue-300 text-center p-3 rounded-md flex justify-between">
          <h2 className="text-lg font-semibold">All Contacts</h2>
          <button onClick={() => setShowAdd(true)}>+</button>
        </div>
        <SearchBar search={search} setSearch={setSearch} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={deleteContact}
          setSelected={setSelected}
          setShowEdit={setShowEdit}
          setShowDetails={setShowDetails}
        />
      </div>

      {showAdd && (
        <AddEditContactModal
          close={() => setShowAdd(false)}
          save={addContact}
        />
      )}
      {showEdit && (
        <AddEditContactModal
          close={() => setShowEdit(false)}
          save={updateContact}
          contact={selected}
        />
      )}

      {showDetails && (
        <ContactDetailsModal
          close={() => setShowDetails(false)}
          contact={selected}
        />
      )}
    </div>
  );
}
