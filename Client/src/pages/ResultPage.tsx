
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { CheckCircle, XCircle } from 'lucide-react'; 

const styles = {
  page: {
    fontFamily: 'Inter, sans-serif',
    backgroundColor: 'rgb(255, 255, 255)',
  },
  main: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '64px 16px', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  iconSuccess: {
    width: '100px',
    height: '100px',
    color: 'rgb(25, 135, 84)',
    marginBottom: '24px',
  },
  iconFailure: {
    width: '100px',
    height: '100px',
    color: 'rgb(220, 53, 69)', 
    marginBottom: '24px',
  },
  title: {
    fontSize: '36px',
    fontWeight: 700,
    color: 'rgb(33, 37, 41)',
    marginBottom: '16px',
  },
  message: {
    fontSize: '18px',
    color: 'rgb(108, 117, 125)',
    maxWidth: '500px',
    marginBottom: '32px',
    lineHeight: 1.6,
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 600,
    color: 'rgb(255, 255, 255)',
    backgroundColor: 'rgb(13, 110, 253)', 
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  buttonError: {
    backgroundColor: 'rgb(220, 53, 69)', 
  }
} as const;


const ResultPage = () => {
  const location = useLocation();
  const { state } = location;
  const isSuccess = state?.success || false;
  const message = state?.message || "An unknown error occurred. Please try again.";

  return (
    <div style={styles.page}>
      <Navbar />

      <main style={styles.main}>
        {isSuccess ? (
          <>
            <CheckCircle style={styles.iconSuccess} />
            <h1 style={styles.title}>Booking Confirmed!</h1>
            <p style={styles.message}>
              Your experience has been successfully booked. A confirmation email has been sent to your address.
            </p>
            <Link to="/" style={styles.button}>
              Explore More Experiences
            </Link>
          </>
        ) : (
          <>
            <XCircle style={styles.iconFailure} />
            <h1 style={styles.title}>Booking Failed</h1>
            <p style={styles.message}>
              {}
              {message}
            </p>
            <Link 
              to="/" 
              style={{...styles.button, ...styles.buttonError}}
            >
              Try Again
            </Link>
          </>
        )}
      </main>
    </div>
  );
};

export default ResultPage;
