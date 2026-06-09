<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="夜枫 半RP - 高端FiveM角色扮演服务器 | 沉浸式城市生活体验">
    <meta name="theme-color" content="#0a0a0f">
    <title>Yefeng  | 顶级FiveM角色扮演服务器</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/animations.css">
    <link rel="stylesheet" href="css/responsive.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
</head>
<body>
    <!-- 动态粒子背景 -->
    <canvas id="particleCanvas"></canvas>
    
    <!-- 3D场景容器 -->
    <div id="threeContainer"></div>

    <!-- 导航栏 -->
    <header class="navbar" id="navbar">
        <div class="nav-container">
            <div class="nav-logo" id="navLogo">
                <div class="logo-3d-wrapper">
                    <span class="logo-text">夜枫</span>
                    <span class="logo-sub">生活扮演</span>
                </div>
            </div>
            <nav class="nav-links">
                <a href="#home" class="nav-link active" data-section="home">首页</a>
                <a href="#stats" class="nav-link" data-section="stats">服务器</a>
                <a href="#guide" class="nav-link" data-section="guide">新手指南</a>
                <a href="#sponsor" class="nav-link" data-section="sponsor">内测福利</a>
                <a href="#community" class="nav-link" data-section="community">社群</a>
            </nav>
            <div class="nav-actions">
                <button class="btn-ip-copy" id="btnCopyIP" title="点击复制服务器IP">
                    <span class="ip-icon">⚡</span>
                    <span class="ip-text" id="serverIP">cfx.re/join/yefengrp</span>
                    <span class="copy-hint">点击复制</span>
                </button>
                <button class="mobile-menu-toggle" id="mobileMenuToggle">
                    <span></span><span></span><span></span>
                </button>
            </div>
        </div>
    </header>

    <!-- 主内容区 -->
    <main>
        <!-- Hero区域 -->
        <section id="home" class="section-hero">
            <div class="hero-content">
                <div class="hero-badge">
                    <span class="badge-dot"></span> 内部测试中
                </div>
                <h1 class="hero-title">
                    <span class="title-line">WELCOME TO</span>
                    <span class="title-main">夜枫</span>
                    <span class="title-sub">生活扮演服务器</span>
                </h1>
                <p class="hero-desc">沉浸式城市角色扮演 · 高品质半RP体验 · 专业管理团队</p>
                <div class="hero-buttons">
                    <a href="#stats" class="btn-primary">
                        <span>探索服务器</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </a>
                    <button class="btn-secondary" id="btnCopyIPHero">
                        <span>复制服务器IP</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" stroke-width="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" stroke-width="2"/></svg>
                    </button>
                </div>
                <div class="hero-players">
                    <div class="players-avatars">
                        <div class="avatar" style="background:#ff3366;">A</div>
                        <div class="avatar" style="background:#00d4ff;">B</div>
                        <div class="avatar" style="background:#7c3aed;">C</div>
                        <div class="avatar" style="background:#10b981;">D</div>
                        <div class="avatar more">+</div>
                    </div>
                    <span class="players-count"><strong id="onlineCount">20</strong> 玩家在线</span>
                </div>
            </div>
            <div class="hero-visual">
                <div class="glow-orb orb-1"></div>
                <div class="glow-orb orb-2"></div>
                <div class="glow-orb orb-3"></div>
            </div>
            <div class="scroll-indicator">
                <span>向下滚动</span>
                <div class="scroll-line"></div>
            </div>
        </section>

        <!-- 服务器状态面板 -->
        <section id="stats" class="section-stats">
            <div class="section-header">
                <h2 class="section-title">服务器 <span class="accent">状态</span></h2>
                <p class="section-subtitle">实时监控 · 数据透明</p>
            </div>
            <div class="stats-grid">
                <!-- 主状态卡 -->
                <div class="stat-card main-card">
                    <div class="card-glow"></div>
                    <div class="card-content">
                        <div class="status-indicator" id="serverStatus">
                            <span class="status-dot online"></span>
                            <span class="status-text">运行中</span>
                        </div>
                        <div class="stat-big-number">
                            <span class="big-num" id="playerCount">12</span>
                            <span class="big-unit">/ 256</span>
                        </div>
                        <div class="stat-label">当前在线玩家</div>
                        <div class="progress-bar">
                            <div class="progress-fill" id="playerProgress" style="width:50%"></div>
                        </div>
                    </div>
                </div>
                <!-- 数据卡片 -->
                <div class="stat-card">
                    <div class="card-content">
                        <div class="stat-icon">👮</div>
                        <div class="stat-value" id="policeCount">5</div>
                        <div class="stat-label">在线警察</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="card-content">
                        <div class="stat-icon">🚑</div>
                        <div class="stat-value" id="emsCount">5</div>
                        <div class="stat-label">在线医护</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="card-content">
                        <div class="stat-icon">🏢</div>
                        <div class="stat-value" id="businessCount">8</div>
                        <div class="stat-label">运营产业</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="card-content">
                        <div class="stat-icon">🚗</div>
                        <div class="stat-value" id="vehicleCount">300</div>
                        <div class="stat-label">可驾驶载具</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 公告轮播区域 -->
        <section class="section-news">
            <div class="news-container">
                <div class="news-label">
                    <span class="news-badge">📢 公告</span>
                </div>
                <div class="news-scroll" id="newsScroll">
                    <div class="news-track" id="newsTrack">
                        <div class="news-item">🔥 新职业系统已上线！警察、医护、黑帮全面升级，即刻加入体验！</div>
                        <div class="news-item">🎉 周末双倍经验活动火热进行中，快速提升你的角色等级！</div>
                        <div class="news-item">🏆 第一届Yefeng RP漂移大赛报名开启，丰厚奖励等你来拿！</div>
                        <div class="news-item">🛠️ 服务器维护公告：每周三凌晨3:00-5:00例行维护，请合理安排游戏时间。</div>
                        <div class="news-item">💎 全新赞助系统上线，更多专属福利等你解锁！</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 宣传海报轮播 -->
        <section class="section-carousel">
            <div class="carousel-container" id="posterCarousel">
                <div class="carousel-track" id="carouselTrack">
                    <div class="carousel-slide active">
                        <div class="slide-bg" style="background: linear-gradient(135deg, #1a0033, #0d001a);">
                            <div class="slide-content">
                                <span class="slide-tag">全新上线</span>
                                <h3>洛斯桑托斯 · 城市重生</h3>
                                <p>探索焕然一新的洛圣都，体验前所未有的角色扮演</p>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-slide">
                        <div class="slide-bg" style="background: linear-gradient(135deg, #001a33, #000d1a);">
                            <div class="slide-content">
                                <span class="slide-tag">限时活动</span>
                                <h3>暗夜狂飙 · 街头赛车季</h3>
                                <p>改装你的座驾，在城市街头留下属于你的传奇</p>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-slide">
                        <div class="slide-bg" style="background: linear-gradient(135deg, #33001a, #1a000d);">
                            <div class="slide-content">
                                <span class="slide-tag">职业扩展</span>
                                <h3>犯罪帝国 · 帮派崛起</h3>
                                <p>建立你的地下帝国，掌控城市的经济命脉</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-dots" id="carouselDots"></div>
                <button class="carousel-btn prev" id="carouselPrev">‹</button>
                <button class="carousel-btn next" id="carouselNext">›</button>
            </div>
        </section>

        <!-- 新手入门指南 -->
        <section id="guide" class="section-guide">
            <div class="section-header">
                <h2 class="section-title">新手 <span class="accent">入门</span></h2>
                <p class="section-subtitle">快速上手 · 轻松融入</p>
            </div>
            <div class="guide-grid">
                <div class="guide-card">
                    <div class="guide-step">01</div>
                    <div class="guide-icon">🖥️</div>
                    <h4>安装FiveM</h4>
                    <p>下载并安装FiveM客户端，确保GTA V已安装并完成首次运行</p>
                    <ul class="guide-details">
                        <li>前往FiveM官网下载客户端</li>
                        <li>完成GTA V基础安装</li>
                        <li>启动FiveM并登录</li>
                    </ul>
                </div>
                <div class="guide-card">
                    <div class="guide-step">02</div>
                    <div class="guide-icon">🔍</div>
                    <h4>搜索服务器</h4>
                    <p>在FiveM中搜索我们的服务器，或直接使用IP地址连接</p>
                    <ul class="guide-details">
                        <li>打开FiveM按F8打开控制台</li>
                        <li>输入：connect cfx.re/join/yefengrp</li>
                        <li>等待资源下载完成</li>
                    </ul>
                </div>
                <div class="guide-card">
                    <div class="guide-step">03</div>
                    <div class="guide-icon">👤</div>
                    <h4>创建角色</h4>
                    <p>定制你的专属角色外观，选择出生点开始你的生活之旅</p>
                    <ul class="guide-details">
                        <li>进入角色创建界面</li>
                        <li>自定义外貌与服装</li>
                        <li>选择初始职业方向</li>
                    </ul>
                </div>
                <div class="guide-card">
                    <div class="guide-step">04</div>
                    <div class="guide-icon">🎮</div>
                    <h4>开始扮演</h4>
                    <p>遵守服务器规则，与其他玩家互动，书写你的城市故事</p>
                    <ul class="guide-details">
                        <li>阅读服务器规则手册</li>
                        <li>熟悉城市地图与设施</li>
                        <li>加入QQ官方群聊获取帮助</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- 内测福利展示 -->
        <section id="sponsor" class="section-sponsor">
            <div class="section-header">
                <h2 class="section-title">内测 <span class="accent">福利</span></h2>
                <p class="section-subtitle">夜枫 · 内测邀请函</p>
            </div>
            <div class="sponsor-grid">
                <!-- 青铜 -->
                <div class="sponsor-card tier-bronze">
                    <div class="tier-header">
                        <h4>🥉 初级体验官</h4>
                        <div class="tier-price">10日前<span>加入</span></div>
                    </div>
                    <ul class="tier-benefits">
                        <li>💬 可加入服务器开发者企划群</li>
                        <li>💰 内测体验资格</li>
                        <li>🎨 内测阶段自营产业体验任选其一</li>
                        <li>🚗 公测后1辆专属载具</li>
                    </ul>
                    <button class="btn-tier">立即加入</button>
                </div>
                <!-- 白银 - 推荐 -->
                <div class="sponsor-card tier-silver featured">
                    <div class="tier-badge">🔥 热门</div>
                    <div class="tier-header">
                        <h4>🥈 中级体验官</h4>
                        <div class="tier-price">参与内测<span>满1个月</span></div>
                    </div>
                    <ul class="tier-benefits">
                        <li>💬 可加入服务器开发者企划群</li>
                        <li>💰 内测体验资格</li>
                        <li>🎨 内测阶段自营产业体验任选其一</li>
                        <li>🚗 公测后1辆专属载具</li>
                        <li>🏠 优先房屋/公寓资格申请</li>
                        <li>⚡ 可竞选城市管理岗位</li>
                        
                    </ul>
                    <button class="btn-tier primary">立即加入</button>
                </div>
                <!-- 黄金 -->
                <div class="sponsor-card tier-gold">
                    <div class="tier-header">
                        <h4>🥇 高级体验官</h4>
                        <div class="tier-price">参与内测及公测<span>满3个月</span></div>
                    </div>
                    <ul class="tier-benefits">
                        <li>💬 可加入服务器开发者企划群</li>
                        <li>💰 内测体验资格</li>
                        <li>🎨 公测后自营产业体验任选其一</li>
                        <li>🚗 公测后2辆专属载具</li>
                        <li>🏠 优先房屋/别墅资格申请</li>
                        <li>⚡ 可竞选城市管理岗位</li>
                        <li>🌟 自定义官方QQ群内称号</li>
                        
                    </ul>
                    <button class="btn-tier">立即加入</button>
                </div>
            </div>
        </section>

        <!-- 管理团队名片 -->
        <section class="section-team">
            <div class="section-header">
                <h2 class="section-title">管理 <span class="accent">团队</span></h2>
                <p class="section-subtitle">专业运营 · 用心服务</p>
            </div>
            <div class="team-grid">
                <div class="team-card">
                    <div class="team-avatar">
                        <div class="avatar-img" style="background: linear-gradient(135deg, #ff3366, #ff6b6b);">ZL</div>
                        <div class="avatar-ring"></div>
                    </div>
                    <div class="team-info">
                        <h4>梓泷</h4>
                        <span class="team-role owner">服主</span>
                        <p>服务器创始人，全权管理</p>
                        <div class="team-social">
                            <a href="#" class="social-link">DC</a>
                        </div>
                    </div>
                </div>
                <div class="team-card">
                    <div class="team-avatar">
                        <div class="avatar-img" style="background: linear-gradient(135deg, #00d4ff, #0099ff);">CH</div>
                        <div class="avatar-ring"></div>
                    </div>
                    <div class="team-info">
                        <h4>彩虹</h4>
                        <span class="team-role admin">管理员</span>
                        <p>技术维护与插件开发</p>
                        <div class="team-social">
                            <a href="#" class="social-link">DC</a>
                        </div>
                    </div>
                </div>
                <div class="team-card">
                    <div class="team-avatar">
                        <div class="avatar-img" style="background: linear-gradient(135deg, #7c3aed, #a78bfa);">QL</div>
                        <div class="avatar-ring"></div>
                    </div>
                    <div class="team-info">
                        <h4>七六</h4>
                        <span class="team-role mod">管理员</span>
                        <p>社区运营与活动策划</p>
                        <div class="team-social">
                            <a href="#" class="social-link">DC</a>
                        </div>
                    </div>
                </div>
                <div class="team-card">
                    <div class="team-avatar">
                        <div class="avatar-img" style="background: linear-gradient(135deg, #10b981, #34d399);">WJZ</div>
                        <div class="avatar-ring"></div>
                    </div>
                    <div class="team-info">
                        <h4>伪君子</h4>
                        <span class="team-role mod">管理员</span>
                        <p>玩家支持与纠纷处理</p>
                        <div class="team-social">
                            <a href="#" class="social-link">DC</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 社群聚合入口 -->
        <section id="community" class="section-community">
            <div class="section-header">
                <h2 class="section-title">加入 <span class="accent">社群</span></h2>
                <p class="section-subtitle">多元渠道 · 即时互动</p>
            </div>
            <div class="community-grid">
                <a href="#" class="community-card discord">
                    <div class="community-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                    </div>
                    <h4>Discord</h4>
                    <p>主社群平台 · 公告发布 · 语音交流</p>
                    <span class="community-link">立即加入 →</span>
                </a>
                <a href="#" class="community-card telegram">
                    <div class="community-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.94z"/></svg>
                    </div>
                    <h4>Telegram</h4>
                    <p>即时通知 · 维护公告 · 快速响应</p>
                    <span class="community-link">立即加入 →</span>
                </a>
                <a href="#" class="community-card qq">
                    <div class="community-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="12"/><text x="12" y="17" text-anchor="middle" fill="white" font-size="12" font-weight="bold">QQ</text></svg>
                    </div>
                    <h4>QQ群</h4>
                    <p>国内玩家聚集 · 问题解答 · 组队开黑</p>
                    <span class="community-link">立即加入 →</span>
                </a>
                <a href="#" class="community-card bilibili">
                    <div class="community-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 01-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 01.16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/></svg>
                    </div>
                    <h4>Bilibili</h4>
                    <p>精彩视频 · 直播实况 · 玩法教程</p>
                    <span class="community-link">立即关注 →</span>
                </a>
            </div>
        </section>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-brand">
                <h3>夜枫 半RP</h3>
                <p>打造最优质的FiveM角色扮演体验</p>
            </div>
            <div class="footer-links">
                <div class="footer-col">
                    <h5>快速链接</h5>
                    <a href="#home">首页</a>
                    <a href="#stats">服务器状态</a>
                    <a href="#guide">新手指南</a>
                    <a href="#sponsor">赞助福利</a>
                </div>
                <div class="footer-col">
                    <h5>社群平台</h5>
                    <a href="#">Discord</a>
                    <a href="#">Telegram</a>
                    <a href="#">QQ群</a>
                    <a href="#">Bilibili</a>
                </div>
                <div class="footer-col">
                    <h5>服务器信息</h5>
                    <p>IP: cfx.re/join/yefengrp</p>
                    <p>版本: FiveM 1.0+</p>
                    <p>类型: 角色扮演</p>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 Yefeng Roleplay. All rights reserved. 本站为非官方FiveM服务器宣传页面。</p>
        </div>
    </footer>

    <!-- 复制提示Toast -->
    <div class="toast" id="toast">
        <span class="toast-icon">✓</span>
        <span class="toast-text">服务器IP已复制到剪贴板！</span>
    </div>

    <!-- 移动端导航菜单 -->
    <div class="mobile-menu" id="mobileMenu">
        <div class="mobile-menu-bg"></div>
        <div class="mobile-menu-content">
            <a href="#home" class="mobile-link">首页</a>
            <a href="#stats" class="mobile-link">服务器</a>
            <a href="#guide" class="mobile-link">新手指南</a>
            <a href="#sponsor" class="mobile-link">内测福利</a>
            <a href="#community" class="mobile-link">社群</a>
        </div>
    </div>

    <script src="js/particles.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
