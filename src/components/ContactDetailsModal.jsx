import { useEffect } from "react";

export default function ContactDetailsModal({ contact, close }) {
  // ESC to close
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [close]);

  //Copy to clipboard
  function copyText(text) {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  }

  const initials = (contact.name || "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    // Backdrop click closes
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4"
      onClick={close}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/*  Header with avatar */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white text-center">
          <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center text-2xl font-bold mx-auto mb-2">
            {initials}
          </div>
          <h2 className="text-xl font-bold">{contact.name}</h2>
        </div>

        <div className="p-5 space-y-3">
          {/*  Each row with copy button */}
          {[
            { label: "📧 Email", value: contact.email },
            { label: "📱 Mobile", value: contact.mobile },
            { label: "📍 Address", value: contact.address || "N/A" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex justify-between items-start bg-gray-50 rounded-lg p-3"
            >
              <div>
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-sm font-medium text-gray-700 break-all">
                  {value}
                </p>
              </div>
              {value !== "N/A" && (
                <button
                  onClick={() => copyText(value)}
                  title="Copy"
                  className="text-gray-400 hover:text-blue-500 text-xs ml-2 cursor-pointer"
                >
                  📋
                </button>
              )}
            </div>
          ))}

          <button
            onClick={close}
            className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
