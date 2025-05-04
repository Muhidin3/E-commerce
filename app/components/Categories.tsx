'use client';
import { Box, Typography, Grid, Paper, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
const categories: Record<string, string[]> = {
  Electronics: ['Mobile Phones', 'Computers', 'Home Appliances'],
  Fashion: ['Clothing', 'Footwear', 'Accessories'],
  'Home & Furniture': ['Furniture', 'Home Décor', 'Bedding', 'Kitchenware'],
  'Cars & Accessories': ['Cars', 'Motorcycles', 'Car Parts'],
  'Beauty & Personal Care': ['Skincare', 'Hair Care', 'Makeup', 'Fragrances'],
  'Sports & Outdoors': ['Fitness Equipment', 'Outdoor Gear', 'Sports Equipment'],
  'Toys & Games': ['Action Figures', 'Board Games', 'Educational Toys'],
  'Books, Music & Movies': ['Books', 'Music', 'Movies'],
  'Food & Beverages': ['Gourmet Food', 'Organic Items', 'Drinks'],
  'Health & Wellness': ['Supplements', 'Medical Supplies', 'Personal Care Devices'],
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delay:1.5,
      delayChildren: 1.5,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 120 } },
};

export default function CategoriesPage() {
  const theme = useTheme();

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     window.scrollBy({ top: 60, behavior: 'smooth'});
  //   }, 3000);
  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.mode === "dark" ? "linear-gradient(to bottom right, #121212, #1e1e1e)": "linear-gradient(to bottom right, #ffffff, #f7f7f7)",
        color: theme.palette.text.primary,
        padding: 3,
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          component={motion.h1}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          Explore Categories
        </Typography>

        <Grid container spacing={4} sx={{ marginTop: 1 }}>
          {Object.entries(categories).map(([category, subcategories],index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div variants={cardVariants}>
                <Paper
                  elevation={6}
                  sx={{
                    padding: 3,
                    borderRadius: 4,
                    backgroundColor: theme.palette.background.paper,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: theme.shadows[10],
                    },
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    {category}
                  </Typography>
                  <Box component="ul" sx={{ paddingLeft: 3, marginTop: 2 }}>
                    {subcategories.map((sub) => (
                      <motion.li
                        key={sub}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{ listStyleType: 'disc', marginBottom: '8px' }}
                      >
                        <Typography variant="body1">{sub}</Typography>
                      </motion.li>
                    ))}
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
}
