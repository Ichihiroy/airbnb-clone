const Card = ({ title, price, rating, image }) => (
  <div className="min-w-[200px] sm:w-60 rounded-lg overflow-hidden shadow hover:scale-105 transition-transform duration-200">
    <img src={image} alt={title} className="w-full h-40 object-cover" />
    <div className="p-3">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">
        {price} · ★ {rating}
      </p>
    </div>
  </div>
);

export default Card;
