
import { Link } from 'react-router-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';
type CardProps = {
  _id: string;
  imageUrl: string;
  name: string;
  description: string;
  price: number;
};

const styles = {
  card: {
    fontFamily: 'Inter, sans-serif',
    border: '1px solid rgb(222, 226, 230)',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: 'rgb(255, 255, 255)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
  },
  link: {
    textDecoration: 'none',
  },
  image: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
  },
  content: {
    padding: '16px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    color: 'rgb(33, 37, 41)',
    marginBottom: '8px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  description: {
    fontSize: '14px',
    color: 'rgb(108, 117, 125)',
    marginBottom: '12px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as const, 
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height: '40px', 
  },
  price: {
    fontSize: '16px',
    fontWeight: 700,
    color: 'rgb(33, 37, 41)',
    marginBottom: '12px',
  },
  button: {
    display: 'block',
    width: '100%',
    backgroundColor: 'rgb(255, 255, 255)',
    color: 'rgb(255, 193, 7)',
    fontWeight: 600,
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid rgb(255, 193, 7)',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none',
    fontSize: '14px',
  },
  buttonMobile: {
    fontSize: '12px',
    padding: '8px',
  }
} as const;

const ExperienceCard = ({ _id, imageUrl, name, description, price }: CardProps) => {
  const isMobile = useMediaQuery('(max-width: 640px)');

  const buttonStyle = {
    ...styles.button,
    ...(isMobile ? styles.buttonMobile : {})
  };

  return (
    <div style={styles.card}>
      <Link to={`/details/${_id}`} style={styles.link}>
        <img
          src={imageUrl}
          alt={name}
          style={styles.image}
        />
        <div style={styles.content}>
          <h3 style={styles.title}>{name}</h3>
          <p style={styles.description}>{description}</p>
          <p style={styles.price}>From ${price.toFixed(2)}</p>
          <div style={buttonStyle}>
            View Details
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ExperienceCard;
