import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ExperienceCard from "../components/ExperienceCard";

type Experience = {
  _id: string;
  name: string;
  description: string;
  price: number;
  location: string;
  image_url: string;
  rating: number;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const HomePage = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/experiences`);
        setExperiences(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch experiences.");
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <div className="font-inter bg-white min-h-screen">
        <Navbar />
        <div className="text-center text-gray-500 text-lg py-20">
          Loading experiences...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-inter bg-white min-h-screen">
        <Navbar />
        <div className="text-center text-red-600 text-lg py-20">{error}</div>
      </div>
    );
  }

  return (
    <div className="font-inter bg-white min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">
          Explore Experiences
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {experiences.map((exp) => (
            <ExperienceCard key={exp._id} {...exp} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
