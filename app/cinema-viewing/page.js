"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CinemaViewingPage() {
  const [viewings, setViewings] = useState([]);
  const [form, setForm] = useState({
    MovieId: "",
    SalonId: "",
    TimeAndDate: "",
    Price: "",
    PlaceQuantity: "",
    Premiere: "",
  });

  useEffect(() => {
    fetch("http://localhost:5204/CinemaViewing")
      .then((res) => res.json())
      .then((data) => setViewings(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();


    const formattedForm = {
      MovieId: parseInt(form.MovieId),
      SalonId: parseInt(form.SalonId),
      TimeAndDate: new Date(form.TimeAndDate).toISOString(),
      Price: parseFloat(form.Price),
      PlaceQuantity: parseInt(form.PlaceQuantity),
      Premiere: form.Premiere,
    };

    await fetch("http://localhost:5204/CinemaViewing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedForm),
    });

    setForm({
      MovieId: "",
      SalonId: "",
      TimeAndDate: "",
      Price: "",
      PlaceQuantity: "",
      Premiere: "",
    });

    const res = await fetch("http://localhost:5204/CinemaViewing");
    setViewings(await res.json());
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5204/CinemaViewing/${id}`, {
      method: "DELETE",
    });
    const res = await fetch("http://localhost:5204/CinemaViewing");
    setViewings(await res.json());
  };

  return (
    <div className="min-h-screen p-8 sm:p-20 bg-white text-black dark:bg-[#121212] dark:text-white">
      <h1 className="text-2xl font-bold mb-8">cinema screenings</h1>

      <form onSubmit={handleSubmit} className="mb-10 grid gap-4 max-w-md">
        <input
          type="number"
          placeholder="Movie ID"
          value={form.MovieId}
          onChange={(e) => setForm({ ...form, MovieId: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Salon ID"
          value={form.SalonId}
          onChange={(e) => setForm({ ...form, SalonId: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="datetime-local"
          placeholder="Time and Date"
          value={form.TimeAndDate}
          onChange={(e) => setForm({ ...form, TimeAndDate: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={form.Price}
          onChange={(e) => setForm({ ...form, Price: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Place Quantity"
          value={form.PlaceQuantity}
          onChange={(e) => setForm({ ...form, PlaceQuantity: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Premiere (Year)"
          value={form.Premiere}
          onChange={(e) => setForm({ ...form, Premiere: e.target.value })}
          className="p-2 border rounded"
          required
        />

        <button type="submit" className="bg-[#2c5364] text-white py-2 rounded hover:opacity-90">
          Add Viewing
        </button>
      </form>

      <ul className="space-y-4">
        {viewings.map((viewing) => (
          <li
            key={viewing.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p><strong>Movie ID:</strong> {viewing.movieId}</p>
              <p><strong>Salon Number:</strong> {viewing.salonId}</p>
              <p><strong>Screening Date and Time:</strong> {new Date(viewing.timeAndDate).toLocaleString()}</p>
              <p><strong>Price:</strong> {viewing.price}</p>
              <p><strong>Number of Seats:</strong> {viewing.placeQuantity}</p>
              <p><strong>Premiere:</strong> {viewing.premiere}</p>
            </div>
            <button
              onClick={() => handleDelete(viewing.id)}
              className="bg-[#2c5364] text-white py-1 px-3 rounded hover:opacity-90"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <Link href="/">
          <button className="bg-[#2c5364] text-white py-2 px-4 rounded hover:opacity-90">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
