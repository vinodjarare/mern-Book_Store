const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#f5f5f5", padding: "20px 0" }}>
      <hr style={{ margin: "10px 0" }} />
      <p style={{ textAlign: "center", fontSize: "1.1rem", padding: "10px 0" }}>
        Copyright &#169; {new Date().getFullYear()} | All rights reserved{" "}
      </p>
    </footer>
  );
};

export default Footer;
