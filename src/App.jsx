import React from "react";
import Card from "./components/Card";

const propertiesParis = [
  {
    title: "Room in Notre Dame",
    price: "$201 for 2 nights",
    rating: "4.93",
    image: "/img/paris1.jpg",
  },
  {
    title: "Apartment in Buttes-Montmartre",
    price: "$149 for 2 nights",
    rating: "5.0",
    image: "/img/paris2.jpg",
  },
  {
    title: "Room in Grenelle",
    price: "$202 for 2 nights",
    rating: "4.94",
    image: "/img/paris3.jpg",
  },
  {
    title: "Condo in Temple",
    price: "$240 for 2 nights",
    rating: "4.75",
    image: "/img/paris4.jpg",
  },
  {
    title: "Room in Gobelins",
    price: "$162 for 2 nights",
    rating: "4.92",
    image: "/img/paris5.jpg",
  },
  {
    title: "Apartment in Passy",
    price: "$243 for 2 nights",
    rating: "4.85",
    image: "/img/paris6.jpg",
  },
  {
    title: "Loft in 9th Arrondissement",
    price: "$317 for 2 nights",
    rating: "4.84",
    image: "/img/paris7.jpg",
  },
];

const propertiesLondon = [
  {
    title: "Room in London",
    price: "$180 for 2 nights",
    rating: "4.9",
    image: "/img/london1.jpg",
  },
  {
    title: "Room in London",
    price: "$160 for 2 nights",
    rating: "4.8",
    image: "/img/london2.jpg",
  },
  {
    title: "Room in London",
    price: "$200 for 2 nights",
    rating: "5.0",
    image: "/img/london3.jpg",
  },
  {
    title: "Room in London",
    price: "$150 for 2 nights",
    rating: "4.7",
    image: "/img/london4.jpg",
  },
  {
    title: "Room in London",
    price: "$135 for 2 nights",
    rating: "4.6",
    image: "/img/london5.jpg",
  },
  {
    title: "Room in London",
    price: "$170 for 2 nights",
    rating: "4.9",
    image: "/img/london6.jpg",
  },
];

const App = () => {
  return (
    <div className="font-sans bg-white text-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow">
        <div className="text-red-500 font-bold text-xl">airbnb</div>
        <nav className="hidden md:flex gap-6 font-medium">
          <a href="#">Homes</a>
          <a href="#">Experiences</a>
          <a href="#">Services</a>
        </nav>
        <button className="bg-red-500 text-white px-4 py-2 rounded-full text-sm">
          Become a host
        </button>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-6 flex flex-col md:flex-row gap-4 justify-center items-center">
        <input
          type="text"
          placeholder="Where"
          className="border px-4 py-2 rounded w-full md:w-1/5"
        />
        <input
          type="date"
          className="border px-4 py-2 rounded w-full md:w-1/5"
        />
        <input
          type="date"
          className="border px-4 py-2 rounded w-full md:w-1/5"
        />
        <input
          type="text"
          placeholder="Who"
          className="border px-4 py-2 rounded w-full md:w-1/5"
        />
        <button className="bg-red-500 px-4 py-2 rounded-full text-white">
          Search
        </button>
      </div>

      {/* Section: Popular homes in Paris */}
      <section className="px-6">
        <h2 className="text-xl font-semibold mb-3">Popular homes in Paris</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {propertiesParis.map((prop, i) => (
            <Card key={i} {...prop} />
          ))}
        </div>
      </section>

      {/* Section: Stay in London */}
      <section className="px-6 mt-6">
        <h2 className="text-xl font-semibold mb-3">Stay in London</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {propertiesLondon.map((prop, i) => (
            <Card key={i} {...prop} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;
