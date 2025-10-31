import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ExperienceCard from '../components/ExperienceCard';
import { useMediaQuery } from '../hooks/useMediaQuery';

type Experience = {
  _id: string;
  name: string;
  description: string;
  price: number;
  location: string;
  image_url: string;
  rating: number; 
};

const styles = {
  page: {
    fontFamily: 'Inter, sans-serif',
    backgroundColor: 'rgb(255, 255, 255)',
  },
  main: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 16px',
  },
  grid: {
    display: 'grid',
    gap: '24px',
  },
  gridMobile: {
    gridTemplateColumns: '1fr',
  },
  gridDesktop: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: '18px',
    color: 'rgb(108, 117, 125)',
    padding: '48px',
  },
  errorText: {
    textAlign: 'center',
    fontSize: '18px',
    color: 'rgb(220, 53, 69)',
    padding: '48px',
  },
} as const;

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const HomePage = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/experiences`);
        setExperiences(response.data);
      } catch (err) {
        setError('Failed to fetch experiences.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const mainStyle = {
    ...styles.main,
    ...(isMobile ? styles.gridMobile : styles.gridDesktop),
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.loadingText}>Loading experiences...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.errorText}>{error}</div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Navbar />
      <main style={mainStyle}>
        {experiences.map((exp) => (
          <ExperienceCard
            key={exp._id}
            _id={exp._id}
            name={exp.name}
            location={exp.location}
            price={exp.price}
            rating={exp.rating} 
            image_url={exp.image_url}
          />
        ))}
      </main>
    </div>
  );
};

export default HomePage;

