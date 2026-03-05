"use client";
import { useEffect, useState } from "react";

const API_URL =
  "https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json";

export default function useContacts() {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch contacts");
        const data = await res.json();
        setContacts(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchContacts();
  }, []);

  return { contacts, setContacts, error };
}
