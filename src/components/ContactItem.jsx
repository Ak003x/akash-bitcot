export default function ContactItem({
  index,
  contact,
  deleteContact,
  setSelected,
  setShowEdit,
  setShowDetails,
}) {
  //  Avatar initials
  const initials = (contact.name || "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const colors = [
    "bg-blue-400",
    "bg-green-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-yellow-400",
  ];
  const color = colors[contact.id % colors.length] || "bg-blue-400";

  return (
    <div className="bg-white px-4 py-3 rounded-xl flex justify-between items-center shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3">
        {/*  Avatar */}
        <div
          className={`${color} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm`}
        >
          {initials}
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-sm">
            {index + 1}. {contact.name}
          </p>
          <p className="text-gray-500 text-xs">{contact.mobile}</p>
          {/* Show email  */}
          <p className="text-gray-400 text-xs">{contact.email}</p>
        </div>
      </div>

      {/*Buttons with tooltips and hover states */}
      <div className="flex gap-1">
        <button
          title="View Details"
          onClick={() => {
            setSelected(contact);
            setShowDetails(true);
          }}
          className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition cursor-pointer"
        >
          👁
        </button>

        <button
          title="Edit Contact"
          onClick={() => {
            setSelected(contact);
            setShowEdit(true);
          }}
          className="p-2 rounded-lg hover:bg-yellow-50 text-yellow-500 transition cursor-pointer"
        >
          ✏️
        </button>

        <button
          title="Delete Contact"
          onClick={() => deleteContact(contact.id)}
          className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition cursor-pointer"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
