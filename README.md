# Hts1216 的 Astro 博客

网站地址：https://hts1216.github.io/

这是基于 Astro 官方博客模板的静态网站。文章写在本地，推送到 GitHub 后由 GitHub Actions 自动构建并发布。

## 1. 在本地预览

打开 PowerShell，依次执行：

```powershell
cd D:\blog
npm install
npm run dev
```

第一次安装或依赖发生变化时才需要 `npm install`。启动成功后，在浏览器打开终端显示的地址，通常是 http://localhost:4321/ 。本地预览期间保持终端运行，按 `Ctrl+C` 可以停止。

修改文件并保存后，本地页面会自动更新。这个预览地址只在你自己的电脑上使用。

## 2. 修改博客资料

| 想修改什么 | 对应文件 |
| --- | --- |
| 博客名称、网站介绍 | `src/consts.ts` |
| 首页文字 | `src/pages/index.astro` |
| 关于页面 | `src/pages/about.astro` |
| 页脚 | `src/components/Footer.astro` |
| 文章 | `src/content/blog/` 里的 Markdown 文件 |
| 全站颜色、字体等样式 | `src/styles/global.css` |

当前页脚保留所有权利。如果以后决定采用 CC BY-NC-SA 4.0，可再为自己的原创文章添加对应声明；引用内容和代码依其原许可处理。

## 3. 写一篇文章

在 `src/content/blog/` 中新建 `my-first-post.md`，例如：

```markdown
---
title: '我的第一篇文章'
description: '这篇文章的简短介绍。'
pubDate: '2026-11-11'
---

这里开始写正文。

## 一个小标题

可以用 **加粗**、列表和链接。
```

文件名决定文章网址，例如上面的文章会出现在 `/blog/my-first-post/`。文件顶部两条 `---` 之间是文章资料，日期填写你实际希望显示的发布日期。保存后到本地“文章”页面查看。

图片可以放进 `public/images/`，然后在正文中用 `![图片说明](/images/图片文件名.jpg)` 引用。

## 4. 第一次发布

本项目已经配置 `.github/workflows/deploy.yml`。首次发布需要：

1. 将源码上传到 `Hts1216/Hts1216.github.io` 的 `main` 分支。替换旧站之前保留备份。
2. 打开仓库的 `Settings → Pages`。
3. 在 `Build and deployment` 中，将 `Source` 设为 **GitHub Actions**。
4. 打开 `Actions`，查看 **Deploy Astro to GitHub Pages**。
5. 等构建和发布均成功后，访问 https://hts1216.github.io/ 。

如果在推送后才切换 Source，可以进入对应工作流，使用 `Run workflow` 手动再运行一次。

不要把 `node_modules/`、`dist/`、密码或密钥上传到仓库。依赖锁文件 `package-lock.json` 需要上传。

## 5. 以后更新文章

先保存文章、检查本地预览，再运行：

```powershell
npm run build
git add .
git commit -m "更新博客文章"
git push origin main
```

`npm run build` 用于确认网站能正常生成；`git commit` 在本地记录改动；`git push` 上传改动并触发自动发布。只有本地保存还不会更新公开网站。

## 参考

- Astro 中文文档：https://docs.astro.build/zh-cn/
- GitHub Pages 部署文档：https://docs.astro.build/en/guides/deploy/github/
- 模板来源和许可：见 `THIRD_PARTY_NOTICES.md`。
