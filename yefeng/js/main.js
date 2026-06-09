/* ============================================
   Yefeng RP - 主交互逻辑
   ============================================ */

(function() {
    'use strict';

    // ==================== 导航栏滚动效果 ====================
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    function handleScroll() {
        const scrollY = window.scrollY;
        
        // 导航栏样式切换
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // 活动导航链接更新
        updateActiveNavLink();
    }

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollY = window.scrollY + 100;

        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    }

    // ==================== 移动端菜单 ====================
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // 点击移动端菜单链接关闭菜单
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 点击菜单背景关闭
    mobileMenu.querySelector('.mobile-menu-bg').addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    // ==================== IP复制功能 ====================
    const serverIP = 'cfx.re/join/yefengrp';
    const toast = document.getElementById('toast');
    let toastTimer;

    function copyIP() {
        navigator.clipboard.writeText(serverIP).then(() => {
            showToast();
        }).catch(() => {
            // 降级方案
            const textArea = document.createElement('textarea');
            textArea.value = serverIP;
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showToast();
            } catch (e) {
                console.error('复制失败');
            }
            document.body.removeChild(textArea);
        });
    }

    function showToast() {
        clearTimeout(toastTimer);
        toast.classList.add('show');
        toastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

    document.getElementById('btnCopyIP').addEventListener('click', copyIP);
    document.getElementById('btnCopyIPHero').addEventListener('click', copyIP);

    // ==================== 服务器状态模拟 ====================
    function updateServerStats() {
        const maxPlayers = 20;
        const currentPlayers = Math.floor(Math.random() * 80) + 80; // 10-20
        
        const playerCountEl = document.getElementById('playerCount');
        const onlineCountEl = document.getElementById('onlineCount');
        const playerProgress = document.getElementById('playerProgress');
        const policeCount = document.getElementById('policeCount');
        const emsCount = document.getElementById('emsCount');
        const businessCount = document.getElementById('businessCount');
        const vehicleCount = document.getElementById('vehicleCount');

        if (playerCountEl) {
            animateNumber(playerCountEl, parseInt(playerCountEl.textContent) || 128, currentPlayers);
        }
        if (onlineCountEl) {
            onlineCountEl.textContent = currentPlayers;
        }
        if (playerProgress) {
            playerProgress.style.width = (currentPlayers / maxPlayers * 100) + '%';
        }

        // 模拟关联数据变化
        const policeBase = Math.floor(currentPlayers * 0.09);
        const emsBase = Math.floor(currentPlayers * 0.06);
        const businessBase = 24 + Math.floor(Math.random() * 5);
        const vehicleBase = 150 + Math.floor(Math.random() * 20);

        if (policeCount) policeCount.textContent = policeBase;
        if (emsCount) emsCount.textContent = emsBase;
        if (businessCount) businessCount.textContent = businessBase;
        if (vehicleCount) vehicleCount.textContent = vehicleBase;
    }

    function animateNumber(element, start, end) {
        const duration = 1000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out
            const current = Math.round(start + (end - start) * eased);
            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // 每10秒更新一次
    setInterval(updateServerStats, 10000);
    // 首次3秒后更新
    setTimeout(updateServerStats, 3000);

    // ==================== 服务器状态切换模拟 ====================
    function simulateStatusToggle() {
        const statusIndicator = document.getElementById('serverStatus');
        if (!statusIndicator) return;

        const dot = statusIndicator.querySelector('.status-dot');
        const text = statusIndicator.querySelector('.status-text');

        // 模拟偶发性维护（极少概率）
        if (Math.random() < 0.05) {
            dot.classList.remove('online');
            dot.classList.add('offline');
            text.textContent = '维护中';
            text.style.color = '#ef4444';
            
            // 5秒后恢复
            setTimeout(() => {
                dot.classList.remove('offline');
                dot.classList.add('online');
                text.textContent = '运行中';
                text.style.color = '';
            }, 5000);
        }
    }

    setInterval(simulateStatusToggle, 30000);

    // ==================== 海报轮播 ====================
    function initCarousel() {
        const track = document.getElementById('carouselTrack');
        const dotsContainer = document.getElementById('carouselDots');
        const prevBtn = document.getElementById('carouselPrev');
        const nextBtn = document.getElementById('carouselNext');
        
        if (!track || !dotsContainer) return;

        const slides = track.querySelectorAll('.carousel-slide');
        let currentIndex = 0;
        let autoplayTimer;
        const autoplayDelay = 5000;

        // 创建指示点
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.carousel-dot');

        function goToSlide(index) {
            slides[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');
            
            currentIndex = index;
            if (currentIndex >= slides.length) currentIndex = 0;
            if (currentIndex < 0) currentIndex = slides.length - 1;

            slides[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        function startAutoplay() {
            stopAutoplay();
            autoplayTimer = setInterval(nextSlide, autoplayDelay);
        }

        function stopAutoplay() {
            clearInterval(autoplayTimer);
        }

        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoplay();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoplay();
        });

        // 触摸滑动支持
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) nextSlide();
                else prevSlide();
                startAutoplay();
            }
        });

        // 鼠标悬停暂停
        track.addEventListener('mouseenter', stopAutoplay);
        track.addEventListener('mouseleave', startAutoplay);

        startAutoplay();
    }

    // ==================== 滚动渐入动画 ====================
    function initScrollReveal() {
        const revealElements = document.querySelectorAll(
            '.stat-card, .guide-card, .sponsor-card, .team-card, .community-card, .section-header'
        );

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`;
            observer.observe(el);
        });
    }

    // ==================== 鼠标光效跟踪 ====================
    function initHoverGlow() {
        const glowCards = document.querySelectorAll('.stat-card, .sponsor-card, .community-card');

        glowCards.forEach(card => {
            card.classList.add('hover-glow');
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', x + 'px');
                card.style.setProperty('--mouse-y', y + 'px');
            });
        });
    }

    // ==================== 公告滚动系统 ====================
    function initNewsScroll() {
        const track = document.getElementById('newsTrack');
        if (!track) return;

        // 克隆内容实现无缝滚动
        const items = track.innerHTML;
        track.innerHTML = items + items;

        // 悬停暂停
        const scrollContainer = document.getElementById('newsScroll');
        scrollContainer.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });
        scrollContainer.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
    }

    // ==================== 赞助按钮点击 ====================
    function initSponsorButtons() {
        const sponsorButtons = document.querySelectorAll('.btn-tier');
        sponsorButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const card = this.closest('.sponsor-card');
                const tierName = card.querySelector('h4').textContent;
                // 这里可以替换为实际的赞助链接或弹窗
                alert(`感谢您对 ${tierName} 的关注！\n请联系管理员获取内测福利详情。`);
            });
        });
    }

    // ==================== 平滑滚动 ====================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    const navHeight = 80;
                    const targetPosition = target.offsetTop - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ==================== 初始化 ====================
    function init() {
        handleScroll();
        initCarousel();
        initScrollReveal();
        initHoverGlow();
        initNewsScroll();
        initSponsorButtons();
        initSmoothScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
