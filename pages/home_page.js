class HomePage extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = `
        <section class="hero-section position-relative">
            <picture>
                <source media="(max-width: 768px)" srcset="images/index_mobile.jpg">
                <img src="images/index.jpg" 
                     alt="英國皇家幼兒園" 
                     class="d-block w-100" 
                     style="height: auto; object-fit: contain;"> 
            </picture>
            
            <style>
                .hero-caption {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    top: 50%;
                    text-align: center;
                    z-index: 10;
                }
                /* 手機版：稍微往下推，但不要太多，避免擋住畫面主體 */
                @media (max-width: 991px) {
                    .hero-caption { margin-top: 100px; }
                }
                /* 電腦版：大幅往下推，避開固定的導覽列 (Sticky Header) */
                @media (min-width: 992px) {
                    .hero-caption { margin-top: 150px; }
                }
            </style>

            <div class="hero-caption">
                <div class="d-inline-block px-2 py-1 rounded-2 shadow-lg text-nowrap" 
                     style="background-color: rgba(255, 255, 255, 0.6); backdrop-filter: blur(5px);">
                    
                    <h1 class="display-6 display-md-3 fw-bold m-0 lh-1" style="color: #002366; letter-spacing: 1px;">英國皇家幼兒園</h1>
                </div>
            </div>
        </section>

        <section class="py-5">
            <div class="container py-5">
                <div class="row align-items-center">
                    <div class="col-lg-6 mb-4 mb-lg-0">
                        <img src="images/2.jpg" class="img-fluid rounded-3 shadow" alt="歡迎參觀">
                    </div>
                    <div class="col-lg-6">
                        <h2 class="mb-4" style="color: #002366;">關於我們</h2>
                        <p class="lead text-muted">我們致力於提供最優質的雙語教學環境，讓孩子在快樂中學習成長。</p>
                        <p>英國皇家幼兒園引進國際級教學系統，結合在地文化，培養具備國際視野的小小菁英。我們重視每一位孩子的獨特性，透過多元化的課程設計，激發孩子的無限潛能。</p>
                        <a href="#/about" class="btn btn-outline-primary mt-3 rounded-pill px-4">完整介紹</a>
                    </div>
                </div>
            </div>
        </section>

        <section class="parallax-section position-relative py-5 text-white text-center" 
            style="background: linear-gradient(rgba(0,35,102,0.7), rgba(0,35,102,0.7)), url('images/5.jpg') fixed center center; background-size: cover; min-height: 400px; display: flex; align-items: center;">
            <div class="container">
                <h2 class="display-5 fw-bold mb-4">快樂學習，健康成長</h2>
                <p class="lead mb-4">立即預約參觀，感受不一樣的教學氛圍</p>
                <a href="tel:033643310" class="btn btn-light btn-lg rounded-pill px-5 text-primary fw-bold">立即預約</a>
            </div>
        </section>

        <section class="py-5 bg-light">
            <div class="container py-5">
                <h2 class="text-center mb-5" style="color: #002366;">最新消息</h2>
                <div class="row" id="home-news-container">
                    <div class="text-center w-100 py-5">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
                <div class="text-center mt-5">
                    <a href="#/news" class="btn btn-primary px-5 rounded-pill" style="background-color: #002366; border: none;">查看所有消息</a>
                </div>
            </div>
        </section>
        `;

        await this.loadRecentNews();
    }

    async loadRecentNews() {
        try {
            // 3.a. 使用 fetch 抓取資料
            const response = await fetch('data/news.json');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            // 只顯示最新的 3 筆 
            const recentNews = data.slice(0, 3);

            const container = this.querySelector('#home-news-container');
            container.innerHTML = recentNews.map(item => `
                <div class="col-md-4 mb-4">
                    <div class="card h-100 border-0 shadow-sm hover-card">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="badge bg-danger">${item.category}</span>
                                <small class="text-muted">${item.date}</small>
                            </div>
                            <h5 class="card-title text-truncate fw-bold" style="color: #002366;">${item.title}</h5>
                            <p class="card-text text-secondary mt-3">${item.summary.substring(0, 60)}...</p>
                        </div>
                        <div class="card-footer bg-white border-0 pb-3">
                            <a href="#/news" class="btn btn-link text-decoration-none p-0" style="color: #CC0000;">閱讀更多 <i class="fas fa-arrow-right ms-1"></i></a>
                        </div>
                    </div>
                </div>
            `).join('');

        } catch (error) {
            console.error('Error loading news:', error);
            const container = this.querySelector('#home-news-container');
            if (container) container.innerHTML = '<div class="col-12 text-center text-muted"><p>暫時無法載入最新消息</p></div>';
        }
    }
}
customElements.define('home-page', HomePage);