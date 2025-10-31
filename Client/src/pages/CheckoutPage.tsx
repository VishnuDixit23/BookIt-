
import { useState } from 'react'; 
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { ArrowLeft } from 'lucide-react';


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
    borderRadius: '12px',
    padding: '24px',
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: 600,
    color: 'rgb(33, 37, 41)',
    marginBottom: '24px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '16px',
  },
  formGridMobile: {
    gridTemplateColumns: '1fr',
  },
  formField: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'rgb(33, 37, 41)',
    marginBottom: '8px',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid rgb(222, 226, 230)',
    borderRadius: '8px',
    backgroundColor: 'rgb(255, 255, 255)',
  },
  promoRow: {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px', 
  },
  promoInput: {
    flexGrow: 1,
    padding: '12px',
    fontSize: '16px',
    border: '1px solid rgb(222, 226, 230)',
    borderRadius: '8px',
    backgroundColor: 'rgb(255, 255, 255)',
  },
  applyButton: {
    padding: '0 24px',
    fontSize: '16px',
    fontWeight: 600,
    color: 'rgb(255, 255, 255)',
    backgroundColor: 'rgb(33, 37, 41)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  promoStatus: {
    fontSize: '14px',
    height: '20px', 
    marginBottom: '16px',
  },
  promoError: {
    color: 'rgb(220, 53, 69)', 
  },
  promoSuccess: {
    color: 'rgb(25, 135, 84)', 
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  checkboxLabel: {
    fontSize: '14px',
    color: 'rgb(108, 117, 125)',
  },
  summaryCard: {
    border: '1px solid rgb(222, 226, 230)',
    borderRadius: '12px',
    padding: '24px',
    backgroundColor: 'rgb(248, 249, 250)',
    position: 'sticky',
    top: '32px',
  },
  summaryTitle: {
    fontSize: '22px',
    fontWeight: 600,
    color: 'rgb(33, 37, 41)',
    marginBottom: '16px',
  },
  summaryItemTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: 'rgb(33, 37, 41)',
    marginBottom: '16px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  summaryLabel: {
    fontSize: '16px',
    color: 'rgb(108, 117, 125)',
  },
  summaryValue: {
    fontSize: '16px',
    color: 'rgb(33, 37, 41)',
    fontWeight: 600,
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
  errorText: {
    color: 'rgb(220, 53, 69)',
    fontSize: '14px',
    marginTop: '16px',
    textAlign: 'center',
  }
} as const;

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { item, slot } = location.state as { item: Experience, slot: Slot } || {};
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string, discount: number } | null>(null);
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoStatus, setPromoStatus] = useState<{ type: 'error' | 'success', message: string } | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!agree) {
      setError('You must agree to the terms and safety policy.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await axios.post('http://localhost:5000/bookings', {
        slotId: slot._id,
        userName: name,
        userEmail: email,
        promoCode: appliedPromo?.code,
      });

      navigate('/result', { state: { success: true, item, slot, total } });

    } catch (err: unknown) {
      let errorMessage = 'An unknown error occurred.';
      if (axios.isAxiosError(err) && err.response) {
        errorMessage = err.response.data.message || 'Booking failed. Please try again.';
      }
      setError(errorMessage);
      setIsLoading(false);
      navigate('/result', { state: { success: false, message: errorMessage } });
    }
  };

  const handleApplyPromo = async () => {
    setPromoLoading(true);
    setPromoStatus(null);
    setAppliedPromo(null);

    try {
      const response = await axios.post('http://localhost:5000/promo/validate', {
        promoCode: promoCodeInput,
      });
      setAppliedPromo({
        code: response.data.code,
        discount: response.data.discount
      });
      setPromoStatus({ type: 'success', message: response.data.message });

    } catch (err: unknown) {
      let errorMessage = 'An unknown error occurred.';
      if (axios.isAxiosError(err) && err.response) {
        errorMessage = err.response.data.message;
      }
      setPromoStatus({ type: 'error', message: errorMessage });
    } finally {
      setPromoLoading(false);
    }
  };

  const subtotal = item?.price || 0;
  const taxes = 0.00;
  const discount = appliedPromo?.discount || 0;
  const total = Math.max(subtotal + taxes - discount, 0);

  const formStyle = {
    ...styles.form,
    ...(isMobile ? styles.formMobile : {}),
  };
  const formGridStyle = {
    ...styles.formGrid,
    ...(isMobile ? styles.formGridMobile : {}),
  };
  const buttonStyle = {
    ...styles.confirmButton,
    ...(isLoading || !agree ? styles.confirmButtonDisabled : {})
  }

  if (!item || !slot) {
    return (
      <div style={styles.page}>
        <Navbar />
        <main style={styles.main}>
          <p style={{...styles.errorText, padding: 0}}>
            No booking data found. Please start from a details page.
          </p>
          <Link to="/" style={{...styles.backLink, marginTop: '16px'}}>
            Go to Home
          </Link>
        </main>
      </div>
    );
  }

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
              
              <div style={formGridStyle}>
                <div style={styles.formField}>
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
                <div style={styles.formField}>
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

              <div style={styles.formField}>
                <label htmlFor="promo" style={styles.label}>Promo Code</label>
                <div style={styles.promoRow}>
                  <input 
                    type="text" 
                    id="promo"
                    placeholder="Enter code" 
                    style={styles.promoInput}
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                  />
                  <button 
                    type="button" 
                    style={styles.applyButton}
                    onClick={handleApplyPromo}
                    disabled={promoLoading}
                  >
                    {promoLoading ? '...' : 'Apply'}
                  </button>
                </div>
                
                <div style={styles.promoStatus}>
                  {promoStatus && (
                    <span style={promoStatus.type === 'error' ? styles.promoError : styles.promoSuccess}>
                      {promoStatus.message}
                    </span>
                  )}
                </div>
              </div>

              <div style={styles.checkboxRow}>
                <input 
                  type="checkbox" 
                  id="terms" 
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  required 
                />
                <label htmlFor="terms" style={styles.checkboxLabel}>
                  I agree to the <a href="#" style={{color: 'rgb(13, 110, 253)'}}>terms and safety policy</a>
                </label>
              </div>
            </div>
          </div>

          
          <div style={styles.rightColumn}>
            <div style={styles.summaryCard}>
              <h2 style={styles.summaryTitle}>Booking Summary</h2>
              
              <p style={styles.summaryItemTitle}>{item.name}</p>
              
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

              <hr style={{border: 'none', borderTop: '1px solid rgb(222, 226, 230)', margin: '16px 0'}} />

              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Subtotal</span>
                <span style={styles.summaryValue}>${subtotal.toFixed(2)}</span>
              </div>
              
              {appliedPromo && (
                <div style={styles.summaryRow}>
                  <span style={{...styles.summaryLabel, ...styles.promoSuccess}}>
                    Promo "{appliedPromo.code}"
                  </span>
                  <span style={{...styles.summaryValue, ...styles.promoSuccess}}>
                    -${discount.toFixed(2)}
                  </span>
                </div>
              )}

              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Taxes</span>
                <span style={styles.summaryValue}>${taxes.toFixed(2)}</span>
              </div>

              <div style={styles.summaryTotalRow}>
                <span style={styles.summaryTotalLabel}>Total</span>
                <span style={styles.summaryTotalLabel}>${total.toFixed(2)}</span>
              </div>

              <button 
                type="submit" 
                style={buttonStyle}
                disabled={isLoading || !agree}
              >
                {isLoading ? 'Processing...' : 'Pay and Confirm'}
              </button>
              
              {error && (
                <p style={styles.errorText}>{error}</p>
              )}
            </div>
          </div>

        </form>
      </main>
    </div>
  );
};

export default CheckoutPage;

