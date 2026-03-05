"use client";
import { useEffect, useState } from "react";

const API_URL =
  "https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json";

export default function useContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    }
    fetchContacts();
  }, []);

  return { contacts, setContacts, loading, error };
}
