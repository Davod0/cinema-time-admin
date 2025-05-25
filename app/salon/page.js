"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SalonPage() {
  const [salons, setSalons] = useState([]);
  const [form, setForm] = useState({ Name: "", Nummber: "", ChairQuantity: "" });

  useEffect(() => {
    fetch("http://localhost:5204/salon")
      .then((res) => res.json())
      .then((data) => setSalons(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5204/salon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ Name: "", Nummber: "", ChairQuantity: "" });
    const res = await fetch("http://localhost:5204/salon");
    setSalons(await res.json());
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5204/salon/${id}`, {
      method: "DELETE",
    });
    const res = await fetch("http://localhost:5204/salon");
    setSalons(await res.json());
  };

  return (
    <div className="min-h-screen p-8 sm:p-20 bg-white text-black dark:bg-[#121212] dark:text-white">
      <div className="mb-6">
        <Link href="/">
          <button className="bg-[#2c5364] text-white py-2 px-4 rounded hover:opacity-90">
            Back to Home
          </button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-8">Salons</h1>

      <form onSubmit={handleSubmit} className="mb-10 grid gap-4 max-w-md">
        <input
          type="text"
          placeholder="Name"
          value={form.Name}
          onChange={(e) => setForm({ ...form, Name: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Number"
          value={form.Nummber}
          onChange={(e) => setForm({ ...form, Nummber: parseInt(e.target.value) })}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Number of Chairs"
          value={form.ChairQuantity}
          onChange={(e) => setForm({ ...form, ChairQuantity: parseInt(e.target.value) })}
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="bg-[#2c5364] text-white py-2 rounded hover:opacity-90">
          Add Salon
        </button>
      </form>

      <ul className="space-y-4">
        {salons.map((salon) => (
          <li key={salon.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{salon.name}</p>
              <p>Number: {salon.nummber}</p>
              <p>Chairs: {salon.chairQuantity}</p>
            </div>
            <button
              onClick={() => handleDelete(salon.id)}
              className="bg-[#2c5364] text-white py-1 px-3 rounded hover:opacity-90"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
