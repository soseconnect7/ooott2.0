import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, Shield, Zap, HeadphonesIcon, Check } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchProduct()
    }
  }, [id])

  const fetchProduct = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (data) {
      setProduct(data)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
          <Link to="/catalog" className="text-blue-600 hover:text-blue-700">← Back to catalog</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link></li>
            <li><span className="text-gray-500">/</span></li>
            <li><Link to="/catalog" className="text-gray-500 hover:text-gray-700">Catalog</Link></li>
            <li><span className="text-gray-500">/</span></li>
            <li><span className="text-gray-900 font-medium">{product.name}</span></li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image & Info */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
              <div className="flex items-center mb-6">
                <img
                  src={product.thumbnail_url}
                  alt={product.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="ml-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <p className="text-xl text-gray-600">{product.plan_type}</p>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">(4.8/5 - 1,234 reviews)</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {product.benefits && product.benefits.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">What's Included</h3>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">100% Genuine</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Instant Delivery</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <HeadphonesIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">24/7 Support</p>
              </div>
            </div>
          </div>

          {/* Purchase Section */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-green-600">₹{product.price}</span>
                  <span className="text-lg text-gray-500 ml-2">/ {product.plan_type}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Save up to 80% compared to official prices!</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-800">Safe & Secure Purchase</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Zap className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-800">Instant Activation (5-10 minutes)</span>
                  </div>
                </div>
              </div>

              <Link
                to={`/checkout?product=${product.id}`}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-center block text-lg shadow-lg hover:shadow-xl"
              >
                Buy Now - Get Instant Access
              </Link>

              <p className="text-xs text-gray-500 text-center mt-4">
                By purchasing, you agree to our terms of service. All sales are final.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">How it works</h3>
              <ol className="space-y-3">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-sm rounded-full flex items-center justify-center mr-3 mt-0.5">1</span>
                  <div>
                    <p className="font-medium">Complete Purchase</p>
                    <p className="text-sm text-gray-600">Fill your details and make payment via UPI</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-sm rounded-full flex items-center justify-center mr-3 mt-0.5">2</span>
                  <div>
                    <p className="font-medium">Payment Verification</p>
                    <p className="text-sm text-gray-600">Our team verifies your payment (usually within 5-10 minutes)</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-sm rounded-full flex items-center justify-center mr-3 mt-0.5">3</span>
                  <div>
                    <p className="font-medium">Get Access</p>
                    <p className="text-sm text-gray-600">Receive login credentials via email/WhatsApp</p>
                  </div>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
              <div className="space-y-3">
                <a href="https://wa.me/919876543210" className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <HeadphonesIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">WhatsApp Support</p>
                    <p className="text-sm text-gray-600">Get instant help via WhatsApp</p>
                  </div>
                </a>
                
                <Link to="/support" className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <HeadphonesIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Support Center</p>
                    <p className="text-sm text-gray-600">Browse FAQs and get help</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}