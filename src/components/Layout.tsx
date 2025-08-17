import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, ShoppingBag, HeadphonesIcon } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  if (isAdmin) {
    return <div>{children}</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">PremiumOTT</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/catalog" className="text-gray-700 hover:text-blue-600 transition-colors">Catalog</Link>
              <Link to="/track" className="text-gray-700 hover:text-blue-600 transition-colors">Track Order</Link>
              <Link to="/support" className="text-gray-700 hover:text-blue-600 transition-colors">Support</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link to="/track" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">PremiumOTT</span>
              </Link>
              <p className="text-gray-400 mb-4">
                Get premium OTT subscriptions at unbeatable prices. Netflix, YouTube Premium, Spotify, and more at the lowest rates in India.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/catalog" className="text-gray-400 hover:text-white transition-colors">Browse Catalog</Link></li>
                <li><Link to="/track" className="text-gray-400 hover:text-white transition-colors">Track Order</Link></li>
                <li><Link to="/support" className="text-gray-400 hover:text-white transition-colors">Customer Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="https://wa.me/919876543210" className="text-gray-400 hover:text-white transition-colors">WhatsApp Support</a></li>
                <li><a href="mailto:support@premiumott.com" className="text-gray-400 hover:text-white transition-colors">Email Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2025 PremiumOTT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}