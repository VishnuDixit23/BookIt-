import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { ArrowLeft, Lock } from 'lucide-react';

type Experience = {
  _id: string;
  name: string;
  price: number;
};

type Slot = {
  _id: string;
  date: string;
  start_time: string;
};

type LocationState = {
  item: Experience;
  slot: Slot;
};

const styles = {
  page: {
    fontFamily: 'Inter, sans-serif',
    backgroundColor: 'rgb(255, 255, 255)',
    minHeight: '100vh',
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
  form: {
    display: 'flex',
    gap: '48px',
  },
  formMobile: {
    flexDirection: 'column',
  },
  leftColumn: {
    flex: 2,
  },
  rightColumn: {
    flex: 1,
  },
  card: {
    backgroundColor: 'rgb(248, 249, 250)',
    padding: '24px',
    borderRadius: '12px',
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: 600,
    color: 'rgb(33, 37, 41)',
    marginBottom: '24px',
  },
  inputGrid: {
    display: 'grid',
    gap: '16px',
    marginBottom: '16px',
  },
  inputGridDesktop: {
    gridTemplateColumns: '1fr 1fr',
  },
  inputGridMobile: {
    gridTemplateColumns: '1fr',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    color: 'rgb(33, 37, 41)',
    marginBottom: '4px',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    border: '1px solid rgb(222, 226, 230)',
    borderRadius: '8px',
    backgroundColor: 'rgb(255, 255, 255)',
    boxSizing: 'border-box',
  },
  promoContainer: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
  },
  promoInput: {
    flexGrow: 1,
    padding: '12px',
    fontSize: '14px',
    border: '1px solid rgb(222, 226, 230)',
    borderRadius: '8px',
    backgroundColor: 'rgb(255, 255, 255)',
    boxSizing: 'border-box',
  },
  applyButton: {
    backgroundColor: 'rgb(33, 37, 41)',
    color: 'rgb(255, 255, 255)',
    fontWeight: 500,
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
  applyButtonLoading: {
    backgroundColor: 'rgb(108, 117, 125)',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  checkbox: {
    width: '16px',
    height: '16px',
  },
  checkboxLabel: {
    fontSize: '14px',
    color: 'rgb(108, 117, 125)',
  },
  summaryCard: {
    backgroundColor: 'rgb(248, 249, 250)',
    padding: '24px',
    borderRadius: '12px',
    position: 'sticky',
    top: '32px',
  },
  summaryTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: 'rgb(33, 37, 41)',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '12px',
  },
  summaryLabel: {
    fontSize: '16px',
    color: 'rgb(108, 117, 125)',
  },
  summaryValue: {
    fontSize: '16px',
    color: 'rgb(33, 37, 41)',
    fontWeight: 500,
  },
  summaryTotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid rgb(222, 226, 230)',
  },
  summaryTotalLabel: {
    fontSize: '18px',
    color: 'rgb(33, 37, 41)',
    fontWeight: 700,
  },
  payButton: {
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  payButtonDisabled: {
    backgroundColor: 'rgb(222, 226, 230)',
    cursor: 'not-allowed',
  },
  errorStatus: {
    fontSize: '14px',
    color: 'rgb(220, 53, 69)',
    marginTop: '8px',
  },
  successStatus: {
    fontSize: '14px',
    color: 'rgb(25, 135, 84)',
    marginTop: '8px',
  },
  errorText: {
    textAlign: 'center',
    fontSize: '18px',
    color: 'rgb(220, 53, 69)',
    padding: '48px',
  }
} as const;

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const { item, slot } = (location.state as LocationState) || {};

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);
  const [promoCodeInput, setPromoCodeInput] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccess, setPromoSuccess] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  if (!item || !slot) {
    return (
      <div style={styles.page}>
        <Navbar />
        <main style={styles.main}>
          <div style={styles.errorText}>
            Booking data is missing. Please{" "}
            <Link to="/" style={{ color: 'rgb(13, 110, 253)' }}>go back</Link>{" "}
            and select an experience.
          </div>
        </main>
      </div>
    );
  }

  const subtotal = item.price;
  const taxes = 0; 
  const total = Math.max(0, subtotal + taxes - discount);

  const handleApplyPromo = async () => {
    setPromoLoading(true);
    setPromoError(null);
    setPromoSuccess(null);
    try {
      const response = await axios.post(`${API_URL}/promo/validate`, {
        promoCode: promoCodeInput,
      });
      const { discount } = response.data;
      setDiscount(discount);
      setPromoSuccess(`Success! $${discount} discount applied.`);
    } catch (err) {
      setDiscount(0);
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        setPromoError('Invalid promo code.');
      } else {
        setPromoError('Could not apply code.');
      }
    } finally {
      setPromoLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!agree) {
      setError('You must agree to the terms and safety policy.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await axios.post(`${API_URL}/bookings`, {
        slotId: slot._id,
        userName: name,
        userEmail: email,
        promoCode: promoCodeInput,
        finalPrice: total,
      });

      navigate('/result', { state: { success: true } });

    } catch (err) {
      let errorMessage = 'Booking failed. Please try again.';
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      setError(errorMessage);
      navigate('/result', { state: { success: false, message: errorMessage } });
    } finally {
      setIsLoading(false);
    }
  };

  const formStyle = {
    ...styles.form,
    ...(isMobile ? styles.formMobile : {}),
  };

  const inputGridStyle = {
    ...styles.inputGrid,
    ...(isMobile ? styles.inputGridMobile : styles.inputGridDesktop),
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <main style={styles.main}>
        <Link to={`/details/${item._id}`} style={styles.backLink}>
          <ArrowLeft width={20} height={20} />
          Back to details
        </Link>

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={styles.leftColumn}>
            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>Your Information</h2>

              <div style={inputGridStyle}>
                <div>
                  <label htmlFor="name" style={styles.label}>Full Name</label>
                  <input
                    type="text"
                    id="name"
                    style={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" style={styles.label}>Email Address</label>
                  <input
                    type="email"
                    id="email"
                    style={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={styles.promoContainer}>
                <div style={{flexGrow: 1}}>
                  <label htmlFor="promo" style={styles.label}>Promo Code</label>
                  <input
                    type="text"
                    id="promo"
                    placeholder="Enter code"
                    style={styles.promoInput}
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  style={{
                    ...styles.applyButton,
                    ...(promoLoading ? styles.applyButtonLoading : {}),
                    alignSelf: 'flex-end',
                  }}
                  onClick={handleApplyPromo}
                  disabled={promoLoading}
                >
                  {promoLoading ? '...' : 'Apply'}
                </button>
              </div>
              
              {promoError && <span style={styles.errorStatus}>{promoError}</span>}
              {promoSuccess && <span style={styles.successStatus}>{promoSuccess}</span>}

              <div style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="terms"
                  style={styles.checkbox}
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  required
                />
                <label htmlFor="terms" style={styles.checkboxLabel}>
                  I agree to the terms and safety policy
                </label>
              </div>
            </div>
          </div>

          <div style={styles.rightColumn}>
            <div style={styles.summaryCard}>
              <h2 style={styles.sectionTitle}>Booking Summary</h2>

              <p style={styles.summaryTitle}>{item.name}</p>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Date</span>
                <span style={styles.summaryValue}>{formatDate(slot.date)}</span>
              </div>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Time</span>
                <span style={styles.summaryValue}>{slot.start_time}</span>
              </div>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Quantity</span>
                <span style={styles.summaryValue}>1</span>
              </div>

              <hr style={{ margin: '16px 0', borderTop: '1px solid rgb(222, 226, 230)', borderBottom: 'none' }} />

              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Subtotal</span>
                <span style={styles.summaryValue}>${subtotal.toFixed(2)}</span>
              </div>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Taxes</span>
                <span style={styles.summaryValue}>${taxes.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div style={styles.summaryRow}>
                  <span style={{ ...styles.summaryLabel, color: 'rgb(25, 135, 84)' }}>Discount</span>
                  <span style={{ ...styles.summaryValue, color: 'rgb(25, 135, 84)' }}>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div style={styles.summaryTotalRow}>
                <span style={styles.summaryTotalLabel}>Total</span>
                <span style={styles.summaryTotalLabel}>${total.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                style={{
                  ...styles.payButton,
                  ...((isLoading || !agree) ? styles.payButtonDisabled : {}),
                }}
                disabled={isLoading || !agree}
              >
                <Lock width={16} height={16} />
                {isLoading ? 'Processing...' : 'Pay and Confirm'}
              </button>
              {error && <span style={{...styles.errorStatus, marginTop: '16px'}}>{error}</span>}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CheckoutPage;

