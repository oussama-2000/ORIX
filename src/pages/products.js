import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import productsData from "../products.json";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const Products = () => {
  const { gender, category } = useParams();
  const [products, setProducts] = useState([]);

  // Load products when gender or category changes
  useEffect(() => {
    if (productsData[gender] && productsData[gender].category[category]) {
      const initializedProducts = productsData[gender].category[category].map(
        (p) => ({
          ...p,
          selectedColorIndex: 0, // default color
          currentImageIndex: 0, // track image (front/back/etc.)
        })
      );
      setProducts(initializedProducts);
    } else {
      setProducts([]);
    }
  }, [gender, category]);

  // Switch product color
  const handleColorChange = (productId, colorIndex) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, selectedColorIndex: colorIndex, currentImageIndex: 0 }
          : p
      )
    );
  };

  // Switch product image
  const handleImageChange = (productId, direction) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const images = Object.values(p.colors[p.selectedColorIndex].images);
          const total = images.length;
          let newIndex =
            (p.currentImageIndex + (direction === "next" ? 1 : -1) + total) %
            total;
          return { ...p, currentImageIndex: newIndex };
        }
        return p;
      })
    );
  };

  return (
    <Box sx={{ mt: "20vh", px: "4vw" }}>
      {/* Breadcrumbs */}
      <Box sx={{ mb: 3, display: "flex", gap: 1, flexWrap: "wrap" }}>
        <Link
          to={`/${gender}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          {gender?.toUpperCase()}
        </Link>
        <span>/</span>
        <Link
          to={`/${gender}/${category}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          {category?.toUpperCase()}
        </Link>
      </Box>

      {/* Product Grid using Flex */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          gap: 2,
        }}
      >
        {products.length > 0 ? (
          products.map((product) => {
            const selectedColor = product.colors[product.selectedColorIndex];
            const images = Object.values(selectedColor.images);
            const currentImage = images[product.currentImageIndex];

            return (
              <Box
                key={product.id}
                sx={{
                  flex: {
                    xs: "1 1 100%", // 1 per row on mobile
                    sm: "1 1 48%", // 2 per row on tablets
                    md: "1 1 30%", // 3 per row on laptops
                    lg: "1 1 48%", // 3 per row on desktops
                  },
                  maxWidth: {
                    xs: "100%",
                    sm: "48%",
                    md: "30%",
                    lg: "30%",
                  },
                }}
              >
                <Card
                  sx={{
                    borderRadius: 0,
                    boxShadow: "none",
                    position: "relative",
                    "&:hover .nav-btn": { opacity: 1 },
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Link
                    to={`/${gender}/${category}/${product.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <CardMedia
                      component="img"
                      image={currentImage}
                      alt={product.name}
                      sx={{ objectFit: "cover", width: "100%" }}
                    />
                  </Link>

                  {/* Left Arrow */}
                  <IconButton
                    className="nav-btn"
                    onClick={() => handleImageChange(product.id, "prev")}
                    sx={{
                      color: "black",
                      position: "absolute",
                      top: "50%",
                      left: "10px",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      opacity: { xs: 1, sm: 1, md: 0 },
                      transition: "opacity 0.3s",
                      "&:hover": { opacity: 1 },
                    }}
                  >
                    <ChevronLeft />
                  </IconButton>

                  {/* Right Arrow */}
                  <IconButton
                    className="nav-btn"
                    onClick={() => handleImageChange(product.id, "next")}
                    sx={{
                      color: "black",
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      opacity: { xs: 1, sm: 1, md: 0 },
                      transition: "opacity 0.3s",
                      "&:hover": { opacity: 1 },
                    }}
                  >
                    <ChevronRight />
                  </IconButton>

                  {/* Color Swatches */}
                  <Box sx={{ display: "flex", gap: 1, py: 1 }}>
                    {product.colors.map((c, idx) => (
                      <Box
                        key={idx}
                        onClick={() => handleColorChange(product.id, idx)}
                        sx={{
                          width: 22,
                          height: 22,
                          bgcolor: c.hex,
                          border:
                            idx === product.selectedColorIndex
                              ? "2px solid black"
                              : "1px solid #ccc",
                          cursor: "pointer",
                          transition: "0.2s",
                        }}
                      />
                    ))}
                  </Box>

                  {/* Product Info */}
                  <CardContent sx={{ pt: 0, pl: 0, mb: "2vh" }}>
                    <Typography>{product.name}</Typography>

                    {/* Price Section */}
                    <Box sx={{ mt: 1 }}>
                      {product.price.discounted ? (
                        <>
                          <Typography
                            variant="body2"
                            component="span"
                            sx={{ mr: 1 }}
                          >
                            ${product.price.discounted}
                          </Typography>
                          <Typography
                            variant="body2"
                            component="span"
                            sx={{
                              textDecoration: "line-through",
                              color: "text.secondary",
                            }}
                          >
                            ${product.price.original}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5, display: "block" }}
                          >
                            {Math.round(
                              ((product.price.original -
                                product.price.discounted) /
                                product.price.original) *
                                100
                            )}
                            % off — limited time
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="body2">
                          ${product.price.original}
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            );
          })
        ) : (
          <Typography variant="body1" color="text.secondary">
            No products available in this category.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Products;
