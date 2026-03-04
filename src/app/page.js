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
      contact.first_name.toLowerCase().includes(search.toLowerCase()) ||
      contact.last_name.toLowerCase().includes(search.toLowerCase()) ||
      contact.phone.includes(search),
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
    <div className="">
      <div className="">
        <div className="">
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
    </div>
  );
}
