class AppHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header id="main-header" class="navbar navbar-expand-lg navbar-dark fixed-top">
            <div class="container-fluid">
                <a class="navbar-brand" href="#/">
                    <img src="images/British_Royal_logo.png" alt="英國皇家幼兒園 Logo">
                </a>

                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title text-white" id="offcanvasNavbarLabel">選單</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item"><a class="nav-link" href="#/"><span class="nav-item-text nav-zh">首頁</span><span class="nav-item-text nav-en">Home</span></a></li>
                            <li class="nav-item"><a class="nav-link" href="#/about"><span class="nav-item-text nav-zh">關於我們</span><span class="nav-item-text nav-en">About</span></a></li>
                            <li class="nav-item"><a class="nav-link" href="#/news"><span class="nav-item-text nav-zh">最新消息</span><span class="nav-item-text nav-en">News</span></a></li>
                            <li class="nav-item"><a class="nav-link" href="#/courses"><span class="nav-item-text nav-zh">教學課程</span><span class="nav-item-text nav-en">Courses</span></a></li>
                            <li class="nav-item"><a class="nav-link" href="#/teachers"><span class="nav-item-text nav-zh">師資介紹</span><span class="nav-item-text nav-en">Teachers</span></a></li>
                            <li class="nav-item"><a class="nav-link" href="#/articles"><span class="nav-item-text nav-zh">學生作品</span><span class="nav-item-text nav-en">Articles</span></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
        `;

        this.initStickyHeader();
        this.initAutoCloseMenu();
    }

    // 處理 Sticky Header 效果 [cite: 82-83]
    initStickyHeader() {
        const header = this.querySelector('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }

    // 手機版點擊連結後自動關閉選單 [cite: 47]
    initAutoCloseMenu() {
        const navLinks = this.querySelectorAll('.nav-link');
        const offcanvasElement = document.getElementById('offcanvasNavbar');
        const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // 檢查是否為手機版顯示狀態 (Offcanvas 是否有 show class)
                if (offcanvasElement.classList.contains('show')) {
                    bsOffcanvas.hide();
                    // 注意：Bootstrap 5 的 hide 方法有時需要從 instance 呼叫，或者模擬點擊關閉按鈕
                    const closeBtn = this.querySelector('.btn-close');
                    if (closeBtn) closeBtn.click();
                }
            });
        });
    }
}
customElements.define('app-header', AppHeader);