import React from "react";

export default function ContactDetailsModal({ contact, close }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center overflow-hidden">
      <div className="bg-white p-6 rounded w-[300px] max-h-[90vh] overflow-y-auto overflow-hidden">
        <h2 className="text-lg font-semibold mb-3">Contact Details</h2>
        <p>
          <span className="font-medium">Name:</span> {contact.name}
        </p>
        <p>
          <span className="font-medium">Email:</span> {contact.email}
        </p>
        <p>
          <span className="font-medium">Phone:</span> {contact.mobile}
        </p>
        <p className="break-words overflow-hidden">
          <span className="font-medium">Address:</span>{" "}
          {contact.address || "N/A"}
        </p>
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
