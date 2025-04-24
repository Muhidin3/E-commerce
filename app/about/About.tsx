"use client";
import { Typography, Container, Box, Paper } from "@mui/material";
import { motion } from "framer-motion";

export default function AboutPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    show: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <Box sx={{ py: 6, px: 2, minHeight: "100vh" }}>
      <Container maxWidth="md">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" fontWeight={700}>
            About ShopVerse
          </Typography>
        </Box>

        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          {["Our Story", "What We Offer", "Our Mission", "Meet the Team", "Looking Ahead"].map(
            (title, i) => (
              <motion.div variants={fadeInUp} key={i}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: 3, // Rounded corners
                    boxShadow: 3, // Soft shadow
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {title}
                  </Typography>
                  <Typography>
                    {title === "Our Story" &&
                      "ShopVerse was born out of a passion for bringing great products to great people. Since our launch, we've empowered countless customers to discover new trends and unbeatable deals in fashion, electronics, and home goods."}
                    {title === "What We Offer" &&
                      "From the latest gadgets to timeless clothing, ShopVerse curates a dynamic range of products to suit your every need. We partner with trusted vendors to ensure authenticity, affordability, and speed."}
                    {title === "Our Mission" &&
                      "To revolutionize the way people shop online by combining cutting-edge tech, top-tier customer service, and a heart for global community impact."}
                    {title === "Meet the Team" &&
                      "Our team is made up of passionate designers, developers, and product experts from around the globe. Together, we work tirelessly to deliver a platform you’ll love and trust."}
                    {title === "Looking Ahead" &&
                      "We're constantly evolving to bring you better service, better features, and a better future for online commerce. Stay tuned — the best is yet to come."}
                  </Typography>
                </Paper>
              </motion.div>
            )
          )}
        </motion.div>
      </Container>
    </Box>
  );
}
