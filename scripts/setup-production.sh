#!/bin/bash

# Production Setup Script
echo "🚀 Setting up Zenbourg SaaS for production..."

# Create environment file
echo "📝 Creating environment configuration..."
cp .env.production .env.local

echo "⚠️  Please edit .env.local with your actual credentials:"
echo "   - Database URL with real credentials"
echo "   - NextAuth secret (generate with: openssl rand -base64 64)"
echo "   - OAuth provider credentials"
echo "   - Payment gateway keys"
echo "   - Email service API keys"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Setup database
echo "🗄️  Setting up database..."
echo "Please run the following SQL scripts in your PostgreSQL database:"
echo "   1. scripts/setup-database.sql"
echo "   2. scripts/seed-production-data.sql"

# Build application
echo "🔨 Building application..."
npm run build

echo "✅ Production setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure your environment variables in .env.local"
echo "2. Set up your PostgreSQL database"
echo "3. Run the database setup scripts"
echo "4. Deploy to your hosting platform"
echo ""
echo "For Docker deployment:"
echo "   docker-compose up -d"
