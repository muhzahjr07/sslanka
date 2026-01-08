
import { Product, Service, Executive, Achievement } from './types';

// Business Logic: 30% Markup (Hidden from UI labels)
const calculateRetailPrice = (base: number) => Math.round(base * 1.3);

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'ASUS ROG Zephyrus G14 (2024)',
    category: 'Laptops',
    supplier: 'Barclays.lk',
    basePrice: 520000,
    retailPrice: calculateRetailPrice(520000),
    imageUrl: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=800',
    description: 'The pinnacle of portable gaming. AMD Ryzen 9, OLED display, and RTX 4070.',
    specs: ['Ryzen 9 8945HS', '32GB DDR5', '1TB Gen4 SSD', 'RTX 4070 8GB']
  },
  {
    id: '2',
    name: 'HP EliteBook 840 G10 Business',
    category: 'Laptops',
    supplier: 'Newcom.lk',
    basePrice: 385000,
    retailPrice: calculateRetailPrice(385000),
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800',
    description: 'Secure, manageable, and powerful laptop for the modern professional.',
    specs: ['Core i7-1355U', '16GB RAM', '512GB SSD', 'WUXGA IPS Display']
  },
  {
    id: '3',
    name: 'Logitech MX Master 3S Graphite',
    category: 'Accessories',
    supplier: 'Barclays.lk',
    basePrice: 35000,
    retailPrice: calculateRetailPrice(35000),
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=800',
    description: 'Iconic mouse remastered. Precision tracking and near-silent clicks.',
    specs: ['8K DPI Tracking', 'MagSpeed Scroll', 'Multi-OS support']
  },
  {
    id: '4',
    name: 'Ubiquiti UniFi Dream Router (UDR)',
    category: 'Networking',
    supplier: 'Newcom.lk',
    basePrice: 135000,
    retailPrice: calculateRetailPrice(135000),
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
    description: 'Next-generation WiFi 6 router with integrated security and app server.',
    specs: ['WiFi 6 Technology', 'SD Card Slot for NVR', '4-Port Switch with PoE']
  },
  {
    id: '5',
    name: 'Dell UltraSharp 32" 4K Video Conf',
    category: 'Accessories',
    supplier: 'Barclays.lk',
    basePrice: 245000,
    retailPrice: calculateRetailPrice(245000),
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
    description: 'Built-in 4K intelligent webcam, echo-cancelling mic, and dual 14W speakers.',
    specs: ['4K UHD', 'IPS Black Tech', 'USB-C Hub (90W)']
  },
  {
    id: '9',
    name: 'MacBook Pro 14" M3 Pro Chip',
    category: 'Laptops',
    supplier: 'Barclays.lk',
    basePrice: 685000,
    retailPrice: calculateRetailPrice(685000),
    imageUrl: 'https://images.unsplash.com/photo-1517336714460-4c504990d165?auto=format&fit=crop&q=80&w=800',
    description: 'The most advanced chips for a pro laptop. Incredible battery life up to 22h.',
    specs: ['M3 Pro 11-core CPU', '18GB Unified Memory', '512GB SSD', 'Liquid Retina XDR']
  },
  {
    id: '10',
    name: 'MikroTik Cloud Core Router 2004',
    category: 'Networking',
    supplier: 'Newcom.lk',
    basePrice: 215000,
    retailPrice: calculateRetailPrice(215000),
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800',
    description: 'Powerful networking router for ISPs and medium enterprises.',
    specs: ['12x 10G SFP+ Ports', 'Dual Redundant Power', '4GB RAM', 'ARM 64bit CPU']
  },
  {
    id: '11',
    name: 'Seagate IronWolf Pro 20TB NAS',
    category: 'Accessories',
    supplier: 'Barclays.lk',
    basePrice: 195000,
    retailPrice: calculateRetailPrice(195000),
    imageUrl: 'https://images.unsplash.com/photo-1531492746377-41be9150bb73?auto=format&fit=crop&q=80&w=800',
    description: 'Optimized for NAS with AgileArray for always-on reliability.',
    specs: ['20TB Capacity', '7200 RPM', 'SATA 6Gb/s', '300TB/year workload']
  },
  {
    id: '12',
    name: 'APC Smart-UPS 1500VA LCD',
    category: 'Accessories',
    supplier: 'Barclays.lk',
    basePrice: 95000,
    retailPrice: calculateRetailPrice(95000),
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
    description: 'Intelligent and efficient network power protection.',
    specs: ['1000 Watts / 1500 VA', 'Line Interactive', 'Sine Wave Output']
  }
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Computer Maintenance',
    description: 'Comprehensive yearly maintenance (AMC) to ensure longevity and optimal performance of your IT assets.',
    icon: 'fa-screwdriver-wrench'
  },
  {
    id: 's2',
    title: 'Laptops & Desktops',
    description: 'High-performance computing solutions tailored for both personal and enterprise business demands.',
    icon: 'fa-laptop'
  },
  {
    id: 's3',
    title: 'Data Recovery',
    description: 'Advanced data retrieval services for failed hard drives and storage systems with a high success rate.',
    icon: 'fa-database'
  },
  {
    id: 's4',
    title: 'Networking & Security',
    description: 'Robust infrastructure setups and fortified security measures to protect your digital perimeter.',
    icon: 'fa-shield-halved'
  },
  {
    id: 's5',
    title: 'Software Installation',
    description: 'End-to-end installation and configuration of OS, productivity suites, and specialized industry software.',
    icon: 'fa-code'
  },
  {
    id: 's6',
    title: 'PC Tune-ups',
    description: 'Optimization services to remove bottlenecks, viruses, and bloatware from your existing systems.',
    icon: 'fa-bolt'
  }
];

export const EXECUTIVES: Executive[] = [
  {
    name: 'Mr. Sadeek Jauffer',
    role: 'CEO',
    experience: '20+ Years',
    bio: 'A visionary leader who has steered the course of Smart Solutions Lanka with strategic acumen and unwavering commitment.',
    imageUrl: 'https://picsum.photos/seed/ceo/400/400'
  },
  {
    name: 'Mr. K.P. Sampath Perera',
    role: 'Financial Analyst',
    experience: '5 Years',
    bio: 'Driving force in enhancing financial performance through astute insights and strategic optimization.',
    imageUrl: 'https://picsum.photos/seed/finance/400/400'
  }
];

export const HISTORY: Achievement[] = [
  { year: '2019', title: 'Foundation', description: 'Established with a visionary mission to provide high-quality IT solutions in Sri Lanka.' },
  { year: '2025', title: 'Present Day', description: 'Operating as a prominent player in the IT sector with over 25 highly skilled professionals.' }
];
