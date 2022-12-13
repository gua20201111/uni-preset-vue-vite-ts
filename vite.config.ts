import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { resolve } from 'path' // 主要用于alias文件路径别名
function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve:{
    alias:[
      {
        find:'@',replacement: pathResolve("src")
      }
    ],
    extensions:['.ts','.tsx','.js','.vue']
  },
});
