"use client";

import { motion } from "framer-motion";
import { Button, Box, Container, useTheme, useMediaQuery } from "@mui/material";
import Link from "next/link";
import CategoriesPage from "./Categories";

export default function MyHomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const staggerContainer = {
    show: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <>
    
    <Box
      sx={{
        minHeight: "100vh",
        background: theme.palette.mode === "dark" ? "linear-gradient(to bottom right, #121212, #1e1e1e)" : "linear-gradient(to bottom right, #ffffff, #f7f7f7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 4,
        py: 6,
        flexDirection:'column'
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          className="text-center max-w-xl"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ color: theme.palette.text.primary }}
          >
            Welcome to E-com
          </motion.h1>
          <motion.p
            className="text-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ color: theme.palette.text.secondary }}
          >
            Discover the best deals, explore new arrivals, and enjoy a premium shopping experience.
          </motion.p>

          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{flexDirection:isMobile?'column':'row'}}
          >
            <Link href="/products">
              <motion.div
                whileHover={{ scale: 1.0005 }}
                whileTap={{ scale: 0.95 }}
                initial={{width:'100%',x:0}}
                animate={{width:isMobile?'120%':'400px',x:'-8%'}}
                transition={{duration:0.3,delay:1.5}}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size={isMobile ? "small" : "large"}
                  sx={{
                    px: 4,
                    py: 2,
                    borderRadius: "20px",
                    boxShadow: 3,
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.01)",
                    },
                    width:'100%'
                  }}
                >
                  Start Shopping
                </Button>
              </motion.div>
            </Link>

            <Link href="/about">
              <motion.div
                whileHover={{ scale: 1.0005 }}
                whileTap={{ scale: 0.95 }}
                initial={{fontSize:'15px',}}
                animate={{fontSize:'15px',}}
                transition={{duration:1,delay:2}}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  size={isMobile ? "small" : "large"}
                  sx={{
                    fontSize:'inherit',
                    px: 4,
                    py: 2,
                    borderRadius: "20px",
                    borderWidth: 2,
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.01)",
                    },
                    textWrapping: "none",
                    width:'100%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  Learn More
                </Button>
              </motion.div>
            </Link>

          </motion.div>
        </motion.div>
      </Container>
    <CategoriesPage/> 
    </Box>
    </>
  );
}
