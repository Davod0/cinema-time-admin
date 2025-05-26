"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({
    Title: "",
    Description: "",
    Genre: "",
    AgeLimit: "",
    Language: "",
    UnderText: "",
    Actors: "",
    Direction: "",
    ReleaseDate: "",
    Time: "",
    ImageUrl: ""
  });

  useEffect(() => {
    fetch("http://localhost:5204/movie")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedForm = {
      ...form,
      AgeLimit: parseInt(form.AgeLimit),
      Actors: form.Actors.split(",").map((a) => a.trim()),
      Direction: form.Direction.split(",").map((d) => d.trim()),
      ReleaseDate: new Date(form.ReleaseDate).toISOString().split("T")[0],
      Time: form.Time,
      ImageUrl: form.ImageUrl || null,
    };

    await fetch("http://localhost:5204/movie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedForm),
    });

    setForm({
      Title: "",
      Description: "",
      Genre: "",
      AgeLimit: "",
      Language: "",
      UnderText: "",
      Actors: "",
      Direction: "",
      ReleaseDate: "",
      Time: "",
      ImageUrl: ""
    });

    const res = await fetch("http://localhost:5204/movie");
    setMovies(await res.json());
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5204/movie/${id}`, {
      method: "DELETE",
    });
    const res = await fetch("http://localhost:5204/movie");
    setMovies(await res.json());
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

      <h1 className="text-2xl font-bold mb-8">Movies</h1>

      <form onSubmit={handleSubmit} className="mb-10 grid gap-4 max-w-xl">
        <input type="text" placeholder="Title" value={form.Title} onChange={(e) => setForm({ ...form, Title: e.target.value })} className="p-2 border rounded" required />
        <textarea placeholder="Description" value={form.Description} onChange={(e) => setForm({ ...form, Description: e.target.value })} className="p-2 border rounded" required />
        <input type="text" placeholder="Genre" value={form.Genre} onChange={(e) => setForm({ ...form, Genre: e.target.value })} className="p-2 border rounded" required />
        <input type="number" placeholder="Age Limit" value={form.AgeLimit} onChange={(e) => setForm({ ...form, AgeLimit: e.target.value })} className="p-2 border rounded" required />
        <input type="text" placeholder="Language" value={form.Language} onChange={(e) => setForm({ ...form, Language: e.target.value })} className="p-2 border rounded" required />
        <input type="text" placeholder="UnderText" value={form.UnderText} onChange={(e) => setForm({ ...form, UnderText: e.target.value })} className="p-2 border rounded" required />
        <input type="text" placeholder="Actors (comma separated)" value={form.Actors} onChange={(e) => setForm({ ...form, Actors: e.target.value })} className="p-2 border rounded" required />
        <input type="text" placeholder="Direction (comma separated)" value={form.Direction} onChange={(e) => setForm({ ...form, Direction: e.target.value })} className="p-2 border rounded" required />
        <input type="date" placeholder="Release Date" value={form.ReleaseDate} onChange={(e) => setForm({ ...form, ReleaseDate: e.target.value })} className="p-2 border rounded" required />
        <input type="time" step="1" placeholder="Time (hh:mm:ss)" value={form.Time} onChange={(e) => setForm({ ...form, Time: e.target.value })} className="p-2 border rounded" required />
        <input type="url" placeholder="Image URL" value={form.ImageUrl} onChange={(e) => setForm({ ...form, ImageUrl: e.target.value })} className="p-2 border rounded" required />
        <button type="submit" className="bg-[#2c5364] text-white py-2 rounded hover:opacity-90">Add Movie</button>
      </form>

      <ul className="space-y-4">
        {movies.map((movie) => (
          <li key={movie.id} className="border p-4 rounded">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {movie.imageUrl && (
                <img src={movie.imageUrl} alt={movie.title} className="w-40 h-auto rounded" />
              )}
              <div className="flex-1">
                <p className="font-semibold text-lg">{movie.title}</p>
                <p><strong>ID:</strong> {movie.id}</p>
                <p>{movie.description}</p>
                <p><strong>Genre:</strong> {movie.genre}</p>
                <p><strong>Age Limit:</strong> {movie.ageLimit}</p>
                <p><strong>Language:</strong> {movie.language}</p>
                <p><strong>UnderText:</strong> {movie.underText}</p>
                <p><strong>Actors:</strong> {movie.actors?.join(", ")}</p>
                <p><strong>Direction:</strong> {movie.direction?.join(", ")}</p>
                <p><strong>Release Date:</strong> {movie.releaseDate}</p>
                <p><strong>Time:</strong> {movie.time}</p>
              </div>
              <button onClick={() => handleDelete(movie.id)} className="bg-[#2c5364] text-white py-1 px-3 rounded self-start hover:opacity-90">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
