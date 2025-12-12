class ArticlePage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="container py-5 mt-5">
            <h2 class="mb-4 pb-2 border-bottom" style="color: #002366;">學生作品</h2>
            <div class="row">
                <div class="col-12 text-center py-5">
                    <i class="fas fa-paint-brush fa-3x text-muted mb-3"></i>
                    <h4 class="text-muted">作品集建置中...</h4>
                    <p>我們正在整理孩子們精彩的創作，敬請期待！</p>
                </div>
            </div>
        </div>
        `;
    }
}
customElements.define('article-page', ArticlePage);