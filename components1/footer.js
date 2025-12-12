class AppFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="py-5 mt-auto">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 mb-4">
                        <h4 class="mb-3 border-bottom pb-2 border-white d-inline-block">聯絡我們</h4>
                        <ul class="list-unstyled">
                            <li class="mb-2">
                                <i class="fas fa-map-marker-alt me-2 text-warning"></i>
                                地址: 桃園市八德區廣福路278號1-2樓 [cite: 96]
                            </li>
                            <li class="mb-2">
                                <i class="fas fa-phone-alt me-2 text-warning"></i>
                                電話: <a href="tel:033643310">03-364-3310</a> [cite: 97]
                            </li>
                            <li class="mb-2">
                                <i class="fas fa-envelope me-2 text-warning"></i>
                                信箱: info@british-royal-kindergarten.com
                            </li>
                        </ul>
                        <p class="small mt-4 text-white-50">
                            &copy; ${new Date().getFullYear()} 英國皇家幼兒園. All Rights Reserved.
                        </p>
                    </div>

                    <div class="col-md-6">
                        <h4 class="mb-3 border-bottom pb-2 border-white d-inline-block">交通位置</h4>
                        <div class="ratio ratio-16x9">
                           <iframe src="https://maps.google.com/maps?q=桃園市八德區廣福路278號&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                                width="600" height="450" style="border:0;" 
                                allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        `;
    }
}
customElements.define('app-footer', AppFooter);