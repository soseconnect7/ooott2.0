import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle, Copy, MessageCircle, Mail, Clock } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function OrderConfirmationPage() {
  const [searchParams] = useSearchParams()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const orderId = searchParams.get('orderId')

  useEffect(() => {
    if (orderId) {
      fetchOrder()
    }
  }, [orderId])

  const fetchOrder = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_id', orderId)
      .single()

    if (data) {
      setOrder(data)
    }
    setLoading(false)
  }

  const copyOrderId = async () => {
    if (orderId) {
      await navigator.clipboard.writeText(orderId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order not found</h2>
          <p className="text-gray-600 mb-4">Please check your order ID and try again.</p>
          <Link to="/track" className="text-blue-600 hover:text-blue-700">Track Order</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-lg text-gray-600">
            Your order has been received and is being processed.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Order ID</p>
                <p className="text-2xl font-bold">{order.order_id}</p>
              </div>
              <button
                onClick={copyOrderId}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <Copy className="w-4 h-4 mr-2" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Product Information</h3>
                <div className="space-y-2">
                  <p><span className="text-gray-600">Product:</span> {order.product_name}</p>
                  <p><span className="text-gray-600">Amount:</span> ₹{order.amount}</p>
                  <p><span className="text-gray-600">Status:</span> 
                    <span className="ml-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      Pending Verification
                    </span>
                  </p>
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

            {order.notes && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
                <p className="text-gray-700">{order.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">What happens next?</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-0.5">
                <span className="text-blue-600 font-semibold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Payment Verification</h4>
                <p className="text-gray-600">Our team will verify your payment within 5-10 minutes.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-0.5">
                <span className="text-blue-600 font-semibold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Account Setup</h4>
                <p className="text-gray-600">We'll prepare your premium subscription account.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-0.5">
                <span className="text-green-600 font-semibold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Instant Delivery</h4>
                <p className="text-gray-600">You'll receive login credentials via email and WhatsApp.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Support & Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to={`/track?orderId=${order.order_id}`}
            className="bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-700 transition-colors text-center"
          >
            <Clock className="w-8 h-8 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Track Order</h3>
            <p className="text-sm text-blue-100">Monitor your order status</p>
          </Link>

          <a
            href={`https://wa.me/919876543210?text=Hi, my order ID is ${order.order_id}. I need help with my order.`}
            className="bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition-colors text-center"
          >
            <MessageCircle className="w-8 h-8 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">WhatsApp Support</h3>
            <p className="text-sm text-green-100">Get instant help</p>
          </a>

          <a
            href={`mailto:support@premiumott.com?subject=Order Support - ${order.order_id}`}
            className="bg-gray-600 text-white p-6 rounded-xl hover:bg-gray-700 transition-colors text-center"
          >
            <Mail className="w-8 h-8 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-gray-100">Send us an email</p>
          </a>
        </div>

        {/* Important Note */}
        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
          <h4 className="font-semibold text-yellow-800 mb-2">Important:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Keep your Order ID safe - you'll need it to track your order</li>
            <li>• Check your email and WhatsApp for updates</li>
            <li>• If payment verification takes longer than expected, contact our support</li>
            <li>• All premium accounts are genuine and come with full warranty</li>
          </ul>
        </div>
      </div>
    </div>
  )
}