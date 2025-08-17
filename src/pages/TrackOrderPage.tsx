import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Package, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function TrackOrderPage() {
  const [searchParams] = useSearchParams()
  const [orderId, setOrderId] = useState(searchParams.get('orderId') || '')
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderId.trim()) {
      setError('Please enter a valid Order ID')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { data, error: fetchError } = await supabase
        .from('orders')
        .select('*')
        .eq('order_id', orderId.trim())
        .single()

      if (fetchError || !data) {
        setError('Order not found. Please check your Order ID and try again.')
        setOrder(null)
      } else {
        setOrder(data)
      }
    } catch (err) {
      setError('Failed to fetch order details. Please try again.')
      setOrder(null)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-6 h-6 text-yellow-600" />
      case 'processing':
        return <AlertCircle className="w-6 h-6 text-blue-600" />
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-600" />
      case 'rejected':
        return <XCircle className="w-6 h-6 text-red-600" />
      default:
        return <Package className="w-6 h-6 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Your payment has been received and is being verified. This usually takes 5-10 minutes.'
      case 'processing':
        return 'Payment verified! We are setting up your premium account. You will receive credentials soon.'
      case 'completed':
        return 'Your order is complete! Check your email and WhatsApp for login credentials.'
      case 'rejected':
        return 'There was an issue with your payment. Please contact support for assistance.'
      default:
        return 'Unknown status. Please contact support for more information.'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-lg text-gray-600">
            Enter your Order ID to check the status of your subscription purchase.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <form onSubmit={handleTrackOrder} className="max-w-md mx-auto">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order ID
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter your Order ID (e.g., OTT123456ABCD)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Track Order'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-center">{error}</p>
            </div>
          )}
        </div>

        {/* Order Details */}
        {order && (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Order #{order.order_id}</h2>
                    <p className="text-blue-100">Placed on {formatDate(order.created_at)}</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-2 capitalize">{order.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Product Details</h3>
                    <div className="space-y-2">
                      <p><span className="text-gray-600">Product:</span> {order.product_name}</p>
                      <p><span className="text-gray-600">Amount Paid:</span> ₹{order.amount}</p>
                      <p><span className="text-gray-600">Payment Method:</span> {order.payment_method.toUpperCase()}</p>
                      {order.transaction_id && (
                        <p><span className="text-gray-600">Transaction ID:</span> {order.transaction_id}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Customer Information</h3>
                    <div className="space-y-2">
                      <p><span className="text-gray-600">Name:</span> {order.customer_name}</p>
                      <p><span className="text-gray-600">Email:</span> {order.email}</p>
                      <p><span className="text-gray-600">Phone:</span> {order.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Status</h3>
              
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start">
                  {getStatusIcon(order.status)}
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900 capitalize">{order.status}</h4>
                    <p className="text-gray-600">{getStatusMessage(order.status)}</p>
                    <p className="text-sm text-gray-500 mt-1">Last updated: {formatDate(order.updated_at)}</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      order.status === 'pending' || order.status === 'processing' || order.status === 'completed' || order.status === 'rejected'
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900">Order Placed</p>
                      <p className="text-sm text-gray-600">{formatDate(order.created_at)}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      order.status === 'processing' || order.status === 'completed'
                        ? 'bg-green-600 text-white' 
                        : order.status === 'rejected'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {order.status === 'rejected' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900">Payment Verification</p>
                      <p className="text-sm text-gray-600">
                        {order.status === 'rejected' ? 'Payment verification failed' : 
                         order.status === 'pending' ? 'Verifying payment...' : 'Payment verified'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      order.status === 'completed'
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900">Delivery Complete</p>
                      <p className="text-sm text-gray-600">
                        {order.status === 'completed' ? 'Credentials delivered' : 'Pending completion'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Notes */}
            {order.admin_notes && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Update from Support Team</h3>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-gray-700">{order.admin_notes}</p>
                </div>
              </div>
            )}

            {/* Delivery Details */}
            {order.delivery_details && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Delivery Information</h3>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-gray-700">{order.delivery_details}</p>
                </div>
              </div>
            )}

            {/* Support Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href={`https://wa.me/919876543210?text=Hi, my order ID is ${order.order_id}. I need help with my order.`}
                  className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">WhatsApp Support</p>
                    <p className="text-sm text-gray-600">Get instant help</p>
                  </div>
                </a>

                <a
                  href={`mailto:support@premiumott.com?subject=Order Support - ${order.order_id}&body=Hi, I need help with my order ${order.order_id}.`}
                  className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email Support</p>
                    <p className="text-sm text-gray-600">Send us an email</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}