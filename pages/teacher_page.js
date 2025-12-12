class TeacherPage extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = `
        <div class="container py-5 mt-5">
            <div class="row">
                <div class="col-lg-3 mb-4">
                    <app-sidebar></app-sidebar>
                </div>
                <div class="col-lg-9">
                    <h2 class="mb-4 pb-2 border-bottom" style="color: #002366;">師資團隊</h2>
                    <div id="teacher-list" class="row g-4">
                        <div class="text-center w-100">Loading teachers...</div>
                    </div>
                </div>
            </div>
        </div>
        `;

        this.allTeachers = [];
        await this.loadTeachers();

        this.addEventListener('filter-change', (e) => {
            this.filterTeachers(e.detail.category);
        });
    }

    async loadTeachers() {
        try {
            const response = await fetch('data/teachers.json'); // [cite: 127]
            this.allTeachers = await response.json();
            this.renderTeachers(this.allTeachers);
        } catch (error) {
            this.querySelector('#teacher-list').innerHTML = '<p>無法載入師資資料</p>';
        }
    }

    filterTeachers(category) {
        // Teachers JSON 使用 'subject' 作為分類，但 sidebar 傳回的值統一叫 category
        if (category === 'all') {
            this.renderTeachers(this.allTeachers);
        } else {
            const filtered = this.allTeachers.filter(t => t.subject === category);
            this.renderTeachers(filtered);
        }
    }

    renderTeachers(teachers) {
        const container = this.querySelector('#teacher-list');
        // [cite: 133] 資料格式: id, name, subject, title, image, intro
        container.innerHTML = teachers.map(t => `
            <div class="col-md-6 animate-fade-in">
                <div class="card mb-3 border-0 shadow-sm overflow-hidden">
                    <div class="row g-0 align-items-center">
                        <div class="col-4">
                            <img src="${t.image}" class="img-fluid rounded-start h-100" style="object-fit: cover; min-height: 150px;" alt="${t.name}">
                        </div>
                        <div class="col-8">
                            <div class="card-body">
                                <h5 class="card-title fw-bold text-dark">${t.name} <small class="text-muted fs-6">(${t.title})</small></h5>
                                <span class="badge bg-primary mb-2">${t.subject}</span>
                                <p class="card-text small">${t.intro}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
}
customElements.define('teacher-page', TeacherPage);