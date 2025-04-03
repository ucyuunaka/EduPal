# EduPal - Pure Frontend Classroom Assistant

<div align="center">

一个纯前端的课堂助手应用，提供课表管理、课件管理和问答功能。

[功能特点](#功能特点) • [项目结构](#项目结构)

</div>

---

## ✨ 功能特点

- 📅 **智能课表管理**

- 📚 **课件资源管理**

- 💬 **互动问答系统**

## 📁 项目结构

```
/
├── edupal.html                 # 应用入口
├── assets/                     # 静态资源
│   ├── icons/                  # 系统图标
│   ├── avatars/                # 默认头像库
│   └── translations/           # 多语言文件
├── styles/
│   ├── base/                   # 基础样式
│   │   ├── reset.css           # 样式重置
│   │   └── variables.css       # CSS变量
│   ├── components/             # 通用组件
│   │   ├── button.css          # 按钮样式
│   │   └── modal.css           # 弹窗样式
│   └── modules/                # 功能模块样式
│       ├── schedule.css        # 课表模块
│       ├── auth.css            # 登录模块
│       └── qa.css              # 问答模块
├── scripts/
│   ├── core/                   # 核心系统
│   │   ├── auth.js             # 登录状态管理
│   │   ├── i18n.js             # 多语言控制
│   │   └── shortcut.js         # 快捷键注册器
│   └── modules/
│       ├── schedule/           # 课表模块
│       │   ├── builder.js      # 课表制作
│       │   └── importer.js     # 课程导入
│       ├── profile/            # 个人资料
│       │   ├── editor.js       # 资料编辑
│       │   └── avatar.js       # 头像裁剪
│       ├── group/              # 课程小组
│       │   ├── creator.js      # 建群逻辑
│       │   └── chat.js         # 小组聊天
│       ├── materials/          # 课件系统
│       │   ├── uploader.js     # 文件上传
│       │   ├── tagger.js       # 标签管理
│       │   └── diff.js         # 版本对比
│       └── exam/               # 考试提醒
│           ├── countdown.js    # 倒计时
│           └── notifier.js     # 提醒系统
└── templates/                  # 动态模板
    ├── schedule-item.html      # 课表条目
    ├── qa-post.html            # 问答条目
    └── material-card.html      # 课件卡片
```

## 📝 后续计划

？有吗
