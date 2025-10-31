import { Link } from "react-router-dom";
import { useMediaQuery } from "../hooks/useMediaQuery";

type CardProps = {
  _id: string;
  image_url: string;
  name: string;
  location: string;
  rating: number;
  price: number;
};

const ExperienceCard = ({
  _id,
  image_url,
  name,
  location,
  rating,
  price,
}: CardProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const imageUrl = image_url.startsWith("/") ? image_url : image_url;

  // ✅ Shared Tailwind Design (matches Figma)
  const cardBase =
    "bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col h-full";
  const cardMobile =
    "flex-row border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden";

  return (
    <div className={isMobile ? cardMobile : cardBase}>
      {/* 🖼️ Image */}
      <Link to={`/details/${_id}`} className="block">
        <img
          src={imageUrl}
          alt={name}
          className={`${
            isMobile
              ? "w-[120px] h-auto object-cover"
              : "w-full h-56 object-cover"
          }`}
        />
      </Link>

      {/* 🧾 Content */}
      <div
        className={`${
          isMobile
            ? "p-3 flex flex-col justify-between flex-1"
            : "p-5 flex flex-col justify-between flex-1"
        }`}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500 truncate">{location}</span>
          <span className="text-sm text-gray-500">⭐ {rating?.toFixed(1) || "N/A"}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>

        {!isMobile && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            Curated small-group experiences. Certified guides. Safety first!
          </p>
        )}

        <p className="text-gray-800 font-semibold mt-3">
          From <span className="text-black">${price.toFixed(2)}</span>{" "}
          <span className="text-gray-500 text-sm">/ person</span>
        </p>
      </div>

      {/* 🔘 Button */}
      {!isMobile && (
        <div className="px-5 pb-5">
          <Link
            to={`/details/${_id}`}
            className="block w-full text-center py-2.5 rounded-lg border border-yellow-400 text-yellow-500 font-semibold text-sm hover:bg-yellow-400 hover:text-black transition-all"
          >
            View Details
          </Link>
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;
