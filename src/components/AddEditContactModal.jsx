import { useState } from "react";

export default function AddEditContactModal({ close, save, contact }) {
  const [form, setForm] = useState({
    id: contact?.id || Date.now(),
    name: contact?.name || "",
    email: contact?.email || "",
    mobile: contact?.mobile || "",
  });

  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};

    // Name validation
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Mobile validation
    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile is required";
    } else if (!/^\d{10}$/.test(form.mobile)) {
      newErrors.mobile = "Mobile must be exactly 10 digits";
    }

    return newErrors;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error on change
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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

        {/* Name */}
        <div className="mb-2">
          <input
            className={`input ${errors.name ? "border-red-500" : ""}`}
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-2">
          <input
            className={`input ${errors.email ? "border-red-500" : ""}`}
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Mobile */}
        <div className="mb-2">
          <input
            className={`input ${errors.mobile ? "border-red-500" : ""}`}
            placeholder="Mobile"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
          />
          {errors.mobile && (
            <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
          )}
        </div>

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
