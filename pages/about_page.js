class AboutPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header class="position-relative w-100 d-flex align-items-center justify-content-center" 
            style="height: 400px; background: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url('images/2.jpg') center/cover no-repeat;">
            
            <div class="d-inline-block px-4 py-3 rounded-4 shadow-lg text-center animate-fade-in mx-3" 
                 style="background-color: rgba(255, 255, 255, 0.85); backdrop-filter: blur(5px); max-width: 90%;">
                
                <h1 class="display-5 fw-bold mb-1" style="color: #002366; letter-spacing: 1px;">關於我們</h1>
                
                <p class="lead text-secondary opacity-75 fw-bold m-0" style="font-size: 1rem;">About Us</p>
                
                <div style="width: 50px; height: 3px; background-color: #CC0000; margin: 10px auto 0;"></div>
            </div>
        </header>

        <section class="py-5">
            <div class="container py-5">
                <div class="row align-items-center mb-5">
                    <div class="col-lg-6 mb-4 mb-lg-0">
                        <div class="position-relative">
                            <img src="images/index.jpg" class="img-fluid rounded-3 shadow-lg p-2 bg-white" alt="園所環境">
                            <div class="position-absolute start-0 bottom-0 translate-middle-x mb-n3 d-none d-lg-block" 
                                 style="width: 100px; height: 100px; background-color: #CC0000; z-index: -1; border-radius: 10px;"></div>
                        </div>
                    </div>
                    <div class="col-lg-6 ps-lg-5">
                        <h6 class="text-uppercase text-danger fw-bold mb-2">Our Story</h6>
                        <h2 class="display-6 fw-bold mb-4" style="color: #002366;">傳承菁英教育，<br>啟發無限潛能</h2>
                        <p class="text-secondary lh-lg mb-4">
                            英國皇家幼兒園 (British Royal Kindergarten) 創立於 2024 年，座落於桃園市八德區。我們深信，教育不只是知識的傳遞，更是品格的陶冶與視野的開拓。
                        </p>
                        <p class="text-secondary lh-lg">
                            我們引進國際先進的教學系統，堅持「全人教育」理念，為孩子打造一個充滿愛、尊重與探索的雙語學習國度，讓每一位孩子都能在這裡自信地邁向世界。
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-5 bg-light">
            <div class="container">
                <div class="text-center mb-5">
                    <h2 class="fw-bold" style="color: #002366;">教育特色</h2>
                    <p class="text-muted">Why Choose Us?</p>
                </div>
                <div class="row g-4">
                    <div class="col-md-4 text-center">
                        <div class="card h-100 border-0 shadow-sm py-4 hover-card">
                            <div class="card-body">
                                <div class="mb-3 text-primary">
                                    <i class="fas fa-globe-americas fa-3x" style="color: #002366;"></i>
                                </div>
                                <h4 class="card-title fw-bold mb-3">沉浸式雙語環境</h4>
                                <p class="card-text text-secondary">外籍教師全天候陪伴，透過生活化的互動與遊戲，讓美語自然成為孩子的第二母語。</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 text-center">
                        <div class="card h-100 border-0 shadow-sm py-4 hover-card">
                            <div class="card-body">
                                <div class="mb-3 text-danger">
                                    <i class="fas fa-shapes fa-3x" style="color: #CC0000;"></i>
                                </div>
                                <h4 class="card-title fw-bold mb-3">多元智能開發</h4>
                                <p class="card-text text-secondary">結合奧福音樂、樂高積木、科學實驗等多元課程，全方位啟發孩子的邏輯與藝術智能。</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 text-center">
                        <div class="card h-100 border-0 shadow-sm py-4 hover-card">
                            <div class="card-body">
                                <div class="mb-3 text-primary">
                                    <i class="fas fa-heart fa-3x" style="color: #002366;"></i>
                                </div>
                                <h4 class="card-title fw-bold mb-3">品格與生活教育</h4>
                                <p class="card-text text-secondary">重視生活常規與禮儀，從日常點滴中培養孩子尊重、負責、分享與關懷他人的優良品格。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-5">
            <div class="container py-4">
                <div class="bg-white rounded-4 overflow-hidden border shadow-sm">
                    <div class="row g-0">
                        <div class="col-lg-6 order-lg-2" style="min-height: 300px;">
                            <img src="images/5.jpg" class="w-100 h-100" style="object-fit: cover;" alt="加入我們">
                        </div>
                        <div class="col-lg-6 order-lg-1 p-5 d-flex flex-column justify-content-center">
                            <h3 class="fw-bold mb-3" style="color: #002366;">給孩子最好的起點</h3>
                            <p class="text-secondary mb-4">歡迎家長蒞臨參觀，親身感受我們用心的教育環境。名額有限，請盡早預約。</p>
                            <div>
                                <a href="tel:033643310" class="btn btn-primary rounded-pill px-4 me-2" style="background-color: #002366;">電話預約</a>
                                <a href="#/courses" class="btn btn-outline-danger rounded-pill px-4">了解課程</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;

        window.scrollTo(0, 0);
    }
}
customElements.define('about-page', AboutPage);