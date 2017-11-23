module.exports = {
    server: {
        protocol: "http",
        host: process.env.hostname,
        state: true
    },
    google: {
        key: process.env.googleKey,
        secret: process.env.googleSecret,
        callback: "/google/callback",
        scope: [
            "https://www.googleapis.com/auth/plus.me", "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/drive"
        ],
        custom_params: {
            access_type: "offline",
            prompt: 'consent'
        }
    },
    dropbox: {
        key: process.env.dropboxKey,
        secret: process.env.dropboxSecret,
        callback: "/dropbox/callback"
    },
    amazon:{
        key: process.env.amazonKey,
        secret: process.env.amazonSecret,
        callback: "/amazon/callback",
        scope: [
            "profile"
        ],
        roleArn: process.env.amazonRole

    }

}