# EduPal - Pure Frontend Classroom Assistant

<div align="center">


一个纯前端的课堂助手应用，提供课表管理、课件管理和问答功能。

[功能特点](#功能特点) • [项目结构](#项目结构)

</div>

---

## ✨ 功能特点

- 📅 **智能课表管理**
  - 基于 FullCalendar 的课程表展示
  - 支持课程添加、编辑和删除
  - 本地存储课程数据

- 📚 **课件资源管理**
  - 文件上传和管理
  - 支持常见文档格式
  - 本地存储课件数据

- 💬 **互动问答系统**
  - 支持提问和回答
  - 点赞功能
  - 本地存储问答数据

## 🛠️ 技术特点

- 🌐 纯前端实现，无需后端服务
- 📱 响应式设计，支持移动端
- 🌓 支持浅色/深色主题切换
- 💾 使用 localStorage 进行数据持久化

## 📁 项目结构

```
/
├── edupal.html          # 应用主入口
├── styles/             # 全局样式目录
│   ├── base.css        # 基础样式（重置样式/字体等）
│   ├── themes/         # 主题相关
│   │   ├── light.css   # 浅色主题变量
│   │   └── dark.css    # 深色主题变量
│   └── modules/        # 模块样式
│       ├── schedule.css  
│       ├── materials.css
│       └── qa.css
├── scripts/
│   ├── core/           # 核心功能
│   │   ├── storage.js  # localStorage封装
│   │   └── utils.js    # 通用工具函数
│   └── modules/        # 功能模块
│       ├── schedule/   # 课表模块
│       │   ├── index.js 
│       │   └── calendar.js # FullCalendar封装
│       ├── materials/  # 课件模块
│       │   ├── index.js
│       │   └── uploader.js # 文件上传处理
│       └── qa/         # 问答模块
│           ├── index.js
│           └── votable.js # 点赞逻辑
├── assets/             # 静态资源
│   ├── icons/          # SVG图标
│   └── audios/         # 录音缓存（可选）
└── templates/          # HTML组件模板（可选）
    ├── schedule.html   # 课表HTML片段
    └── qa-item.html    # 问答条目模板
```


## 📝 开发计划

- [ ] 添加课程提醒功能
- [ ] 支持课件在线预览
- [ ] 添加笔记功能
- [ ] 优化移动端体验

