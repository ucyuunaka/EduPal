# EduPal - Pure Frontend Classroom Assistant

<div align="center">

一个纯前端的课堂助手应用，提供课表管理、课件管理和问答功能。

[功能特点](#功能特点) • [项目结构](#项目结构) • [已完成工作](#已完成工作)

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
│   │   ├── storage.js          # 本地存储工具
│   │   ├── event-bus.js        # 事件总线通信
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

## ✅ 已完成工作

### 核心工具模块

#### 1. 本地存储工具 (storage.js)

封装了浏览器的 localStorage API，提供更便捷的数据存取功能：

- 支持对象和数组的自动序列化与反序列化
- 支持设置数据过期时间
- 提供简洁 API：`set`, `get`, `remove`, `has`, `clear`
- 存储使用情况统计

**使用示例：**

```javascript
import Storage from "./scripts/core/storage.js";

// 存储数据（带过期时间，30分钟）
Storage.set("userData", { name: "张三", role: "student" }, 30 * 60 * 1000);

// 获取数据
const userData = Storage.get("userData");

// 检查数据是否存在
if (Storage.has("userData")) {
  // 进行相关操作
}

// 移除数据
Storage.remove("userData");

// 查看存储使用情况
const usage = Storage.usage();
console.log(
  `使用空间: ${usage.used}KB / ${usage.total}KB (${usage.percentage})`
);
```

#### 2. 事件总线 (event-bus.js)

实现模块间通信的发布-订阅模式：

- 支持事件订阅 (`on`) 和一次性订阅 (`once`)
- 支持取消订阅事件 (`off`)
- 支持同步 (`emit`) 和异步 (`emitAsync`) 事件触发
- 提供事件统计和管理方法

**使用示例：**

```javascript
import eventBus from "./scripts/core/event-bus.js";

// 订阅事件
const unsubscribe = eventBus.on("userLogin", (userData) => {
  console.log(`欢迎, ${userData.name}!`);
});

// 一次性订阅事件
eventBus.once("appInit", () => {
  console.log("应用初始化完成");
});

// 触发事件
eventBus.emit("userLogin", { name: "李四", id: 123 });

// 异步触发事件
await eventBus.emitAsync("dataLoaded", { status: "success" });

// 取消订阅
unsubscribe();
// 或
eventBus.off("userLogin");
```

## 📝 后续计划
