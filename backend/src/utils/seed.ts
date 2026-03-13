import dotenv from 'dotenv';
dotenv.config();

import database from '../config/database';
import { Product } from '../models/Product';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

const products = [
  { name: 'Linen Blazer', description: 'Relaxed-fit linen blazer perfect for summer events', price: 189, stockQuantity: 25, category: 'Tops', tags: ['blazer', 'linen', 'summer', 'semi-formal'], images: ['https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=500'], brand: 'ARIA Studio', sustainabilityScore: 8 },
  { name: 'Silk Slip Dress', description: 'Elegant bias-cut silk slip dress for evening occasions', price: 245, stockQuantity: 15, category: 'Dresses', tags: ['silk', 'evening', 'elegant', 'dress'], images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500'], brand: 'ARIA Studio', sustainabilityScore: 7 },
  { name: 'Wide Leg Trousers', description: 'High-waisted wide leg trousers in premium crepe fabric', price: 135, stockQuantity: 30, category: 'Bottoms', tags: ['trousers', 'wide-leg', 'formal', 'crepe'], images: ['https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=500'], brand: 'ARIA Studio', sustainabilityScore: 6 },
  { name: 'Oversized Knit Sweater', description: 'Chunky knit oversized sweater in merino wool blend', price: 165, stockQuantity: 20, category: 'Tops', tags: ['knit', 'sweater', 'casual', 'winter', 'cozy'], images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500'], brand: 'Cozy Co.', sustainabilityScore: 9 },
  { name: 'Leather Crossbody Bag', description: 'Minimalist genuine leather crossbody with gold hardware', price: 320, stockQuantity: 12, category: 'Accessories', tags: ['bag', 'leather', 'crossbody', 'minimalist'], images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500'], brand: 'Luxe Carry', sustainabilityScore: 5 },
  { name: 'Floral Midi Skirt', description: 'Flowy floral print midi skirt with elastic waistband', price: 98, stockQuantity: 35, category: 'Bottoms', tags: ['skirt', 'floral', 'midi', 'summer', 'casual'], images: ['https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500'], brand: 'Bloom Wear', sustainabilityScore: 7 },
  { name: 'Structured Tote Bag', description: 'Large structured tote in vegan leather, perfect for work', price: 195, stockQuantity: 18, category: 'Accessories', tags: ['tote', 'work', 'vegan', 'structured'], images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500'], brand: 'Luxe Carry', sustainabilityScore: 8 },
  { name: 'Tailored Blazer Dress', description: 'Power dressing blazer dress with belt detail', price: 275, stockQuantity: 10, category: 'Dresses', tags: ['blazer', 'dress', 'formal', 'power', 'office'], images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500'], brand: 'ARIA Studio', sustainabilityScore: 6 },
  { name: 'Denim Jacket', description: 'Classic oversized denim jacket with vintage wash', price: 145, stockQuantity: 40, category: 'Outerwear', tags: ['denim', 'jacket', 'casual', 'vintage', 'classic'], images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500'], brand: 'Denim Days', sustainabilityScore: 5 },
  { name: 'Cashmere Scarf', description: 'Ultra-soft 100% cashmere scarf in neutral tones', price: 120, stockQuantity: 22, category: 'Accessories', tags: ['scarf', 'cashmere', 'winter', 'luxury', 'neutral'], images: ['https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500'], brand: 'Cozy Co.', sustainabilityScore: 8 },
  { name: 'Wrap Maxi Dress', description: 'Versatile wrap maxi dress suitable for beach to brunch', price: 155, stockQuantity: 28, category: 'Dresses', tags: ['wrap', 'maxi', 'versatile', 'summer', 'beach'], images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500'], brand: 'Bloom Wear', sustainabilityScore: 7 },
  { name: 'High-Waist Jeans', description: 'Straight-cut high-waist jeans in organic cotton denim', price: 125, stockQuantity: 45, category: 'Bottoms', tags: ['jeans', 'denim', 'high-waist', 'casual', 'organic'], images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=500'], brand: 'Denim Days', sustainabilityScore: 9 },
];

async function seed() {
  await database.connect();
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`✅ Seeded ${products.length} products`);

  // Create admin user
  const adminExists = await User.findOne({ email: 'admin@arishopper.com' });
  if (!adminExists) {
    await User.create({
      fullName: 'Admin User',
      email: 'admin@arishopper.com',
      passwordHash: await bcrypt.hash('admin123', 12),
      role: 'admin',
    });
    console.log('✅ Admin user created: admin@arishopper.com / admin123');
  }

  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });
