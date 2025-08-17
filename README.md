# PremiumOTT - E-commerce System for OTT Subscriptions

A lightweight, production-ready e-commerce platform for selling premium OTT and digital subscriptions at affordable rates. Built with React, TypeScript, Tailwind CSS, and Supabase.

## 🌟 Key Features

### Customer Features
- **No Registration Required**: Customers only need Order ID to track purchases
- **Beautiful Product Catalog**: Browse Netflix, YouTube Premium, Spotify, ChatGPT Plus, and more
- **Simple Checkout Flow**: Easy payment with UPI/Bank Transfer
- **Real-time Order Tracking**: Track order status with Order ID
- **Mobile-First Design**: Fully responsive across all devices
- **WhatsApp Integration**: Direct customer support via WhatsApp

### Admin Features
- **Comprehensive Dashboard**: Overview of orders, revenue, and performance
- **Order Management**: Verify payments, update status, add delivery details
- **Product Management**: Add/edit/delete subscription products
- **Customer Support Tools**: Manage customer communications
- **Data Export**: Export orders to CSV for analysis

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database, Auth, Storage)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Hosting**: Vercel/Netlify (recommended)

## 📦 Quick Setup

### 1. Clone and Install
```bash
git clone <your-repo>
cd premium-ott
npm install
```

### 2. Supabase Setup
1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Create `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup
Run the migration files in your Supabase SQL editor:
1. `supabase/migrations/create_products_table.sql`
2. `supabase/migrations/create_orders_table.sql`

### 4. Admin Account Setup
Create an admin account in Supabase Auth dashboard or sign up via the admin login page.

### 5. Start Development
```bash
npm run dev
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Add environment variables in Netlify dashboard

## 💰 Business Model

- **Manual Payment Verification**: No payment gateway fees
- **UPI Payments**: Direct to your account
- **Low Operating Costs**: ~₹0 monthly (using free tiers)
- **High Margins**: 80%+ savings vs official prices

## 🔒 Security Features

- Row Level Security (RLS) on all database tables
- Admin panel protected with Supabase Auth
- No sensitive customer data storage (except order details)
- Secure file uploads for payment screenshots

## 📱 Customer Journey

1. **Browse Catalog** → Select product → **Product Details**
2. **Checkout** → Fill details → Upload payment proof
3. **Order Confirmation** → Get Order ID
4. **Admin Verification** → Status updates
5. **Delivery** → Receive credentials via email/WhatsApp

## 🛡️ Admin Workflow

1. **Monitor Dashboard** → Check pending orders
2. **Verify Payments** → Review screenshots & transaction IDs
3. **Update Status** → Mark as processing → completed
4. **Deliver Credentials** → Send via email/WhatsApp
5. **Customer Support** → Handle queries & issues

## 📊 Key Pages

### Customer Side
- `/` - Homepage with hero & featured products
- `/catalog` - Full product catalog with search & filters
- `/product/:id` - Product details & purchase
- `/checkout` - Payment form & order creation
- `/track` - Order tracking by Order ID
- `/support` - Customer support & FAQs

### Admin Side
- `/admin` - Admin login
- `/admin/dashboard` - Overview & statistics
- `/admin/orders` - Order management
- `/admin/products` - Product management

## 🎨 Design Philosophy

- **Trust-focused**: Clean, professional design builds customer confidence
- **Mobile-first**: Indian users primarily use mobile devices
- **Speed-optimized**: Fast loading for better conversion
- **Accessibility**: Readable fonts, proper contrast ratios
- **Apple-inspired**: Premium feel with attention to detail

## 🔧 Customization

### Adding New Products
1. Go to Admin Panel → Products
2. Click "Add Product"
3. Fill product details, benefits, pricing
4. Upload product logo/image
5. Set availability status

### Modifying Payment Methods
Update payment instructions in `CheckoutPage.tsx`:
- UPI ID
- Bank account details
- Payment flow

### Branding
- Update logo and colors in `Layout.tsx`
- Modify company name throughout the app
- Update contact information

## 📈 Scaling Considerations

### For Higher Volume
- Add Redis for caching
- Implement proper image CDN
- Add email notifications
- Integrate with payment gateways
- Add inventory management

### Advanced Features
- Automated delivery via APIs
- Subscription renewals
- Referral system
- Analytics dashboard
- Mobile apps

## 💡 Business Tips

1. **Start Small**: Focus on 5-10 popular services initially
2. **Build Trust**: Provide excellent customer support
3. **Competitive Pricing**: Research market rates regularly
4. **Quality Control**: Ensure all accounts work properly
5. **Legal Compliance**: Understand local regulations

## 🆘 Support

For technical support or business inquiries:
- Email: support@premiumott.com
- WhatsApp: +91 9876543210

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: This system is designed for educational purposes. Ensure compliance with local laws and platform terms of service before commercial use.