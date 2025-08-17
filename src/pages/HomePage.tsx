import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Star, Shield, Zap, HeadphonesIcon } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('stock_available', true)
      .limit(6)

    if (data) {
      setFeaturedProducts(data)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/catalog?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get Premium Subscriptions at 
              <span className="text-yellow-400"> Lowest Prices</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Netflix, YouTube Premium, Spotify, ChatGPT Plus & more at unbeatable rates. 
              100% genuine accounts with instant delivery.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for Netflix, YouTube Premium, Spotify..."
                  className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border-0 text-gray-900 shadow-lg focus:ring-4 focus:ring-blue-500/25"
                />
              </div>
            </form>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/catalog"
                className="bg-yellow-500 text-black px-8 py-4 rounded-xl text-lg font-semibold hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View All Subscriptions
              </Link>
              <Link 
                to="/track"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300"
              >
                Track Your Order
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose PremiumOTT?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide genuine premium subscriptions at the lowest prices with complete security and support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Genuine Accounts</h3>
              <p className="text-gray-600">All subscriptions are authentic and directly sourced from official platforms.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Delivery</h3>
              <p className="text-gray-600">Get your subscription details within minutes of payment verification.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support via WhatsApp and email.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Subscriptions</h2>
            <p className="text-xl text-gray-600">Get premium access to your favorite platforms at incredible prices.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product: any) => (
              <Link 
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={product.thumbnail_url} 
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.plan_type}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Buy Now
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/catalog"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View All Subscriptions
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"Got Netflix Premium for just ₹15! Amazing service and instant delivery. Highly recommended!"</p>
              <p className="text-sm font-medium text-gray-900">- Rahul K.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"YouTube Premium at ₹12/month is incredible! The support team is very responsive too."</p>
              <p className="text-sm font-medium text-gray-900">- Priya M.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"Genuine ChatGPT Plus subscription received within 10 minutes. Great prices and reliability!"</p>
              <p className="text-sm font-medium text-gray-900">- Amit S.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}