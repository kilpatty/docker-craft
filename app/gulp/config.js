var dev = 'dev';
var pub = 'public';
var devAssets = 'dev/assets'
var pubAssets = 'public/assets'

module.exports = {
    browsersync: {
        development: {
            files: [
                pubAssets + '/css/*.css',
                pubAssets + '/js/*.js',
                pubAssets + '/images/**',
                pubAssets + '/fonts/*',
            ]
        }
    }
}
