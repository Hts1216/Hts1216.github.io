# Hts1216 的博客

网站地址：[https://hts1216.github.io/](https://hts1216.github.io/)

基于 Astro 和 [Shirone](https://github.com/LyraVoid/Shirone) 主题，使用官方 npm 包 `shirones`。推送到 GitHub 的 `main` 分支后，GitHub Actions 会自动发布到原来的网址。

## 在这台电脑上预览

打开 PowerShell，运行：

```powershell
cd D:\blog
npm run dev
```

在浏览器打开终端显示的地址，通常为 http://localhost:4321/ 。保存修改后页面会自动更新；按 `Ctrl+C` 停止。项目已经装好依赖，并在忽略上传的 `.runtime/` 中准备了 Node.js 26.13.0，启动脚本会自动使用它。

换电脑时，先安装 Node.js 26.13.0 或更高版本，再运行一次 `npx.cmd --yes pnpm@12.18.0 install --frozen-lockfile` 安装依赖。依赖安装使用 pnpm，日常预览仍可用 `npm run dev`。

## 修改资料

| 想修改什么 | 对应文件 |
| --- | --- |
| 博客标题、介绍、背景图、主题色 | `shirones/config/siteConfig.ts` |
| 头像、名称、简介、GitHub 链接 | `shirones/config/profileConfig.ts` |
| 顶部导航 | `shirones/config/navBarConfig.ts` |
| 左右侧栏 | `shirones/config/sidebarConfig.ts` |
| 关于页面 | `shirones/content/spec/about.md` |
| 文章 | `shirones/content/posts/` |
| 图片 | `public/images/` |

背景图暂用主题自带图片，可以换成自己的图片，并同步修改 `siteConfig.ts` 的 `banner.src`。评论、音乐、访问追踪和没有内容的扩展页面暂未启用。

## 写文章

在 `shirones/content/posts/` 新建 `my-first-post.md`：

```markdown
---
title: 我的第一篇文章
published: 2026-11-11
description: 这篇文章的简短介绍。
tags: [学习, Astro]
category: 笔记
draft: false
---

这里开始写正文。

## 一个小标题

可以用 **加粗**、列表和链接。
```

文件名决定文章网址：上例为 `/posts/my-first-post/`。日期填实际发布日期；`draft: true` 表示草稿，不会出现在正式网站。图片放入 `public/images/` 后，可用 `![图片说明](/images/图片文件名.jpg)` 引用。

原来的 `/blog/hello-world/` 会跳转到新文章地址，`/blog/` 会跳转到归档。

## 发布修改

先保存文件并预览，确认后运行：

```powershell
npm run check
npm run build
git add .
git commit -m "docs(blog): update posts"
git push origin main
```

到仓库的 [Actions](https://github.com/Hts1216/Hts1216.github.io/actions) 查看发布进度。出现绿色成功标记后，刷新网站即可。只有本地保存还不会更新公开网站。

保留 `pnpm-lock.yaml` 并上传它；不要上传 `node_modules/`、`dist/`、`.runtime/` 或密码、密钥。升级主题时再修改版本并重新安装，当前主题固定为 `shirones@0.1.6`。

## 版权与备份

本站文章保持“保留所有权利”，尚未采用 CC BY-NC-SA 4.0。主题代码的 MIT 许可与文章许可分别处理，来源说明见 `THIRD_PARTY_NOTICES.md`。

换主题前的版本保存在 GitHub 分支 `backup-before-shirone-20261111`；本机备份位于 `D:\blog-backups\`。
