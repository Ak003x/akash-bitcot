import { useEffect, useState } from "react";

const API_URL =
  "https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json";
export default function useContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(
    true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
        setLoading(false);
      });
  }, []);

  return { contacts, setContacts, loading };
}
