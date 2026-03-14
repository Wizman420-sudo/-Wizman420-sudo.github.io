# 视觉档案 | VISUAL ARCHIVE

暗黑酷炫风的图片展示网站，专为 50 张图片设计。

## 🔐 密码保护

**访问密码：`520`**

- 首次访问需要输入密码
- 密码正确后 7 天内不用重复输入
- 密码错误会有震动提示
- 按回车或点击"解锁"按钮提交

**想修改密码？**

编辑 `assets/script.js`，找到：

```javascript
const PASSWORD_CONFIG = {
    password: "520",  // 改成你的密码
    // ...
};
```

## 🚀 部署到 GitHub Pages

### 第一步：准备图片

1. 把你的 50 张图片放到 `images/` 文件夹
2. 命名格式：`01.jpg`, `02.jpg`, `03.jpg` ... `50.jpg`
3. 支持格式：`.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
4. 建议尺寸：正方形 (1:1) 或统一比例

### 第二步：创建 GitHub 仓库

```bash
# 进入网站目录
cd /home/admin/.openclaw/workspace/github-site

# 初始化 git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: visual archive"

# 添加远程仓库（替换为你的用户名）
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git

# 推送
git push -u origin main
```

### 第三步：启用 GitHub Pages

1. 打开你的 GitHub 仓库
2. 进入 **Settings** → **Pages**
3. Source 选择 **main branch** → **Save**
4. 等几分钟后，网站会发布到：`https://你的用户名.github.io`

---

## 📁 文件结构

```
github-site/
├── index.html          # 主页面
├── assets/
│   ├── style.css       # 样式文件
│   └── script.js       # 交互脚本
├── images/             # 放你的 50 张图片
│   ├── 01.jpg
│   ├── 02.jpg
│   └── ...
└── README.md           # 说明文档
```

---

## 🎨 自定义配置

### 修改标题和文案

编辑 `assets/script.js` 中的 `config` 对象：

```javascript
const config = {
    title: "你的网站标题",
    subtitle: "你的副标题",
    footer: "© 2026 你的名字"
};
```

### 修改颜色主题

编辑 `assets/style.css`，搜索以下颜色替换：

- `#8B5CF6` - 主色（紫色）
- `#06B6D4` - 辅色（青色）
- `#0a0a0a` - 背景色

### 图片不是 50 张？

编辑 `assets/script.js` 中的 `images` 数组，添加或删除图片：

```javascript
const images = [
    "images/01.jpg",
    "images/02.jpg",
    // 添加或删除...
];
```

---

## ✨ 功能特性

- ✅ 暗黑渐变背景
- ✅ 霓虹渐变标题
- ✅ 图片网格布局（响应式）
- ✅ 悬停发光效果
- ✅ 图片点击放大（Lightbox）
- ✅ 键盘左右键切换图片
- ✅ 加载动画
- ✅ 图片编号显示
- ✅ 移动端适配

---

## 📱 响应式断点

- 桌面端：每行 4-6 张图片
- 平板端：每行 3-4 张图片
- 手机端：每行 2 张图片

---

## 🛠️ 本地预览

直接双击 `index.html` 或用浏览器打开即可预览。

或使用本地服务器：

```bash
# Python 3
python3 -m http.server 8000

# 然后用浏览器打开 http://localhost:8000
```

---

## 📞 问题？

有问题随时问帮你搭建的 AI 助手！

---

**Built with ❤️ for seamoon**
