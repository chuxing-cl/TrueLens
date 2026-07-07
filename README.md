# TrueLens - 数据可视化大屏从零到一

TrueLens 是一个公开的数据可视化大屏开源项目，旨在帮助大家从 0 到 1 学习如何独立制作一个完整的数据可视化大屏。

## 项目简介

本项目将逐步展示数据大屏的完整构建过程，涵盖设计思路、技术选型、组件开发、数据接入与联调、性能优化等各个环节。

## 主要特性

- 纯手工打造的数据可视化大屏
- 从需求分析、技术选型到部署上线的全流程实践
- 模块化的组件架构
- 响应式布局，适配多种屏幕尺寸
- 支持实时数据更新与展示

## 技术架构方案

### 方案 A（推荐）：React 18 + TypeScript + Vite + ECharts + Zustand

- **框架**：React 18 + TypeScript
- **构建工具**：Vite 6
- **可视化**：Apache ECharts 5
- **状态管理**：Zustand
- **路由**：React Router v6
- **HTTP 请求**：Axios（封装拦截器实现 Mock/API 无缝切换）
- **测试**：Vitest + React Testing Library + Playwright（E2E）
- **代码质量**：ESLint + Prettier + Husky + lint-staged + Commitlint
- **日志系统**：自定义轻量 Logger（分级：debug / info / warn / error，输出到控制台与远端日志服务）
- **Mock 方案**：开发环境使用本地 Mock 数据，通过 Axios 请求拦截器统一切换，生产环境自动切换真实 API
- **模块化结构**：
  - `src/features/`：按业务功能拆分（如 dashboard、chart）
  - `src/components/`：公共 UI 组件
  - `src/hooks/`：自定义 Hooks
  - `src/stores/`：Zustand 状态切片
  - `src/services/`：API 与 Mock 服务层
  - `src/utils/`：工具函数
  - `src/styles/`：样式与主题
  - `src/types/`：类型定义

---

### 方案 B：Vue 3 + TypeScript + Vite + ECharts + Pinia

- **框架**：Vue 3（Composition API）+ TypeScript
- **构建工具**：Vite 6
- **可视化**：Apache ECharts 5
- **状态管理**：Pinia
- **路由**：Vue Router v4
- **HTTP 请求**：Axios（拦截器统一处理 Mock/API 切换）
- **测试**：Vitest + Vue Test Utils + Playwright
- **代码质量**：ESLint + Prettier + Husky + lint-staged + Commitlint
- **日志系统**：自定义 Logger 插件，支持分级输出与模块过滤
- **Mock 方案**：开发环境拦截请求返回本地数据，环境变量控制切换
- **模块化结构**：
  - `src/features/`：业务功能模块
  - `src/components/`：公共组件
  - `src/composables/`：组合式函数
  - `src/stores/`：Pinia Store
  - `src/api/`：接口与 Mock 定义
  - `src/utils/`：工具函数
  - `src/styles/`：样式主题
  - `src/types/`：类型定义

---

### 方案 C：原生 TypeScript + Vite + ECharts（无框架）

- **框架**：Vanilla TypeScript（无 React/Vue）
- **构建工具**：Vite 6
- **可视化**：Apache ECharts 5
- **状态管理**：自研轻量 Store（基于观察者模式）
- **路由**：自研 Hash Router
- **HTTP 请求**：Fetch + 自定义拦截器
- **测试**：Vitest
- **代码质量**：ESLint + Prettier + Husky + lint-staged
- **日志系统**：自研 Logger（支持格式化、分级、模块标签）
- **Mock 方案**：请求拦截器内部根据环境变量路由到 Mock 数据或真实 API
- **模块化结构**：
  - `src/modules/`：业务模块（如 screen、chart）
  - `src/components/`：UI 封装
  - `src/store/`：全局状态
  - `src/router/`：路由模块
  - `src/services/`：网络层与 Mock 策略
  - `src/utils/`：工具函数
  - `src/styles/`：样式主题
  - `src/types/`：类型定义

---

### 架构对比

| 维度 | 方案 A | 方案 B | 方案 C |
|------|--------|--------|--------|
| **学习曲线** | 中等 | 较平缓 | 陡峭（需自研基础能力） |
| **生态与社区** | 最强 | 强 | 弱 |
| **组件库** | Ant Design / MUI | Element Plus / Naive UI | 自研或第三方裸组件 |
| **招聘与协作** | 极易 | 易 | 一般 |
| **性能** | 好 | 好 | 最好 |
| **大屏适配** | rem/vw + scale | rem/vw + scale | rem/vw + scale |
| **推荐场景** | 团队协作、长期维护 | 快速开发、国内团队 | 教学理解底层原理 |

### 通用约束

无论选择哪种方案，都必须满足以下工程化要求：

1. **模块化**：严禁将所有代码写在单文件中；按功能/业务拆分目录，通过 index.ts 对外暴露。
2. **Mock ↔ API 切换**：抽象统一数据服务层，Mock 与真实请求实现相同接口，通过环境变量或运行配置一键切换，无业务代码侵入。
3. **测试覆盖**：单元测试覆盖工具函数与核心逻辑，组件测试覆盖关键渲染，E2E 测试覆盖主页面加载与数据展示。
4. **代码质量**：ESLint 规则统一，Prettier 格式化，提交前自动检查，Commit 信息遵循 Conventional Commits。
5. **日志系统**：全局 Logger 支持 log level 过滤、输出到 console/remote，包含操作日志与错误日志，便于线上排查。
6. **主题与适配**：CSS Variables 管理主题色，大屏采用 `transform: scale()` 方案适配不同分辨率。

## 快速开始

```bash
# 克隆项目
git clone https://github.com/<your-username>/TrueLens.git
cd TrueLens

# 安装依赖
(此处待补充)

# 启动开发服务器
(此处待补充)
```

## 项目结构

```
TrueLens/
├── src/
│   ├── components/    # 可复用组件
│   ├── pages/         # 页面视图
│   ├── utils/         # 工具函数
│   └── assets/        # 静态资源
├── public/            # 公共资源
└── ...
```

## 开源协议

本项目采用 [MIT](LICENSE) 协议开源。

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助项目成长。

## 致谢

感谢所有为开源社区做出贡献的开发者们。
