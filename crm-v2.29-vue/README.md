# CRM V2.29 Vue Prototype

这是一个 Vue 3 + Vite 项目。项目根目录的 `index.html` 是 Vite 源码入口，不能通过 `file://` 协议直接双击预览。

## 一键预览

双击 `start-preview.cmd`。脚本会在后台启动 Vite，并打开：

`http://127.0.0.1:5173/`

## 命令行运行

```powershell
npm.cmd install
npm.cmd run dev -- --port 5173
```

生产构建：

```powershell
npm.cmd run build
```

构建结果位于 `dist`，仍应通过 HTTP 静态服务器访问，不建议直接双击 `dist/index.html`。
