# EduPal - Pure Frontend Classroom Assistant

<div align="center">

一个纯前端的课堂助手应用，提供课表管理、课件管理和问答功能。

[功能特点](#features) • [项目结构](#structure) • [已完成工作](#completed) • [后续计划](#roadmap)

</div>

---

<h2 id="features">✨ 功能特点</h2>

- 📅 **智能课表管理**

- 📚 **课件资源管理**

- 💬 **互动问答系统**

<h2 id="structure">📁 项目结构</h2>

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

<h2 id="completed">✅ 已完成工作</h2>

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

### UI 基础组件

#### 1. 设计规范 (styles/base/)

创建了统一的设计系统，确保整个应用的视觉一致性：

- **variables.css**: 定义全局设计变量
  - 颜色系统（主色、功能色、背景色、文本色）
  - 字体系统（字体族、大小、粗细、行高）
  - 间距和尺寸（统一间距体系、组件尺寸）
  - 阴影、圆角、动效
  - 深色模式适配
- **reset.css**: 重置浏览器默认样式
  - 统一盒模型
  - 移除默认边距和填充
  - 标准化表单元素
  - 定义基本的辅助类

#### 2. 按钮组件 (button.css)

实现了完整的按钮系统：

- 多种类型：主要按钮、次要按钮、轮廓按钮、文本按钮
- 多种尺寸：小、中（默认）、大
- 状态样式：悬停、激活、禁用、加载中
- 特殊形式：块级按钮、图标按钮、按钮组

**示例用法：**

```html
<!-- 基本按钮 -->
<button class="btn btn-primary">主要按钮</button>
<button class="btn btn-secondary">次要按钮</button>
<button class="btn btn-outline">轮廓按钮</button>
<button class="btn btn-text">文本按钮</button>

<!-- 按钮尺寸 -->
<button class="btn btn-primary btn-sm">小按钮</button>
<button class="btn btn-primary">默认大小</button>
<button class="btn btn-primary btn-lg">大按钮</button>

<!-- 状态示例 -->
<button class="btn btn-primary" disabled>禁用按钮</button>
<button class="btn btn-primary btn-loading">加载中</button>

<!-- 特殊按钮 -->
<button class="btn btn-primary btn-block">块级按钮</button>
<button class="btn btn-primary btn-icon"><span class="icon">+</span></button>
```

#### 3. 输入框组件 (input.css)

提供了功能齐全的表单控件：

- 多种类型：文本输入框、搜索框、数字输入框、文本区域
- 多种尺寸：小、中（默认）、大
- 状态样式：焦点、错误、成功、禁用
- 额外功能：前缀/后缀图标、标签、帮助文本

**示例用法：**

```html
<!-- 基本输入框 -->
<div class="input-wrapper">
  <input type="text" class="input" placeholder="请输入内容" />
</div>

<!-- 带标签的输入框 -->
<div class="input-wrapper">
  <label class="input-label">用户名</label>
  <input type="text" class="input" />
  <div class="input-help">请输入您的用户名</div>
</div>

<!-- 错误状态 -->
<div class="input-wrapper">
  <input type="text" class="input error" value="错误输入" />
  <div class="input-help error">输入内容无效</div>
</div>

<!-- 带图标的输入框 -->
<div class="input-wrapper has-prefix">
  <span class="input-prefix">@</span>
  <input type="text" class="input" placeholder="用户名" />
</div>
```

#### 4. 模态框组件 (modal.css)

实现了可复用的对话框系统：

- 多种尺寸：小、中（默认）、大、全屏
- 动画效果：缩放、上滑
- 组件部分：标题栏、内容区、底部操作区
- 特殊类型：确认对话框

**示例用法：**

```html
<!-- 基本模态框结构 -->
<div class="modal-backdrop">
  <div class="modal">
    <div class="modal-header">
      <h3 class="modal-title">对话框标题</h3>
      <button class="modal-close">&times;</button>
    </div>
    <div class="modal-body">这里是模态框内容...</div>
    <div class="modal-footer">
      <button class="btn btn-secondary">取消</button>
      <button class="btn btn-primary">确定</button>
    </div>
  </div>
</div>

<!-- 显示模态框 -->
<script>
  document.querySelector(".modal-backdrop").classList.add("active");
</script>
```

<h2 id="roadmap">📝 后续计划</h2>

？有吗
