// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import CredentialsProvider from "next-auth/providers/credentials";

// export const {
//   handlers: { GET, POST },
//   auth,
// } = NextAuth({
//   session: { strategy: 'jwt' },

//   providers: [

//     CredentialsProvider({

//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" }
//       },

//       async authorize(credentials) {
//         // authorization logic here
//       }

//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//    ]
// })
