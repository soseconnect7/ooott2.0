import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

// Customer Pages
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import TrackOrderPage from './pages/TrackOrderPage'
import SupportPage from './pages/SupportPage'

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminOrders from './pages/admin/AdminOrders'
import AdminProducts from './pages/admin/AdminProducts'

function App() {
  return (
    <Router>
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={
          <Layout>
            <HomePage />
          </Layout>
        } />
        <Route path="/catalog" element={
          <Layout>
            <CatalogPage />
          </Layout>
        } />
        <Route path="/product/:id" element={
          <Layout>
            <ProductDetailPage />
          </Layout>
        } />
        <Route path="/checkout" element={
          <Layout>
            <CheckoutPage />
          </Layout>
        } />
        <Route path="/order-confirmation" element={
          <Layout>
            <OrderConfirmationPage />
          </Layout>
        } />
        <Route path="/track" element={
          <Layout>
            <TrackOrderPage />
          </Layout>
        } />
        <Route path="/support" element={
          <Layout>
            <SupportPage />
          </Layout>
        } />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/products" element={<AdminProducts />} />
      </Routes>
    </Router>
  )
}

export default App