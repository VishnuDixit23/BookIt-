
import { Search, Menu } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';
const styles = {
  nav: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderBottom: '1px solid rgb(222, 226, 230)',
    fontFamily: 'Inter, sans-serif',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 16px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 700,
    color: 'rgb(33, 37, 41)',
    textDecoration: 'none',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '300px',
    padding: '10px 16px',
    fontSize: '14px',
    border: '1px solid rgb(222, 226, 230)',
    borderRadius: '8px 0 0 8px',
    outline: 'none',
    backgroundColor: 'rgb(248, 249, 250)',
  },
  button: {
    backgroundColor: 'rgb(255, 193, 7)',
    color: 'rgb(33, 37, 41)',
    fontWeight: 600,
    padding: '10px 24px',
    borderRadius: '0 8px 8px 0',
    border: '1px solid rgb(255, 193, 7)',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    height: '46px',
  },
  mobileMenuButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
  }
} as const;

const Navbar = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <a href="/" style={styles.logo}>
          Highway Delite
        </a>

        {/* Search Bar (Desktop) or Menu (Mobile) */}
        {isMobile ? (
          // --- Mobile Menu Button ---
          <button style={styles.mobileMenuButton}>
            <Menu width={24} height={24} color="rgb(33, 37, 41)" />
          </button>
        ) : (
          // --- Desktop Search Bar ---
          <form style={styles.form}>
            <input
              type="text"
              placeholder="Search experiences..."
              style={styles.input}
            />
            <button
              type="submit"
              style={styles.button}
            >
              <Search width={16} height={16} />
              <span>Search</span>
            </button>
          </form>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

