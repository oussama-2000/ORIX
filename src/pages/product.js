import { useState, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
  Select,
  CardMedia,
  List,
  ListItem,
} from "@mui/material";
import { useParams } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import products from "../products.json"; 
import { CartContext } from "../context/CartContext";

const Product = () => {
  const { addToCart } = useContext(CartContext);

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [fit, setFit] = useState("Regular");
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { gender, category, productId } = useParams();

  // Lookup product
  const categoryProducts = products[gender]?.category?.[category];
  const product = categoryProducts?.find(
    (p) => String(p.id) === String(productId)
  );

  if (!product) {
    return (
      <Box sx={{ mt: "15vh", px: "5vw" }}>
        <Typography variant="h6" color="error">
          Product not found
        </Typography>
      </Box>
    );
  }

  const selectedColor = product.colors[selectedColorIndex];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        mt: "15vh",
        px: { xs: "4vw", md: "2vw" },
        gap: 3,
      }}
    >
      {/* LEFT SIDE: Images & Video */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {selectedColor.images &&
          Object.entries(selectedColor.images).map(([key, media], idx) =>
            key === "video" ? (
              <CardMedia
                key={idx}
                component="video"
                src={media}
                autoPlay
                muted
                loop
                sx={{
                  width: { xs: "100%", sm: "49%" },
                  borderRadius: 0,
                }}
              />
            ) : (
              <CardMedia
                key={idx}
                component="img"
                image={media}
                alt={product.name}
                sx={{
                  width: { xs: "100%", sm: "49%" },
                  borderRadius: 0,
                }}
              />
            )
          )}
      </Box>

      {/* RIGHT SIDE: Product Info */}
      <Box
        sx={{
          flex: { xs: "1", md: "0 0 380px" },
          position: { md: "sticky" },
          top: { md: "12vh" },
          alignSelf: "flex-start",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* Title */}
        <Typography variant="h5" fontWeight="bold">
          {product.name}
        </Typography>

        {/* Price */}
        <Box>
          {product.price.discounted ? (
            <>
              <Typography
                variant="body1"
                sx={{
                  textDecoration: "line-through",
                  color: "text.secondary",
                }}
              >
                ${product.price.original}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                ${product.price.discounted}
              </Typography>
              <Typography variant="body2" color="error">
                {product.price.discount_percent}% off — limited time
              </Typography>
            </>
          ) : (
            <Typography variant="h6">${product.price.original}</Typography>
          )}
        </Box>

        {/* Color Swatches */}
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Color: {selectedColor.name}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {product.colors.map((c, idx) => (
              <Box
                key={idx}
                onClick={() => setSelectedColorIndex(idx)}
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: c.hex,
                  border:
                    idx === selectedColorIndex
                      ? "2px solid black"
                      : "1px solid #ccc",
                  cursor: "pointer",
                  transition: "0.2s",
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Fit Options */}
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Fit
          </Typography>
          <ToggleButtonGroup
            value={fit}
            exclusive
            onChange={(e, val) => val && setFit(val)}
          >
            <ToggleButton value="Regular" sx={{ borderRadius: 0 }}>
              Regular
            </ToggleButton>
            <ToggleButton value="Tall" sx={{ borderRadius: 0 }}>
              Tall
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Sizes */}
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Size
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 1,
            }}
          >
            {["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((s) => (
              <Button
                key={s}
                variant="outlined"
                onClick={() => setSize(s)}
                sx={{
                  borderRadius: 0,
                  borderColor: size === s ? "black" : "#ccc",
                  borderWidth: size === s ? "2px" : "1px",
                  color: "black",
                  backgroundColor: "white",
                  "&:hover": {
                    borderColor: "black",
                    backgroundColor: "white",
                  },
                }}
              >
                {s}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Quantity + Add to Bag */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Select
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            size="small"
            sx={{ borderRadius: 0 }}
          >
            {[1, 2, 3, 4, 5].map((q) => (
              <MenuItem key={q} value={q}>
                {q}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              borderRadius: 0,
              flex: 1,
              py: 1,
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#333" },
            }}
            onClick={() => addToCart({ ...product, size, fit, quantity })}
          >
            Add to Bag
          </Button>
        </Box>

        {/* Accordion Sections */}
        <Box>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Product details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Fit & sizing</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {product.details?.fit_and_sizing ? (
                    <List dense>
                      {product.details.fit_and_sizing.map((item, index) => (
                        <ListItem
                          key={index}
                          sx={{ display: "list-item", listStyleType: "disc", ml: 2 }}
                        >
                          <Typography variant="body2">{item}</Typography>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography>No fit information available.</Typography>
                  )}
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Fabric & care</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {product.details?.fabric_and_care ? (
                    <List dense>
                      {product.details.fabric_and_care.map((item, index) => (
                        <ListItem
                          key={index}
                          sx={{ display: "list-item", listStyleType: "disc", ml: 2 }}
                        >
                          <Typography variant="body2">{item}</Typography>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography>No fabric information available.</Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
};

export default Product;
