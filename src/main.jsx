import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  BookOpenText,
  BrainCircuit,
  Boxes,
  CheckCircle2,
  Code2,
  DatabaseZap,
  GitBranch,
  Languages,
  LineChart,
  Network,
  Play,
  Radar,
  Sparkles,
} from 'lucide-react';
import './styles.css';

const copy = {
  zh: {
    nav: ['Project Manager', 'NovelForge', '系统版图'],
    brand: 'AI Product Lab',
    heroEyebrow: 'Link Zhao / AI Systems Portfolio',
    heroTitle: '两个从原型走向产品形态的 AI 工程系统',
    heroLead:
      '一个负责把需求变成项目计划，一个负责把小说生产链变成可持续的 AI 工作台。这里是它们的官网式展示页。',
    heroPrimary: '进入项目展示',
    heroSecondary: '查看系统版图',
    manifestoSmall: 'Not demos. Product systems.',
    manifestoTitle: '项目共同点是：不把 AI 当聊天框，而是把 AI 放进真实流程。',
    systemEyebrow: 'System map',
    systemTitle: '从 LLM 调用，到图编排、状态流、前端交互和部署。',
    localPath: '本地项目路径',
    footerPath: 'Built from /Users/linkzhao/workspace/AI',
    stats: [
      ['2', 'AI projects'],
      ['17+', 'AI flows'],
      ['Full-stack', '从本地应用到 Docker 部署'],
      ['Productized', 'UI、后端、状态流和媒体展示'],
    ],
    system: [
      ['Graph orchestration', 'LangGraph 负责把复杂 AI 任务拆成可追踪的节点和闭环。'],
      ['Persistent context', 'SQLite、sqlite-vec、故事圣经和会话数据承接长期上下文。'],
      ['Live observability', 'SSE、任务状态、进度面板让长任务不再是黑盒。'],
      ['Deployment shape', 'Docker Compose、nginx 和环境配置把本地作品推向可访问服务。'],
    ],
    projects: [
      {
        kicker: '需求到计划的智能项目经理',
        summary:
          '把自然语言需求拆成可执行任务、优先级、资源分配和时间线，用 LangGraph 把项目管理流程变成可观测的 AI 工作流。',
        features: [
          '需求解析与交互式澄清',
          '任务拆解、优先级评估和依赖识别',
          '团队资源分配与冲突调整闭环',
          '甘特图、任务表、导出和会话恢复',
        ],
        architecture: [
          ['Parse', '把原始需求变成结构化 Requirement'],
          ['Decompose', '逐步产出 SubTask 并实时推送到前端'],
          ['Allocate', '基于团队配置完成排期和冲突修正'],
          ['Summarize', '生成 Markdown / JSON / CSV 可交付计划'],
        ],
        metrics: [
          ['7', 'workflow stages'],
          ['SSE', 'live progress'],
          ['3+', 'export modes'],
        ],
      },
      {
        kicker: '长篇小说 AI 创作工作台',
        summary:
          '围绕长篇小说生产链搭建的 AI 系统：世界观、故事圣经、全书架构、章节生成、审阅修复、记忆抽取和周期自动化在同一个工作台内闭环。',
        features: [
          '一键生成小说基础信息、故事圣经和多层架构',
          '章节草稿生成、版本保存、AI 审阅和修订建议',
          '跨章节连续性检查与记忆卡片抽取',
          '后台周期任务、发布流程和 Docker 部署链路',
        ],
        architecture: [
          ['Bootstrap', '从一句创意启动小说、人物、设定和架构'],
          ['Memory', '用故事圣经、章节记忆和向量检索保持长期上下文'],
          ['Review', '识别时间线、人物状态、世界规则和道具冲突'],
          ['Automation', '把生成、审阅、修复和发布串成周期任务'],
        ],
        metrics: [
          ['10+', 'AI graphs'],
          ['RAG', 'story memory'],
          ['Auto', 'recurring tasks'],
        ],
      },
    ],
  },
  en: {
    nav: ['Project Manager', 'NovelForge', 'System Map'],
    brand: 'AI Product Lab',
    heroEyebrow: 'Link Zhao / AI Systems Portfolio',
    heroTitle: 'Two AI engineering systems moving from prototype to product.',
    heroLead:
      'One turns requirements into execution plans. The other turns long-form fiction production into a sustainable AI workspace.',
    heroPrimary: 'Explore projects',
    heroSecondary: 'View system map',
    manifestoSmall: 'Not demos. Product systems.',
    manifestoTitle:
      'Both projects share one thesis: AI should live inside real workflows, not just inside a chat box.',
    systemEyebrow: 'System map',
    systemTitle: 'From LLM calls to graph orchestration, state streams, frontend interaction, and deployment.',
    localPath: 'Local project path',
    footerPath: 'Built from /Users/linkzhao/workspace/AI',
    stats: [
      ['2', 'AI projects'],
      ['17+', 'AI flows'],
      ['Full-stack', 'from local apps to Docker deployment'],
      ['Productized', 'UI, backend, status streams, and media'],
    ],
    system: [
      ['Graph orchestration', 'LangGraph turns complex AI work into trackable nodes and loops.'],
      ['Persistent context', 'SQLite, sqlite-vec, story bibles, and sessions keep long-term memory available.'],
      ['Live observability', 'SSE, task status, and progress panels make long-running AI tasks visible.'],
      ['Deployment shape', 'Docker Compose, nginx, and environment config move local apps toward hosted services.'],
    ],
    projects: [
      {
        kicker: 'An AI project manager from requirement to plan',
        summary:
          'Transforms natural language requirements into tasks, priorities, resource allocation, and timelines through an observable LangGraph workflow.',
        features: [
          'Requirement parsing and interactive clarification',
          'Task decomposition, priority scoring, and dependency discovery',
          'Team allocation with conflict adjustment loops',
          'Gantt chart, task table, exports, and session recovery',
        ],
        architecture: [
          ['Parse', 'Convert raw requests into structured Requirements'],
          ['Decompose', 'Stream SubTasks progressively to the interface'],
          ['Allocate', 'Schedule work based on team configuration and constraints'],
          ['Summarize', 'Deliver Markdown, JSON, and CSV project plans'],
        ],
        metrics: [
          ['7', 'workflow stages'],
          ['SSE', 'live progress'],
          ['3+', 'export modes'],
        ],
      },
      {
        kicker: 'An AI workspace for long-form fiction production',
        summary:
          'A full writing operations system for novels: worldbuilding, story bible, architecture, chapter generation, review, repair, memory extraction, and recurring automation.',
        features: [
          'One-click generation for metadata, story bible, and multi-level architecture',
          'Chapter drafting, version history, AI review, and revision guidance',
          'Cross-chapter continuity checks and memory-card extraction',
          'Recurring backend tasks, publishing flows, and Docker deployment',
        ],
        architecture: [
          ['Bootstrap', 'Start a novel from one creative prompt'],
          ['Memory', 'Use story bible, chapter memory, and vector retrieval for long context'],
          ['Review', 'Detect timeline, character-state, world-rule, and item conflicts'],
          ['Automation', 'Connect generation, review, repair, and publishing into repeatable jobs'],
        ],
        metrics: [
          ['10+', 'AI graphs'],
          ['RAG', 'story memory'],
          ['Auto', 'recurring tasks'],
        ],
      },
    ],
  },
};

