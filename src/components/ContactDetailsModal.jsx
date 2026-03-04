import React from "react";

export default function ContactDetailsModal({ contact, close }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-[300px]">
        <h2 className="text-lg font-semibold mb-3">Contact Details</h2>

        <p>
          Name: {contact.first_name} {contact.last_name}
        </p>
        <p>Email: {contact.email}</p>
        <p>Phone: {contact.phone}</p>
        <p>Address: {contact.address}</p>

        <button
          className="mt-4 bg-gray-500 text-white px-3 py-1 rounded"
          onClick={close}
        >
          Close
        </button>
      </div>
    </div>
  );
}
