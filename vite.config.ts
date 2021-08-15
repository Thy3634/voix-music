import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pages from "vite-plugin-pages";
import svgLoader from "vite-svg-loader";
import { resolve } from 'path'

import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    pages({
      exclude: ["**/components/*.vue"],
    }),
    svgLoader()
  ],
  resolve: {
    // 需要同步配置 tsconfig.json 中的 path 才能生效
    // 根目录设置到 ./src 
    alias: {
      "~": resolve(__dirname, "src"),
      "!": resolve(__dirname, "src/assets"),
      "@": resolve(__dirname, "src/pages"),
      "#": resolve(__dirname, "src/components"),
      "$": resolve(__dirname, "src/styles")
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    },
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer
      ]
    }
  },
  server: {
    proxy: {
      '/netease': {
        target: "https://netease-cloud-music-vercel-thy3634.vercel.app/",
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/netease/, '')
      },
      '/163': {
        target: "https://music.163.com/",
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/163/, '')
      }
    }
  },
  build: {
    outDir: "."
  }
})
