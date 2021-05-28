import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import styleImport from 'vite-plugin-style-import';
import autoprefixer from 'autoprefixer';
// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer()]
    }
  },
  plugins: [
    vue(),
    // style
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          // 这里文档和demo不一样，用文档的会报错，用demo
          resolveStyle: (name) => `vant/es/${name}/style`,
        },
      ],
    }),
  ],
  resolve: {
    // 需要同步配置 tsconfig.json 中的 path 才能生效
    // 根目录设置到 ./src 
    alias: {
      "~": resolve(__dirname, "src"),
      "#": resolve(__dirname, "src/pages")
    }
  },
  server: {
    proxy: {
      '/netease': {
        target: "https://netease-cloud-music-vercel-kg8k73nyq-thy3634.vercel.app/",
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
  }
})
