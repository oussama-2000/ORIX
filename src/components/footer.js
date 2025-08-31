import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";;

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#fff", py: 5, px: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-around",
          alignItems: { xs: "center", md: "flex-start" },
          gap: 4,
          mb: 3,
        }}
      >
      <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
         <Box component={"img"} src="/ORIX.png" alt="ORIX" sx={{width:{sm:"50%" ,xs:"30%"}}}  />
      </Box>
        <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            About
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography sx={{ cursor: "pointer" }}>How it works</Typography>
            <Typography sx={{ cursor: "pointer" }}>Feedback</Typography>
            <Typography sx={{ cursor: "pointer" }}>Comment</Typography>
            <Typography sx={{ cursor: "pointer" }}>Help</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <TextField
              placeholder="Enter your Email"
              size="small"
              variant="standard"
              sx={{ minWidth: { xs: "200px", md: "250px" } }}
            />
            <Button
              variant="contained"
              sx={{ bgcolor: "black", height: "30px", borderRadius: "0" }}
            >
              JOIN
            </Button>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography fontWeight={700}>Stay connected</Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 1, justifyContent: "center" }}>
              <IconButton>
                <FacebookIcon sx={{ color: "blue" }} />
              </IconButton>
              <IconButton>
                <InstagramIcon sx={{ color: "brown" }} />
              </IconButton>
              <IconButton>
                <TwitterIcon sx={{ color: "black" }} />
              </IconButton>
              <IconButton>
                <WhatsAppIcon sx={{ color: "green" }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />
      <Box sx={{ textAlign: "center", py: 1 }}>
        <Typography variant="body2">©{new Date().getFullYear()} OUSSAMA AMKHOU</Typography>
      </Box>
    </Box>
  );
}
