class AppSidebar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        this.renderStyles();
        await this.initFilter();
    }

    renderStyles() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                padding: 20px;
                background-color: #f8f9fa;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            }
            h3 {
                color: #002366; /* Royal Blue */
                font-size: 1.2rem;
                margin-bottom: 15px;
                border-bottom: 2px solid #CC0000; /* Royal Red */
                padding-bottom: 10px;
                display: inline-block;
            }
            .filter-btn {
                display: block;
                width: 100%;
                text-align: left;
                padding: 10px 15px;
                margin-bottom: 8px;
                background: white;
                border: 1px solid #ddd;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.2s;
                color: #333;
                font-family: "Microsoft JhengHei", sans-serif;
            }
            .filter-btn:hover, .filter-btn.active {
                background-color: #002366;
                color: white;
                border-color: #002366;
            }
        </style>
        <div id="container">
            <h3>分類篩選</h3>
            <div id="btn-group">
                </div>
        </div>
        `;
    }

    async initFilter() {
        // 1. 偵測當前頁面 [cite: 55]
        const hash = location.hash;
        let jsonFile = '';
        let categoryField = '';

        if (hash.includes('news')) {
            jsonFile = 'news.json';
            categoryField = 'category'; // [cite: 57]
        } else if (hash.includes('courses')) {
            jsonFile = 'courses.json';
            categoryField = 'category'; // [cite: 58]
        } else if (hash.includes('teachers')) {
            jsonFile = 'teachers.json';
            categoryField = 'subject';  // [cite: 59]
        } else {
            this.shadowRoot.innerHTML = ''; // 如果不是資料頁面就不顯示側邊欄
            return;
        }

        try {
            // 2. 自動抓取資料 [cite: 56]
            const response = await fetch(`data/${jsonFile}`);
            const data = await response.json();

            // 3. 提煉分類 (使用 Set 過濾重複) [cite: 60]
            const categories = new Set(data.map(item => item[categoryField]));

            // 4. 產生按鈕
            const btnGroup = this.shadowRoot.getElementById('btn-group');

            // 加入「全部」按鈕
            this.createButton(btnGroup, '全部', 'all');

            categories.forEach(cat => {
                this.createButton(btnGroup, cat, cat);
            });

        } catch (error) {
            console.error('Error loading sidebar data:', error);
            this.shadowRoot.getElementById('btn-group').innerHTML = '<p>無法載入篩選資料</p>';
        }
    }

    createButton(container, text, value) {
        const btn = document.createElement('button');
        btn.textContent = text;
        btn.className = 'filter-btn';
        if (value === 'all') btn.classList.add('active'); // 預設選中全部

        // 5. 事件通訊 
        btn.addEventListener('click', (e) => {
            // 移除其他按鈕的 active 樣式
            container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            // 發送 CustomEvent (穿透 Shadow DOM)
            this.dispatchEvent(new CustomEvent('filter-change', {
                detail: { category: value },
                bubbles: true,
                composed: true // 關鍵：允許事件穿透 Shadow DOM [cite: 62]
            }));
        });

        container.appendChild(btn);
    }
}
customElements.define('app-sidebar', AppSidebar);