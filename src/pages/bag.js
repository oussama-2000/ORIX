import { useContext } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Divider,
  IconButton
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { CartContext } from "../context/CartContext";

export default function Bag() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price.discounted * item.quantity,
    0
  );

  const discount = subtotal * 0.2;
  const totalWithDiscount = subtotal - discount;

  return (
    <Box sx={{ backgroundColor: "#f7f7f7", minHeight: "100vh", mt: "15vh" }}>
      <Box
        sx={{
          backgroundColor: "#1a3d5f",
          color: "white",
          textAlign: "center",
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="body2">
          Save 20% on your first purchase, plus free shipping when you open and
          shop with a new Banana Republic Rewards Credit Card.{" "}
          <Box
            component="span"
            sx={{ textDecoration: "underline", cursor: "pointer" }}
          >
            Exclusions apply*
          </Box>
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Your Bag
        </Typography>

        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            {/* Offer Details */}
            <Paper
              elevation={1}
              sx={{
                p: 2.5,
                mb: 2,
                backgroundColor: "#f8f8f8",
                borderLeft: "4px solid #1a3d5f",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  pb: 1,
                  borderBottom: "1px solid #eaeaea",
                }}
              >
                Offer Details
              </Typography>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Total Savings with Card</Typography>
                <Typography>${subtotal.toFixed(2)}</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                  color: "#d32f2f",
                }}
              >
                <Typography>-20% Discount</Typography>
                <Typography>-${discount.toFixed(2)}</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 600,
                  pt: 1,
                  borderTop: "1px solid #eaeaea",
                }}
              >
                <Typography>Total with Card Before tax</Typography>
                <Typography>${totalWithDiscount.toFixed(2)}</Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 1.5,
                  backgroundColor: "#1a3d5f",
                  "&:hover": { backgroundColor: "#15314d" },
                }}
              >
                Apply Now
              </Button>
            </Paper>

            {/* Bag Items */}
            <Paper elevation={1} sx={{ p: 2.5, mb: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  pb: 1,
                  borderBottom: "1px solid #eaeaea",
                }}
              >
                Bag
              </Typography>

              <Typography variant="body1" sx={{ fontWeight: 500, mb: 1.5 }}>
                Shipping ({cart.length} Item{cart.length !== 1 ? "s" : ""})
              </Typography>

              {/* Shipping Notice */}
              <Paper
                elevation={0}
                sx={{
                  backgroundColor: "#fff8e1",
                  p: 1.5,
                  mb: 2,
                  borderLeft: "4px solid #ffc107",
                }}
              >
                <Typography variant="body2">
                  Items on this site are unavailable to order or ship outside of
                  Morocco.{" "}
                  <Box
                    component="span"
                    sx={{
                      color: "#1a3d5f",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Find your regional site
                  </Box>
                </Typography>
              </Paper>

              {cart.length === 0 ? (
                <Typography variant="body1" color="textSecondary">
                  Your bag is empty.
                </Typography>
              ) : (
                cart.map((item) => (
                  <Box
                    key={item.id}
                    sx={{ py: 2, borderBottom: "1px solid #eaeaea" }}
                  >
                    <Box sx={{ display: "flex" }}>
                      <Box
                        component="img"
                        src={ process.env.PUBLIC_URL + item.colors[0].images.front}
                        alt={item.name}
                        sx={{
                          width: 100,
                          height: 120,
                          objectFit: "cover",
                          mr: 2,
                          backgroundColor: "#f0f0f0",
                        }}
                      />

                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, mb: 0.5 }}
                        >
                          {item.name}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ mb: 1 }}
                        >
                          {item.size} | {item.color}
                        </Typography>

                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          ${item.price.discounted}
                          {item.price.original > item.price.discounted && (
                            <Typography
                              component="span"
                              sx={{
                                ml: 1,
                                textDecoration: "line-through",
                                color: "text.secondary",
                              }}
                            >
                              ${item.price.original}
                            </Typography>
                          )}
                        </Typography>

                        <Box sx={{ mt: 2 }}>
                          <Button
                            variant="text"
                            sx={{
                              color: "#1a3d5f",
                              textDecoration: "underline",
                              p: 0,
                              minWidth: "auto",
                              mr: 2,
                            }}
                          >
                            Save For Later
                          </Button>

                          <Box sx={{ mt: 1.5 }}>
                            <RadioGroup
                              defaultValue="ship"
                              name="shipping-option"
                            >
                              <FormControlLabel
                                value="ship"
                                control={<Radio size="small" />}
                                label="Ship to Address"
                              />
                              <FormControlLabel
                                value="pickup"
                                control={<Radio size="small" />}
                                label={
                                  <Box>
                                    Pickup
                                    <Button
                                      variant="text"
                                      sx={{
                                        color: "#1a3d5f",
                                        textDecoration: "underline",
                                        p: 0,
                                        ml: 0.5,
                                        minWidth: "auto",
                                      }}
                                    >
                                      Find a store
                                    </Button>
                                  </Box>
                                }
                              />
                            </RadioGroup>
                          </Box>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <Button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(item.quantity - 1, 1)
                              )
                            }
                            sx={{ minWidth: "auto", p: "4px 8px" }}
                          >
                            -
                          </Button>
                          <Typography sx={{ mx: 1 }}>
                            {item.quantity}
                          </Typography>
                          <Button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            sx={{ minWidth: "auto", p: "4px 8px" }}
                          >
                            +
                          </Button>
                        </Box>
                        <IconButton 
                  onClick={() => removeFromCart(item.id)}
                  sx={{ color: "text.secondary" }}
                  aria-label="Remove item"
                >
                  <DeleteIcon />
                </IconButton>
                      </Box>
                    </Box>
                  </Box>
                ))
              )}
            </Paper>
          </Grid>

          {/* Right Column - Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2.5, position: "sticky", top: 24 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  pb: 1,
                  borderBottom: "1px solid #eaeaea",
                }}
              >
                Order Summary
              </Typography>

              {/* Free Shipping Notice */}
              <Paper
                elevation={0}
                sx={{ backgroundColor: "#e8f5e9", p: 1.5, mb: 2 }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  You've spent $50+!
                </Typography>
                <Typography variant="body2">
                  Get free shipping on orders $50+.{" "}
                  <Box
                    component="span"
                    sx={{
                      color: "#1a3d5f",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Sign in
                  </Box>{" "}
                  or{" "}
                  <Box
                    component="span"
                    sx={{
                      color: "#1a3d5f",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    join now
                  </Box>
                  .
                </Typography>
              </Paper>

              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1.5,
                  }}
                >
                  <Typography>Subtotal</Typography>
                  <Typography>${subtotal.toFixed(2)}</Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1.5,
                  }}
                >
                  <Typography>Shipping</Typography>
                  <Typography fontStyle="italic">TBD</Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1.5,
                  }}
                >
                  <Typography>Est. Tax</Typography>
                  <Typography fontStyle="italic">TBD</Typography>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontWeight: 600 }}>
                    Est. Total Before Tax & Shipping
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    ${subtotal.toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              {/* Payment Options */}
              <Box sx={{ textAlign: "center", mb: 2, color: "text.secondary" }}>
                <Typography variant="body2">
                  4 interest-free payments of ${(subtotal / 4).toFixed(2)} with
                  PayPal.
                </Typography>
                <Typography variant="body2">
                  Afterpay or Klarna available for orders $35+
                </Typography>
              </Box>

              {/* Checkout Buttons */}
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mb: 1.5,
                  py: 1.5,
                  backgroundColor: "black",
                  "&:hover": { backgroundColor: "#333" },
                }}
              >
                Checkout
              </Button>

              <Button
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                  py: 1.5,
                  borderColor: "#ddd",
                  color: "black",
                  "&:hover": {
                    borderColor: "#bbb",
                    backgroundColor: "rgba(0,0,0,0.04)",
                  },
                }}
              >
                Pay with PayPal
              </Button>

              {/* Payment Notice */}
              <Typography
                variant="caption"
                display="block"
                textAlign="center"
                color="textSecondary"
                sx={{ mb: 2 }}
              >
                PayPal, Afterpay & Klarna: Limits apply to Orix Inc. Credit Card
                Rewards
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Promo Code Section */}
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                  Promos
                </Typography>

                <Box sx={{ display: "flex" }}>
                  <TextField
                    placeholder="Enter Promo Code"
                    size="small"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      },
                    }}
                  />

                  <Button
                    variant="contained"
                    sx={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      backgroundColor: "#1a3d5f",
                      "&:hover": { backgroundColor: "#15314d" },
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
