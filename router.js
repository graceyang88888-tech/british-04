// router.js

// 定義路由表
const routes = {
    '/': {
        title: '首頁',
        script: 'pages/home_page.js',
        tag: 'home-page'
    },
    '/about': {
        title: '關於我們',
        script: 'pages/about_page.js',
        tag: 'about-page'
    },
    '/news': {
        title: '最新消息',
        script: 'pages/news_page.js',
        tag: 'news-page'
    },
    '/courses': {
        title: '教學課程',
        script: 'pages/course_page.js',
        tag: 'course-page'
    },
    '/teachers': {
        title: '師資介紹',
        script: 'pages/teacher_page.js',
        tag: 'teacher-page'
    },
    '/articles': {
        title: '學生作品',
        script: 'pages/article_page.js',
        tag: 'article-page'
    }
};

// 路由處理函式
async function router() {
    const path = location.hash.slice(1) || '/';
    const route = routes[path];
    const appContainer = document.getElementById('app-container');

    // 404 處理
    if (!route) {
        document.title = '找不到頁面 - 英國皇家幼兒園';
        appContainer.classList.add('page-offset'); // 404 頁面依然需要往下推
        appContainer.innerHTML = `
            <div class="container text-center" style="margin-top: 50px;">
                <h1 class="display-1 text-danger">404</h1>
                <p class="lead">抱歉，您要找的頁面不存在。</p>
                <a href="#/" class="btn btn-primary rounded-pill px-4">回到首頁</a>
            </div>
        `;
        return;
    }

    document.title = `${route.title} - 英國皇家幼兒園`;

    // ★★★ 版面留白控制 (CSS Class 切換) ★★★
    // 修改這裡：加入了 || path === '/about'
    // 意思就是：如果是「首頁」或者「關於我們」，都不要加 page-offset (不留白)
    if (path === '/' || path === '' || path === '/about') {
        appContainer.classList.remove('page-offset');
    } else {
        // 其他頁面 (News, Courses...) 依然保持留白，避免內容被擋住
        appContainer.classList.add('page-offset');
    }

    // 動態載入元件
    try {
        await import(`./${route.script}?v=5`); // 更新版號
        appContainer.innerHTML = `<${route.tag}></${route.tag}>`;
    } catch (error) {
        console.error('Page load error:', error);
        appContainer.innerHTML = `<p class="text-danger text-center mt-5">無法載入頁面</p>`;
    }

    // 更新導覽列 Active 狀態
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === `#${path}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    window.scrollTo(0, 0);
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);