// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       './cjs/react.production.min.js': 'react',
//     },
//   },
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      './cjs/react.production.min.js': 'react',
      './cjs/react-dom.production.min.js': 'react-dom',
      './cjs/react-jsx-runtime.production.min.js': 'react/jsx-runtime',
    },
  },
})


