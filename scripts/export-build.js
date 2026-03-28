const { execSync } = require('child_process');

// Set NEXT_EXPORT for this child process and run the standard Next build.
process.env.NEXT_EXPORT = '1';
console.log('Starting static-export build with NEXT_EXPORT=1...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Static export build completed.');
} catch (err) {
  console.error('Static export build failed:', err && err.message ? err.message : err);
  process.exit(1);
}
