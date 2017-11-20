module.exports={

   google: {
        clientID:process.env.googleKey,
        clientSecret: process.env.googleSecret,
        callbackURL: "http://localhost:3000/auth/google/callback",
        
    }
}