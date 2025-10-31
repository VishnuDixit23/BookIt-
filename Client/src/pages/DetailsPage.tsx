// src/pages/DetailsPage.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { ArrowLeft } from 'lucide-react';

type Experience = {
  _id: string;
  name: string;
  description: string;
  price: number;
  location: string;
  image_url: string;
};

type Slot = {
  _id: string;
  date: string; 
  start_time: string;
  end_time: string;
  capacity: number;
  booked_count: number;
};


const hardcodedData = {
  rating: 4.9,
  reviewCount: 128,
  includes: [
    'Curated small-group experiences',
    'Certified guides',
    'Safety first!',
    'Helmet and Life jacket (as applicable)',
  ],
  images: [
    'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=2070&auto=format&fit=crop',
  ]
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
  backLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'rgb(33, 37, 41)',
    fontWeight: 500,
    marginBottom: '32px',
    textDecoration: 'none',
  },
  image: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '12px',
  },
  container: {
    display: 'flex',
    gap: '48px',
    marginTop: '32px',
  },
  containerMobile: {
    flexDirection: 'column',
  },
  leftColumn: {
    flex: 2,
  },
  rightColumn: {
    flex: 1,
  },
  title: {
    fontSize: '32px',
    fontWeight: 700,
    color: 'rgb(33, 37, 41)',
  },
  description: {
    fontSize: '16px',
    color: 'rgb(108, 117, 125)',
    marginTop: '16px',
    lineHeight: 1.6,
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: 600,
    color: 'rgb(33, 37, 41)',
    marginTop: '32px',
    marginBottom: '16px',
  },
  buttonRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  button: {
    padding: '10px 16px',
    borderRadius: '8px',
    border: '1px solid rgb(222, 226, 230)',
    backgroundColor: 'rgb(255, 255, 255)',
    cursor: 'pointer',
    color: 'rgb(33, 37, 41)',
    fontSize: '14px',
  },
  buttonSoldOut: {
    backgroundColor: 'rgb(248, 249, 250)',
    color: 'rgb(173, 181, 189)',
    textDecoration: 'line-through',
    cursor: 'not-allowed',
  },
  buttonSelected: {
    backgroundColor: 'rgb(33, 37, 41)',
    color: 'rgb(255, 255, 255)',
    borderColor: 'rgb(33, 37, 41)',
  },
  bookingCard: {
    border: '1px solid rgb(222, 226, 230)',
    borderRadius: '12px',
    padding: '24px',
    backgroundColor: 'rgb(248, 249, 250)',
    position: 'sticky',
    top: '32px',
  },
  bookingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  bookingLabel: {
    fontSize: '16px',
    color: 'rgb(108, 117, 125)',
  },
  bookingValue: {
    fontSize: '16px',
    color: 'rgb(33, 37, 41)',
    fontWeight: 600,
  },
  bookingTotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid rgb(222, 226, 230)',
  },
  bookingTotalLabel: {
    fontSize: '18px',
    color: 'rgb(33, 37, 41)',
    fontWeight: 700,
  },
  confirmButton: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    fontWeight: 600,
    color: 'rgb(33, 37, 41)',
    backgroundColor: 'rgb(255, 193, 7)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '24px',
  },
  confirmButtonDisabled: {
    backgroundColor: 'rgb(222, 226, 230)',
    cursor: 'not-allowed',
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

const formatDate = (dateString: string) => {
  if (!dateString) return 'Invalid Date'; 
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

const DetailsPage = () => {
  const [experience, setExperience] = useState<Experience | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<Slot | null>(null);

  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (!id) {
      setError('No experience ID provided.');
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/experiences/${id}`);
        setExperience(response.data.experience);
        setSlots(response.data.slots);
      } catch (err) {
        setError('Failed to fetch experience details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]); 
  const availableDates = [...new Set(slots.map(slot => slot.date))];
  
  const availableTimes = selectedDate
    ? slots.filter(slot => 
        new Date(slot.date).toISOString().split('T')[0] === 
        new Date(selectedDate).toISOString().split('T')[0]
      )
    : [];
 
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSelect = (slot: Slot) => {
    setSelectedTimeSlot(slot);
  };

  const handleConfirm = () => {
    if (selectedTimeSlot) {

      navigate('/checkout', { 
        state: { 
          item: experience,
          slot: selectedTimeSlot
        } 
      });
    }
  };

  const containerStyle = {
    ...styles.container,
    ...(isMobile ? styles.containerMobile : {}),
  };


  if (loading) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.loadingText}>Loading...</div>
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.errorText}>{error || 'Experience not found.'}</div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Navbar />

      <main style={styles.main}>
        <Link to="/" style={styles.backLink}>
          <ArrowLeft width={20} height={20} />
          Back to experiences
        </Link>

        {}
        <img src={experience.image_url} alt={experience.name} style={styles.image} />
        <div style={containerStyle}>
          {/* Left Column */}
          <div style={styles.leftColumn}>
            {}
            <h1 style={styles.title}>{experience.name}</h1>
            <p style={styles.description}>{experience.description}</p>
            
            {}
            <h2 style={styles.sectionTitle}>Choose date</h2>
            <div style={styles.buttonRow}>
              {availableDates.map((date) => (
                <button
                  key={date}
                  style={{
                    ...styles.button,
                    ...(selectedDate === date ? styles.buttonSelected : {})
                  }}
                  onClick={() => handleDateSelect(date)}
                >
                  {formatDate(date)}
                </button>
              ))}
            </div>

            {}
            {selectedDate && (
              <>
                <h2 style={styles.sectionTitle}>Choose time</h2>
                <div style={styles.buttonRow}>
                  {availableTimes.length > 0 ? availableTimes.map((slot) => {
                    const isSoldOut = slot.booked_count >= slot.capacity;
                    
                    let timeStyle: React.CSSProperties = { ...styles.button };
                    if (isSoldOut) {
                      timeStyle = { ...timeStyle, ...styles.buttonSoldOut };
                    }
                    if (selectedTimeSlot?._id === slot._id) {
                      timeStyle = { ...timeStyle, ...styles.buttonSelected };
                    }
                    
                    return (
                      <button
                        key={slot._id}
                        style={timeStyle}
                        onClick={() => handleTimeSelect(slot)}
                        disabled={isSoldOut}
                      >
                        {slot.start_time}
                      </button>
                    );
                  }) : <p style={{fontSize: '14px', color: 'rgb(108, 117, 125)'}}>No available times for this date.</p>}
                </div>
              </>
            )}

            {}
            <h2 style={styles.sectionTitle}>About</h2>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'rgb(108, 117, 125)', lineHeight: 1.6 }}>
              {hardcodedData.includes.map((item, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div style={styles.rightColumn}>
            <div style={styles.bookingCard}>
              {}
              <div style={styles.bookingRow}>
                <span style={styles.bookingLabel}>Starts at</span>
                <span style={styles.bookingValue}>${experience.price.toFixed(2)}</span>
              </div>
              <div style={styles.bookingRow}>
                <span style={styles.bookingLabel}>Rating</span>
                <span style={styles.bookingValue}>
                  ⭐ {hardcodedData.rating} ({hardcodedData.reviewCount} reviews)
                </span>
              </div>
              <div style={styles.bookingRow}>
                <span style={styles.bookingLabel}>Quantity</span>
                <span style={styles.bookingValue}>1</span>
              </div>
              <div style={styles.bookingRow}>
                <span style={styles.bookingLabel}>Subtotal</span>
                <span style={styles.bookingValue}>${experience.price.toFixed(2)}</span>
              </div>
              <div style={styles.bookingRow}>
                <span style={styles.bookingLabel}>Taxes</span>
                <span style={styles.bookingValue}>$0.00</span>
              </div>
              <div style={styles.bookingTotalRow}>
                <span style={styles.bookingTotalLabel}>Total</span>
                <span style={styles.bookingTotalLabel}>${experience.price.toFixed(2)}</span>
              </div>

              <button
                style={{
                  ...styles.confirmButton,
                  ...(!selectedTimeSlot ? styles.confirmButtonDisabled : {})
                }}
                onClick={handleConfirm}
                disabled={!selectedTimeSlot}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailsPage;

