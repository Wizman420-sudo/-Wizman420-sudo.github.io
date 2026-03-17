// ===== 密码配置 =====
const PASSWORD_CONFIG = {
    password: "520",           // 访问密码
    storageKey: "visual_archive_auth",  // localStorage 键名
    expiresIn: 7 * 24 * 60 * 60 * 1000  // 7 天过期（毫秒）
};

// ===== 图片配置 =====
const images = [
    // 把你的图片文件名放在这里，格式："image1.jpg", "image2.png" 等
    // 示例：
    // "01.jpg", "02.jpg", "03.jpg", ...
    
    ...Array.from({ length: 44 }, (_, i) => `images/image_${String(i + 1).padStart(2, '0')}.png`),
    ...Array.from({ length: 653 }, (_, i) => `images/image_${i + 45}.jpg`)
];

// ===== 网站配置 =====
const config = {
    title: "视觉档案 | VISUAL ARCHIVE",
    subtitle: "697 个瞬间 · 697 个故事 · 纯粹视觉",
    footer: "© 2026 seamoon · All images reserved"
};

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    initPasswordProtection();
    initGallery();
    initLightbox();
});

// ===== 密码保护功能 =====
function initPasswordProtection() {
    const overlay = document.getElementById('passwordOverlay');
    const input = document.getElementById('passwordInput');
    const btn = document.getElementById('unlockBtn');
    const error = document.getElementById('passwordError');
    const siteContent = document.getElementById('siteContent');
    
    if (!overlay || !input || !btn) return;
    
    // 检查是否已认证
    if (isAuthenticated()) {
        unlockSite();
        return;
    }
    
    // 解锁按钮点击
    btn.addEventListener('click', () => {
        verifyPassword(input.value.trim());
    });
    
    // 回车键提交
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            verifyPassword(input.value.trim());
        }
    });
    
    // 输入时清除错误
    input.addEventListener('input', () => {
        error.classList.remove('show');
    });
    
    // 聚焦时自动选择
    input.addEventListener('focus', () => {
        input.select();
    });
    
    function verifyPassword(password) {
        if (!password) {
            showError('请输入密码');
            input.focus();
            return;
        }
        
        if (password === PASSWORD_CONFIG.password) {
            // 密码正确
            saveAuth();
            unlockSite();
        } else {
            // 密码错误
            showError('密码错误，请重试');
            input.value = '';
            input.focus();
            
            // 震动效果
            overlay.style.animation = 'none';
            overlay.offsetHeight; // 触发重绘
            overlay.style.animation = 'shake 0.5s ease';
        }
    }
    
    function showError(message) {
        error.textContent = message;
        error.classList.add('show');
    }
    
    function unlockSite() {
        overlay.classList.add('hidden');
        siteContent.style.display = 'block';
        
        // 延迟移除遮罩（等动画完成）
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500);
        
        // 重新触发图片加载动画
        initGallery();
    }
}

// ===== 认证状态管理 =====
function saveAuth() {
    const authData = {
        authenticated: true,
        timestamp: Date.now()
    };
    localStorage.setItem(PASSWORD_CONFIG.storageKey, JSON.stringify(authData));
}

function isAuthenticated() {
    try {
        const authData = JSON.parse(localStorage.getItem(PASSWORD_CONFIG.storageKey));
        
        if (!authData || !authData.authenticated) {
            return false;
        }
        
        // 检查是否过期
        const now = Date.now();
        const elapsed = now - authData.timestamp;
        
        if (elapsed > PASSWORD_CONFIG.expiresIn) {
            // 过期，清除认证
            localStorage.removeItem(PASSWORD_CONFIG.storageKey);
            return false;
        }
        
        return true;
    } catch (e) {
        return false;
    }
}

// ===== 清除认证（控制台可用） =====
function clearAuth() {
    localStorage.removeItem(PASSWORD_CONFIG.storageKey);
    location.reload();
}

// ===== 初始化画廊 =====
function initGallery() {
    const gallery = document.getElementById('gallery');
    
    if (!gallery) return;
    
    gallery.innerHTML = images.map((src, index) => `
        <div class="gallery-item" 
             data-index="${String(index + 1).padStart(2, '0')}"
             data-src="${src}"
             style="animation-delay: ${index * 0.05}s">
            <img src="${src}" 
                 alt="Image ${String(index + 1).padStart(2, '0')}"
                 loading="lazy"
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect fill=%22%23111%22 width=%22100%22 height=%22100%22/%3E%3Ctext fill=%22%23333%22 x=%2250%22 y=%2255%22 text-anchor=%22middle%22 font-size=%2220%22%3E${String(index + 1).padStart(2, '0')}%3C/text%3E%3C/svg%3E'">
            <span class="index">${String(index + 1).padStart(2, '0')}</span>
        </div>
    `).join('');
}

// ===== 初始化 Lightbox =====
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    
    if (!lightbox || !lightboxImg) return;
    
    // 点击图片打开
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const src = item.dataset.src;
            const index = item.dataset.index;
            
            lightboxImg.src = src;
            lightboxCaption.textContent = `FRAME ${index}`;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // 关闭按钮
    closeBtn.addEventListener('click', closeLightbox);
    
    // 点击背景关闭
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // ESC 键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImg.src = '';
        }, 300);
    }
}

// ===== 键盘导航（可选） =====
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('active')) return;
    
    const currentImg = document.getElementById('lightbox-img').src;
    const currentIndex = images.findIndex(src => currentImg.includes(src));
    
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        navigateImage(currentIndex - 1);
    } else if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
        navigateImage(currentIndex + 1);
    }
    
    function navigateImage(index) {
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        
        lightboxImg.src = images[index];
        lightboxCaption.textContent = `FRAME ${String(index + 1).padStart(2, '0')}`;
    }
});

// ===== 控制台彩蛋 =====
console.log('%c🌙 VISUAL ARCHIVE', 'font-size: 24px; font-weight: bold; color: #8B5CF6;');
console.log('%cBuilt with ❤️ for seamoon', 'font-size: 12px; color: #666;');
console.log('%c🔒 Password: 520', 'font-size: 10px; color: #444;');
console.log('%cType clearAuth() to logout', 'font-size: 10px; color: #444;');
console.log(`%c📸 Total images: ${images.length}`, 'font-size: 10px; color: #444;');
