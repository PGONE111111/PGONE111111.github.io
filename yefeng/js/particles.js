/* ============================================
   Yefeng RP - 粒子背景 & 3D场景
   ============================================ */

(function() {
    'use strict';

    // ==================== Canvas粒子系统 ====================
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];
    const particleCount = 80;
    const connectionDistance = 150;
    const mouseRadius = 120;
    let mouse = { x: -999, y: -999 };

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.color = Math.random() > 0.5 ? 
                `rgba(255, 51, 102, ${this.opacity})` : 
                `rgba(0, 212, 255, ${this.opacity})`;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // 边界循环
            if (this.x < -10) this.x = width + 10;
            if (this.x > width + 10) this.x = -10;
            if (this.y < -10) this.y = height + 10;
            if (this.y > height + 10) this.y = -10;

            // 鼠标交互
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouseRadius) {
                const force = (mouseRadius - dist) / mouseRadius;
                const angle = Math.atan2(dy, dx);
                this.vx -= Math.cos(angle) * force * 0.03;
                this.vy -= Math.sin(angle) * force * 0.03;
            }

            // 速度衰减
            this.vx *= 0.998;
            this.vy *= 0.998;

            // 限制速度
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > 1.5) {
                this.vx = (this.vx / speed) * 1.5;
                this.vy = (this.vy / speed) * 1.5;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    const opacity = (1 - dist / connectionDistance) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 51, 102, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        drawConnections();
        requestAnimationFrame(animateParticles);
    }

    // 鼠标事件
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
        mouse.x = -999;
        mouse.y = -999;
    });

    // 触摸事件
    document.addEventListener('touchmove', (e) => {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', () => {
        mouse.x = -999;
        mouse.y = -999;
    });

    // 窗口大小调整
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
            initParticles();
        }, 200);
    });

    // ==================== Three.js 3D场景 ====================
    function initThreeScene() {
        if (typeof THREE === 'undefined') return;

        const container = document.getElementById('threeContainer');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true 
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // 创建环形几何体
        const torusGeometry = new THREE.TorusGeometry(1.2, 0.08, 16, 100);
        const torusMaterial = new THREE.MeshBasicMaterial({
            color: 0xff3366,
            wireframe: true,
            transparent: true,
            opacity: 0.15
        });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        scene.add(torus);

        // 第二环
        const torus2Geometry = new THREE.TorusGeometry(1.6, 0.05, 16, 100);
        const torus2Material = new THREE.MeshBasicMaterial({
            color: 0x00d4ff,
            wireframe: true,
            transparent: true,
            opacity: 0.1
        });
        const torus2 = new THREE.Mesh(torus2Geometry, torus2Material);
        torus2.rotation.x = Math.PI / 2;
        scene.add(torus2);

        // 粒子环
        const ringParticlesGeometry = new THREE.BufferGeometry();
        const ringCount = 200;
        const ringRadius = 2.0;
        const positions = new Float32Array(ringCount * 3);

        for (let i = 0; i < ringCount; i++) {
            const angle = (i / ringCount) * Math.PI * 2;
            const x = Math.cos(angle) * ringRadius;
            const y = Math.sin(angle) * ringRadius * 0.3;
            const z = 0;
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }

        ringParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const ringParticlesMaterial = new THREE.PointsMaterial({
            color: 0x7c3aed,
            size: 0.03,
            transparent: true,
            opacity: 0.4
        });
        const ringParticles = new THREE.Points(ringParticlesGeometry, ringParticlesMaterial);
        scene.add(ringParticles);

        // 中心发光点
        const glowGeometry = new THREE.SphereGeometry(0.08, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xff3366,
            transparent: true,
            opacity: 0.6
        });
        const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
        scene.add(glowSphere);

        // 动画循环
        let scrollY = 0;
        window.addEventListener('scroll', () => {
            scrollY = window.scrollY;
        });

        function animate3D() {
            requestAnimationFrame(animate3D);

            const time = Date.now() * 0.001;

            torus.rotation.x += 0.003;
            torus.rotation.y += 0.005;
            torus.position.y = -scrollY * 0.0003;

            torus2.rotation.z += 0.004;
            torus2.position.y = -scrollY * 0.0003;

            ringParticles.rotation.z += 0.002;
            ringParticles.rotation.x = Math.sin(time * 0.3) * 0.3;
            ringParticles.position.y = -scrollY * 0.0003;

            glowSphere.scale.setScalar(1 + Math.sin(time * 2) * 0.3);
            glowSphere.position.y = -scrollY * 0.0003;

            renderer.render(scene, camera);
        }

        animate3D();

        // 响应式
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // ==================== 初始化 ====================
    function init() {
        resizeCanvas();
        initParticles();
        animateParticles();
        initThreeScene();
    }

    // DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
