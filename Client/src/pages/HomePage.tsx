
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ExperienceCard from '../components/ExperienceCard'; 
import { useMediaQuery } from '../hooks/useMediaQuery';

type Experience = {
  _id: string;
  name: string;
  description: string;
  price: number;
  location: string;
  image_url: string; 
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
  }
} as const;


const HomePage = () => {
  
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        // Make the API call to your backend
        const response = await axios.get('http://localhost:5000/experiences');
        setExperiences(response.data); 
      } catch (err) {
        setError('Failed to fetch experiences. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };

    fetchExperiences();
  }, []); 

  let columns = 4;
  if (isMobile) {
    columns = 1;
  } else if (isTablet) {
    columns = 2;
  }

  const dynamicGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: '24px',
  };
  const renderContent = () => {
    if (loading) {
      return <div style={styles.loadingText}>Loading experiences...</div>;
    }

    if (error) {
      return <div style={styles.errorText}>{error}</div>;
    }

    return (
      <div style={dynamicGridStyle}>
        {experiences.map((exp) => (
          <ExperienceCard
            key={exp._id}
            _id={exp._id} 
            name={exp.name}
            description={exp.description}
            price={exp.price}
            imageUrl={exp.image_url} 
          />
        ))}
      </div>
    );
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <Hero />
      
      <main style={styles.main}>
        {}
        {renderContent()}
      </main>
    </div>
  );
};

export default HomePage;

