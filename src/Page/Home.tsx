import { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import "./home.css";

type Currency = "USD" | "EUR" | "UAH" | "PLN";

const currencyRates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.9,
  UAH: 36.5,
  PLN: 4,
};

const products = [
  { name: "iPhone 12", description: "This is iPhone 12...", price: 1000 },
  { name: "iPhone X", description: "This is iPhone X...", price: 750 },
  { name: "iPhone 8", description: "This is iPhone 8...", price: 600 },
];

const Home = () => {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const changeCurrency = (selectedCurrency: Currency) => {
    const convertedTotalPrice =
      (totalPrice / currencyRates[currency]) * currencyRates[selectedCurrency];
    setCurrency(selectedCurrency);
    setTotalPrice(convertedTotalPrice);
  };

  const productBtn = (price: number) => {
    const convertedPrice = price * currencyRates[currency];
    setTotalCount((prevCount) => prevCount + 1);
    setTotalPrice((prevPrice) => prevPrice + convertedPrice);
  };

  return (
    <>
      <Typography
        component="h2"
        variant="h3"
        align="center"
        sx={{
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        Our shop page
      </Typography>
      <Typography align="center">
        <Button
          variant="outlined"
          sx={{
            margin: "10px",
          }}
          onClick={() => changeCurrency("USD")}
        >
          USD
        </Button>
        <Button
          variant="outlined"
          sx={{
            margin: "10px",
          }}
          onClick={() => changeCurrency("EUR")}
        >
          EUR
        </Button>
        <Button
          variant="outlined"
          sx={{
            margin: "10px",
          }}
          onClick={() => changeCurrency("UAH")}
        >
          UAH
        </Button>
        <Button
          variant="outlined"
          sx={{
            margin: "10px",
          }}
          onClick={() => changeCurrency("PLN")}
        >
          PLN
        </Button>
      </Typography>

      <Grid container spacing={4}>
        {products.map(({ name, description, price }, id) => (
          <Grid item xs={12} sm={6} md={4} key={id}>
            <Card className="product" variant="outlined">
              <CardContent>
                <h4 className="product-title">{name}</h4>
                <p className="product-description">{description}</p>
                <p className="product-price">
                  Price: {price * currencyRates[currency]} {currency}
                </p>
                <CardActions className="btn-wrap">
                  <Button variant="outlined" onClick={() => productBtn(price)}>
                    Buy
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography
        align="center"
        sx={{
          marginTop: "30px",
        }}
      >
        Total Count: {totalCount} | Total Price: {totalPrice} {currency}
      </Typography>
    </>
  );
};

export default Home;
