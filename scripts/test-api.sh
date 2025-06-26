#!/bin/bash

# API Testing Script
echo "🧪 Testing Zenbourg SaaS API endpoints..."

BASE_URL="http://localhost:3000"

# Test health endpoint
echo "📊 Testing health endpoint..."
curl -s "$BASE_URL/api/health" | jq '.'

# Test services endpoint
echo "🛠️ Testing services endpoint..."
curl -s "$BASE_URL/api/services" | jq '.services | length'

# Test contact form (POST)
echo "📧 Testing contact form..."
curl -s -X POST "${BASE_URL}/api/contacts" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "subject": "API Test",
    "message": "Testing the contact API endpoint"
  }' | jq '.'

echo "✅ API testing complete!"
