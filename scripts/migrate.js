const { exec } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting database setup...');

// Check if .env exists
if (!fs.existsSync('.env')) {
  console.log('⚠️  .env file not found. Creating from .env.example...');
  fs.copyFileSync('.env.example', '.env');
  console.log('✅ Created .env file. Please update with your configuration.');
}

// Generate Prisma client
console.log('📦 Generating Prisma client...');
exec('npx prisma generate', (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Error generating Prisma client:', error);
    return;
  }
  console.log('✅ Prisma client generated successfully');
  
  // Push database schema
  console.log('🗄️  Pushing database schema...');
  exec('npx prisma db push', (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Error pushing database schema:', error);
      console.log('💡 Make sure your DATABASE_URL is correct in .env file');
      return;
    }
    console.log('✅ Database schema pushed successfully');
    
    // Optional: Seed database
    console.log('🌱 Database setup complete!');
    console.log('');
    console.log('🎉 Your IpTruck platform is ready to use!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Update your .env file with correct database credentials');
    console.log('2. Run: npm run start:dev');
    console.log('3. Visit: http://localhost:3000/api/docs for API documentation');
  });
});
