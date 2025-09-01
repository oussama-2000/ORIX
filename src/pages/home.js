import { Box, Button, Menu, MenuItem, Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import "../css/home.css";
import images from "../slide2.json";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  // ------------------- images changer for slides -------------------------------
  const slide4_leftImages = ["/slide4-images/2.png", "/slide4-images/7.png"];
  const slide4_rightImages = [
    "/slide4-images/1.png",
    "/slide4-images/3.png",
    "/slide4-images/6.png",
  ];
  const slide2_images = [
    "/slide2-images/2.png",
    "/slide2-images/1.png",
    "/slide2-images/3.png",
  ];

  const slide5_leftImages = ["/slide5-images/5.png", "/slide5-images/5.png"];
  const slide5_rightImages = [
    "/slide5-images/4.png",
    "/slide5-images/3.png",
    "/slide5-images/2.png",
  ];

  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);

  useEffect(() => {
    const leftInterval = setInterval(() => {
      setLeftIndex((prev) => (prev + 1) % slide4_leftImages.length);
    }, 8000);
    return () => clearInterval(leftInterval);
  }, []);

  useEffect(() => {
    const rightInterval = setInterval(() => {
      setRightIndex((prev) => (prev + 1) % slide4_rightImages.length);
    }, 6000);
    return () => clearInterval(rightInterval);
  }, []);
  // -----------------------------------------------------------------------------

  // Menus
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);
  const handleClick2 = (event) => setAnchorEl2(event.currentTarget);
  const handleClose2 = () => setAnchorEl2(null);

  // Responsive helpers
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg")); // desktop / large
  const isMdDown = useMediaQuery(theme.breakpoints.down("md")); // tablets & phones

  // ------------------- Loading states (Skeleton control) -----------------------
  const [videoLoaded, setVideoLoaded] = useState(false);

  const [slide2Loaded, setSlide2Loaded] = useState(false);
  useEffect(() => {
    // when the rightIndex changes, slide 2 image changes too -> reset loading
    setSlide2Loaded(false);
  }, [rightIndex]);

  const [slide3Loaded, setSlide3Loaded] = useState(
    Array(images.length).fill(false)
  );

  const [slide4LeftLoaded, setSlide4LeftLoaded] = useState(false);
  const [slide4RightLoaded, setSlide4RightLoaded] = useState(false);
  useEffect(() => {
    setSlide4LeftLoaded(false);
  }, [leftIndex]);
  useEffect(() => {
    setSlide4RightLoaded(false);
  }, [rightIndex]);

  const [slide5LeftLoaded, setSlide5LeftLoaded] = useState(false);
  const [slide5RightLoaded, setSlide5RightLoaded] = useState(false);
  useEffect(() => {
    setSlide5LeftLoaded(false);
  }, [leftIndex]);
  useEffect(() => {
    setSlide5RightLoaded(false);
  }, [rightIndex]);

  const [slide6Loaded, setSlide6Loaded] = useState([false, false, false, false]);
  // -----------------------------------------------------------------------------

  return (
    <>
      {/* ================= Slide 1 ================= */}
      <Box
        className="slide-1"
        sx={{ mb: { xs: "6vh", md: "10vh" }, position: "relative" }}
      >
        {/* Skeleton covers the video area until the video is ready */}
        {!videoLoaded && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{ position: "absolute", inset: 0 }}
          />
        )}

        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: videoLoaded ? "block" : "none",
          }}
        >
          <source
            src={isMdDown ? (process.env.PUBLIC_URL +"/slide-1-mobile.mp4") : (process.env.PUBLIC_URL +"/last_slide.mp4")}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <Box
          className="slide-content"
          sx={{
            gap: { xs: 1, sm: 1.5 },
            p: { xs: 2, sm: 3 },
            mt: { xs: isMdDown ? "50vh" : null },
          }}
        >
          <h1 style={{ fontSize: isMdDown ? "28px" : "48px", lineHeight: 1.1 }}>
            The Laid-Back Look.
          </h1>
          <p style={{ fontSize: isMdDown ? "14px" : "18px" }}>
            PJ pants. Soft sweats. Layered on denim.
          </p>
          <p style={{ fontSize: isMdDown ? "14px" : "18px" }}>
            A capsule that moves from sleep to street — and back again.
          </p>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Link to="/men">
              <Button
                variant="contained"
                sx={{
                  borderRadius: 0,
                  px: { xs: 1.5, sm: 2 },
                  py: { xs: 0.75, sm: 1 },
                  mr: { xs: 0, sm: 1.5 },
                  backgroundColor: "white",
                  color: "black",
                  fontSize: { xs: 12, sm: 14 },
                  ":hover": { backgroundColor: "black", color: "white" },
                }}
              >
                Laid-Back Men
              </Button>
            </Link>
            <Link to="/women">
              <Button
                variant="contained"
                sx={{
                  borderRadius: 0,
                  px: { xs: 1.5, sm: 2 },
                  py: { xs: 0.75, sm: 1 },
                  backgroundColor: "white",
                  color: "black",
                  boxShadow: "none",
                  fontSize: { xs: 12, sm: 14 },
                  ":hover": { backgroundColor: "black", color: "white" },
                }}
              >
                Laid-Back Women
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>

      {/* ================= Slide 2 ================= */}
      <Box
        className="slide-2"
        sx={{
          width: "100%",
          height: { xs: "60vh", sm: "70vh", md: "80vh", lg: "90vh" },
          position: "relative",
        }}
      >
        {/* Skeleton overlay for the background image */}
        {!slide2Loaded && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{ position: "absolute", inset: 0, zIndex: 0 }}
          />
        )}

        {/* Preload the background image and flip the flag once it is ready */}
        <Box
          component="img"
          src={process.env.PUBLIC_URL + slide2_images[rightIndex]}
          alt="preload-slide-2"
          onLoad={() => setSlide2Loaded(true)}
          sx={{ display: "none" }}
        />

        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${process.env.PUBLIC_URL +slide2_images[rightIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "background-image 1s ease-in-out",
          }}
        />
        <Box className="slide-content" sx={{ p: { xs: 2, sm: 3 }, position: "relative" }}>
          <h1 style={{ fontSize: isMdDown ? "26px" : "42px", lineHeight: 1.1 }}>
            Fall Preview
          </h1>
          <h3 style={{ fontSize: isMdDown ? "18px" : "24px" }}>From $13</h3>
          <p style={{ fontSize: isMdDown ? "13px" : "16px" }}>
            All the layers, fresh denim, and trends for cooler temps
          </p>
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{
              borderRadius: 0,
              px: { xs: 1.5, sm: 2 },
              py: { xs: 0.75, sm: 1 },
              backgroundColor: "white",
              color: "black",
              boxShadow: "none",
              fontSize: { xs: 12, sm: 14 },
              ":hover": { backgroundColor: "black", color: "white" },
            }}
          >
            Shop new arrivals
          </Button>

          <Menu
            sx={{ color: "black" }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ "aria-labelledby": "basic-button" }}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/men/sweaters" style={{ color: "black" }}>
                Men
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/women/jeans" style={{ color: "black" }}>
                Women
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/girls/pants" style={{ color: "black" }}>
                Girls
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/boys/pants" style={{ color: "black" }}>
                Boys
              </Link>
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* ================= Slide 3 ================= */}
      <Box className="slide-3">
        <Box className="slide-content" sx={{ p: { xs: 2, sm: 3 } }}>
          <h1 style={{ fontSize: isMdDown ? "48px" : "80px" }}>Just For You</h1>
          <p style={{ fontSize: isMdDown ? "24px" : "30px" }}>
            A personal curation of new arrivals and product recommendations
          </p>
        </Box>
        <Box className="slide-slider" sx={{ width: "100%", px: { xs: 0, sm: 0 } }}>
          <Swiper
            modules={[Navigation, Autoplay]}
            loop
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            navigation={isLgUp}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 0 }, // full width on very small screens
              480: { slidesPerView: 1, spaceBetween: 0 }, // still full width
              768: { slidesPerView: 2, spaceBetween: 12 }, // 2 images on tablets
              1024: { slidesPerView: 3, spaceBetween: 12 }, // 3 images on medium screens
              1280: { slidesPerView: 4, spaceBetween: 12 }, // 4 images on large screens
            }}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                {!slide3Loaded[index] && (
                  <Skeleton variant="rectangular" width="100%" height={220} />
                )}
                <Link to={img.path}>
                  <Box
                    component="img"
                    src={process.env.PUBLIC_URL + img.image}
                    alt={img.name}
                    onLoad={() =>
                      setSlide3Loaded((prev) => {
                        const next = [...prev];
                        next[index] = true;
                        return next;
                      })
                    }
                    sx={{
                      width: "100%",
                      display: slide3Loaded[index] ? "block" : "none",
                    }}
                  />
                  <Box
                    className="name"
                    sx={{ color: "black", fontSize: isMdDown ? "0.8rem" : "1rem" }}
                  >
                    {img.name}
                  </Box>
                  <Box
                    className="price"
                    sx={{ color: "black", fontSize: isMdDown ? "0.8rem" : "1rem" }}
                  >
                    {img.price}
                  </Box>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>

      {/* ================= Slide 4 ================= */}
      <Box className="slide-4">
        <Box
          className="slide-images"
          sx={{
            display: "flex",
            width: "100%",
            height: { xs: "60vh", sm: "70vh", md: "80vh", lg: "100vh" },
          }}
        >
          {/* Left half / the only image on small screens */}
          <Box
            sx={{
              position: "relative",
              width: isLgUp ? "50%" : "100%",
              height: "100%",
              backgroundImage: `url(${process.env.PUBLIC_URL +slide4_leftImages[leftIndex]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "background-image 1s ease-in-out",
            }}
          >
            {!slide4LeftLoaded && (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ position: "absolute", inset: 0 }}
              />
            )}
            {/* Preloader (hidden) */}
            <Box
              component="img"
              src={process.env.PUBLIC_URL + slide4_leftImages[leftIndex]}
              alt="preload-slide4-left"
              onLoad={() => setSlide4LeftLoaded(true)}
              sx={{ display: "none" }}
            />
          </Box>

          {/* Right half hidden on tablets/phones */}
          {isLgUp && (
            <Box
              sx={{
                position: "relative",
                width: "50%",
                height: "100%",
                backgroundImage: `url(${process.env.PUBLIC_URL +slide4_rightImages[rightIndex]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "background-image 1s ease-in-out",
              }}
            >
              {!slide4RightLoaded && (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{ position: "absolute", inset: 0 }}
                />
              )}
              {/* Preloader (hidden) */}
              <Box
                component="img"
                src={process.env.PUBLIC_URL + slide4_rightImages[rightIndex]}
                alt="preload-slide4-right"
                onLoad={() => setSlide4RightLoaded(true)}
                sx={{ display: "none" }}
              />
            </Box>
          )}
        </Box>

        <Box className="slide-content" sx={{ p: { xs: 2, sm: 3 } }}>
          <h1 style={{ fontSize: isMdDown ? "26px" : "40px" }}>
            Find Your Perfect Fit
          </h1>
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{
              borderRadius: 0,
              px: { xs: 1.5, sm: 2 },
              py: { xs: 0.75, sm: 1 },
              mr: { xs: 0, sm: 1 },
              backgroundColor: "white",
              color: "black",
              boxShadow: "none",
              fontSize: { xs: 12, sm: 14 },
              ":hover": { backgroundColor: "black", color: "white" },
            }}
          >
            Shop all jeans on sale
          </Button>

          <Menu
            sx={{ color: "black" }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ "aria-labelledby": "basic-button" }}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/men/jeans" style={{ color: "black" }}>
                Men
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/women/jeans" style={{ color: "black" }}>
                Women
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/girls/jeans" style={{ color: "black" }}>
                Girls
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/boys/jeans" style={{ color: "black" }}>
                Boys
              </Link>
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* ================= Slide 5 ================= */}
      <Box className="slide-5">
        <Box
          className="slide-images"
          sx={{
            display: "flex",
            width: "100%",
            height: { xs: "60vh", sm: "70vh", md: "80vh", lg: "100vh" },
          }}
        >
          {/* Left half / the only image on small screens */}
          <Box
            sx={{
              position: "relative",
              width: isLgUp ? "50%" : "100%",
              height: "100%",
              backgroundImage: `url(${process.env.PUBLIC_URL +slide5_leftImages[leftIndex]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "background-image 1s ease-in-out",
            }}
          >
            {!slide5LeftLoaded && (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ position: "absolute", inset: 0 }}
              />
            )}
            {/* Preloader (hidden) */}
            <Box
              component="img"
              src={ process.env.PUBLIC_URL + slide5_leftImages[leftIndex]}
              alt="preload-slide5-left"
              onLoad={() => setSlide5LeftLoaded(true)}
              sx={{ display: "none" }}
            />
          </Box>

          {/* Right half hidden on tablets/phones */}
          {isLgUp && (
            <Box
              sx={{
                position: "relative",
                width: "50%",
                height: "100%",
                backgroundImage: `url(${process.env.PUBLIC_URL +slide5_rightImages[rightIndex]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "background-image 1s ease-in-out",
              }}
            >
              {!slide5RightLoaded && (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{ position: "absolute", inset: 0 }}
                />
              )}
              {/* Preloader (hidden) */}
              <Box
                component="img"
                src={process.env.PUBLIC_URL + slide5_rightImages[rightIndex]}
                alt="preload-slide5-right"
                onLoad={() => setSlide5RightLoaded(true)}
                sx={{ display: "none" }}
              />
            </Box>
          )}
        </Box>

        <Box className="slide-content" sx={{ p: { xs: 2, sm: 3 } }}>
          <h1 style={{ fontSize: isMdDown ? "26px" : "40px" }}>
            Back-to-School
            <br />
            Shop
          </h1>
          <h3 style={{ fontSize: isMdDown ? "18px" : "24px" }}>From $7</h3>
          <p style={{ fontSize: isMdDown ? "13px" : "16px" }}>
            The easy way to stock up on all their essentials.
          </p>
          <Button
            onClick={handleClick2}
            variant="contained"
            sx={{
              borderRadius: 0,
              px: { xs: 1.5, sm: 2 },
              py: { xs: 0.75, sm: 1 },
              mr: { xs: 0, sm: 1 },
              backgroundColor: "white",
              color: "black",
              boxShadow: "none",
              fontSize: { xs: 12, sm: 14 },
              ":hover": { backgroundColor: "black", color: "white" },
            }}
          >
            Shop uniforms
          </Button>

          <Menu
            sx={{ color: "black" }}
            anchorEl={anchorEl2}
            open={open2}
            onClose={handleClose2}
            MenuListProps={{ "aria-labelledby": "basic-button" }}
          >
            <MenuItem onClick={handleClose2}>
              <Link to="/girls" style={{ color: "black" }}>
                Girls
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose2}>
              <Link to="/boys" style={{ color: "black" }}>
                Boys
              </Link>
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* ================= Slide 6 ================= */}
      <Box
        className="slide-6"
        sx={{
          display: "flex",
          gap: { xs: 2, md: 4 },
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 2, sm: 3, md: 0 },
          py: { xs: 3, md: 4 },
        }}
      >
        {[
          { src:"/slide6-images/1.png", label: "Men", to: "/men" },
          { src: "/slide6-images/2.png", label: "Women", to: "/women" },
          { src:"/slide6-images/3.png", label: "Girls", to: "/girls" },
          { src: "/slide6-images/4.png", label: "Boys", to: "/boys" },
        ].map((item, i) => (
          <Link key={i} to={item.to}>
            <Box sx={{ textAlign: "center" }}>
              {!slide6Loaded[i] && (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={200}
                  sx={{
                    width: { xs: "45vw", sm: "35vw", md: "25vw", lg: "20vw" },
                  }}
                />
              )}
              <Box
                component="img"
                src={process.env.PUBLIC_URL + item.src}
                alt={item.label}
                onLoad={() =>
                  setSlide6Loaded((prev) => {
                    const next = [...prev];
                    next[i] = true;
                    return next;
                  })
                }
                sx={{
                  width: { xs: "45vw", sm: "35vw", md: "25vw", lg: "20vw" },
                  display: slide6Loaded[i] ? "block" : "none",
                  ":hover": { opacity: "90%", cursor: "pointer" },
                }}
              />
              <Box sx={{ color: "black", mt: 1, fontSize: { xs: 14, md: 16 } }}>
                {item.label}
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
    </>
  );
}
