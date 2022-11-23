import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Featured from "../components/Featured/Featured";
import book_hero from "../assets/book_hero.jpg";
import { motion } from "framer-motion";
import "./home.scss";
const Home = () => {
  return (
    <>
      <div className="hero-section">
        <div className="left">
          <motion.div
            initial={{ x: "-50%" }}
            whileInView={{ x: "0%" }}
            transition={{ delay: 0.3 }}
          >
            <Typography variant="h2">
              <motion.span>Find the book</motion.span> you're looking for easier
              to read right away
            </Typography>
            <p>Smart learnings make your career next level</p>
            <Link to="/books" className="btn">
              Learn More
            </Link>
          </motion.div>
        </div>
        <div className="right">
          <motion.div
            className="abs"
            initial={{ x: "0%" }}
            whileInView={{ scale: [0, 1, 0.5, 1] }}
            transition={{ delay: 0.5 }}
          >
            <img src={book_hero} alt="" />
          </motion.div>
        </div>
      </div>
      <Featured />
    </>
  );
};

export default Home;
