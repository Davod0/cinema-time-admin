"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ReservationPage() {
  const [reservations, setReservations] = useState([]);
  const [form, setForm] = useState({
    CinemaViewingId: "",
    Quantity: "",
    Email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5204/reservation");
      const data = await res.json();
      setReservations(data);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5204/reservation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        CinemaViewingId: parseInt(form.CinemaViewingId),
        Quantity: parseInt(form.Quantity),
        Email: form.Email.trim(),
      }),
    });

    const res = await fetch("http://localhost:5204/reservation");
    setReservations(await res.json());

    setForm({
      CinemaViewingId: "",
      Quantity: "",
      Email: "",
    });
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5204/reservation/${id}`, {
      method: "DELETE",
    });

    const res = await fetch("http://localhost:5204/reservation");
    setReservations(await res.json());
  };

  return (
    <div className="min-h-screen p-8 sm:p-20 bg-white text-black dark:bg-[#121212] dark:text-white">
      <div className="mb-4">
        <Link href="/">
          <button className="bg-[#2c5364] text-white py-2 px-4 rounded hover:opacity-90">
            Back to Home
          </button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-8">Reservations</h1>

      <form onSubmit={handleSubmit} className="mb-10 grid gap-4 max-w-md">
        <input
          type="number"
          placeholder="Cinema Viewing ID"
          value={form.CinemaViewingId}
          onChange={(e) => setForm({ ...form, CinemaViewingId: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.Quantity}
          onChange={(e) => setForm({ ...form, Quantity: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.Email}
          onChange={(e) => setForm({ ...form, Email: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="bg-[#2c5364] text-white py-2 rounded hover:opacity-90">
          Make Reservation
        </button>
      </form>

      <ul className="space-y-4">
        {reservations.map((r) => (
          <li
            key={r.id}
            className="border p-4 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div className="space-y-1">
              <p><strong>Reservation ID:</strong> {r.id}</p>
              <p><strong>Cinema Viewing ID:</strong> {r.cinemaViewingId}</p>
              <p><strong>Movie ID:</strong> {r.cinemaViewing?.movieId ?? "N/A"}</p>
              <p><strong>Salon ID:</strong> {r.cinemaViewing?.salonId ?? "N/A"}</p>
              <p>
                <strong>Screening Time:</strong>{" "}
                {r.cinemaViewing?.timeAndDate
                  ? new Date(r.cinemaViewing.timeAndDate).toLocaleString()
                  : "N/A"}
              </p>
              <p><strong>Reserved seats:</strong> {r.quantity}</p>
              <p><strong>Reservation Code:</strong> {r.reservationCode}</p>
              <p><strong>Email:</strong> {r.email}</p>
              <p><strong>Used:</strong> {r.usedRservationCode ? "Yes" : "No"}</p>
            </div>
            <button
              onClick={() => handleDelete(r.id)}
              className="mt-4 sm:mt-0 bg-[#2c5364] text-white py-1 px-3 rounded hover:opacity-90"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
