import React from 'react'
import { MessageCircle, Mail, HelpCircle, Clock, Shield, Zap } from 'lucide-react'

export default function SupportPage() {
  const faqs = [
    {
      question: "How long does it take to receive my subscription?",
      answer: "After payment verification (usually 5-10 minutes), you'll receive your login credentials within minutes via email and WhatsApp."
    },
    {
      question: "Are the subscriptions genuine?",
      answer: "Yes, all our subscriptions are 100% genuine and sourced directly from official platforms. We guarantee authenticity."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept UPI payments and bank transfers. All payments are processed manually for security."
    },
    {
      question: "Can I track my order?",
      answer: "Yes! Use your Order ID on our Track Order page to check real-time status updates."
    },
    {
      question: "What if my payment fails verification?",
      answer: "If payment verification fails, we'll contact you immediately. You can also reach out to our support team for assistance."
    },
    {
      question: "Do you provide refunds?",
      answer: "Due to the nature of digital products, we don't provide refunds once credentials are delivered. However, we guarantee working accounts."
    },
    {
      question: "How do I change account details after purchase?",
      answer: "Contact our support team with your Order ID, and we'll help you with any necessary changes to your account."
    },
    {
      question: "What if my subscription stops working?",
      answer: "We provide full support for all subscriptions. Contact us immediately if you face any issues, and we'll resolve them quickly."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Support Center</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get help with your orders, payments, and subscriptions. We're here to assist you 24/7.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <a
            href="https://wa.me/919876543210"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-200"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">WhatsApp Support</h3>
                <p className="text-green-600 font-medium">Instant Response</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Get immediate help via WhatsApp. Our team responds within minutes during business hours.
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-2" />
              Available 24/7
            </div>
          </a>

          <a
            href="mailto:support@premiumott.com"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Email Support</h3>
                <p className="text-blue-600 font-medium">Detailed Assistance</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Send us detailed queries via email. We'll respond with comprehensive solutions.
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-2" />
              Response within 2 hours
            </div>
          </a>
        </div>

        {/* Service Guarantees */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Our Service Guarantees</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">100% Genuine</h3>
              <p className="text-gray-600 text-sm">All subscriptions are authentic and verified</p>
            </div>

            <div className="text-center p-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Delivery</h3>
              <p className="text-gray-600 text-sm">Receive credentials within 5-10 minutes</p>
            </div>

            <div className="text-center p-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Round-the-clock customer assistance</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-center mb-8">
            <HelpCircle className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details key={index} className="group border border-gray-200 rounded-lg">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <h3 className="text-lg font-medium text-gray-900 pr-4">{faq.question}</h3>
                  <div className="flex-shrink-0 w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
        <div className="mt-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8">
          <h3 className="text-2xl font-semibold mb-4">Still Need Help?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is always ready to help you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://wa.me/919876543210"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Chat on WhatsApp
            </a>
            <a
              href="mailto:support@premiumott.com"
              className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-8 rounded-lg transition-colors border border-white/30"
            >
              Send Email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}