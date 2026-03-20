import app from './app.js';

console.log('App loaded:', app);
console.log('Type of app:', typeof app);
if (app && typeof app.use === 'function') {
    console.log('App seems to be an Express instance');
} else {
    console.error('App is NOT an Express instance');
}
