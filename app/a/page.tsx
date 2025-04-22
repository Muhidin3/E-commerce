import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Container } from '@mui/material';

function ProductListingPage() {
  const products = [
    { id: 1, name: 'Product 1', price: '$10', image: '/images/product1.jpg' },
    { id: 2, name: 'Product 2', price: '$20', image: '/images/product2.jpg' },
    { id: 3, name: 'Product 3', price: '$30', image: '/images/product3.jpg' },
  ];

  return (
    <Container style={{ marginTop: '20px', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px' }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', color: '#4caf50' }}>
        Product Listing
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card style={{ backgroundColor: '#e3f2fd', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
              <CardMedia
                component="img"
                height="150"
                image={product.image}
                alt={product.name}
                style={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" style={{ color: '#1976d2' }}>
                  {product.name}
                </Typography>
                <Typography variant="body1" style={{ color: '#424242' }}>
                  {product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ProductListingPage;