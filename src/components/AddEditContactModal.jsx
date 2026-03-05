import { useState } from "react";

export default function AddEditContactModal({ close, save, contact }) {
  const [form, setForm] = useState({
    id: contact?.id || Date.now(),
    name: contact?.name || "",
    email: contact?.email || "",
    mobile: contact?.mobile || "",
    address: contact?.address || "",
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

    // Address validation
    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    } else if (form.address.trim().length < 5) {
      newErrors.address = "Address must be at least 5 characters";
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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-[340px] max-h-[90vh] overflow-y-auto shadow-lg"
      >
        {/* Header */}
        <h2 className="text-lg font-semibold text-gray-800 mb-5 pb-2 border-b border-gray-200">
          {contact ? "Edit Contact" : "Add Contact"}
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="text-xs font-medium text-gray-500 mb-1 block">
            Name
          </label>
          <input
            className={`input ${errors.name ? "border-red-400" : "border-gray-300"}`}
            placeholder="Enter name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-xs font-medium text-gray-500 mb-1 block">
            Email
          </label>
          <input
            className={`input ${errors.email ? "border-red-400" : "border-gray-300"}`}
            placeholder="Enter email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Mobile */}
        <div className="mb-4">
          <label className="text-xs font-medium text-gray-500 mb-1 block">
            Mobile
          </label>
          <input
            className={`input ${errors.mobile ? "border-red-400" : "border-gray-300"}`}
            placeholder="Enter 10-digit mobile"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
          />
          {errors.mobile && (
            <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
          )}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="text-xs font-medium text-gray-500 mb-1 block">
            Address
          </label>
          <textarea
            className={`input resize-none ${errors.address ? "border-red-400" : "border-gray-300"}`}
            placeholder="Enter address"
            name="address"
            rows={3}
            value={form.address}
            onChange={handleChange}
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
            type="submit"
          >
            {contact ? "Update" : "Submit"}
          </button>
          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-5 py-2 rounded-lg text-sm font-medium transition"
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