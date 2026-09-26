var O=Object.defineProperty;var B=(g,e,s)=>e in g?O(g,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):g[e]=s;var o=(g,e,s)=>B(g,typeof e!="symbol"?e+"":e,s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))t(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function s(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(a){if(a.ep)return;a.ep=!0;const i=s(a);fetch(a.href,i)}})();class N{constructor(){o(this,"element");o(this,"backdrop");o(this,"dialogCard");o(this,"currentMode","login");o(this,"isOpen",!1);o(this,"handleKeyDown",e=>{e.key==="Escape"&&this.close()});this.backdrop=document.createElement("div"),this.backdrop.className="auth-backdrop",this.dialogCard=document.createElement("div"),this.dialogCard.className="auth-dialog",this.backdrop.append(this.dialogCard),this.element=this.backdrop,this.renderContent(),this.attachEvents()}getElement(){return this.element}open(e="login"){this.currentMode=e,this.renderContent(),document.body.append(this.element),this.isOpen=!0,requestAnimationFrame(()=>{this.backdrop.classList.add("auth-backdrop--active"),this.dialogCard.classList.add("auth-dialog--active")}),document.addEventListener("keydown",this.handleKeyDown)}close(){this.isOpen&&(this.backdrop.classList.remove("auth-backdrop--active"),this.dialogCard.classList.remove("auth-dialog--active"),setTimeout(()=>{this.element.parentNode&&this.element.remove(),this.isOpen=!1},250),document.removeEventListener("keydown",this.handleKeyDown))}attachEvents(){this.backdrop.addEventListener("click",e=>{e.target===this.backdrop&&this.close()})}switchMode(e){if(this.currentMode===e)return;this.currentMode=e;const s=this.dialogCard.querySelector(".auth-dialog__form-container");s?(s.classList.add("auth-dialog__form-container--transitioning"),setTimeout(()=>{this.renderContent();const t=this.dialogCard.querySelector(".auth-dialog__form-container");t&&t.classList.remove("auth-dialog__form-container--transitioning")},150)):this.renderContent()}renderContent(){const e=this.currentMode==="login";this.dialogCard.innerHTML=`
      <div class="auth-dialog__switcher">
        <button type="button" class="auth-dialog__switcher-btn ${e?"auth-dialog__switcher-btn--active":""}" data-mode="login">
          Login
        </button>
        <button type="button" class="auth-dialog__switcher-btn ${e?"":"auth-dialog__switcher-btn--active"}" data-mode="register">
          Register
        </button>
      </div>

      <div class="auth-dialog__form-container">
        ${e?this.renderLoginForm():this.renderRegisterForm()}
      </div>
    `;const s=this.dialogCard.querySelectorAll(".auth-dialog__switcher-btn");for(const r of s)r.addEventListener("click",()=>{const n=r.dataset.mode;this.switchMode(n)});const t=this.dialogCard.querySelectorAll(".auth-switch-link");for(const r of t)r.addEventListener("click",n=>{n.preventDefault();const d=r.dataset.mode;this.switchMode(d)});const a=this.dialogCard.querySelectorAll(".auth-field__toggle-pwd");for(const r of a)r.addEventListener("click",()=>{var d;const n=(d=r.parentElement)==null?void 0:d.querySelector("input");if(n){const c=n.type==="password";n.type=c?"text":"password",r.innerHTML=c?this.getEyeOffIconSvg():this.getEyeIconSvg()}});const i=this.dialogCard.querySelector("form");i&&i.addEventListener("submit",r=>{r.preventDefault()})}renderLoginForm(){return`
      <h2 class="auth-dialog__title">Welcome Back!</h2>
      <p class="auth-dialog__subtitle">Sign in to resume your games and progress.</p>

      <form class="auth-form" novalidate>
        <div class="auth-field">
          <label class="auth-field__label" for="login-email">Email Address</label>
          <div class="auth-field__input-box">
            ${this.getMailIconSvg()}
            <input type="email" id="login-email" class="auth-field__input" placeholder="e.g. alex@minigames.com" required />
          </div>
        </div>

        <div class="auth-field">
          <label class="auth-field__label" for="login-password">Password</label>
          <div class="auth-field__input-box">
            ${this.getLockIconSvg()}
            <input type="password" id="login-password" class="auth-field__input" placeholder="••••••••" required />
            <button type="button" class="auth-field__toggle-pwd" aria-label="Toggle password visibility">
              ${this.getEyeIconSvg()}
            </button>
          </div>
          <a href="#" class="auth-form__forgot-link">Forgot Password?</a>
        </div>

        <button type="submit" class="auth-form__submit-btn">Login</button>
      </form>

      <div class="auth-divider">
        <span class="auth-divider__line"></span>
        <span class="auth-divider__text">OR</span>
        <span class="auth-divider__line"></span>
      </div>

      <button type="button" class="auth-google-btn">
        ${this.getGoogleIconSvg()}
        Continue with Google
      </button>

      <p class="auth-dialog__footer-text">
        Don't have an account? <a href="#" class="auth-switch-link" data-mode="register">Register</a>
      </p>
    `}renderRegisterForm(){return`
      <h2 class="auth-dialog__title">Create Account</h2>
      <p class="auth-dialog__subtitle">Join MiniGames to track your score & streak.</p>

      <form class="auth-form" novalidate>
        <div class="auth-field">
          <label class="auth-field__label" for="register-username">Username</label>
          <div class="auth-field__input-box">
            ${this.getUserIconSvg()}
            <input type="text" id="register-username" class="auth-field__input" placeholder="e.g. CozyGamer_99" required />
          </div>
        </div>

        <div class="auth-field">
          <label class="auth-field__label" for="register-email">Email Address</label>
          <div class="auth-field__input-box">
            ${this.getMailIconSvg()}
            <input type="email" id="register-email" class="auth-field__input" placeholder="your.email@domain.com" required />
          </div>
        </div>

        <div class="auth-field">
          <label class="auth-field__label" for="register-password">Password</label>
          <div class="auth-field__input-box">
            ${this.getLockIconSvg()}
            <input type="password" id="register-password" class="auth-field__input" placeholder="Min. 8 characters" required />
          </div>
        </div>

        <div class="auth-field">
          <label class="auth-field__label" for="register-confirm-password">Confirm Password</label>
          <div class="auth-field__input-box">
            ${this.getLockIconSvg()}
            <input type="password" id="register-confirm-password" class="auth-field__input" placeholder="Repeat your password" required />
          </div>
        </div>

        <button type="submit" class="auth-form__submit-btn">Create Account</button>
      </form>

      <div class="auth-divider">
        <span class="auth-divider__line"></span>
        <span class="auth-divider__text">OR</span>
        <span class="auth-divider__line"></span>
      </div>

      <button type="button" class="auth-google-btn">
        ${this.getGoogleIconSvg()}
        Sign up with Google
      </button>

      <p class="auth-dialog__footer-text">
        Already have an account? <a href="#" class="auth-switch-link" data-mode="login">Login</a>
      </p>
    `}getMailIconSvg(){return'<svg class="auth-field__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#242145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>'}getLockIconSvg(){return'<svg class="auth-field__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#242145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>'}getUserIconSvg(){return'<svg class="auth-field__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#242145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'}getEyeIconSvg(){return'<svg class="auth-field__eye-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#242145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>'}getEyeOffIconSvg(){return'<svg class="auth-field__eye-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#242145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>'}getGoogleIconSvg(){return'<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>'}}const R=""+new URL("tukoni-forest-keepers-hero-D-UQTA7d.jpg",import.meta.url).href,w="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.85%2017.825L12%2015.925L15.15%2017.85L14.325%2014.25L17.1%2011.85L13.45%2011.525L12%208.125L10.55%2011.5L6.9%2011.825L9.675%2014.25L8.85%2017.825ZM5.825%2022L7.45%2014.975L2%2010.25L9.2%209.625L12%203L14.8%209.625L22%2010.25L16.55%2014.975L18.175%2022L12%2018.275L5.825%2022Z'%20fill='%23FFD02B'/%3e%3c/svg%3e",L="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12%2021L10.55%2019.7C8.86667%2018.1834%207.475%2016.875%206.375%2015.775C5.275%2014.675%204.4%2013.6917%203.75%2012.825C3.1%2011.9417%202.64167%2011.1334%202.375%2010.4C2.125%209.66669%202%208.91669%202%208.15002C2%206.58336%202.525%205.27502%203.575%204.22502C4.625%203.17502%205.93333%202.65002%207.5%202.65002C8.36667%202.65002%209.19167%202.83336%209.975%203.20002C10.7583%203.56669%2011.4333%204.08336%2012%204.75003C12.5667%204.08336%2013.2417%203.56669%2014.025%203.20002C14.8083%202.83336%2015.6333%202.65002%2016.5%202.65002C18.0667%202.65002%2019.375%203.17502%2020.425%204.22502C21.475%205.27502%2022%206.58336%2022%208.15002C22%208.91669%2021.8667%209.66669%2021.6%2010.4C21.35%2011.1334%2020.9%2011.9417%2020.25%2012.825C19.6%2013.6917%2018.725%2014.675%2017.625%2015.775C16.525%2016.875%2015.1333%2018.1834%2013.45%2019.7L12%2021ZM12%2018.3C13.6%2016.8667%2014.9167%2015.6417%2015.95%2014.625C16.9833%2013.5917%2017.8%2012.7%2018.4%2011.95C19%2011.1834%2019.4167%2010.5084%2019.65%209.92503C19.8833%209.32503%2020%208.73336%2020%208.15002C20%207.15002%2019.6667%206.31669%2019%205.65003C18.3333%204.98336%2017.5%204.65003%2016.5%204.65003C15.7167%204.65003%2014.9917%204.87503%2014.325%205.32503C13.6583%205.75836%2013.2%206.31669%2012.95%207.00003H11.05C10.8%206.31669%2010.3417%205.75836%209.675%205.32503C9.00833%204.87503%208.28333%204.65003%207.5%204.65003C6.5%204.65003%205.66667%204.98336%205%205.65003C4.33333%206.31669%204%207.15002%204%208.15002C4%208.73336%204.11667%209.32503%204.35%209.92503C4.58333%2010.5084%205%2011.1834%205.6%2011.95C6.2%2012.7%207.01667%2013.5917%208.05%2014.625C9.08333%2015.6417%2010.4%2016.8667%2012%2018.3Z'%20fill='%23FF4B4B'/%3e%3c/svg%3e",$={name:"Tukoni: Forest Keepers",rating:4.9,likesCount:31200,fullDescription:"Tukoni: Forest Keepers — a cozy hand-drawn puzzle-adventure. You are Traveller, a little forest spirit on an important mission. Wander storybook meadows, visit mushroom villages, meet adorable inhabitants, solve gentle hand-crafted puzzles, brew herbal teas and help the Tukoni forest prepare peacefully for the coming winter.",specs:{genre:"Puzzle",players:"Solo",duration:"40-90 min",price:"Free"},topRecords:[{position:1,playerName:"ForestSpirit",score:356700,achievedAt:"2026-08-28T14:30:00Z"},{position:2,playerName:"TeaBrewer",score:332400,achievedAt:"2026-08-25T09:12:00Z"},{position:3,playerName:"HerbalistPath",score:308900,achievedAt:"2026-08-23T18:45:00Z"}]},H={data:$},q=[{commentId:"c5d9f2a1-7c3b-4e8f-9a0d-000000000001",authorName:"ForestDweller",text:"The hand-drawn art is absolutely magical 🍄 Every location feels like a page from a children's storybook. The mushroom village made me cry happy tears!",likesCount:12,isLikedByCurrentUser:!1,createdAt:"2026-08-30T07:00:00Z"},{commentId:"c5d9f2a1-7c3b-4e8f-9a0d-000000000002",authorName:"HerbalTeaLover",text:"Perfect cozy evening game — brew a cup of chamomile, wrap in a blanket and help the little Tukoni prepare for winter. The puzzles are gentle but satisfying.",likesCount:5,isLikedByCurrentUser:!1,createdAt:"2026-08-29T15:30:00Z"},{commentId:"c5d9f2a1-7c3b-4e8f-9a0d-000000000003",authorName:"CottageCoreMia",text:"I want to live inside this game forever 🌿 The NPCs are so charming, the tea recipes are real, and the atmosphere is pure warmth and calm.",likesCount:8,isLikedByCurrentUser:!1,createdAt:"2026-08-27T20:10:00Z"}],S={data:q};class G{constructor(){o(this,"backdropElement");o(this,"dialogElement");o(this,"isFavorite",!1);o(this,"commentLikes",new Map);o(this,"inputElement");o(this,"favoriteBtnElement");o(this,"commentsCount",0);this.backdropElement=this.createBackdrop(),this.dialogElement=this.backdropElement.querySelector(".game-details-dialog"),this.setupListeners(),document.body.append(this.backdropElement)}getElement(){return this.backdropElement}open(){this.resetTransientState(),this.backdropElement.classList.add("game-details-backdrop--active"),this.dialogElement.classList.add("game-details-dialog--active"),document.body.style.overflow="hidden"}close(){this.backdropElement.classList.remove("game-details-backdrop--active"),this.dialogElement.classList.remove("game-details-dialog--active"),document.body.style.overflow=""}resetTransientState(){if(this.isFavorite=!1,this.favoriteBtnElement){this.favoriteBtnElement.classList.remove("game-details-dialog__favorite-btn--active");const s=this.favoriteBtnElement.querySelector(".fav-btn-text");s&&(s.textContent="Add to Favorites"),this.favoriteBtnElement.setAttribute("aria-label","Add to Favorites")}this.inputElement&&(this.inputElement.value="");const e=S.data;this.commentLikes.clear();for(const s of e){this.commentLikes.set(s.commentId,{count:s.likesCount,active:!1});const t=this.backdropElement.querySelector(`[data-comment-id="${s.commentId}"]`);if(t){t.classList.remove("game-details-dialog__comment-like-btn--active");const a=t.querySelector(".like-count");a&&(a.textContent=s.likesCount.toString())}}}formatRelativeTime(e){const s={"2026-08-28T14:30:00Z":"2 days ago","2026-08-25T09:12:00Z":"5 days ago","2026-08-23T18:45:00Z":"1 week ago","2026-08-30T07:00:00Z":"3 hours ago","2026-08-29T15:30:00Z":"1 day ago","2026-08-27T20:10:00Z":"3 days ago"};if(s[e])return s[e];const t=Date.now()-new Date(e).getTime(),a=Math.floor(t/(1e3*60*60));if(a<1)return"Just now";if(a<24)return`${a} hours ago`;const i=Math.floor(a/24);if(i===1)return"1 day ago";if(i<7)return`${i} days ago`;const r=Math.floor(i/7);return r===1?"1 week ago":`${r} weeks ago`}getCommentAvatarBg(e){return e.startsWith("Forest")?"#bce3ff":e.startsWith("Herbal")?"#ffd02b":e.startsWith("Cottage")?"#e0eef6":"#ffd02b"}createBackdrop(){const e=document.createElement("div");e.className="game-details-backdrop";const s=H.data,t=S.data;return this.commentsCount=t.length,e.innerHTML=`
      <div class="game-details-dialog" role="dialog" aria-modal="true" aria-labelledby="game-details-title">
        <div class="game-details-dialog__content">
          <!-- Hero Section -->
          <div class="game-details-dialog__hero">
            <img src="${R}" alt="${s.name}" class="game-details-dialog__hero-image" />
            <div class="game-details-dialog__hero-overlay"></div>
            <button type="button" class="game-details-dialog__hero-close-btn" aria-label="Close dialog">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="game-details-dialog__body">
            <!-- Info Section -->
            <section class="game-details-dialog__info-section">
              <div class="game-details-dialog__header-meta">
                <h2 id="game-details-title" class="game-details-dialog__title">${s.name}</h2>
                <div class="game-details-dialog__stats">
                  <span class="game-details-dialog__rating">
                    <img src="${w}" alt="Star" />
                    ${s.rating}
                  </span>
                  <span class="game-details-dialog__likes">
                    <img src="${L}" alt="Likes" />
                    ${(s.likesCount/1e3).toFixed(1)}K
                  </span>
                </div>
              </div>

              <!-- Full Description before specs per Figma! -->
              <p class="game-details-dialog__description">
                ${s.fullDescription}
              </p>

              <!-- 4-Card Spec Boxes Grid per Figma! -->
              <div class="game-details-dialog__specs-grid">
                <div class="game-details-dialog__spec-card">
                  <span class="spec-label">Genre</span>
                  <span class="spec-value">${s.specs.genre}</span>
                </div>
                <div class="game-details-dialog__spec-card">
                  <span class="spec-label">Players</span>
                  <span class="spec-value">${s.specs.players}</span>
                </div>
                <div class="game-details-dialog__spec-card">
                  <span class="spec-label">Duration</span>
                  <span class="spec-value">${s.specs.duration}</span>
                </div>
                <div class="game-details-dialog__spec-card">
                  <span class="spec-label">Price</span>
                  <span class="spec-value">${s.specs.price}</span>
                </div>
              </div>

              <div class="game-details-dialog__actions">
                <button type="button" class="game-details-dialog__play-btn">Play Now</button>
                <button type="button" class="game-details-dialog__favorite-btn" aria-label="Add to Favorites">
                  <svg class="fav-heart-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  <span class="fav-btn-text">Add to Favorites</span>
                </button>
              </div>
            </section>

            <!-- Top Records Section (With Medals & Relative Dates) -->
            <section class="game-details-dialog__records-section">
              <h3 class="game-details-dialog__section-title">
                <span class="title-trophy">🏆</span> Top Records
              </h3>
              <div class="game-details-dialog__records-list">
                ${s.topRecords.map(a=>{let i="🥉";a.position===1?i="🥇":a.position===2&&(i="🥈");const r=this.formatRelativeTime(a.achievedAt);return`
                    <div class="game-details-dialog__record-item">
                      <div class="game-details-dialog__record-left">
                        <span class="game-details-dialog__record-medal">${i}</span>
                        <span class="game-details-dialog__record-player">${a.playerName}</span>
                      </div>
                      <div class="game-details-dialog__record-right">
                        <span class="game-details-dialog__record-score">${a.score.toLocaleString()} pts</span>
                        <span class="game-details-dialog__record-date">${r}</span>
                      </div>
                    </div>
                  `}).join("")}
              </div>
            </section>

            <!-- Comments Section (With User Avatar, Input, and Cards) -->
            <section class="game-details-dialog__comments-section">
              <h3 class="game-details-dialog__section-title game-details-dialog__comments-title">Comments (${this.commentsCount})</h3>

              <div class="game-details-dialog__comment-form">
                <div class="game-details-dialog__user-avatar">U</div>
                <input
                  type="text"
                  class="game-details-dialog__comment-input"
                  placeholder="Write a comment..."
                  aria-label="Write a comment"
                />
                <button
                  type="button"
                  class="game-details-dialog__submit-comment-btn"
                  aria-label="Send comment"
                  disabled
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>

              <div class="game-details-dialog__comments-list">
                ${t.map(a=>{const i=this.getCommentAvatarBg(a.authorName),r=a.authorName.charAt(0).toUpperCase(),n=this.formatRelativeTime(a.createdAt);return`
                  <article class="game-details-dialog__comment-card">
                    <div class="game-details-dialog__comment-header">
                      <div class="game-details-dialog__comment-author-group">
                        <div class="game-details-dialog__comment-avatar" style="background-color: ${i};">${r}</div>
                        <span class="game-details-dialog__comment-author">${a.authorName}</span>
                      </div>
                      <span class="game-details-dialog__comment-date">${n}</span>
                    </div>
                    <p class="game-details-dialog__comment-text">${a.text}</p>
                    <div class="game-details-dialog__comment-footer">
                      <button
                        type="button"
                        class="game-details-dialog__comment-like-btn"
                        data-comment-id="${a.commentId}"
                        aria-label="Like comment by ${a.authorName}"
                      >
                        <svg class="comment-heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <span class="like-count">${a.likesCount}</span>
                      </button>
                    </div>
                  </article>
                `}).join("")}
              </div>
            </section>
          </div>
        </div>
      </div>
    `,e}setupListeners(){this.backdropElement.addEventListener("click",i=>{i.target===this.backdropElement&&this.close()});const e=this.backdropElement.querySelector(".game-details-dialog__hero-close-btn");e&&e.addEventListener("click",()=>{this.close()}),document.addEventListener("keydown",i=>{i.key==="Escape"&&this.backdropElement.classList.contains("game-details-backdrop--active")&&this.close()}),this.favoriteBtnElement=this.backdropElement.querySelector(".game-details-dialog__favorite-btn")??void 0,this.favoriteBtnElement&&this.favoriteBtnElement.addEventListener("click",()=>{var r,n,d;this.isFavorite=!this.isFavorite,(r=this.favoriteBtnElement)==null||r.classList.toggle("game-details-dialog__favorite-btn--active",this.isFavorite);const i=(n=this.favoriteBtnElement)==null?void 0:n.querySelector(".fav-btn-text");i&&(i.textContent=this.isFavorite?"Remove from Favorites":"Add to Favorites"),(d=this.favoriteBtnElement)==null||d.setAttribute("aria-label",this.isFavorite?"Remove from Favorites":"Add to Favorites")}),this.inputElement=this.backdropElement.querySelector(".game-details-dialog__comment-input")??void 0;const s=this.backdropElement.querySelector(".game-details-dialog__submit-comment-btn"),t=()=>{if(!this.inputElement||this.inputElement.value.trim().length===0)return;const i=this.inputElement.value.trim(),r=this.backdropElement.querySelector(".game-details-dialog__comments-list");if(r){const n=document.createElement("article");n.className="game-details-dialog__comment-card";const d=`comment-${Date.now()}`;this.commentLikes.set(d,{count:0,active:!1}),n.innerHTML=`
          <div class="game-details-dialog__comment-header">
            <div class="game-details-dialog__comment-author-group">
              <div class="game-details-dialog__comment-avatar" style="background-color: #ffd02b;">Y</div>
              <span class="game-details-dialog__comment-author">You</span>
            </div>
            <span class="game-details-dialog__comment-date">Just now</span>
          </div>
          <p class="game-details-dialog__comment-text">${i}</p>
          <div class="game-details-dialog__comment-footer">
            <button
              type="button"
              class="game-details-dialog__comment-like-btn"
              data-comment-id="${d}"
              aria-label="Like comment by You"
            >
              <svg class="comment-heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span class="like-count">0</span>
            </button>
          </div>
        `;const c=n.querySelector(".game-details-dialog__comment-like-btn");c&&this.attachLikeListener(c,d),r.prepend(n),this.commentsCount++;const u=this.backdropElement.querySelector(".game-details-dialog__comments-title");u&&(u.textContent=`Comments (${this.commentsCount})`)}this.inputElement.value="",s&&(s.disabled=!0)};this.inputElement&&(this.inputElement.addEventListener("input",()=>{!this.inputElement||!s||(s.disabled=this.inputElement.value.trim().length===0)}),this.inputElement.addEventListener("keydown",i=>{i.key==="Enter"&&(i.preventDefault(),t())})),s&&s.addEventListener("click",()=>{t()});const a=this.backdropElement.querySelectorAll(".game-details-dialog__comment-like-btn");for(const i of a){const r=i.dataset.commentId;r&&this.attachLikeListener(i,r)}}attachLikeListener(e,s){e.addEventListener("click",()=>{const t=this.commentLikes.get(s);if(!t)return;t.active=!t.active,t.count=t.active?t.count+1:t.count-1,e.classList.toggle("game-details-dialog__comment-like-btn--active",t.active);const a=e.querySelector(".like-count");a&&(a.textContent=t.count.toString())})}}const C="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAABXVJREFUeAG9V1tsVFUUXefO3Om8mT4ElUqHVwOiKeWlKUkzkQCCQtSQ4IeRH9GYaDRR/FETI5KYgAb9IEb9gBA/9Ec+tEiN0kBEFIM0UBC0ZcAWHGhh2pkO87pz3Pt07nSmvdMOBNjJfZ5z9l577ce9RyAvwWAoYIf9NboNQYgQ7oRIeUJC7uwO/7THfCX4NC8YChpCPygJB+6CSIlwThih8+d/vqAAzJ258jwbn3ZvXXr7ji3Ggocb7T6fR8dtFDJktLUdSm3buku/ErmmMwgDmWbRGFyxKSe03VOn1Wb2H/hCd3tcsNlsuM0iczmyommIDcWxdvWLmUikXycq3tNy0F7nGe+8+3LG5/eycYnbL8o4A/F43dj+8VvZ/PuQRtws5Ls1a1urCKWaXLHWm5lcBOTBBXPsI08ipJkj5LaNBif1XkpZMD4WiDk2mfj93kJ+2ceMTeqQJgSYqa6/LuPoH2H1/OiSIObPu0/dVwBBFtux4xYkFk/h891H8M23x4lFYOMzi/D+2+vg9zlHmJh4eYmTFQEQ454Fei9Fkc4a4Bj29kVLrJrzc/RSTEJqRQCyRg4GHWxEd9igUZUubW7Aue6rxIDEkkUNVD0cGolMxqBMgyplDslkQZ0QgLk2Hk9i3/ed+LOzD06nrowNXBvGFKKcJ/VcHMC2j9oJpIFUMoPmpno89WQTpvjdar28VQCmaJrAseMXsffrY/B6qqDbNXi9Tvi8VQrmL7/2qLzIUkgSw3QlIE+va6pE9cQAzHR1kdd1NT7UVntQTYfdRhwT9SNVJ+FxO9TBoRocTKCu1gdnlQMVOWdpWMqSJqPr9J20CxgUY2aDYyyK4sv3gt5zkzEMSSHS4HCM+jZRj7BkgJMnk8kicjVGTRxEtwNkWxlXtEhL1OAuwLjYWJSYGIqlwGRNvcdPTtgsl40DYHrdeaoPn37WgX97o1jcPEMpVHWeL3QpSueb2v0+Fy72DWLbjgOUNxfQUF+NV14KYSlVilWPKJsDp05fRvvBs0ins+i9PEgZ74Lb5VClVuJ4EQhmzkVzTpzsxRAB7qdKOft3BKHWRgXASrRyADjbPS5dxbS22o1AwIX8x4q8l4py82DKTVgMMOB3ojrgVr2DkzPA5VpGyjKwbHEDXni+Bf/09KN1+WycIU/2fddJ+eCCnZItmUqrXsBSU+OB2+lQ5cc947HWuZjfOA2Hj3Rjzqw6LF3cUDkA05MZD9TgjVdXKH7pM4kPd/6I4RtpYsap6p3LsbVlLtj3k12XyHBKzU0kUvBTf3hu4zI8u2GJCotd18o2I0sGVBnSQrOU+Jlr3E49OJFIq1zYsH4hNm9qUZR/ufcIdn/1mxrjFpw1Rsq1yjaqPpfXOVYsc0DkP6sm6mQqgyQpN8jz/oGYGml5ZJYCyK15+bLZion+gTixk0OSmEqnjSKHYGm8LIACkPw1Tu312vU4XZOqKgZjN9B1uq8w79SZPgxGbyBFQIcpBNejw2rNOEUWUtG3wKHrWP9EEx6aNx0adURuxfXTA+RtlipCoP7+arxJ+cKdMkehmk2Jx42nEhFzZq5UTJ/raedLyd9KQRSFY14VlZ5q22MmSGmxqKANonHWKvVQCAH9LmetjJfTo/q/EJbGzXGr9s+/5zTb/CsmAFJ28E3XyXPZfKORpYpG23/pkZ9WdtwSuOSy3N92OD3yhBPMQAffb9myQ0vEE0qlFZDxIgrXSn/P2ft4LIEPtu6yjxgQO7Ussp/Q4nDkv37HmtWb0z+0HUpQ4zEq1DnqmgW0YhkaGs7+frQzSTYyVyIDDt6adYfb9+Q3p4/T5tS4y5tTnTanbRdKwDYGV9E+UfJWbSHujHRwzjHr4XBHlF/8D6o0T/Wbj0z8AAAAAElFTkSuQmCC",U="data:image/svg+xml,%3csvg%20width='14'%20height='16'%20viewBox='0%200%2014%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M11.5%2016C10.8056%2016%2010.2153%2015.7569%209.72917%2015.2708C9.24306%2014.7847%209%2014.1944%209%2013.5C9%2013.375%209.02778%2013.1736%209.08333%2012.8958L4.14583%209.875C3.92361%2010.0694%203.67361%2010.2222%203.39583%2010.3333C3.11806%2010.4444%202.81944%2010.5%202.5%2010.5C1.80556%2010.5%201.21528%2010.2569%200.729167%209.77083C0.243056%209.28472%201.78814e-07%208.69444%201.78814e-07%208C1.78814e-07%207.30556%200.243056%206.71528%200.729167%206.22917C1.21528%205.74305%201.80556%205.5%202.5%205.5C2.81944%205.5%203.11806%205.55555%203.39583%205.66667C3.67361%205.77778%203.92361%205.93055%204.14583%206.125L9.08333%203.10417C9.05556%203.00694%209.03472%202.90972%209.02083%202.8125C9.00694%202.71528%209%202.61111%209%202.5C9%201.80556%209.24306%201.21528%209.72917%200.729166C10.2153%200.243055%2010.8056%20-7.15256e-07%2011.5%20-7.15256e-07C12.1944%20-7.15256e-07%2012.7847%200.243055%2013.2708%200.729166C13.7569%201.21528%2014%201.80556%2014%202.5C14%203.19444%2013.7569%203.78472%2013.2708%204.27083C12.7847%204.75694%2012.1944%205%2011.5%205C11.1806%205%2010.8819%204.94444%2010.6042%204.83333C10.3264%204.72222%2010.0764%204.56944%209.85417%204.375L4.91667%207.39583C4.94444%207.49306%204.96528%207.59028%204.97917%207.6875C4.99306%207.78472%205%207.88889%205%208C5%208.11111%204.99306%208.21528%204.97917%208.3125C4.96528%208.40972%204.94444%208.50694%204.91667%208.60417L9.85417%2011.625C10.0764%2011.4306%2010.3264%2011.2778%2010.6042%2011.1667C10.8819%2011.0556%2011.1806%2011%2011.5%2011C12.1944%2011%2012.7847%2011.2431%2013.2708%2011.7292C13.7569%2012.2153%2014%2012.8056%2014%2013.5C14%2014.1944%2013.7569%2014.7847%2013.2708%2015.2708C12.7847%2015.7569%2012.1944%2016%2011.5%2016ZM11.5%2014.5C11.7778%2014.5%2012.0139%2014.4028%2012.2083%2014.2083C12.4028%2014.0139%2012.5%2013.7778%2012.5%2013.5C12.5%2013.2222%2012.4028%2012.9861%2012.2083%2012.7917C12.0139%2012.5972%2011.7778%2012.5%2011.5%2012.5C11.2222%2012.5%2010.9861%2012.5972%2010.7917%2012.7917C10.5972%2012.9861%2010.5%2013.2222%2010.5%2013.5C10.5%2013.7778%2010.5972%2014.0139%2010.7917%2014.2083C10.9861%2014.4028%2011.2222%2014.5%2011.5%2014.5ZM2.5%209C2.77778%209%203.01389%208.90278%203.20833%208.70833C3.40278%208.51389%203.5%208.27778%203.5%208C3.5%207.72222%203.40278%207.48611%203.20833%207.29167C3.01389%207.09722%202.77778%207%202.5%207C2.22222%207%201.98611%207.09722%201.79167%207.29167C1.59722%207.48611%201.5%207.72222%201.5%208C1.5%208.27778%201.59722%208.51389%201.79167%208.70833C1.98611%208.90278%202.22222%209%202.5%209ZM11.5%203.5C11.7778%203.5%2012.0139%203.40278%2012.2083%203.20833C12.4028%203.01389%2012.5%202.77778%2012.5%202.5C12.5%202.22222%2012.4028%201.98611%2012.2083%201.79167C12.0139%201.59722%2011.7778%201.5%2011.5%201.5C11.2222%201.5%2010.9861%201.59722%2010.7917%201.79167C10.5972%201.98611%2010.5%202.22222%2010.5%202.5C10.5%202.77778%2010.5972%203.01389%2010.7917%203.20833C10.9861%203.40278%2011.2222%203.5%2011.5%203.5Z'%20fill='white'/%3e%3c/svg%3e",V="data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M3%2010H10V8.5H3V10ZM3%207.25H13V5.75H3V7.25ZM3%204.5H13V3H3V4.5ZM1.78814e-07%2016V1.5C1.78814e-07%201.08333%200.145833%200.729166%200.4375%200.437499C0.729167%200.145832%201.08333%20-7.15256e-07%201.5%20-7.15256e-07H14.5C14.9167%20-7.15256e-07%2015.2708%200.145832%2015.5625%200.437499C15.8542%200.729166%2016%201.08333%2016%201.5V11.5C16%2011.9167%2015.8542%2012.2708%2015.5625%2012.5625C15.2708%2012.8542%2014.9167%2013%2014.5%2013H3L1.78814e-07%2016ZM2.375%2011.5H14.5V1.5H1.5V12.375L2.375%2011.5ZM1.5%2011.5V1.5V11.5Z'%20fill='white'/%3e%3c/svg%3e",Z="data:image/svg+xml,%3csvg%20width='14'%20height='14'%20viewBox='0%200%2014%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M1.5%2014C1.08333%2014%200.729167%2013.8542%200.4375%2013.5625C0.145834%2013.2708%201.19209e-07%2012.9167%201.19209e-07%2012.5C1.19209e-07%2012.0833%200.145834%2011.7292%200.4375%2011.4375C0.729167%2011.1458%201.08333%2011%201.5%2011C1.91667%2011%202.27083%2011.1458%202.5625%2011.4375C2.85417%2011.7292%203%2012.0833%203%2012.5C3%2012.9167%202.85417%2013.2708%202.5625%2013.5625C2.27083%2013.8542%201.91667%2014%201.5%2014ZM12%2014C12%2012.3333%2011.6806%2010.7778%2011.0417%209.33333C10.4167%207.875%209.5625%206.60417%208.47917%205.52083C7.39583%204.4375%206.125%203.58333%204.66667%202.95833C3.22222%202.31944%201.66667%202%201.19209e-07%202V-4.76837e-07C1.94444%20-4.76837e-07%203.75694%200.368055%205.4375%201.10417C7.13195%201.82639%208.61806%202.82639%209.89583%204.10417C11.1736%205.38194%2012.1736%206.86805%2012.8958%208.5625C13.6319%2010.2431%2014%2012.0556%2014%2014H12ZM7%2014C7%2013.0278%206.81944%2012.1181%206.45833%2011.2708C6.09722%2010.4236%205.59722%209.68056%204.95833%209.04167C4.31944%208.40278%203.57639%207.90278%202.72917%207.54167C1.88194%207.18056%200.972222%207%201.19209e-07%207V5C1.26389%205%202.4375%205.23611%203.52083%205.70833C4.60417%206.16667%205.55556%206.80556%206.375%207.625C7.19444%208.44444%207.83333%209.39583%208.29167%2010.4792C8.76389%2011.5625%209%2012.7361%209%2014H7Z'%20fill='white'/%3e%3c/svg%3e",W="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='24'%20height='24'%20rx='12'%20fill='%23242145'/%3e%3cpath%20d='M6.1321%2016V8.72727H9.00142C9.55066%208.72727%2010.0194%208.82552%2010.4077%209.02202C10.7983%209.21615%2011.0954%209.49195%2011.299%209.84943C11.505%2010.2045%2011.608%2010.6224%2011.608%2011.103C11.608%2011.5859%2011.5038%2012.0014%2011.2955%2012.3494C11.0871%2012.6951%2010.7853%2012.9602%2010.3899%2013.1449C9.99692%2013.3295%209.52107%2013.4219%208.96236%2013.4219H7.04119V12.1861H8.71378C9.00734%2012.1861%209.25118%2012.1458%209.44531%2012.0653C9.63944%2011.9848%209.78385%2011.8641%209.87855%2011.7031C9.97562%2011.5421%2010.0241%2011.3421%2010.0241%2011.103C10.0241%2010.8615%209.97562%2010.6579%209.87855%2010.4922C9.78385%2010.3265%209.63826%2010.201%209.44176%2010.1158C9.24763%2010.0282%209.0026%209.98438%208.70668%209.98438H7.66974V16H6.1321ZM10.0597%2012.6903L11.8672%2016H10.1697L8.40128%2012.6903H10.0597ZM16.1399%2010.8189C16.1115%2010.5324%2015.9896%2010.3099%2015.7741%2010.1513C15.5587%209.99266%2015.2663%209.91335%2014.897%209.91335C14.6461%209.91335%2014.4342%209.94886%2014.2614%2010.0199C14.0885%2010.0885%2013.956%2010.1844%2013.8636%2010.3075C13.7737%2010.4306%2013.7287%2010.5703%2013.7287%2010.7266C13.724%2010.8568%2013.7512%2010.9704%2013.8104%2011.0675C13.8719%2011.1645%2013.956%2011.2486%2014.0625%2011.3196C14.169%2011.3883%2014.2921%2011.4486%2014.4318%2011.5007C14.5715%2011.5504%2014.7206%2011.593%2014.8793%2011.6286L15.5327%2011.7848C15.8499%2011.8558%2016.1411%2011.9505%2016.4062%2012.0689C16.6714%2012.1873%2016.901%2012.3329%2017.0952%2012.5057C17.2893%2012.6785%2017.4396%2012.8821%2017.5462%2013.1165C17.6551%2013.3509%2017.7107%2013.6196%2017.7131%2013.9226C17.7107%2014.3677%2017.5971%2014.7536%2017.3722%2015.0803C17.1496%2015.4046%2016.8277%2015.6567%2016.4062%2015.8366C15.9872%2016.0142%2015.4818%2016.103%2014.8899%2016.103C14.3028%2016.103%2013.7914%2016.013%2013.3558%2015.8331C12.9226%2015.6532%2012.584%2015.3868%2012.3402%2015.0341C12.0987%2014.679%2011.9721%2014.2398%2011.9602%2013.7166H13.4482C13.4647%2013.9605%2013.5346%2014.1641%2013.6577%2014.3274C13.7831%2014.4884%2013.95%2014.6103%2014.1584%2014.6932C14.3691%2014.7737%2014.607%2014.8139%2014.8722%2014.8139C15.1326%2014.8139%2015.3587%2014.776%2015.5504%2014.7003C15.7446%2014.6245%2015.8949%2014.5192%2016.0014%2014.3842C16.108%2014.2493%2016.1612%2014.0942%2016.1612%2013.919C16.1612%2013.7557%2016.1127%2013.6184%2016.0156%2013.5071C15.9209%2013.3958%2015.7813%2013.3011%2015.5966%2013.223C15.4143%2013.1449%2015.1906%2013.0739%2014.9254%2013.0099L14.1335%2012.8111C13.5204%2012.6619%2013.0362%2012.4287%2012.6811%2012.1115C12.326%2011.7943%2012.1496%2011.367%2012.152%2010.8295C12.1496%2010.3892%2012.2668%2010.0045%2012.5036%209.67543C12.7427%209.34635%2013.0705%209.08949%2013.4872%208.90483C13.9039%208.72017%2014.3774%208.62784%2014.9077%208.62784C15.4474%208.62784%2015.9186%208.72017%2016.321%208.90483C16.7259%209.08949%2017.0407%209.34635%2017.2656%209.67543C17.4905%2010.0045%2017.6065%2010.3857%2017.6136%2010.8189H16.1399Z'%20fill='%23FFD02B'/%3e%3c/svg%3e",K="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='24'%20height='24'%20rx='12'%20fill='white'/%3e%3cpath%20d='M9.6%2016.5L5.6%2012.5L9.6%208.5L10.45%209.35L7.3%2012.5L10.45%2015.65L9.6%2016.5ZM14.4%2016.5L13.55%2015.65L16.7%2012.5L13.55%209.35L14.4%208.5L18.4%2012.5L14.4%2016.5Z'%20fill='%23242145'/%3e%3c/svg%3e";class X{constructor(){o(this,"element");this.element=this.createFooterElement()}getElement(){return this.element}createFooterElement(){const e=document.createElement("footer");return e.className="site-footer",e.innerHTML=`
      <div class="site-footer__container">
        <div class="site-footer__main">
          <div class="site-footer__brand">
            <a href="#" class="site-footer__logo-link">
              <img src="${C}" alt="MiniGames Logo" class="site-footer__logo" />
              <span class="site-footer__brand-name">MiniGames</span>
            </a>
            <p class="site-footer__description">
              Take a short break and have fun. Hundreds of curated casual mini-games right in your web browser. No download required.
            </p>
          </div>

          <div class="site-footer__nav-group">
            <div class="site-footer__col">
              <h3 class="site-footer__col-title">Explore</h3>
              <ul class="site-footer__list">
                <li><a href="#" class="site-footer__link">Home</a></li>
                <li><a href="#library" class="site-footer__link">Library</a></li>

                <li><a href="#" class="site-footer__link">Categories</a></li>
                <li><a href="#" class="site-footer__link">Tournaments</a></li>
              </ul>
            </div>

            <div class="site-footer__col">
              <h3 class="site-footer__col-title">Company</h3>
              <ul class="site-footer__list">
                <li><a href="#" class="site-footer__link">About Us</a></li>
                <li><a href="#" class="site-footer__link">Contact</a></li>
                <li><a href="#" class="site-footer__link">Privacy Policy</a></li>
                <li><a href="#" class="site-footer__link">Terms of Service</a></li>
              </ul>
            </div>

            <div class="site-footer__col site-footer__col--community">
              <h3 class="site-footer__col-title">Community</h3>
              <div class="site-footer__socials">
                <a href="#" class="site-footer__social-btn" aria-label="Share">
                  <img src="${U}" alt="Share icon" />
                </a>
                <a href="#" class="site-footer__social-btn" aria-label="Chat">
                  <img src="${V}" alt="Chat icon" />
                </a>
                <a href="#" class="site-footer__social-btn" aria-label="RSS Feed">
                  <img src="${Z}" alt="RSS icon" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="site-footer__bottom">
          <span class="site-footer__copyright">© 2026 MiniGames. All rights reserved.</span>
          
          <a href="https://rs.school/courses/short-track" target="_blank" rel="noopener noreferrer" class="site-footer__credit-link">
            <img src="${W}" alt="RS School Logo" class="site-footer__rs-logo" />
            <span>RS School</span>
          </a>

          <a href="https://github.com/behruz-eshquvatov" target="_blank" rel="noopener noreferrer" class="site-footer__credit-link">
            <img src="${K}" alt="GitHub Logo" class="site-footer__github-logo" />
            <span>@behruz-eshquvatov</span>
          </a>

          <span class="site-footer__made-with">Designed with love</span>
        </div>
      </div>
    `,e}}class Y{constructor(e={}){o(this,"element");o(this,"isMenuOpen",!1);o(this,"burgerButton");o(this,"mobileMenuOverlay");o(this,"callbacks");o(this,"activePage");this.callbacks=e,this.activePage=e.activePage||"home",this.element=this.createHeaderElement(),this.setupEventListeners()}getElement(){return this.element}setActivePage(e){this.activePage=e;const s=this.element.querySelectorAll(".site-header__nav-link");for(const a of s){const i=a.dataset.page;a.classList.toggle("site-header__nav-link--active",i===e)}const t=this.mobileMenuOverlay.querySelectorAll(".mobile-menu__nav-link");for(const a of t){const i=a.dataset.page;a.classList.toggle("mobile-menu__nav-link--active",i===e)}}createHeaderElement(){const e=document.createElement("header");e.className="site-header";const s=document.createElement("div");s.className="site-header__container";const t=document.createElement("a");t.href="#",t.className="site-header__logo",t.innerHTML=`
      <div class="site-header__logo-icon">
        <img src="${C}" alt="MiniGames Logo" class="site-header__logo-img" />
      </div>
      <span class="site-header__logo-text">MiniGames</span>
    `,t.addEventListener("click",p=>{var m,f;p.preventDefault(),this.setActivePage("home"),(f=(m=this.callbacks).onNavigate)==null||f.call(m,"home")});const a=document.createElement("nav");a.className="site-header__nav",a.innerHTML=`
      <ul class="site-header__nav-list">
        <li class="site-header__nav-item">
          <a href="#" data-page="home" class="site-header__nav-link ${this.activePage==="home"?"site-header__nav-link--active":""}">Home</a>
        </li>
        <li class="site-header__nav-item">
          <a href="#library" data-page="library" class="site-header__nav-link ${this.activePage==="library"?"site-header__nav-link--active":""}">Library</a>
        </li>
        <li class="site-header__nav-item">
          <a href="#" class="site-header__nav-link">Tournaments</a>
        </li>
        <li class="site-header__nav-item">
          <a href="#" class="site-header__nav-link">Community</a>
        </li>
      </ul>
    `;const i=a.querySelector('[data-page="home"]');i&&i.addEventListener("click",p=>{var m,f;p.preventDefault(),this.setActivePage("home"),(f=(m=this.callbacks).onNavigate)==null||f.call(m,"home")});const r=a.querySelector('[data-page="library"]');r&&r.addEventListener("click",p=>{var m,f;p.preventDefault(),this.setActivePage("library"),(f=(m=this.callbacks).onNavigate)==null||f.call(m,"library")});const n=document.createElement("button");n.className="btn btn--outline site-header__login-btn",n.textContent="Log In",n.addEventListener("click",()=>{var p,m;this.closeMobileMenu(),(m=(p=this.callbacks).onLoginClick)==null||m.call(p)});const d=document.createElement("button");d.className="btn btn--primary site-header__signup-btn",d.textContent="Sign Up",d.addEventListener("click",()=>{var p,m;this.closeMobileMenu(),(m=(p=this.callbacks).onSignUpClick)==null||m.call(p)});const c=document.createElement("div");c.className="site-header__nav-wrapper",c.append(a,n),this.burgerButton=document.createElement("button"),this.burgerButton.className="site-header__burger-btn",this.burgerButton.setAttribute("aria-label","Toggle menu"),this.burgerButton.innerHTML=`
      <span class="site-header__burger-icon">
        <span class="site-header__burger-line"></span>
        <span class="site-header__burger-line"></span>
        <span class="site-header__burger-line"></span>
      </span>
    `;const u=document.createElement("div");u.className="site-header__right-controls",u.append(c,d,this.burgerButton),s.append(t,u),e.append(s),this.mobileMenuOverlay=document.createElement("div"),this.mobileMenuOverlay.className="mobile-menu",this.mobileMenuOverlay.innerHTML=`
      <div class="mobile-menu__header">
        <a href="#" class="mobile-menu__logo">
          <div class="mobile-menu__logo-icon">
            <img src="${C}" alt="MiniGames Logo" class="mobile-menu__logo-img" />
          </div>
          <span class="mobile-menu__logo-text">MiniGames</span>
        </a>
        <button class="mobile-menu__close-btn" aria-label="Close menu">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M1 13L13 1" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      <div class="mobile-menu__content">
        <ul class="mobile-menu__nav-list">
          <li><a href="#" data-page="home" class="mobile-menu__nav-link ${this.activePage==="home"?"mobile-menu__nav-link--active":""}">Home</a></li>
          <li><a href="#library" data-page="library" class="mobile-menu__nav-link ${this.activePage==="library"?"mobile-menu__nav-link--active":""}">Library</a></li>
          <li><a href="#" class="mobile-menu__nav-link">Tournaments</a></li>
          <li><a href="#" class="mobile-menu__nav-link">Community</a></li>
        </ul>
        <div class="mobile-menu__actions">
          <button class="btn btn--outline-dark mobile-menu__login-btn">Log In</button>
          <button class="btn btn--primary mobile-menu__signup-btn">Sign Up</button>
        </div>
      </div>
    `;const l=this.mobileMenuOverlay.querySelector(".mobile-menu__logo");l&&l.addEventListener("click",p=>{var m,f;p.preventDefault(),this.closeMobileMenu(),this.setActivePage("home"),(f=(m=this.callbacks).onNavigate)==null||f.call(m,"home")});const h=this.mobileMenuOverlay.querySelector('[data-page="home"]');h&&h.addEventListener("click",p=>{var m,f;p.preventDefault(),this.closeMobileMenu(),this.setActivePage("home"),(f=(m=this.callbacks).onNavigate)==null||f.call(m,"home")});const _=this.mobileMenuOverlay.querySelector('[data-page="library"]');_&&_.addEventListener("click",p=>{var m,f;p.preventDefault(),this.closeMobileMenu(),this.setActivePage("library"),(f=(m=this.callbacks).onNavigate)==null||f.call(m,"library")});const v=this.mobileMenuOverlay.querySelector(".mobile-menu__close-btn");v&&v.addEventListener("click",()=>{this.closeMobileMenu()});const b=this.mobileMenuOverlay.querySelector(".mobile-menu__login-btn");b&&b.addEventListener("click",()=>{var p,m;this.closeMobileMenu(),(m=(p=this.callbacks).onLoginClick)==null||m.call(p)});const y=this.mobileMenuOverlay.querySelector(".mobile-menu__signup-btn");return y&&y.addEventListener("click",()=>{var p,m;this.closeMobileMenu(),(m=(p=this.callbacks).onSignUpClick)==null||m.call(p)}),e.append(this.mobileMenuOverlay),e}setupEventListeners(){this.burgerButton.addEventListener("click",()=>{this.toggleMobileMenu()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&this.isMenuOpen&&this.closeMobileMenu()})}toggleMobileMenu(){this.isMenuOpen?this.closeMobileMenu():this.openMobileMenu()}openMobileMenu(){this.isMenuOpen=!0,this.burgerButton.classList.add("site-header__burger-btn--open"),this.mobileMenuOverlay.classList.add("mobile-menu--open"),document.body.style.overflow="hidden"}closeMobileMenu(){this.isMenuOpen=!1,this.burgerButton.classList.remove("site-header__burger-btn--open"),this.mobileMenuOverlay.classList.remove("mobile-menu--open"),document.body.style.overflow=""}}const k="data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M3.825%209L9.425%2014.6L8%2016L1.19209e-07%208L8%20-9.53674e-07L9.425%201.4L3.825%207H16V9H3.825Z'%20fill='%23242145'/%3e%3c/svg%3e",M=""+new URL("cat-mail-co-card-B0GMTC_n.jpg",import.meta.url).href,Q=Object.freeze(Object.defineProperty({__proto__:null,default:M},Symbol.toStringTag,{value:"Module"})),x=""+new URL("heartopia-card-DRd_6OVG.jpg",import.meta.url).href,J=Object.freeze(Object.defineProperty({__proto__:null,default:x},Symbol.toStringTag,{value:"Module"})),j=""+new URL("islanders-new-shores-card-DljrohUL.jpg",import.meta.url).href,ee=Object.freeze(Object.defineProperty({__proto__:null,default:j},Symbol.toStringTag,{value:"Module"})),z=""+new URL("palia-card-8xT8yeZQ.jpg",import.meta.url).href,te=Object.freeze(Object.defineProperty({__proto__:null,default:z},Symbol.toStringTag,{value:"Module"})),T=""+new URL("shelve-the-potions-card-DTY_N_zq.jpg",import.meta.url).href,ae=Object.freeze(Object.defineProperty({__proto__:null,default:T},Symbol.toStringTag,{value:"Module"})),P=""+new URL("tailside-cozy-cafe-sim-card-C7B0rePC.jpg",import.meta.url).href,se=Object.freeze(Object.defineProperty({__proto__:null,default:P},Symbol.toStringTag,{value:"Module"})),I=""+new URL("tiny-glade-card-CS2XLEzK.jpg",import.meta.url).href,ie=Object.freeze(Object.defineProperty({__proto__:null,default:I},Symbol.toStringTag,{value:"Module"})),D=""+new URL("vacation-cafe-simulator-card-Bzcyczbo.jpg",import.meta.url).href,re=Object.freeze(Object.defineProperty({__proto__:null,default:D},Symbol.toStringTag,{value:"Module"})),F=""+new URL("winter-burrow-card-KbzzF82b.jpg",import.meta.url).href,oe=Object.freeze(Object.defineProperty({__proto__:null,default:F},Symbol.toStringTag,{value:"Module"}));class ne{constructor(e={}){o(this,"element");o(this,"games",[{slug:"vacation-cafe-simulator",name:"Vacation Cafe Simulator",rating:4.8,likesCount:28750,likesFormatted:"28.7K",cardImage:D},{slug:"winter-burrow",name:"Winter Burrow",rating:4.9,likesCount:32400,likesFormatted:"32.4K",cardImage:F},{slug:"shelve-the-potions",name:"Shelve the Potions!",rating:4.7,likesCount:21300,likesFormatted:"21.3K",cardImage:T},{slug:"heartopia",name:"Heartopia",rating:4.6,likesCount:46800,likesFormatted:"46.8K",cardImage:x},{slug:"palia",name:"Palia",rating:4.9,likesCount:42100,likesFormatted:"42.1K",cardImage:z},{slug:"cat-mail-co",name:"Cat Mail Co.",rating:4.8,likesCount:38900,likesFormatted:"38.9K",cardImage:M},{slug:"tiny-glade",name:"Tiny Glade",rating:4.9,likesCount:51200,likesFormatted:"51.2K",cardImage:I},{slug:"tailside-cozy-cafe-sim",name:"Tailside: Cozy Cafe Sim",rating:4.8,likesCount:18400,likesFormatted:"18.4K",cardImage:P},{slug:"islanders-new-shores",name:"ISLANDERS: New Shores",rating:4.9,likesCount:54200,likesFormatted:"54.2K",cardImage:j}]);o(this,"centerIndex",0);o(this,"autoplayTimer");o(this,"callbacks");o(this,"startX",0);o(this,"isSwiping",!1);o(this,"hasSwiped",!1);o(this,"isAnimating",!1);this.callbacks=e,this.element=this.createCarouselElement(),this.renderTrack(),this.setupControls(),this.startAutoplay()}getElement(){return this.element}createCarouselElement(){const e=document.createElement("section");return e.className="carousel-section",e.innerHTML=`
      <div class="carousel-section__container">
        <div class="carousel-section__header">
          <h2 class="carousel-section__title">
            <span class="carousel-section__title-pill"></span>
            New Games
          </h2>
          <div class="carousel-section__controls">
            <button type="button" class="carousel-section__control-btn carousel-section__control-btn--prev" aria-label="Previous slide">
              <img src="${k}" alt="Previous" />
            </button>
            <button type="button" class="carousel-section__control-btn carousel-section__control-btn--next" aria-label="Next slide">
              <img src="${k}" alt="Next" />
            </button>
          </div>
        </div>

        <div class="carousel-section__track-wrapper">
          <div class="carousel-section__track"></div>
        </div>
      </div>
    `,e}getVisibleGames(){const e=this.games.length;return["narrow","normal","wide","normal","narrow"].map((t,a)=>{const i=(this.centerIndex+(a-2)+e*10)%e;return{game:this.games[i],widthType:t}})}createCardElement(e,s){const t=document.createElement("div");return t.className=`game-card game-card--${s}`,t.tabIndex=0,t.setAttribute("role","button"),t.setAttribute("aria-label",e.name),t.dataset.slug=e.slug,t.innerHTML=`
      <img src="${e.cardImage}" alt="${e.name}" class="game-card__image" />
      <div class="game-card__overlay">
        <div class="game-card__info">
          <h3 class="game-card__title">${e.name}</h3>
          <div class="game-card__meta">
            <span class="game-card__rating">
              <img src="${w}" alt="Star" class="game-card__star-icon" width="20" height="20" />
              ${e.rating}
            </span>
            <span class="game-card__likes">
              <img src="${L}" alt="Likes" class="game-card__like-icon" width="20" height="20" />
              ${e.likesFormatted}
            </span>
          </div>
        </div>
      </div>
    `,this.attachCardEvents(t,e),t}attachCardEvents(e,s){e.addEventListener("click",()=>{var t,a;this.hasSwiped||this.isAnimating||(a=(t=this.callbacks).onGameClick)==null||a.call(t,s)}),e.addEventListener("keydown",t=>{var a,i;if(t.key==="Enter"||t.key===" "){if(t.preventDefault(),this.isAnimating)return;(i=(a=this.callbacks).onGameClick)==null||i.call(a,s)}})}renderTrack(){const e=this.element.querySelector(".carousel-section__track");if(!e)return;e.innerHTML="";const s=this.getVisibleGames();for(const t of s)e.append(this.createCardElement(t.game,t.widthType))}next(){this.isAnimating||this.slide("next")}prev(){this.isAnimating||this.slide("prev")}slide(e){const s=this.element.querySelector(".carousel-section__track");if(!s||this.isAnimating)return;const t=[...s.querySelectorAll(".game-card")];if(t.length!==5){this.centerIndex=e==="next"?(this.centerIndex+1)%this.games.length:(this.centerIndex-1+this.games.length)%this.games.length,this.renderTrack();return}this.isAnimating=!0;const a=this.games.length;if(e==="next"){const i=this.games[(this.centerIndex+3+a*10)%a],r=this.createCardElement(i,"narrow");r.classList.add("game-card--collapsed","game-card--collapse-right"),s.append(r),requestAnimationFrame(()=>{requestAnimationFrame(()=>{t[0].classList.add("game-card--collapsed","game-card--collapse-left"),t[1].className="game-card game-card--narrow",t[2].className="game-card game-card--normal",t[3].className="game-card game-card--wide",t[4].className="game-card game-card--normal",r.classList.remove("game-card--collapsed","game-card--collapse-right"),setTimeout(()=>{t[0].remove(),this.centerIndex=(this.centerIndex+1)%a,this.isAnimating=!1},420)})})}else{const i=this.games[(this.centerIndex-3+a*10)%a],r=this.createCardElement(i,"narrow");r.classList.add("game-card--collapsed","game-card--collapse-left"),s.prepend(r),requestAnimationFrame(()=>{requestAnimationFrame(()=>{t[4].classList.add("game-card--collapsed","game-card--collapse-right"),t[3].className="game-card game-card--narrow",t[2].className="game-card game-card--normal",t[1].className="game-card game-card--wide",t[0].className="game-card game-card--normal",r.classList.remove("game-card--collapsed","game-card--collapse-left"),setTimeout(()=>{t[4].remove(),this.centerIndex=(this.centerIndex-1+a)%a,this.isAnimating=!1},420)})})}}startAutoplay(){this.stopAutoplay(),this.autoplayTimer=setInterval(()=>{this.next()},4e3)}stopAutoplay(){this.autoplayTimer!==void 0&&(clearInterval(this.autoplayTimer),this.autoplayTimer=void 0)}resetAutoplay(){this.startAutoplay()}setupControls(){const e=this.element.querySelector(".carousel-section__control-btn--prev"),s=this.element.querySelector(".carousel-section__control-btn--next");e&&e.addEventListener("click",()=>{this.prev(),this.resetAutoplay()}),s&&s.addEventListener("click",()=>{this.next(),this.resetAutoplay()});const t=this.element.querySelector(".carousel-section__track-wrapper");t&&(t.addEventListener("pointerdown",a=>{this.startX=a.clientX,this.isSwiping=!0,this.hasSwiped=!1,this.stopAutoplay()}),t.addEventListener("pointerup",a=>{if(!this.isSwiping)return;this.isSwiping=!1;const i=a.clientX-this.startX;Math.abs(i)>40?(this.hasSwiped=!0,i<0?this.next():this.prev(),this.resetAutoplay()):this.startAutoplay()}),t.addEventListener("pointercancel",()=>{this.isSwiping=!1,this.startAutoplay()}),t.addEventListener("mouseenter",()=>{this.stopAutoplay()}),t.addEventListener("mouseleave",()=>{this.isSwiping=!1,this.startAutoplay()}))}destroy(){this.stopAutoplay()}}const le=""+new URL("random-image-DsQZrXDY.png",import.meta.url).href,ce="data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8%202V10M4.66667%205.33333L8%202L11.3333%205.33333M14%2010V12.6667C14%2013.0203%2013.8595%2013.3594%2013.6095%2013.6095C13.3594%2013.8595%2013.0203%2014%2012.6667%2014H3.33333C2.97971%2014%202.64057%2013.8595%202.39052%2013.6095C2.14048%2013.3594%202%2013.0203%202%2012.6667V10'%20stroke='%23242145'%20stroke-width='2'%20stroke-linecap='round'/%3e%3c/svg%3e";class de{constructor(){o(this,"element");this.element=this.createGameDevElement()}getElement(){return this.element}createGameDevElement(){const e=document.createElement("section");return e.className="game-dev-section",e.innerHTML=`
      <div class="game-dev-section__container">
        <div class="game-dev-section__image-wrapper">
          <img src="${le}" alt="Game Developer Desk Setup" class="game-dev-section__image" />
        </div>

        <div class="game-dev-card">
          <h2 class="game-dev-card__title">Are You a Game Developer?</h2>
          <p class="game-dev-card__description">
            Want to see your game on MiniGames? We're always looking for fun, engaging mini games to add to our platform. Submit your game and reach thousands of players!
          </p>
          <div class="game-dev-card__actions">
            <button class="game-dev-card__btn" aria-label="Submit Form">
              <img src="${ce}" alt="Upload icon" class="game-dev-card__upload-icon" width="16" height="16" />
              Submit Form
            </button>
            <span class="game-dev-card__contact">or contact us at developers@minigames.com</span>
          </div>
        </div>
      </div>
    `,e}}class me{constructor(){o(this,"element");this.element=this.createHeroElement()}getElement(){return this.element}createHeroElement(){const e=document.createElement("section");return e.className="hero-section",e.innerHTML=`
      <div class="hero-section__background-overlay"></div>
      <div class="hero-section__container">
        <div class="hero-section__card">
          <h1 class="hero-section__title">Take a Short Break &amp; Have Fun</h1>
          <p class="hero-section__description">
            Discover hundreds of curated casual mini-games. Play instantly in your browser &mdash; puzzle, match 3, farm, and board classics.
          </p>
          <button class="btn btn--primary hero-section__btn">Browse Library</button>
        </div>
      </div>
    `,e}}const ge=[{rank:1,playerName:"Alex_Pro99",gamesPlayed:142,totalScore:94250,streakDays:12,favoriteGameSlug:"heartopia",favoriteGameName:"Heartopia"},{rank:2,playerName:"CozyGamer_x",gamesPlayed:118,totalScore:81400,streakDays:8,favoriteGameSlug:"cat-mail-co",favoriteGameName:"Cat Mail Co."},{rank:3,playerName:"MatchMaster",gamesPlayed:98,totalScore:72110,streakDays:5,favoriteGameSlug:"tiny-glade",favoriteGameName:"Tiny Glade"},{rank:4,playerName:"BubblePop",gamesPlayed:87,totalScore:65900,streakDays:3,favoriteGameSlug:"whisper-of-the-house",favoriteGameName:"Whisper of the House"},{rank:5,playerName:"SudokuGod",gamesPlayed:74,totalScore:59320,streakDays:2,favoriteGameSlug:"cat-chess",favoriteGameName:"Cat Chess"}],ue={data:ge},he={1:"#FFD02B",2:"#A3E2C9",3:"#BCE3FF",4:"#FFC6FF",5:"#E6DFF5"};function pe(g){const e=g.split("_");return e.length>=2?(e[0][0]+e[1][0]).toUpperCase():g.slice(0,2).toUpperCase()}function E(g,e){return e?`${(g/1e3).toFixed(1)}K`:g.toLocaleString("en-US")}class _e{constructor(){o(this,"element");this.element=this.createLeaderboardElement()}getElement(){return this.element}createLeaderboardElement(){const e=document.createElement("section");e.className="leaderboard-section";const s=ue.data;return e.innerHTML=`
      <div class="leaderboard-section__container">
        <div class="leaderboard-section__header">
          <h2 class="leaderboard-section__title">
            <span class="leaderboard-section__title-pill"></span>
            <span class="title-desktop">Top Players This Week</span>
            <span class="title-mobile">Top Players</span>
          </h2>
        </div>

        <div class="leaderboard-table-card">
          <table class="leaderboard-table">
            <thead>
              <tr>
                <th class="col-rank">RANK</th>
                <th class="col-player">PLAYER</th>
                <th class="col-games">
                  <span class="th-desktop">GAMES PLAYED</span>
                  <span class="th-mobile">GAMES</span>
                </th>
                <th class="col-score">
                  <span class="th-desktop">TOTAL SCORE</span>
                  <span class="th-mobile">SCORE</span>
                </th>
                <th class="col-streak">STREAK</th>
                <th class="col-favorite">FAVORITE GAME</th>
              </tr>
            </thead>
            <tbody>
              ${s.map(t=>`
                <tr class="leaderboard-row leaderboard-row--rank-${t.rank}">
                  <td class="col-rank">
                    <span class="rank-badge rank-badge--${t.rank}">#${t.rank}</span>
                  </td>
                  <td class="col-player">
                    <div class="player-info">
                      <span class="player-avatar" style="background-color: ${he[t.rank]||"#E0EEF6"}">
                        ${pe(t.playerName)}
                      </span>
                      <span class="player-name">${t.playerName}</span>
                    </div>
                  </td>
                  <td class="col-games">${t.gamesPlayed}</td>
                  <td class="col-score">
                    <span class="score-desktop">${E(t.totalScore,!1)}</span>
                    <span class="score-mobile">${E(t.totalScore,!0)}</span>
                  </td>
                  <td class="col-streak">
                    <span class="streak-full">🔥 ${t.streakDays} days</span>
                    <span class="streak-short">🔥 ${t.streakDays}d</span>
                  </td>
                  <td class="col-favorite">
                    <span class="favorite-badge">${t.favoriteGameName}</span>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `,e}}const fe=""+new URL("camper-van-make-it-home-card-61XprhL7.jpg",import.meta.url).href,ve=Object.freeze(Object.defineProperty({__proto__:null,default:fe},Symbol.toStringTag,{value:"Module"})),be=""+new URL("cast-n-chill-card-CRLWRuq0.jpg",import.meta.url).href,ye=Object.freeze(Object.defineProperty({__proto__:null,default:be},Symbol.toStringTag,{value:"Module"})),ke=""+new URL("cat-chess-card-BkETDAfr.jpg",import.meta.url).href,Ce=Object.freeze(Object.defineProperty({__proto__:null,default:ke},Symbol.toStringTag,{value:"Module"})),we=""+new URL("cozy-solitaire-card-CSczvhq9.jpg",import.meta.url).href,Le=Object.freeze(Object.defineProperty({__proto__:null,default:we},Symbol.toStringTag,{value:"Module"})),Se=""+new URL("cozy-sudoku-card-CyAOOis5.jpg",import.meta.url).href,Ee=Object.freeze(Object.defineProperty({__proto__:null,default:Se},Symbol.toStringTag,{value:"Module"})),Ae=""+new URL("grimshire-card-D1QcLtZT.jpg",import.meta.url).href,Me=Object.freeze(Object.defineProperty({__proto__:null,default:Ae},Symbol.toStringTag,{value:"Module"})),xe=""+new URL("koroneko-card-BXvG49TG.jpg",import.meta.url).href,je=Object.freeze(Object.defineProperty({__proto__:null,default:xe},Symbol.toStringTag,{value:"Module"})),ze=""+new URL("leaf-it-alone-card-CGXXB8uI.jpg",import.meta.url).href,Te=Object.freeze(Object.defineProperty({__proto__:null,default:ze},Symbol.toStringTag,{value:"Module"})),Pe=""+new URL("leafy-corner-card-CAdJaXNI.jpg",import.meta.url).href,Ie=Object.freeze(Object.defineProperty({__proto__:null,default:Pe},Symbol.toStringTag,{value:"Module"})),De=""+new URL("little-corners-card-BzTzTJLT.jpg",import.meta.url).href,Fe=Object.freeze(Object.defineProperty({__proto__:null,default:De},Symbol.toStringTag,{value:"Module"})),Oe=""+new URL("organized-inside-card-CyWIV6Rk.jpg",import.meta.url).href,Be=Object.freeze(Object.defineProperty({__proto__:null,default:Oe},Symbol.toStringTag,{value:"Module"})),Ne=""+new URL("the-wild-at-heart-card-DfO3UIaM.jpg",import.meta.url).href,Re=Object.freeze(Object.defineProperty({__proto__:null,default:Ne},Symbol.toStringTag,{value:"Module"})),$e=""+new URL("tukoni-forest-keepers-card-CkPF-Hda.jpg",import.meta.url).href,He=Object.freeze(Object.defineProperty({__proto__:null,default:$e},Symbol.toStringTag,{value:"Module"})),qe=""+new URL("whisper-of-the-house-card-BE7Dq45b.jpg",import.meta.url).href,Ge=Object.freeze(Object.defineProperty({__proto__:null,default:qe},Symbol.toStringTag,{value:"Module"})),Ue=""+new URL("wytchwood-card-XvNmJ299.jpg",import.meta.url).href,Ve=Object.freeze(Object.defineProperty({__proto__:null,default:Ue},Symbol.toStringTag,{value:"Module"})),Ze=[{slug:"vacation-cafe-simulator",name:"Vacation Cafe Simulator",category:"strategy",price:"Free",shortDescription:"Cozy Italian Vacation Cafe 🏖️ No timers, No stress 😌 cook traditional dishes 🍝 upgrade and customize 🏠 just drink Prosecco 🥂 relax and grow your dream cafe ✨",rating:4.8,likesCount:28750,cardImage:"/assets/images/games/vacation-cafe-simulator-card.jpg",featured:!0},{slug:"winter-burrow",name:"Winter Burrow",category:"farm",price:"Free",shortDescription:"A cozy woodland survival game about a mouse restoring their childhood burrow. Explore, gather resources, craft, knit warm sweaters, bake pies and meet the locals.",rating:4.9,likesCount:32400,cardImage:"/assets/images/games/winter-burrow-card.jpg",featured:!0},{slug:"shelve-the-potions",name:"Shelve the Potions!",category:"puzzle",price:"Free",shortDescription:"Organize 2000+ potions on shelves after the witch's cats have knocked them over, using clues around an enchanted cellar. Learn strange symbols and decipher cryptic notes.",rating:4.7,likesCount:21300,cardImage:"/assets/images/games/shelve-the-potions-card.jpg",featured:!0},{slug:"heartopia",name:"Heartopia",category:"strategy",price:"$1.99",shortDescription:"A multiplayer life simulation game crafted for creativity, freedom, and peace. Build your dream home, explore hobbies, and forge warm connections with friends in a cozy town.",rating:4.6,likesCount:46800,cardImage:"/assets/images/games/heartopia-card.jpg",featured:!0},{slug:"palia",name:"Palia",category:"strategy",price:"Free",shortDescription:"A free-to-play fantasy life sim adventure where you can craft, explore, and create the life and home of your dreams in a vibrant, heartwarming world.",rating:4.8,likesCount:89500,cardImage:"/assets/images/games/palia-card.jpg",featured:!0},{slug:"cat-mail-co",name:"Cat Mail Co.",category:"puzzle",price:"Free",shortDescription:"Run a cozy cat post office. Sort and deliver parcels from the daily boat. At night, the moon reveals hidden truths about packages. Clear a strange backlog and unlock new destinations.",rating:4.9,likesCount:38200,cardImage:"/assets/images/games/cat-mail-co-card.jpg",featured:!0},{slug:"leaf-it-alone",name:"Leaf it Alone",category:"arcade",price:"Free",shortDescription:"Finally, it's that time of the year to clean up this leafy mess. Derust your raking skills and don't waste a second — there's a whole lawn waiting!",rating:4.4,likesCount:12600,cardImage:"/assets/images/games/leaf-it-alone-card.jpg",featured:!1},{slug:"leafy-corner",name:"Leafy Corner",category:"farm",price:"$1.99",shortDescription:"Run a cute little plant shop. Grow, sell, and care for real-life plants, help customers find their dream plants, complete orders, and customize your cozy shop.",rating:4.7,likesCount:19800,cardImage:"/assets/images/games/leafy-corner-card.jpg",featured:!1},{slug:"grimshire",name:"Grimshire",category:"strategy",price:"Free",shortDescription:"A deadly plague threatens the village of Grimshire. Manage farmland, forage wilds, stop harvest rot and keep the cellar full. Can you help the community survive?",rating:4.6,likesCount:15700,cardImage:"/assets/images/games/grimshire-card.jpg",featured:!1},{slug:"tiny-glade",name:"Tiny Glade",category:"arcade",price:"$3.99",shortDescription:"A small diorama builder where you doodle whimsical castles, cozy cottages & romantic ruins. No management, combat or goals — just lovable dioramas.",rating:4.9,likesCount:67300,cardImage:"/assets/images/games/tiny-glade-card.jpg",featured:!0},{slug:"whisper-of-the-house",name:"Whisper of the House",category:"puzzle",price:"Free",shortDescription:"A cozy organizing & decorating game. Help townspeople move, organize, and clean their spaces. Your gentle touch may change their lives and uncover hidden stories.",rating:4.8,likesCount:24900,cardImage:"/assets/images/games/whisper-of-the-house-card.jpg",featured:!1},{slug:"tukoni-forest-keepers",name:"Tukoni: Forest Keepers",category:"puzzle",price:"Free",shortDescription:"A cute cozy puzzle adventure. Play as a forest spirit exploring hand-drawn magical locations, meet charming characters, solve puzzles, collect herbs and tea recipes.",rating:4.9,likesCount:31200,cardImage:"/assets/images/games/tukoni-forest-keepers-card.jpg",featured:!1},{slug:"cat-chess",name:"Cat Chess",category:"strategy",price:"Free",shortDescription:"Play the ancient and thrilling game of Chess but with... cats! Lead your furry friends to the Purrfect battle of brains and whiskers!",rating:4.6,likesCount:17400,cardImage:"/assets/images/games/cat-chess-card.jpg",featured:!1},{slug:"cast-n-chill",name:"Cast n Chill",category:"arcade",price:"Free",shortDescription:"A relaxing fishing game where you explore serene lakes, rivers, and oceans. Catch rare fish, upgrade your gear and reel in legendary catches - all with your loyal companion.",rating:4.7,likesCount:26800,cardImage:"/assets/images/games/cast-n-chill-card.jpg",featured:!1},{slug:"little-corners",name:"Little Corners",category:"puzzle",price:"Free",shortDescription:"Peel, place, and arrange stickers across tiny windows into different worlds. Relax and unwind to lofi beats, collect unique stickers and share cozy creations.",rating:4.8,likesCount:41500,cardImage:"/assets/images/games/little-corners-card.jpg",featured:!1},{slug:"tailside-cozy-cafe-sim",name:"Tailside: Cozy Cafe Sim",category:"strategy",price:"Free",shortDescription:"Run your own cozy café in Tailside! Brew coffee, decorate your café, follow small stories in the daily newspaper. Unlock new items, skills, villagers, and creature visitors.",rating:4.8,likesCount:35600,cardImage:"/assets/images/games/tailside-cozy-cafe-sim-card.jpg",featured:!0},{slug:"islanders-new-shores",name:"ISLANDERS: New Shores",category:"strategy",price:"Free",shortDescription:"Build your island retreat in a calm, minimalist world with exciting new features that keep the classic charm while inspiring fresh creativity.",rating:4.9,likesCount:54200,cardImage:"/assets/images/games/islanders-new-shores-card.jpg",featured:!0},{slug:"camper-van-make-it-home",name:"Camper Van: Make it Home",category:"puzzle",price:"Free",shortDescription:"Decorate and organize the camper van of your dreams! Build your own home-on-wheels using creative block organization puzzles and relaxing interior design.",rating:4.7,likesCount:29300,cardImage:"/assets/images/games/camper-van-make-it-home-card.jpg",featured:!1},{slug:"organized-inside",name:"Organized Inside",category:"puzzle",price:"Free",shortDescription:"A slow-paced life sim and tidying up game about a cat, passion, transformation and growth. Categorize household items while uncovering the meaning of life through organization.",rating:4.8,likesCount:22700,cardImage:"/assets/images/games/organized-inside-card.jpg",featured:!1},{slug:"cozy-solitaire",name:"Cozy Solitaire",category:"card",price:"Free",shortDescription:"Classic Solitaire game, accompanied by music and kitties.",rating:4.5,likesCount:38900,cardImage:"/assets/images/games/cozy-solitaire-card.jpg",featured:!1},{slug:"cozy-sudoku",name:"Cozy Sudoku",category:"puzzle",price:"Free",shortDescription:"Sudoku, tunes, and some furry friends.",rating:4.6,likesCount:21500,cardImage:"/assets/images/games/cozy-sudoku-card.jpg",featured:!1},{slug:"koroneko",name:"KoroNeko",category:"puzzle",price:"Free",shortDescription:"Roll your way through a cozy, kawaii world full of charming characters and challenging puzzles to save your siblings from Strawberry the Witch!",rating:4.9,likesCount:47300,cardImage:"/assets/images/games/koroneko-card.jpg",featured:!1},{slug:"wytchwood",name:"Wytchwood",category:"strategy",price:"$4.99",shortDescription:"A crafting adventure game set in a land of gothic fables. As the old witch, explore, collect ingredients, brew spells, and pass judgement upon a capricious cast of characters.",rating:4.7,likesCount:33100,cardImage:"/assets/images/games/wytchwood-card.jpg",featured:!1},{slug:"the-wild-at-heart",name:"The Wild at Heart",category:"strategy",price:"Free",shortDescription:"Wield a herd of quirky creatures to rebuild paths, battle beasts, and solve puzzles in a rich, interconnected nostalgic storybook fantasy world.",rating:4.8,likesCount:30400,cardImage:"/assets/images/games/the-wild-at-heart-card.jpg",featured:!1}],We={data:Ze},Ke=[{slug:"all",label:"All Games",isDefault:!0},{slug:"puzzle",label:"Puzzle",isDefault:!1},{slug:"card",label:"Card",isDefault:!1},{slug:"match",label:"Match",isDefault:!1},{slug:"farm",label:"Farm",isDefault:!1},{slug:"strategy",label:"Strategy",isDefault:!1},{slug:"arcade",label:"Arcade",isDefault:!1}],Xe={data:Ke},A=Object.assign({"../../assets/images/games/camper-van-make-it-home-card.jpg":ve,"../../assets/images/games/cast-n-chill-card.jpg":ye,"../../assets/images/games/cat-chess-card.jpg":Ce,"../../assets/images/games/cat-mail-co-card.jpg":Q,"../../assets/images/games/cozy-solitaire-card.jpg":Le,"../../assets/images/games/cozy-sudoku-card.jpg":Ee,"../../assets/images/games/grimshire-card.jpg":Me,"../../assets/images/games/heartopia-card.jpg":J,"../../assets/images/games/islanders-new-shores-card.jpg":ee,"../../assets/images/games/koroneko-card.jpg":je,"../../assets/images/games/leaf-it-alone-card.jpg":Te,"../../assets/images/games/leafy-corner-card.jpg":Ie,"../../assets/images/games/little-corners-card.jpg":Fe,"../../assets/images/games/organized-inside-card.jpg":Be,"../../assets/images/games/palia-card.jpg":te,"../../assets/images/games/shelve-the-potions-card.jpg":ae,"../../assets/images/games/tailside-cozy-cafe-sim-card.jpg":se,"../../assets/images/games/the-wild-at-heart-card.jpg":Re,"../../assets/images/games/tiny-glade-card.jpg":ie,"../../assets/images/games/tukoni-forest-keepers-card.jpg":He,"../../assets/images/games/vacation-cafe-simulator-card.jpg":re,"../../assets/images/games/whisper-of-the-house-card.jpg":Ge,"../../assets/images/games/winter-burrow-card.jpg":oe,"../../assets/images/games/wytchwood-card.jpg":Ve});class Ye{constructor(e={}){o(this,"element");o(this,"games");o(this,"activeCategory","all");o(this,"activeSort","Rating ↓");o(this,"currentPage",1);o(this,"itemsPerPage",6);o(this,"totalPages",4);o(this,"isSortOpen",!1);o(this,"callbacks");this.callbacks=e,this.games=We.data,this.element=this.createPageElement(),this.renderCards(),this.setupInteractivity()}getElement(){return this.element}getGameImageUrl(e){const s=`../../assets/images/games/${e}-card.jpg`;return A[s]?A[s].default:""}formatLikes(e){return e>=1e3?`${(e/1e3).toFixed(1)}K`:e.toString()}createPageElement(){const e=document.createElement("div");e.className="library-page";const s=Xe.data,t=["Rating ↑","Rating ↓","Name A→Z","Name Z→A"];return e.innerHTML=`
      <!-- Library Header: Title & Subtitle -->
      <header class="library-header">
        <h1 class="library-header__title">Game Library</h1>
        <p class="library-header__subtitle">Browse our collection of casual mini-games</p>
      </header>

      <!-- Filtering & Sorting Bar -->
      <section class="library-filter-section" aria-label="Game filters and sorting">
        <div class="library-filter-section__controls-row">
          <div class="library-filter-section__chips-wrapper" tabindex="0" role="region" aria-label="Categories">
            <div class="library-filter-section__chips-row" role="tablist">
              ${s.map(a=>`
                <button
                  type="button"
                  class="library-filter-section__chip ${a.slug===this.activeCategory?"library-filter-section__chip--active":""}"
                  data-category="${a.slug}"
                  role="tab"
                  aria-selected="${a.slug===this.activeCategory}"
                >
                  ${a.label}
                </button>
              `).join("")}
            </div>
          </div>

          <div class="library-filter-section__sort-container">
            <button type="button" class="library-filter-section__sort-btn" aria-haspopup="listbox" aria-expanded="false">
              <span>Sort by: <strong class="sort-current-label">${this.activeSort}</strong></span>
              <svg class="sort-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <ul class="library-filter-section__sort-dropdown" role="listbox">
              ${t.map(a=>`
                <li class="library-filter-section__sort-item ${a===this.activeSort?"library-filter-section__sort-item--active":""}" role="option" data-sort="${a}">
                  <span class="library-filter-section__sort-check">${a===this.activeSort?"✔":""}</span>
                  <span class="library-filter-section__sort-text">${a}</span>
                </li>
              `).join("")}
            </ul>
          </div>
        </div>
      </section>

      <!-- Game Cards Grid Section -->
      <section class="library-grid-section" aria-label="Games list">
        <div class="library-grid-section__grid"></div>
      </section>

      <!-- Pagination Section -->
      <nav class="library-pagination" aria-label="Library pagination">
        <button
          type="button"
          class="library-pagination__arrow-btn library-pagination__arrow-btn--prev"
          aria-label="Previous page"
          disabled
        >
          <img src="${k}" alt="Previous" />
        </button>

        <ul class="library-pagination__pages-list">
          <li>
            <button type="button" class="library-pagination__page-btn library-pagination__page-btn--active" data-page="1">1</button>
          </li>
          <li>
            <button type="button" class="library-pagination__page-btn" data-page="2">2</button>
          </li>
          <li>
            <button type="button" class="library-pagination__page-btn" data-page="3">3</button>
          </li>
          <li>
            <button type="button" class="library-pagination__page-btn library-pagination__page-btn--desktop-only" data-page="4">4</button>
          </li>
        </ul>

        <button
          type="button"
          class="library-pagination__arrow-btn library-pagination__arrow-btn--next"
          aria-label="Next page"
        >
          <img src="${k}" alt="Next" />
        </button>
      </nav>
    `,e}getFilteredAndSortedGames(){let e=[...this.games];switch(this.activeCategory!=="all"&&(e=e.filter(s=>s.category.toLowerCase()===this.activeCategory.toLowerCase())),this.activeSort){case"Rating ↑":{e.sort((s,t)=>s.rating-t.rating);break}case"Rating ↓":{e.sort((s,t)=>t.rating-s.rating);break}case"Name A→Z":{e.sort((s,t)=>s.name.localeCompare(t.name));break}case"Name Z→A":{e.sort((s,t)=>t.name.localeCompare(s.name));break}}return e}renderCards(){const e=this.element.querySelector(".library-grid-section__grid");if(!e)return;const s=this.getFilteredAndSortedGames();this.totalPages=Math.max(1,Math.ceil(s.length/this.itemsPerPage));const t=(this.currentPage-1)*this.itemsPerPage,a=s.slice(t,t+this.itemsPerPage);e.innerHTML=a.map(r=>{const n=this.getGameImageUrl(r.slug),d=this.formatLikes(r.likesCount);return`
        <article class="library-card" data-slug="${r.slug}">
          <div class="library-card__thumb-wrap">
            <img src="${n}" alt="${r.name}" class="library-card__image" loading="lazy" />
          </div>
          <div class="library-card__body">
            <div class="library-card__top-row">
              <div class="library-card__title-group">
                <h2 class="library-card__title">${r.name}</h2>
                <span class="library-card__category">${r.category}</span>
              </div>
              <span class="library-card__price ${r.price==="Free"?"":"library-card__price--paid"}">${r.price}</span>
            </div>

            <p class="library-card__description">${r.shortDescription}</p>

            <div class="library-card__bottom-row">
              <div class="library-card__stats">
                <span class="library-card__rating">
                  <img src="${w}" alt="Star" />
                  ${r.rating}
                </span>
                <span class="library-card__likes">
                  <img src="${L}" alt="Likes" />
                  ${d}
                </span>
              </div>
              <button type="button" class="library-card__details-btn" data-slug="${r.slug}">Details</button>
            </div>
          </div>
        </article>
      `}).join("");const i=e.querySelectorAll(".library-card__details-btn");for(const r of i)r.addEventListener("click",()=>{var c,u;const n=r.dataset.slug,d=this.games.find(l=>l.slug===n);d&&((u=(c=this.callbacks).onGameDetailsClick)==null||u.call(c,d))})}setupInteractivity(){const e=this.element.querySelector(".library-pagination__arrow-btn--prev"),s=this.element.querySelector(".library-pagination__arrow-btn--next"),t=this.element.querySelectorAll(".library-pagination__page-btn"),a=l=>{this.currentPage=Math.min(l,this.totalPages),e&&(e.disabled=this.currentPage<=1),s&&(s.disabled=this.currentPage>=this.totalPages);for(const h of t){const _=Number(h.dataset.page);h.classList.toggle("library-pagination__page-btn--active",_===this.currentPage),h.style.display=_>this.totalPages?"none":""}this.renderCards()},i=this.element.querySelectorAll(".library-filter-section__chip");for(const l of i)l.addEventListener("click",()=>{const h=l.dataset.category;if(h){this.activeCategory=h;for(const _ of i){const v=_.dataset.category===h;_.classList.toggle("library-filter-section__chip--active",v),_.setAttribute("aria-selected",v.toString())}a(1)}});const r=this.element.querySelector(".library-filter-section__chips-wrapper");if(r){let l=!1,h=0,_=0;r.addEventListener("mousedown",v=>{l=!0,h=v.pageX-r.offsetLeft,_=r.scrollLeft}),r.addEventListener("mouseleave",()=>{l=!1}),r.addEventListener("mouseup",()=>{l=!1}),r.addEventListener("mousemove",v=>{if(!l)return;v.preventDefault();const y=(v.pageX-r.offsetLeft-h)*1.5;r.scrollLeft=_-y})}const n=this.element.querySelector(".library-filter-section__sort-btn"),d=this.element.querySelector(".library-filter-section__sort-dropdown"),c=this.element.querySelectorAll(".library-filter-section__sort-item"),u=this.element.querySelector(".sort-current-label");if(n&&d){n.addEventListener("click",l=>{l.stopPropagation(),this.isSortOpen=!this.isSortOpen,n.classList.toggle("library-filter-section__sort-btn--open",this.isSortOpen),d.classList.toggle("library-filter-section__sort-dropdown--open",this.isSortOpen),n.setAttribute("aria-expanded",this.isSortOpen.toString())});for(const l of c)l.addEventListener("click",()=>{const h=l.dataset.sort;if(h){this.activeSort=h,u&&(u.textContent=h);for(const _ of c){const v=_.dataset.sort===h;_.classList.toggle("library-filter-section__sort-item--active",v);const b=_.querySelector(".library-filter-section__sort-check");b&&(b.textContent=v?"✔":"")}this.isSortOpen=!1,n.classList.remove("library-filter-section__sort-btn--open"),d.classList.remove("library-filter-section__sort-dropdown--open"),n.setAttribute("aria-expanded","false"),a(1)}});document.addEventListener("click",l=>{this.element.contains(l.target)||(this.isSortOpen=!1,n.classList.remove("library-filter-section__sort-btn--open"),d.classList.remove("library-filter-section__sort-dropdown--open"),n.setAttribute("aria-expanded","false"))})}for(const l of t)l.addEventListener("click",()=>{const h=Number(l.dataset.page);h&&a(h)});e&&e.addEventListener("click",()=>{this.currentPage>1&&a(this.currentPage-1)}),s&&s.addEventListener("click",()=>{this.currentPage<this.totalPages&&a(this.currentPage+1)})}}class Qe{constructor(e){o(this,"routes",[]);o(this,"rootElement");o(this,"currentPath","");this.rootElement=e,window.addEventListener("popstate",()=>{this.handleRoute()}),window.addEventListener("hashchange",()=>{this.handleRoute()})}addRoute(e){this.routes.push(e)}navigate(e){window.location.hash=e.startsWith("#")?e:`#${e}`}getCurrentRoute(){return window.location.hash.replace(/^#\/?/,"")==="library"||window.location.pathname.replaceAll(/^\/|\/$/g,"").endsWith("library")?"library":"home"}handleRoute(){const s=this.getCurrentRoute()==="library"?"/library":"/";if(this.currentPath===s&&this.rootElement.children.length>0)return;this.currentPath=s;const t=this.routes.find(a=>a.path===s);if(this.rootElement.innerHTML="",t)this.rootElement.append(t.render());else{const a=this.routes.find(i=>i.path==="/");a&&this.rootElement.append(a.render())}}}function Je(){var d;const g=document.querySelector("#app");if(!g)return;const e=new Qe(g),s=new N,t=new G,a=new Y({activePage:"home",onLoginClick:()=>{s.open("login")},onSignUpClick:()=>{s.open("register")},onNavigate:c=>{e.navigate(c==="library"?"/library":"/")}}),i=new X,n=i.getElement().querySelectorAll(".site-footer__link");for(const c of n){const u=(d=c.textContent)==null?void 0:d.trim().toLowerCase();u==="home"?c.addEventListener("click",l=>{l.preventDefault(),a.setActivePage("home"),e.navigate("/")}):u==="library"&&c.addEventListener("click",l=>{l.preventDefault(),a.setActivePage("library"),e.navigate("/library")})}e.addRoute({path:"/",render:()=>{a.setActivePage("home");const c=document.createElement("div");c.className="app-container app-container--home",c.append(a.getElement());const u=document.createElement("main");u.className="main-content";const l=new me,h=new ne({onGameClick:()=>{t.open()}}),_=new _e,v=new de;return u.append(l.getElement(),h.getElement(),_.getElement(),v.getElement()),c.append(u,i.getElement()),c}}),e.addRoute({path:"/library",render:()=>{a.setActivePage("library");const c=document.createElement("div");c.className="app-container app-container--library",c.append(a.getElement());const u=document.createElement("main");u.className="main-content";const l=new Ye({onGameDetailsClick:()=>{t.open()}});return u.append(l.getElement()),c.append(u,i.getElement()),c}}),e.handleRoute()}document.addEventListener("DOMContentLoaded",()=>{Je()});
