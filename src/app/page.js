"use client";

import { useState } from "react";
import useContacts from "@/hooks/useContacts";
import ContactList from "@/components/ContactList";
import SearchBar from "@/components/SearchBar";
import AddEditContactModal from "@/components/AddEditContactModal";
import ContactDetailsModal from "@/components/ContactDetailsModal";

export default function Home() {
  const { contacts, setContacts, error } = useContacts();
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selected, setSelected] = useState(null);

  // Filter contacts by name or mobile
  const filteredContacts = contacts.filter(
    (contact) =>
      (contact.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (contact.mobile || "").includes(search),
  );

  // Delete contact by id
  function deleteContact(id) {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  }

  // Add new contact to state
  function addContact(contact) {
    setContacts((prev) => [...prev, contact]);
    setShowAdd(false);
  }

  // Update existing contact in state
  function updateContact(updatedContact) {
    setContacts((prev) =>
      prev.map((c) => (c.id === updatedContact.id ? updatedContact : c)),
    );
    setShowEdit(false);
  }

  // Error state UI
  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 text-lg font-semibold">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-8 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="bg-blue-500 text-center p-3 rounded-md flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">All Contacts</h2>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-white text-blue-600 font-bold w-9 h-9 rounded-full hover:bg-blue-100 active:scale-95 transition cursor-pointer text-xl leading-none shadow-md flex items-center justify-center"
            title="Add Contact"
          >
            +
          </button>
        </div>

        {/* Search Bar */}
        <SearchBar search={search} setSearch={setSearch} />

        {/* Contact Count */}
        <p className="text-sm text-gray-500 mb-2">
          {filteredContacts.length} contact
          {filteredContacts.length !== 1 ? "s" : ""} found
        </p>

        {/* Contact List */}
        {filteredContacts.length === 0 ? (
          <div className="text-center text-gray-400 mt-10 text-sm">
            No contacts found.
          </div>
        ) : (
          <ContactList
            contacts={filteredContacts}
            deleteContact={deleteContact}
            setSelected={setSelected}
            setShowEdit={setShowEdit}
            setShowDetails={setShowDetails}
          />
        )}

        {/* Add Contact Modal */}
        {showAdd && (
          <AddEditContactModal
            close={() => setShowAdd(false)}
            save={addContact}
          />
        )}

        {/* Edit Contact Modal */}
        {showEdit && selected && (
          <AddEditContactModal
            close={() => setShowEdit(false)}
            save={updateContact}
            contact={selected}
          />
        )}

        {/* View Contact Details Modal */}
        {showDetails && selected && (
          <ContactDetailsModal
            contact={selected}
            close={() => setShowDetails(false)}
          />
        )}
      </div>
    </div>
  );
}
