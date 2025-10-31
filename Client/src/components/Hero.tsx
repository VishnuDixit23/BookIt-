/* eslint-disable @typescript-eslint/no-unused-vars */

import { useMediaQuery } from '../hooks/useMediaQuery';
const staticStyles = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 16px',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgb(255, 193, 7)',
    color: 'rgb(33, 37, 41)',
    fontWeight: 600,
    padding: '12px 24px',
    borderRadius: '0 8px 8px 0',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    height: '47px', 
  },
} as const;

const Hero = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const dynamicInputStyle: React.CSSProperties = {
    width: isMobile ? '100%' : '300px', 
    padding: '12px 16px',
    fontSize: '14px',
    border: '1px solid rgb(222, 226, 230)',
    borderRadius: '8px 0 0 8px',
    outline: 'none',
    backgroundColor: 'rgb(248, 249, 250)',
    boxSizing: 'border-box', 
  };
  return (
    <div style={staticStyles.container}>
      <form style={staticStyles.form}>
      </form>
    </div>
  );
};

export default Hero;
