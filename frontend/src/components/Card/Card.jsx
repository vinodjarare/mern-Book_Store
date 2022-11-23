import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import "./card.scss";
import { Link } from "react-router-dom";
const BooksCard = ({ book }) => {
  return (
    <Link to={`/books/${book._id}`}>
      <Card sx={{ maxWidth: 345 }} className="card">
        <CardMedia component="img" height="150px" image={book.cover.url} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.name}
          </Typography>
          <Typography variant="subtitle1">{book.auther}</Typography>
          <Typography variant="body2">₹ {book.price}</Typography>
          <Typography variant="body2" color="text.secondary">
            {book.description.slice(0, 40)}...
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BooksCard;
