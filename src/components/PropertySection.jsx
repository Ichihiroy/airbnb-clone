import PropertyCard from "./PropertyCard";

const PropertySection = ({ title, properties }) => (
  <section className="mb-12">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      <button className="text-gray-900 hover:underline">Show more</button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      {properties.map((property, index) => (
        <PropertyCard key={index} {...property} />
      ))}
    </div>
  </section>
);
export default PropertySection;
