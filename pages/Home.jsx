import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { faker } from '@faker-js/faker';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // Generate mock products
  const generateProducts = () => {
    const categories = ['玫瑰花束', '郁金香', '向日葵', '百合花', '节日花束', '婚礼花束'];
    const products = [];
    
    for (let i = 0; i < 8; i++) {
      products.push({
        id: i + 1,
        name: faker.commerce.productName() + '花束',
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 50, max: 500 })),
        originalPrice: Math.random() > 0.7 ? parseFloat(faker.commerce.price({ min: 60, max: 600 })) : null,
        image: `https://picsum.photos/400/400?random=${i + 1}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        rating: (Math.random() * 2 + 3).toFixed(1),
        isOnSale: Math.random() > 0.7,
        isNew: Math.random() > 0.8
      });
    }
    
    return products;
  };

  useEffect(() => {
    setFeaturedProducts(generateProducts());
  }, []);

  const categories = [
    { name: '玫瑰花束', path: '/category/roses', icon: '🌹', color: 'from-red-500 to-pink-500' },
    { name: '郁金香', path: '/category/tulips', icon: '🌷', color: 'from-purple-500 to-pink-500' },
    { name: '向日葵', path: '/category/sunflowers', icon: '🌻', color: 'from-yellow-500 to-orange-500' },
    { name: '百合花', path: '/category/lilies', icon: '🤍', color: 'from-gray-500 to-white' },
    { name: '节日花束', path: '/category/holiday', icon: '🎁', color: 'from-green-500 to-red-500' },
    { name: '婚礼花束', path: '/category/wedding', icon: '💒', color: 'from-pink-500 to-white' },
  ];

  const occasions = [
    { name: '生日祝福', image: 'https://picsum.photos/300/200?random=10', description: '为特别的人送上生日祝福' },
    { name: '爱情表白', image: 'https://picsum.photos/300/200?random=11', description: '用花语诉说心意' },
    { name: '母亲节', image: 'https://picsum.photos/300/200?random=12', description: '感谢母亲的无私奉献' },
    { name: '道歉和解', image: 'https://picsum.photos/300/200?random=13', description: '真诚的道歉，重归于好' },
  ];

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
              用鲜花传递
              <span className="block text-yellow-300">美好情感</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up animation-delay-200">
              精选优质鲜花，为每个特别的时刻增添色彩
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
              <Link 
                to="/category/roses" 
                className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                立即选购
              </Link>
              <Link 
                to="/category/wedding" 
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-200 transform hover:scale-105"
              >
                婚礼定制
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        {/* Categories Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">花卉分类</h2>
            <p className="text-xl text-gray-600">选择您喜爱的花卉类型</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className="group"
              >
                <div className={`relative p-8 rounded-2xl bg-gradient-to-br ${category.color} text-white transform group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold text-sm md:text-base">{category.name}</h3>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-2xl transition-colors duration-300"></div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">精选推荐</h2>
            <p className="text-xl text-gray-600">为您精心挑选的优质鲜花</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <window.ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/category/roses" 
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-200 transform hover:scale-105 shadow-lg inline-block"
            >
              查看更多商品
            </Link>
          </div>
        </section>

        {/* Occasions Section */}
        <section className="py-16 bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">适合场合</h2>
            <p className="text-xl text-gray-600">不同场合，不同心意</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
            {occasions.map((occasion) => (
              <div key={occasion.name} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={occasion.image} 
                    alt={occasion.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{occasion.name}</h3>
                  <p className="text-gray-600 text-sm">{occasion.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">新鲜保证</h3>
              <p className="text-gray-600">所有鲜花均为当日采摘，保证新鲜度和品质</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">准时配送</h3>
              <p className="text-gray-600">同城2小时送达，全国24小时内送到</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">贴心服务</h3>
              <p className="text-gray-600">专业花艺师设计，提供个性化定制服务</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

window.Home = Home;