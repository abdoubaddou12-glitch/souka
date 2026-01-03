
import { Product, Category, Vendor } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'سوبر ماركت', icon: 'fa-basket-shopping' },
  { id: '2', name: 'هواتف وأجهزة تابلت', icon: 'fa-mobile-screen' },
  { id: '3', name: 'أجهزة منزلية', icon: 'fa-tv' },
  { id: '4', name: 'إلكترونيات', icon: 'fa-plug' },
  { id: '5', name: 'الصحة والجمال', icon: 'fa-heart-pulse' },
  { id: '6', name: 'أزياء', icon: 'fa-shirt' },
  { id: '7', name: 'منتجات العناية بالأطفال', icon: 'fa-baby' },
  { id: '8', name: 'الكمبيوتر', icon: 'fa-laptop' },
];

export const MOCK_VENDORS: Vendor[] = [
  { id: 'v1', name: 'سامسونج المغرب', logo: 'https://picsum.photos/100/100?random=50', rating: 4.9, joinedDate: '2023-01-10', totalSales: 1540 },
  { id: 'v2', name: 'متجر الأناقة', logo: 'https://picsum.photos/100/100?random=51', rating: 4.5, joinedDate: '2023-05-15', totalSales: 890 },
  { id: 'v3', name: 'عالم التكنولوجيا', logo: 'https://picsum.photos/100/100?random=52', rating: 4.2, joinedDate: '2024-02-01', totalSales: 320 },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'هاتف ذكي سامسونج جالكسي S23 الترا',
    price: 12499,
    oldPrice: 14000,
    image: 'https://picsum.photos/400/400?random=1',
    category: 'هواتف وأجهزة تابلت',
    rating: 4.8,
    reviewsCount: 156,
    vendorId: 'v1',
    vendorName: 'سامسونج المغرب',
    description: 'أفضل هاتف اندرويد في السوق مع كاميرا بدقة 200 ميجابيكسل.',
    isFlashSale: true
  },
  {
    id: 'p2',
    name: 'ماكينة قهوة نسبريسو إسينزا ميني',
    price: 1299,
    oldPrice: 1599,
    image: 'https://picsum.photos/400/400?random=2',
    category: 'أجهزة منزلية',
    rating: 4.5,
    reviewsCount: 89,
    vendorId: 'v2',
    vendorName: 'متجر الأناقة',
    description: 'قهوة مثالية في كل مرة بلمسة واحدة.'
  },
  {
    id: 'p3',
    name: 'ساعة ذكية ابل واتش الاصدار 8',
    price: 4500,
    oldPrice: 5200,
    image: 'https://picsum.photos/400/400?random=3',
    category: 'إلكترونيات',
    rating: 4.9,
    reviewsCount: 210,
    vendorId: 'v3',
    vendorName: 'عالم التكنولوجيا',
    description: 'راقب صحتك ونشاطك الرياضي بدقة متناهية.',
    isFlashSale: true
  }
];
