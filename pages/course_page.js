class CoursePage extends HTMLElement {
    async connectedCallback() {
        // [cite: 92-93] Desktop 兩欄 (Grid), Mobile 單欄 (block/flex column)
        this.innerHTML = `
        <div class="container py-5 mt-5">
            <div class="row">
                <div class="col-lg-3 mb-4">
                    <app-sidebar></app-sidebar>
                </div>
                
                <div class="col-lg-9">
                    <h2 class="mb-4 pb-2 border-bottom" style="color: #002366;">教學課程</h2>
                    <div id="course-list" class="row g-4">
                        <div class="text-center w-100">Loading courses...</div>
                    </div>
                </div>
            </div>
        </div>
        `;

        this.allCourses = [];
        await this.loadCourses();

        // 監聽側邊欄篩選事件 [cite: 62]
        // 由於 composed: true，事件會冒泡到 document，我們在這裡攔截它
        this.addEventListener('filter-change', (e) => {
            this.filterCourses(e.detail.category);
        });
    }

    async loadCourses() {
        try {
            const response = await fetch('data/courses.json'); // [cite: 123]
            this.allCourses = await response.json();
            this.renderCourses(this.allCourses);
        } catch (error) {
            this.querySelector('#course-list').innerHTML = '<p>無法載入課程資料</p>';
        }
    }

    filterCourses(category) {
        if (category === 'all') {
            this.renderCourses(this.allCourses);
        } else {
            const filtered = this.allCourses.filter(c => c.category === category);
            this.renderCourses(filtered);
        }
    }

    renderCourses(courses) {
        const container = this.querySelector('#course-list');
        if (courses.length === 0) {
            container.innerHTML = '<div class="col-12"><p class="text-muted">此分類尚無課程。</p></div>';
            return;
        }

        // [cite: 132] 資料格式: id, name, category, teacher, image, desc
        container.innerHTML = courses.map(course => `
            <div class="col-md-6 col-xl-4 animate-fade-in">
                <div class="card h-100 shadow-sm border-0">
                    <div class="ratio ratio-4x3 overflow-hidden rounded-top">
                        <img src="${course.image}" class="card-img-top w-100" style="object-fit: cover;" alt="${course.name}">
                    </div>
                    <div class="card-body">
                        <span class="badge bg-secondary mb-2">${course.category}</span>
                        <h5 class="card-title fw-bold" style="color: #002366;">${course.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted"><i class="fas fa-chalkboard-teacher me-1"></i>${course.teacher}</h6>
                        <p class="card-text small text-secondary">${course.desc}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }
}
customElements.define('course-page', CoursePage);