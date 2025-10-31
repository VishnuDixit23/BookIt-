import { Link } from 'react-router-dom';

type CardProps = {
  _id: string;
  image_url: string;
  name: string;
  location: string; 
  rating: number;  
  price: number;
};


const styles = {
  card: {
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
    height: '192px', 
    objectFit: 'cover',
    display: 'block',
  },
  content: {
    padding: '16px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  location: {
    fontSize: '14px',
    color: 'rgb(108, 117, 125)',
  },
  rating: {
    fontSize: '14px',
    color: 'rgb(108, 117, 125)',
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    color: 'rgb(33, 37, 41)',
    margin: '0 0 8px 0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  price: {
    fontSize: '16px',
    fontWeight: 700,
    color: 'rgb(33, 37, 41)',
    margin: '0',
  },
  priceSpan: {
    fontSize: '14px',
    fontWeight: 400,
    color: 'rgb(108, 117, 125)',
  },
  button: {
    display: 'block',
    width: '100%',
    textAlign: 'center',
    padding: '10px',
    marginTop: '12px',
    backgroundColor: 'rgb(255, 255, 255)',
    border: '1px solid rgb(255, 193, 7)',
    borderRadius: '8px',
    color: 'rgb(255, 193, 7)',
    fontWeight: 600,
    textDecoration: 'none',
    fontSize: '14px',
    cursor: 'pointer',
  }
} as const;
const ExperienceCard = ({ _id, image_url, name, location, rating, price }: CardProps) => {
  const imageUrl = image_url.startsWith('/') 
    ? `${import.meta.env.VITE_APP_BASE_URL || ''}${image_url}` 
    : image_url;

  return (
    <div style={styles.card}>
      <Link to={`/details/${_id}`} style={styles.link}>
        <img
          src={imageUrl}
          alt={name}
          style={styles.image}
        />
        <div style={styles.content}>
          <div style={styles.row}>
            <span style={styles.location}>{location}</span>
            <span style={styles.rating}> {rating ? rating.toFixed(1) : 'N/A'}</span>
          </div>
          <h3 style={styles.title}>{name}</h3>
          <p style={styles.price}>
            From ${price.toFixed(2)}
            <span style={styles.priceSpan}> / person</span>
          </p>
        </div>
      </Link>
    
      <div style={{ padding: '0 16px 16px 16px' }}>
        <Link to={`/details/${_id}`} style={styles.button}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ExperienceCard;

