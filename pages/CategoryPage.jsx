import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { faker } from '@faker-js/faker';

function CategoryPage() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Category mapping
  const categoryNames = {
    roses: '玫瑰花束',
    tulips: '郁金香',
    sunflowers: '向日葵',
    lilies: '百合花',
    holiday: '节日花束',
    wedding: '婚礼花束',
    search: '搜索结果'
  };

  // Generate mock products for category
  const generateCategoryProducts = () => {
    const currentCategory = categoryNames[category] || '玫瑰花束';
    const productCount = 12 + Math.floor(Math.random() * 8);
    const products = [];
    
    for (let i = 0; i < productCount; i++) {
      products.push({
        id: `${category}-${i + 1}`,
        name: searchQuery 
          ? faker.commerce.productName() + '花束'
          : `${currentCategory} ${faker.commerce.productAdjective()}`,
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 30, max: 800 })),
        originalPrice: Math.random() > 0.6 ? parseFloat(faker.commerce.price({ min: 50, max: 900 })) : null,
        image: `https://picsum.photos/400/400?random=${category}${i + 1}`,
        category: currentCategory,
        rating: (Math.random() * 2 + 3).toFixed(1),
        isOnSale: Math.random() > 0.7,
        isNew: Math.random() > 0.8,
        inStock: Math.random() > 0.1
      });
    }
    
    return products;
  };

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newProducts = generateCategoryProducts();
      setProducts(newProducts);
      setFilteredProducts(newProducts);
      setLoading(false);
    }, 500);
  }, [category, searchQuery]);

  // Filter and sort products
  useEffect(() => {
    let filtered = products.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case 'newest':
        filtered.sort((a, b) => b.isNew - a.isNew);
        break;
      default:
        // Default sorting - featured items first
        filtered.sort((a, b) => b.isOnSale - a.isOnSale);
    }

    setFilteredProducts(filtered);
  }, [products, sortBy, priceRange]);

  const currentCategoryName = searchQuery 
    ? `"${searchQuery}" 的搜索结果` 
    : categoryNames[category] || '所有商品';

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="bg-gray-200 h-8 w-64 rounded mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-80"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {currentCategoryName}
        </h1>
        <p className="text-gray-600">
          共找到 {filteredProducts.length} 件商品
        </p>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Sort */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">排序:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="default">推荐排序</option>
              <option value="price-low">价格从低到高</option>
              <option value="price-high">价格从高到低</option>
              <option value="rating">评分最高</option>
              <option value="newest">最新商品</option>
            </select>
          </div>

          {/* Price Filter */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">价格范围:</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="最低"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="最高"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-medium hover:bg-pink-200 transition-colors">
              特价商品
            </button>
            <button className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium hover:bg-green-200 transition-colors">
              现货
            </button>
            <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors">
              新品
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">没有找到商品</h3>
          <p className="text-gray-600">请尝试调整筛选条件</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <window.ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Load More */}
      {filteredProducts.length > 0 && (
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-200 transform hover:scale-105">
            加载更多
          </button>
        </div>
      )}
    </div>
  );
}

window.CategoryPage = CategoryPage;