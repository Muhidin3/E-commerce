'use client'
import React, { useState } from 'react';
import { TextField, Button, MenuItem, Typography, Box } from '@mui/material';
import axios from 'axios';

function Mainpage({session}:{session :{user:{name:string,id:string}}}) {
  console.log(session)
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('new');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [image, setImage] = useState<File | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('condition', condition);
    formData.append('category', category);
    formData.append('subcategory', subcategory);
    formData.append('user',session?.user?.id)
    if (image) {
      formData.append('image', image);
    }

    const res = await axios.post('/api/products', formData, { });
    console.log(res.data);
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Post a Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: '15px' }}>
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </Box>

        <Box sx={{ marginBottom: '15px' }}>
          <TextField
            label="Price"
            variant="outlined"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Box>

        <Box sx={{ marginBottom: '15px' }}>
          <TextField
            label="Condition"
            variant="outlined"
            select
            fullWidth
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          >
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="used">Used</MenuItem>
          </TextField>
        </Box>

        <Box sx={{ marginBottom: '15px' }}>
          <TextField
            label="Category"
            variant="outlined"
            select
            fullWidth
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory(''); // Reset subcategory when category changes
            }}
            required
          >
            {Object.keys(categories).map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {category && (
          <Box sx={{ marginBottom: '15px' }}>
            <TextField
              label="Subcategory"
              variant="outlined"
              select
              fullWidth
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              required
            >
              {categories[category].map((subcat) => (
                <MenuItem key={subcat} value={subcat}>
                  {subcat}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}

        <Box sx={{ marginBottom: '15px' }}>
          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Box>

        <Box sx={{ marginBottom: '15px' }}>
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ padding: '10px' }}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            />
          </Button>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ padding: '10px' }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default Mainpage;