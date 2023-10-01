const styles = {
  navbar: {
    height: '50px',
    backgroundColor: '#4064ac',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
    padding: '0px 100px',
    fontSize: '20px',
  },
};

const Navbar = () => {
    return (
        <div style={styles.navbar}>
             <span>Face detector</span>
        </div>
    )
}

export default Navbar;
