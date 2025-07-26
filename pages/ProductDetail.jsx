import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { faker } from '@faker-js/faker';
const useCart = window.useCart;
function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching product data
    const fetchProduct = () => {
      const categories = ['玫瑰花束', '郁金香', '向日葵', '百合花', '节日花束', '婚礼花束'];
      const productData = {
        id: parseInt(id),
        name: faker.commerce.productName() + '精美花束',
        description: faker.lorem.paragraphs(3, '\n\n'),
        price: parseFloat(faker.commerce.price({ min: 80, max: 600 })),
        originalPrice: Math.random() > 0.6 ? parseFloat(faker.commerce.price({ min: 100, max: 700 })) : null,
        images: [
          `https://picsum.photos/600/600?random=${id}1`,
          `https://picsum.photos/600/600?random=${id}2`,
          `https://picsum.photos/600/600?random=${id}3`,
          `https://picsum.photos/600/600?random=${id}4`,
        ],
        category: categories[Math.floor(Math.random() * categories.length)],
        rating: (Math.random() * 2 + 3).toFixed(1),
        reviews: Math.floor(Math.random() * 200 + 10),
        isOnSale: Math.random() > 0.7,
        inStock: Math.random() > 0.1,
        features: [
          '新鲜采摘，当日配送',
          '专业包装，精美呈现',
          '免费配送卡片',
          '7天保鲜保证'
        ],
        care: [
          '将花茎斜切45度角',
          '每2-3天换一次清水',
          '避免阳光直射',
          '适当修剪枯萎花朵'
        ]
      };
      
      setProduct(productData);
      setLoading(false);
    };

    setTimeout(fetchProduct, 500);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="bg-gray-200 rounded-2xl h-96"></div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-lg h-20"></div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-200 h-8 rounded"></div>
              <div className="bg-gray-200 h-6 rounded"></div>
              <div className="bg-gray-200 h-24 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">商品未找到</h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-200"
          >
            返回上页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li><a href="/" className="hover:text-pink-600">首页</a></li>
          <li>/</li>
          <li><a href={`/category/${product.category}`} className="hover:text-pink-600">{product.category}</a></li>
          <li>/</li>
          <li className="text-gray-900">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative bg-gray-50 rounded-2xl overflow-hidden">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-96 lg:h-[500px] object-cover"
            />
            {product.isOnSale && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                特价
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  activeImage === index ? 'border-pink-500' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-20 object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.643 9.184c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
              </div>
              <span className="text-sm text-gray-500">{product.reviews} 条评价</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {product.category}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <span className="text-4xl font-bold text-pink-600">¥{product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through">¥{product.originalPrice}</span>
            )}
            {product.originalPrice && (
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                省 ¥{(product.originalPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          {/* Quantity */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">数量:</span>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-l-lg bg-gray-100 border border-gray-200 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 h-10 border-t border-b border-gray-200 text-center focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-r-lg bg-gray-100 border border-gray-200 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <span className="text-sm text-gray-500">
              库存: {product.inStock ? '有货' : '缺货'}
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5h15.5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
              </svg>
              <span>加入购物车</span>
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="flex-1 bg-white border-2 border-pink-500 text-pink-500 py-3 px-6 rounded-xl font-semibold hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              立即购买
            </button>
          </div>

          {/* Features */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3">产品特色</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">商品描述</h3>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">护理说明</h3>
          <ul className="space-y-3">
            {product.care.map((instruction, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </span>
                <span className="text-gray-700">{instruction}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

window.ProductDetail = ProductDetail;