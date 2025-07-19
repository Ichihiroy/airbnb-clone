import MobileSearch from "./MobileSearch";
import PropertySection from "./PropertySection";
import Navigation from "./Navigation";

const Main = () => {
  const parisProperties = [
    {
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=400&fit=crop",
      title: "Room in Notre Dame",
      subtitle: "$201 for 2 nights",
      price: "★ 4.93",
      rating: "4.93",
      badge: "Guest favorite",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=400&fit=crop",
      title: "Room in Notre Dame",
      subtitle: "$201 for 2 nights",
      price: "★ 4.93",
      rating: "4.93",
      badge: "Guest favorite",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=400&fit=crop",
      title: "Room in Notre Dame",
      subtitle: "$201 for 2 nights",
      price: "★ 4.93",
      rating: "4.93",
      badge: "Guest favorite",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=400&fit=crop",
      title: "Room in Notre Dame",
      subtitle: "$201 for 2 nights",
      price: "★ 4.93",
      rating: "4.93",
      badge: "Guest favorite",
    },

    {
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      title: "Apartment in Buttes-Montmartre",
      subtitle: "$149 for 2 nights",
      price: "★ 5.0",
      rating: "5.0",
      badge: "Guest favorite",
    },
    {
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=400&fit=crop",
      title: "Room in Grenelle",
      subtitle: "$202 for 2 nights",
      price: "★ 4.94",
      rating: "4.94",
      badge: "Guest favorite",
    },
    {
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop",
      title: "Condo in Temple",
      subtitle: "$240 for 2 nights",
      price: "★ 4.75",
      rating: "4.75",
      badge: "Guest favorite",
    },
    {
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=400&fit=crop",
      title: "Room in Gobelins",
      subtitle: "$162 for 2 nights",
      price: "★ 4.92",
      rating: "4.92",
      badge: "Guest favorite",
    },
    {
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=400&fit=crop",
      title: "Apartment in Passy",
      subtitle: "$243 for 2 nights",
      price: "★ 4.85",
      rating: "4.85",
      badge: "Guest favorite",
    },
  ];

  const londonProperties = [
    {
      image:
        "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&h=400&fit=crop",
      title: "Room in London",
      subtitle: "£180 for 2 nights",
      price: "★ 4.78",
      rating: "4.78",
      badge: "Guest favorite",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=400&fit=crop",
      title: "Room in Notre Dame",
      subtitle: "$201 for 2 nights",
      price: "★ 4.93",
      rating: "4.93",
      badge: "Guest favorite",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=400&fit=crop",
      title: "Room in Notre Dame",
      subtitle: "$201 for 2 nights",
      price: "★ 4.93",
      rating: "4.93",
      badge: "Guest favorite",
    },
    {
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      title: "Room in London",
      subtitle: "£155 for 2 nights",
      price: "★ 4.89",
      rating: "4.89",
      badge: "Guest favorite",
    },
    {
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=400&fit=crop",
      title: "Room in London",
      subtitle: "£201 for 2 nights",
      price: "★ 4.67",
      rating: "4.67",
      badge: "Guest favorite",
    },
    {
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=400&fit=crop",
      title: "Room in London",
      subtitle: "£189 for 2 nights",
      price: "★ 4.85",
      rating: "4.85",
      badge: "Guest favorite",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop",
      title: "Room in Poplar",
      subtitle: "£165 for 2 nights",
      price: "★ 4.73",
      rating: "4.73",
      badge: "Guest favorite",
    },
    {
      image:
        "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=400&h=400&fit=crop",
      title: "Room in London",
      subtitle: "£195 for 2 nights",
      price: "★ 4.91",
      rating: "4.91",
      badge: "Guest favorite",
    },
  ];

  return (
    <main className="bg-white  container mx-auto">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PropertySection
          title="Popular homes in Paris"
          properties={parisProperties}
        />
        <PropertySection title="Stay in London" properties={londonProperties} />
      </div>
    </main>
  );
};

export default Main;
