class HomePage extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = `
        <section class="hero-section position-relative">
            <picture>
                <source media="(max-width: 768px)" srcset="images/index_mobile.jpg">
                <img src="images/index.jpg" alt="英國皇家幼兒園" class="d-block w-100" style="height: auto; min-height: 60vh; object-fit: contain; background-color: #f0f0f0;"> 
            </picture>
            
            <style>
                #hero-caption {
                    position: absolute;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 90%; /* 手機版寬度 */
                    max-width: 600px; /* 電腦版最大寬度 */
                    text-align: center;
                    z-index: 10;
                }
                /* 手機版：維持垂直置中 (50%) */
                @media (max-width: 991px) {
                    #hero-caption { top: 50%; }
                }
                /* 電腦版：稍微往下移 (60%) 以避開 Header */
                @media (min-width: 992px) {
                    #hero-caption { top: 60%; }
                }
            </style>

            <div id="hero-caption">
                <div class="d-inline-block p-4 rounded-4 shadow-lg text-nowrap" 
                     style="background-color: rgba(255, 255, 255, 0.7); backdrop-filter: blur(5px);">
                    <h1 class="display-5 display-md-3 fw-bold m-0" style="color: #002366; letter-spacing: 2px;">英國皇家幼兒園</h1>
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
                        <p>英國皇家幼兒園引進國際級教學系統，結合在地文化，培養具備國際視野的小小菁英。</p>
                        <a href="#/about" class="btn btn-outline-primary mt-3 rounded-pill px-4">完整介紹</a>
                    </div>
                </div>
            </div>
        </section>

        <section class="parallax-section position-relative py-5 text-white text-center" 
            style="background: linear-gradient(rgba(0,35,102,0.7), rgba(0,35,102,0.7)), url('images/5.jpg') fixed center center; background-size: cover; min-height: 400px; display: flex; align-items: center;">
            <div class="container">
                <h2 class="display-5 fw-bold mb-4">快樂學習，健康成長</h2>
                <a href="tel:033643310" class="btn btn-light btn-lg rounded-pill px-5 text-primary fw-bold">立即預約</a>
            </div>
        </section>

        <section class="py-5 bg-light">
            <div class="container py-5">
                <h2 class="text-center mb-5" style="color: #002366;">最新消息</h2>
                <div class="row" id="home-news-container">
                    <div class="text-center w-100 py-5">Loading...</div>
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
            const response = await fetch('data/news.json');
            const data = await response.json();
            const recentNews = data.slice(0, 3);
            const container = this.querySelector('#home-news-container');
            container.innerHTML = recentNews.map(item => `
                <div class="col-md-4 mb-4">
                    <div class="card h-100 border-0 shadow-sm hover-card">
                        <div class="card-body">
                            <span class="badge bg-danger mb-2">${item.category}</span>
                            <h5 class="card-title text-truncate fw-bold" style="color: #002366;">${item.title}</h5>
                            <p class="card-text text-secondary mt-2">${item.summary.substring(0, 50)}...</p>
                        </div>
                    </div>
                </div>
            `).join('');
        } catch (error) { console.error(error); }
    }
}
customElements.define('home-page', HomePage);