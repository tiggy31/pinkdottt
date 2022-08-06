const proxy = require("http-proxy-middleware")

module.exports = function(app){
  

    app.use(
        proxy('/v3/businesses/search', {
            target: 'https://api.yelp.com',
            secure: false,
            changeOrigin: true
        })
    )

    app.use(
        proxy('/v3/organizations/{organization_id}/events/', {
            target: 'https://api.yelp.com',
            secure: false,
            changeOrigin: true
        })
    )
}