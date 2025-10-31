import { Link } from 'react-router-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';

// We define the 'props' interface to tell TypeScript what data this component expects
type CardProps = {
  _id: string;
  image_url: string;
  name: string;
  location: string;
  rating: number;
  price: number;
};

// --- Hardcoded Style Objects ---
const styles = {
  card: {
    border: '1px solid rgb(222, 226, 230)',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: 'rgb(255, 255, 255)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  cardMobile: {
    flexDirection: 'row',
  },
  imageLink: {
    display: 'block',
  },
  image: {
    width: '100%',
    height: '192px',
    objectFit: 'cover',
    display: 'block',
  },
  imageMobile: {
    width: '120px',
    minWidth: '120px', // Prevent shrinking
    height: 'auto', // Auto-adjust height
    objectFit: 'cover',
  },
  content: {
    padding: '16px',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden', // Prevents text overflow issues
  },
  contentMobile: {
    padding: '12px',
    flex: 1,
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
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  rating: {
    fontSize: '14px',
    color: 'rgb(108, 117, 125)',
    flexShrink: 0, // Prevent rating from shrinking
    paddingLeft: '8px',
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
  description: { // Added this from the Figma design
    fontSize: '14px',
    color: 'rgb(108, 117, 125)',
    lineHeight: 1.5,
    marginBottom: '8px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minHeight: '42px', // 2 lines * 21px line-height
  },
  price: {
    fontSize: '16px',
    fontWeight: 700,
    color: 'rgb(33, 37, 41)',
    margin: '0',
    marginTop: 'auto',
    paddingTop: '8px',
  },
  priceSpan: {
    fontSize: '14px',
    fontWeight: 400,
    color: 'rgb(108, 117, 125)',
  },
  buttonContainer: {
    padding: '0 16px 16px 16px',
  },
  button: {
    display: 'block',
    width: '100%',
    textAlign: 'center',
    padding: '10px',
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
// --- End of Styles ---


const ExperienceCard = ({ _id, image_url, name, location, rating, price }: CardProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Handle local vs. external images
  const imageUrl = image_url.startsWith('/')
    ? image_url // Vercel serves from 'public' at the root
    : image_url;

  const cardStyle = { ...styles.card, ...(isMobile ? styles.cardMobile : {}) };
  const imageStyle = { ...styles.image, ...(isMobile ? styles.imageMobile : {}) };
  const contentStyle = { ...styles.content, ...(isMobile ? styles.contentMobile : {}) };

  // Mobile Layout
  if (isMobile) {
    return (
      <div style={cardStyle}>
        <Link to={`/details/${_id}`} style={{ ...styles.imageLink, ...imageStyle }}>
          <img src={imageUrl} alt={name} style={imageStyle} />
        </Link>
        <div style={contentStyle}>
          <div style={styles.row}>
            <span style={styles.location}>{location}</span>
            <span style={styles.rating}>⭐ {rating ? rating.toFixed(1) : 'N/A'}</span>
          </div>
          <h3 style={styles.title}>{name}</h3>
          {/* We don't show description on mobile to save space */}
          <p style={styles.price}>
            From ${price.toFixed(2)}
            <span style={styles.priceSpan}> / person</span>
          </p>
        </div>
      </div>
    );
  }

  // Desktop Layout (Includes description)
  return (
    <div style={styles.card}>
      <Link to={`/details/${_id}`} style={styles.imageLink}>
        <img
          src={imageUrl}
          alt={name}
          style={imageStyle}
        />
      </Link>
      <div style={contentStyle}>
        <div style={styles.row}>
          <span style={styles.location}>{location}</span>
          <span style={styles.rating}>⭐ {rating ? rating.toFixed(1) : 'N/A'}</span>
        </div>
        <h3 style={styles.title}>{name}</h3>
        {/* Added description for desktop */}
        <p style={styles.description}>Curated small-group experiences. Certified guides. Safety first!</p>
        <p style={styles.price}>
          From ${price.toFixed(2)}
          <span style={styles.priceSpan}> / person</span>
        </p>
      </div>
      <div style={styles.buttonContainer}>
        <Link to={`/details/${_id}`} style={styles.button}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ExperienceCard;

