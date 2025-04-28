'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  InputLabel,
} from '@mui/material';
import { redirect } from 'next/navigation';

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

export default function FilterDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [condition, setCondition] = useState('');
  const [recentlyPosted, setRecentlyPosted] = useState('');


  const handleCategoryChange = (event:{target:{value:string}}) => {
    setSelectedCategory(event.target.value);
    setSelectedSubcategory(''); 
  };

  const handleApplyFilters = () => {
    const filters = {
      category: selectedCategory,
      subcategory: selectedSubcategory,
      minPrice,
      maxPrice,
      condition,
      recentlyPosted,
    };
    console.log('Applied Filters:', filters);
    onClose();
    redirect(`/products/filter?category=${selectedCategory}&subcategory=${selectedSubcategory}&condition=${condition}&maxPrice=&${maxPrice}recentlyPosted=${recentlyPosted}&minPrice=${minPrice}`)
  };

  const subcategories = selectedCategory ? categories[selectedCategory] : [];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Filter Listings</DialogTitle>
      <DialogContent dividers>
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select value={selectedCategory} onChange={handleCategoryChange} label="Category">
            {Object.keys(categories).map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" disabled={!selectedCategory}>
          <InputLabel>Subcategory</InputLabel>
          <Select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            label="Subcategory"
          >
            {subcategories.map((sub) => (
              <MenuItem key={sub} value={sub}>
                {sub}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <TextField
            label="Min Price"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            fullWidth
          />
          <TextField
            label="Max Price"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            fullWidth
          />
        </div>

        <FormControl component="fieldset" margin="normal">
          <RadioGroup
            row
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <FormControlLabel value="new" control={<Radio />} label="New" />
            <FormControlLabel value="used" control={<Radio />} label="Used" />
          </RadioGroup>
        </FormControl>

        <FormControl fullWidth margin="normal">
        <InputLabel>Sort by</InputLabel>
        <Select
            value={recentlyPosted}
            onChange={(e) => setRecentlyPosted(e.target.value)}
            label="Sort by"
        >
            <MenuItem value="newest">Newest First</MenuItem>
            <MenuItem value="oldest">Oldest First</MenuItem>
        </Select>
        </FormControl>



      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleApplyFilters}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