const projectMeta = [
  {
    id: 'project-manager',
    index: '01',
    name: 'AI Project Manager Assistant',
    path: '/Users/linkzhao/workspace/AI/AI-project-manager',
    media: {
      zh: '/media/project-manager-showcase-zh.mp4',
      en: '/media/project-manager-showcase-en.mp4',
    },
    secondaryMedia: '/media/project-manager-chat.png',
    accent: 'copper',
    icon: BrainCircuit,
    stack: ['FastAPI', 'LangGraph', 'LangChain', 'React', 'TypeScript', 'Vite'],
  },
  {
    id: 'novelforge',
    index: '02',
    name: 'NovelForge',
    path: '/Users/linkzhao/workspace/AI/books_manage',
    media: {
      zh: '/media/novelforge-showcase.mp4',
      en: '/media/novelforge-showcase-en.mp4',
    },
    accent: 'cyan',
    icon: BookOpenText,
    stack: ['Node.js', 'TypeScript', 'Express', 'LangGraph', 'SQLite', 'sqlite-vec', 'React'],
  },
];

const systemIcons = [GitBranch, DatabaseZap, LineChart, Boxes];

function App() {
  const [locale, setLocale] = useState('zh');
  const t = copy[locale];
  const projects = useMemo(
    () => projectMeta.map((meta, index) => ({
      ...meta,
      ...t.projects[index],
      locale,
      mediaUrl: typeof meta.media === 'string' ? meta.media : meta.media[locale],
    })),
    [locale, t],
  );

  return (
    <main className={`locale-${locale}`} lang={locale === 'zh' ? 'zh-CN' : 'en'}>
      <video
        className="background-video"
        key={`background-${locale}`}
        src={`/media/ai-lab-background-${locale}.mp4`}
        poster="/media/project-manager-analysis.png"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="video-scrim" />
      <nav className="topbar" aria-label="Primary">
        <a className="brand" href="#home" aria-label="Link Zhao AI Product Lab home">
          <span className="brand-mark">LZ</span>
          <span>{t.brand}</span>
        </a>
        <div className="nav-links">
          <a href="#project-manager">{t.nav[0]}</a>
          <a href="#novelforge">{t.nav[1]}</a>
          <a href="#architecture">{t.nav[2]}</a>
        </div>
        <button className="language-toggle" type="button" onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}>
          <Languages size={17} />
          {locale === 'zh' ? 'EN' : '中文'}
        </button>
      </nav>

      <section id="home" className="hero section">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={18} /> {t.heroEyebrow}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-lede">{t.heroLead}</p>
          <div className="hero-actions">
            <a className="primary-action" href="#project-manager">
              <Play size={18} /> {t.heroPrimary}
            </a>
            <a className="secondary-action" href="#architecture">
              <Radar size={18} /> {t.heroSecondary}
            </a>
          </div>
        </div>
        <div className="hero-panel" aria-label="AI portfolio summary">
          <div className="system-visual">
            <div className="visual-topline">
              <span>AI SYSTEMS</span>
              <span>LIVE GRAPH</span>
            </div>
            <div className="visual-canvas">
              <div className="node node-primary"><BrainCircuit size={44} /></div>
              <div className="node node-a"><GitBranch size={22} /></div>
              <div className="node node-b"><DatabaseZap size={22} /></div>
              <div className="node node-c"><LineChart size={22} /></div>
              <span className="trace trace-a" />
              <span className="trace trace-b" />
              <span className="trace trace-c" />
            </div>
            <div className="visual-footer">
              <span>Requirement graph</span>
              <span>Story memory</span>
              <span>Deployable UI</span>
            </div>
          </div>
          <div className="stat-grid">
            {t.stats.map(([value, label]) => (
              <div className="stat" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="manifest section">
        <p>{t.manifestoSmall}</p>
        <h2>{t.manifestoTitle}</h2>
      </section>

      {projects.map((project) => (
        <ProjectSection key={project.id} project={project} localPathLabel={t.localPath} />
      ))}

      <section id="architecture" className="section stack-section">
        <div className="section-heading">
          <p className="eyebrow"><Network size={18} /> {t.systemEyebrow}</p>
          <h2>{t.systemTitle}</h2>
        </div>
        <div className="system-map">
          {t.system.map(([title, text], index) => {
            const Icon = systemIcons[index];
            return (
              <article className="map-card" key={title}>
                <Icon size={26} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <footer className="footer">
        <span>{t.brand}</span>
        <span>{t.footerPath}</span>
      </footer>
    </main>
  );
}

function ProjectSection({ project, localPathLabel }) {
  const Icon = project.icon;
  const isVideo = project.mediaUrl.endsWith('.mp4');

  return (
    <section id={project.id} className={`project section ${project.accent}`}>
      <div className="project-heading">
        <p className="index">{project.index}</p>
        <div>
          <p className="eyebrow"><Icon size={18} /> {project.kicker}</p>
          <h2>{project.name}</h2>
          <p>{project.summary}</p>
        </div>
      </div>

      <div className="project-layout">
        <div className="project-media">
          {isVideo ? (
            <video key={`${project.id}-${project.locale}`} src={project.mediaUrl} autoPlay muted loop playsInline />
          ) : (
            <img src={project.mediaUrl} alt={`${project.name} interface`} />
          )}
          {project.secondaryMedia && !isVideo ? (
            <img className="media-float" src={project.secondaryMedia} alt={`${project.name} chat view`} />
          ) : null}
        </div>

        <div className="project-content">
          <div className="metric-strip">
            {project.metrics.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="feature-list">
            {project.features.map((feature) => (
              <p key={feature}><CheckCircle2 size={18} /> {feature}</p>
            ))}
          </div>

          <div className="architecture-list">
            {project.architecture.map(([label, text]) => (
              <div key={label}>
                <span>{label}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>

          <div className="stack-row">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className="project-link path-pill" title={project.path}>
            <Code2 size={18} /> {localPathLabel} <span>{project.path}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

createRoot(document.getElementById('root')).render(<App />);
