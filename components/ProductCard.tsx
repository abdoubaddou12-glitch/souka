
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onAddToCart }) => {
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  return (
    <div className="bg-white rounded hover:shadow-xl transition-shadow cursor-pointer relative group flex flex-col h-full overflow-hidden border border-transparent hover:border-gray-100">
      <div className="relative aspect-square overflow-hidden" onClick={() => onClick(product.id)}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <span className="absolute top-2 right-2 bg-[#feefd3] text-jumia-orange text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
      </div>
      
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-sm line-clamp-2 mb-2 h-10 group-hover:text-jumia-orange transition-colors" onClick={() => onClick(product.id)}>
          {product.name}
        </h3>
        
        <div className="mb-2">
          <span className="text-lg font-bold">{product.price.toLocaleString()} درهم</span>
          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through block leading-none">
              {product.oldPrice.toLocaleString()} درهم
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-[10px] text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`${i < Math.floor(product.rating) ? 'fas' : 'far'} fa-star`}></i>
            ))}
          </div>
          <span className="text-[10px] text-gray-400">({product.reviewsCount})</span>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="mt-auto w-full bg-jumia-orange text-white py-2 rounded text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0"
        >
          أضف إلى السلة
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
