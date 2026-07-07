# TrueLens 数据可视化大屏

TrueLens 是一个基于 **原生 TypeScript + Vite + ECharts** 的科技感数据可视化大屏项目。无任何前端框架（无 React / Vue / Angular），所有能力（路由、状态管理、请求拦截、日志、Mock）均为手写实现，适合学习大屏底层原理与工程化实践。

## 特性

- 🖥️ **纯原生实现**：Vanilla TypeScript + DOM 操作，零框架依赖，理解大屏本质
- 📊 **丰富图表**：折线、柱状、饼/环图、雷达、仪表盘、区域散点共 6 类 ECharts 图表
- 🧩 **模块化架构**：路由、Store、Fetcher、Logger、组件按目录清晰拆分
- 🔄 **Mock/API 一键切换**：`Fetcher` 拦截器根据环境变量路由到本地 Mock 或真实接口
- 🪵 **自研日志系统**：`debug/info/warn/error` 四级、模块标签、时间戳、彩色输出、localStorage 持久化最近 100 条
- 🎬 **科技感视觉**：深色渐变背景、粒子光效、流光边框、数字递增、图表渐入动画
- 🔁 **实时刷新**：数据每 3–5 秒自动刷新，底部滚动通知条
- 📐 **缩放适配**：基于 `transform: scale()` 方案，以 1920×1080 为基准自适应其他分辨率
- ✅ **测试覆盖**：Vitest 覆盖 Logger、Fetcher、Formatter、Store 核心逻辑

## 技术栈

| 维度 | 选型 |
|------|------|
| 语言 | TypeScript（strict 模式，全量类型标注） |
| 构建 | Vite 6 |
| 可视化 | Apache ECharts 5 |
| 状态管理 | 自研轻量 Store（观察者模式 + EventTarget） |
| 路由 | 自研 Hash Router（`hashchange`） |
| 请求 | Fetch + 自定义拦截器（`Fetcher`） |
| 样式 | CSS Variables + 原生 CSS（深色科技风） |
| 测试 | Vitest |
| 背景音乐 | HTMLAudioElement 封装（可选） |

## 快速开始

```bash
# 克隆项目
git clone https://github.com/chuxing-cl/TrueLens.git
cd TrueLens

# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:3000，自动打开浏览器）
npm run dev

# 生产构建
npm run build

# 预览构建产物
npm run preview

# 运行测试
npm run test
```

> 环境要求：Node.js >= 18.0.0

## 脚本说明

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器，端口 3000，自动打开浏览器 |
| `npm run build` | `tsc --noEmit` 类型检查 + `vite build` 打包到 `dist/` |
| `npm run preview` | 本地预览构建产物（端口 4173） |
| `npm run test` | Vitest 运行全部单元测试 |
| `npm run test:watch` | Vitest 监听模式 |

## 项目结构

```
src/
├── main.ts                 # 入口：注册主题、初始化路由、启动应用
├── router/                 # 自研 Hash Router
│   ├── index.ts            # Router 主类
│   └── routes.ts           # 路由表
├── store/                  # 自研状态管理（观察者模式）
│   ├── index.ts
│   └── modules/
│       ├── dashboard.ts    # 时间、刷新间隔、主题等全局状态
│       └── chartData.ts    # 图表数据缓存与过期控制
├── services/
│   ├── fetcher.ts          # Fetcher：Fetch 封装 + Mock/API 切换
│   └── mock.ts             # 丰富的 Mock 数据生成工厂
├── components/
│   ├── base/Loading.ts
│   └── charts/             # ECharts 图表封装（Line/Bar/Pie/Radar/Gauge/Map）
├── pages/dashboard/        # 大屏页面
│   ├── index.ts            # 布局、图表创建、数据绑定、缩放适配
│   ├── layout.ts           # 布局配置
│   └── themes.ts           # 主题色板
├── utils/
│   ├── logger.ts           # 分级日志 + localStorage 持久化
│   ├── formatter.ts        # 数字/百分比/时间格式化
│   ├── date.ts
│   ├── dom.ts              # DOM 查询/创建工具
│   ├── audio.ts            # 背景音乐
│   ├── splash.ts           # 开场动画（点击进入）
│   └── particleBackground.ts # 粒子背景
├── styles/main.css         # 全局样式、动画、大屏适配
└── types/                  # 类型定义
tests/                      # Vitest 单元测试
```

## 数据接入

`Fetcher` 在开发环境默认走本地 Mock（`mock.ts` 生成的逼真数据），可通过环境变量或构造参数切换为真实 API：

```ts
const fetcher = new Fetcher('/api', /* mockMode */ true);
// mockMode = false 时请求真实后端：/api/kpi、/api/trend ...
```

Mock 覆盖 8+ 模块：KPI 指标卡、销售趋势（折线）、品类占比（饼图）、销售对比（柱状）、能力评估（雷达）、满意度（仪表盘）、实时数据流、区域分布（散点）以及滚动通知。

## 测试

```bash
npm run test
```

覆盖文件：

- `tests/utils/logger.test.ts` — 日志级别输出与 localStorage 写入
- `tests/services/fetcher.test.ts` — 拦截逻辑与 Mock 返回
- `tests/utils/formatter.test.ts` — 数字格式化
- `tests/store/chartData.test.ts` — 数据读写与观察者通知

## 开源协议

本项目采用 [MIT](LICENSE) 协议开源。

## 贡献

欢迎提交 Issue 与 Pull Request。
