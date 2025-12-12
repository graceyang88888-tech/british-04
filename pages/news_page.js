class NewsPage extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = `
        <div class="container py-5 mt-5">
            <div class="row">
                <div class="col-lg-3 mb-4">
                    <app-sidebar></app-sidebar>
                </div>
                <div class="col-lg-9">
                    <h2 class="mb-4 pb-2 border-bottom" style="color: #002366;">最新消息</h2>
                    <div id="news-list" class="list-group list-group-flush">
                        <div class="text-center w-100">Loading news...</div>
                    </div>
                </div>
            </div>
        </div>
        `;

        this.allNews = [];
        await this.loadNews();

        this.addEventListener('filter-change', (e) => {
            this.filterNews(e.detail.category);
        });
    }

    async loadNews() {
        try {
            const response = await fetch('data/news.json');
            this.allNews = await response.json();
            this.renderNews(this.allNews);
        } catch (error) {
            this.querySelector('#news-list').innerHTML = '<p>無法載入新聞資料</p>';
        }
    }

    filterNews(category) {
        if (category === 'all') {
            this.renderNews(this.allNews);
        } else {
            const filtered = this.allNews.filter(n => n.category === category);
            this.renderNews(filtered);
        }
    }

    renderNews(newsList) {
        const container = this.querySelector('#news-list');
        // [cite: 134] 資料格式: id, category, date, title, summary
        container.innerHTML = newsList.map(item => `
            <a href="#" class="list-group-item list-group-item-action py-4 animate-fade-in">
                <div class="d-flex w-100 justify-content-between align-items-center mb-2">
                    <small class="text-muted"><i class="far fa-calendar-alt me-1"></i>${item.date}</small>
                    <span class="badge bg-danger rounded-pill">${item.category}</span>
                </div>
                <h5 class="mb-2 fw-bold text-dark">${item.title}</h5>
                <p class="mb-1 text-secondary">${item.summary}</p>
            </a>
        `).join('');
    }
}
customElements.define('news-page', NewsPage);