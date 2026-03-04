import { useState } from "react";

export default function AddEditContactModal({ close, save, contact }) {
  const [form, setForm] = useState({
    id: contact?.id || Date.now(),
    name: contact?.name || "",
    email: contact?.email || "",
    mobile: contact?.mobile || "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim() || !form.mobile.trim() || !form.email.) {
      alert("All fields required");
      return;
    }

    save(form);
    close();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-75">
        <h2 className="text-lg mb-4">
          {contact ? "Edit Contact" : "Add Contact"}
        </h2>

        <input
          className="input"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          className="input"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          className="input"
          placeholder="Mobile"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
        />

        <div className="flex gap-3 mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded"
            type="submit"
          >
            {contact ? "Update" : "Submit"}
          </button>

          <button
            className="bg-gray-400 px-4 py-1 rounded"
            type="button"
            onClick={close}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
