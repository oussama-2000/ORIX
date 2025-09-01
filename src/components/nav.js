import React, { useEffect, useState, useContext, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  InputBase,
  Badge,
  Paper,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Divider,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import products from "../products.json";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false); 
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const { cart } = useContext(CartContext);

  // Hide/Show navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getAllProducts = () => {
    const allProducts = [];
    for (const gender in products) {
      const genderCategory = products[gender];
      for (const categoryType in genderCategory.category) {
        const categoryItems = genderCategory.category[categoryType];
        if (Array.isArray(categoryItems)) {
          categoryItems.forEach((product) => {
            allProducts.push({
              ...product,
              gender,
              category: categoryType,
            });
          });
        }
      }
    }
    return allProducts;
  };

  // Search handler
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    const allProducts = getAllProducts();
    const filtered = allProducts.filter(
      (p) =>
        (p.name && p.name.toLowerCase().includes(value)) ||
        (p.category && p.category.toLowerCase().includes(value)) ||
        (p.gender && p.gender.toLowerCase().includes(value))
    );

    setResults(filtered.slice(0, 5));
  };

  const handleResultClick = (product) => {
    setQuery("");
    setResults([]);
    navigate(`/${product.gender}/${product.category}/${product.id}`);
    setMobileOpen(false);
  };

  const handleBagClick = () => {
    navigate("/bag");
    setMobileOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          backgroundColor: "white",
          py: 2,
          top: show ? 0 : "-15vh",
          transition: "top 0.4s ease-in-out",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/">
            <img src={process.env.PUBLIC_URL + "/ORIX.png"} alt="ORIX" width={"65vw"}  />
          </Link>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 8 }}>
            <Link style={{ color: "black", textDecoration: "none" }} to="/men">
              MEN
            </Link>
            <Link
              style={{ color: "black", textDecoration: "none" }}
              to="/women"
            >
              WOMEN
            </Link>
            <Link style={{ color: "black", textDecoration: "none" }} to="/girls">
              GIRLS
            </Link>
            <Link style={{ color: "black", textDecoration: "none" }} to="/boys">
              BOYS
            </Link>
          </Box>

          {/* Desktop Right Section */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
              position: "relative",
            }}
          >
            {/* Search */}
            <Box
              ref={searchRef}
              sx={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid gray",
                position: "relative",
              }}
            >
              <InputBase
                placeholder="search"
                value={query}
                onChange={handleSearch}
                sx={{ ml: 1 }}
              />
              <SearchIcon sx={{ ml: 1 }} />

              {/* Search Results */}
              {results.length > 0 && (
                <Paper
                  sx={{
                    position: "absolute",
                    top: "40px",
                    left: 0,
                    width: "250px",
                    maxHeight: "300px",
                    overflowY: "auto",
                    zIndex: 2000,
                  }}
                >
                  <List>
                    {results.map((item) => (
                      <ListItem
                        button
                        key={item.id}
                        onClick={() => handleResultClick(item)}
                      >
                        <img
                          src={(process.env.PUBLIC_URL +
                            item.colors?.[0]?.images?.front )||
                            (process.env.PUBLIC_URL + "/placeholder-image.jpg")
                          }
                          alt={item.name}
                          width="40"
                          height="40"
                          style={{
                            marginRight: "10px",
                            borderRadius: "4px",
                            objectFit: "cover",
                          }}
                        />
                        <ListItemText
                          primary={item.name}
                          secondary={`$${item.price?.original || item.price}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </Box>

            {/* Account */}
            <IconButton>
              <AccountCircleIcon sx={{ color: "black" }} />
            </IconButton>

            {/* Bag */}
            <IconButton onClick={handleBagClick}>
              <Badge badgeContent={cart.length} color="error">
                <ShoppingBagIcon sx={{ color: "black" }} />
              </Badge>
            </IconButton>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon sx={{ color: "black" }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        transitionDuration={400}
      >
        <Box sx={{ width: 280, p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={() => setMobileOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ my: 2 }} />

          <List>
            <ListItem sx={{ color: "black" }} button component={Link} to="/men" onClick={() => setMobileOpen(false)}>
              <ListItemText primary="MEN" />
            </ListItem>
            <ListItem sx={{ color: "black" }} button component={Link} to="/women" onClick={() => setMobileOpen(false)}>
              <ListItemText primary="WOMEN" />
            </ListItem>
            <ListItem sx={{ color: "black" }} button component={Link} to="/girls" onClick={() => setMobileOpen(false)}>
              <ListItemText primary="GIRLS" />
            </ListItem>
            <ListItem sx={{ color: "black" }} button component={Link} to="/boys" onClick={() => setMobileOpen(false)}>
              <ListItemText primary="BOYS" />
            </ListItem>
          </List>

          <Divider sx={{ my: 2 }} />

          <List>
            <ListItem>
              <InputBase
                placeholder="Search..."
                fullWidth
                value={query}
                onChange={handleSearch}
              />
              <SearchIcon sx={{ ml: 1 }} />
            </ListItem>
            {results.length > 0 && (
              <Paper sx={{ maxHeight: 200, overflowY: "auto", mt: 1 }}>
                <List>
                  {results.map((item) => (
                    <ListItem
                      button
                      key={item.id}
                      onClick={() => handleResultClick(item)}
                    >
                      <img
                        src={
                          (process.env.PUBLIC_URL +item.colors?.[0]?.images?.front) ||
                          (process.env.PUBLIC_URL + "/placeholder-image.jpg")
                        }
                        alt={item.name}
                        width="40"
                        height="40"
                        style={{
                          marginRight: "10px",
                          borderRadius: "4px",
                          objectFit: "cover",
                        }}
                      />
                      <ListItemText
                        primary={item.name}
                        secondary={`$${item.price?.original || item.price}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
            <Box sx={{display:"flex",flexDirection:"row",mt:"20px"}}>

            <ListItem>
              <IconButton>
                <AccountCircleIcon sx={{ color: "black" }} />
              </IconButton>
              <Typography>Account</Typography>
            </ListItem>

            <ListItem onClick={handleBagClick}>
              <IconButton>
                <Badge badgeContent={cart.length} color="error">
                  <ShoppingBagIcon sx={{ color: "black" }}/>
                </Badge>
              </IconButton>
              <Typography>Bag</Typography>
            </ListItem>
            </Box>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
