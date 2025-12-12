class AIChatBot extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
            .chat-widget {
                position: fixed; /* 固定位置 [cite: 64] */
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                font-family: "Microsoft JhengHei", sans-serif;
            }
            /* 啟動按鈕 (Logo) */
            .chat-toggle-btn {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: white;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                border: none;
                cursor: pointer;
                padding: 0;
                overflow: hidden;
                transition: transform 0.3s;
            }
            .chat-toggle-btn:hover {
                transform: scale(1.1);
            }
            .chat-toggle-btn img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            /* 對話視窗 */
            .chat-window {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 320px;
                height: 450px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                transform: translateY(20px);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            /* 顯示狀態 */
            .chat-window.open {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }

            .chat-header {
                background: #002366; /* Royal Blue */
                color: white;
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .chat-body {
                flex: 1;
                padding: 15px;
                background: #f8f9fa;
                overflow-y: auto;
                font-size: 0.9rem;
                color: #333;
            }
            .close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
            }
        </style>

        <div class="chat-widget">
            <div class="chat-window" id="chatWindow">
                <div class="chat-header">
                    <span>AI 智能客服</span>
                    <button class="close-btn" id="closeBtn">×</button>
                </div>
                <div class="chat-body">
                    <p>您好！我是英國皇家幼兒園的 AI 助理。請問有什麼可以幫您的嗎？</p>
                    <p style="color: #666; font-size: 0.8rem;">(此功能尚未連接 Gemini API)</p>
                </div>
            </div>

            <button class="chat-toggle-btn" id="toggleBtn">
                <img src="images/ai_chatbot.png" alt="AI Chatbot">
            </button>
        </div>
        `;

        // 綁定事件
        const toggleBtn = this.shadowRoot.getElementById('toggleBtn');
        const closeBtn = this.shadowRoot.getElementById('closeBtn'); // 關閉按鈕 [cite: 67]
        const chatWindow = this.shadowRoot.getElementById('chatWindow');

        toggleBtn.addEventListener('click', () => {
            chatWindow.classList.toggle('open');
        });

        closeBtn.addEventListener('click', () => {
            chatWindow.classList.remove('open');
        });
    }
}
customElements.define('ai-chat-bot', AIChatBot);