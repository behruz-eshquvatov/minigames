var b=Object.defineProperty;var f=(i,e,a)=>e in i?b(i,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):i[e]=a;var l=(i,e,a)=>f(i,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function a(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(s){if(s.ep)return;s.ep=!0;const o=a(s);fetch(s.href,o)}})();class C{constructor(){l(this,"element");l(this,"backdrop");l(this,"dialogCard");l(this,"currentMode","login");l(this,"isOpen",!1);l(this,"handleKeyDown",e=>{e.key==="Escape"&&this.close()});this.backdrop=document.createElement("div"),this.backdrop.className="auth-backdrop",this.dialogCard=document.createElement("div"),this.dialogCard.className="auth-dialog",this.backdrop.append(this.dialogCard),this.element=this.backdrop,this.renderContent(),this.attachEvents()}getElement(){return this.element}open(e="login"){this.currentMode=e,this.renderContent(),document.body.append(this.element),this.isOpen=!0,requestAnimationFrame(()=>{this.backdrop.classList.add("auth-backdrop--active"),this.dialogCard.classList.add("auth-dialog--active")}),document.addEventListener("keydown",this.handleKeyDown)}close(){this.isOpen&&(this.backdrop.classList.remove("auth-backdrop--active"),this.dialogCard.classList.remove("auth-dialog--active"),setTimeout(()=>{this.element.parentNode&&this.element.remove(),this.isOpen=!1},250),document.removeEventListener("keydown",this.handleKeyDown))}attachEvents(){this.backdrop.addEventListener("click",e=>{e.target===this.backdrop&&this.close()})}switchMode(e){if(this.currentMode===e)return;this.currentMode=e;const a=this.dialogCard.querySelector(".auth-dialog__form-container");a?(a.classList.add("auth-dialog__form-container--transitioning"),setTimeout(()=>{this.renderContent();const t=this.dialogCard.querySelector(".auth-dialog__form-container");t&&t.classList.remove("auth-dialog__form-container--transitioning")},150)):this.renderContent()}renderContent(){const e=this.currentMode==="login";this.dialogCard.innerHTML=`
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
    `;const a=this.dialogCard.querySelectorAll(".auth-dialog__switcher-btn");for(const n of a)n.addEventListener("click",()=>{const r=n.dataset.mode;this.switchMode(r)});const t=this.dialogCard.querySelectorAll(".auth-switch-link");for(const n of t)n.addEventListener("click",r=>{r.preventDefault();const h=n.dataset.mode;this.switchMode(h)});const s=this.dialogCard.querySelectorAll(".auth-field__toggle-pwd");for(const n of s)n.addEventListener("click",()=>{var h;const r=(h=n.parentElement)==null?void 0:h.querySelector("input");if(r){const u=r.type==="password";r.type=u?"text":"password",n.innerHTML=u?this.getEyeOffIconSvg():this.getEyeIconSvg()}});const o=this.dialogCard.querySelector("form");o&&o.addEventListener("submit",n=>{n.preventDefault()})}renderLoginForm(){return`
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
    `}getMailIconSvg(){return'<svg class="auth-field__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#242145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>'}getLockIconSvg(){return'<svg class="auth-field__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#242145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>'}getUserIconSvg(){return'<svg class="auth-field__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#242145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'}getEyeIconSvg(){return'<svg class="auth-field__eye-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#242145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>'}getEyeOffIconSvg(){return'<svg class="auth-field__eye-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#242145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>'}getGoogleIconSvg(){return'<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>'}}const g="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAABXVJREFUeAG9V1tsVFUUXefO3Om8mT4ElUqHVwOiKeWlKUkzkQCCQtSQ4IeRH9GYaDRR/FETI5KYgAb9IEb9gBA/9Ec+tEiN0kBEFIM0UBC0ZcAWHGhh2pkO87pz3Pt07nSmvdMOBNjJfZ5z9l577ce9RyAvwWAoYIf9NboNQYgQ7oRIeUJC7uwO/7THfCX4NC8YChpCPygJB+6CSIlwThih8+d/vqAAzJ258jwbn3ZvXXr7ji3Ggocb7T6fR8dtFDJktLUdSm3buku/ErmmMwgDmWbRGFyxKSe03VOn1Wb2H/hCd3tcsNlsuM0iczmyommIDcWxdvWLmUikXycq3tNy0F7nGe+8+3LG5/eycYnbL8o4A/F43dj+8VvZ/PuQRtws5Ls1a1urCKWaXLHWm5lcBOTBBXPsI08ipJkj5LaNBif1XkpZMD4WiDk2mfj93kJ+2ceMTeqQJgSYqa6/LuPoH2H1/OiSIObPu0/dVwBBFtux4xYkFk/h891H8M23x4lFYOMzi/D+2+vg9zlHmJh4eYmTFQEQ454Fei9Fkc4a4Bj29kVLrJrzc/RSTEJqRQCyRg4GHWxEd9igUZUubW7Aue6rxIDEkkUNVD0cGolMxqBMgyplDslkQZ0QgLk2Hk9i3/ed+LOzD06nrowNXBvGFKKcJ/VcHMC2j9oJpIFUMoPmpno89WQTpvjdar28VQCmaJrAseMXsffrY/B6qqDbNXi9Tvi8VQrmL7/2qLzIUkgSw3QlIE+va6pE9cQAzHR1kdd1NT7UVntQTYfdRhwT9SNVJ+FxO9TBoRocTKCu1gdnlQMVOWdpWMqSJqPr9J20CxgUY2aDYyyK4sv3gt5zkzEMSSHS4HCM+jZRj7BkgJMnk8kicjVGTRxEtwNkWxlXtEhL1OAuwLjYWJSYGIqlwGRNvcdPTtgsl40DYHrdeaoPn37WgX97o1jcPEMpVHWeL3QpSueb2v0+Fy72DWLbjgOUNxfQUF+NV14KYSlVilWPKJsDp05fRvvBs0ins+i9PEgZ74Lb5VClVuJ4EQhmzkVzTpzsxRAB7qdKOft3BKHWRgXASrRyADjbPS5dxbS22o1AwIX8x4q8l4py82DKTVgMMOB3ojrgVr2DkzPA5VpGyjKwbHEDXni+Bf/09KN1+WycIU/2fddJ+eCCnZItmUqrXsBSU+OB2+lQ5cc947HWuZjfOA2Hj3Rjzqw6LF3cUDkA05MZD9TgjVdXKH7pM4kPd/6I4RtpYsap6p3LsbVlLtj3k12XyHBKzU0kUvBTf3hu4zI8u2GJCotd18o2I0sGVBnSQrOU+Jlr3E49OJFIq1zYsH4hNm9qUZR/ufcIdn/1mxrjFpw1Rsq1yjaqPpfXOVYsc0DkP6sm6mQqgyQpN8jz/oGYGml5ZJYCyK15+bLZion+gTixk0OSmEqnjSKHYGm8LIACkPw1Tu312vU4XZOqKgZjN9B1uq8w79SZPgxGbyBFQIcpBNejw2rNOEUWUtG3wKHrWP9EEx6aNx0adURuxfXTA+RtlipCoP7+arxJ+cKdMkehmk2Jx42nEhFzZq5UTJ/raedLyd9KQRSFY14VlZ5q22MmSGmxqKANonHWKvVQCAH9LmetjJfTo/q/EJbGzXGr9s+/5zTb/CsmAFJ28E3XyXPZfKORpYpG23/pkZ9WdtwSuOSy3N92OD3yhBPMQAffb9myQ0vEE0qlFZDxIgrXSn/P2ft4LIEPtu6yjxgQO7Ussp/Q4nDkv37HmtWb0z+0HUpQ4zEq1DnqmgW0YhkaGs7+frQzSTYyVyIDDt6adYfb9+Q3p4/T5tS4y5tTnTanbRdKwDYGV9E+UfJWbSHujHRwzjHr4XBHlF/8D6o0T/Wbj0z8AAAAAElFTkSuQmCC",w="data:image/svg+xml,%3csvg%20width='14'%20height='16'%20viewBox='0%200%2014%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M11.5%2016C10.8056%2016%2010.2153%2015.7569%209.72917%2015.2708C9.24306%2014.7847%209%2014.1944%209%2013.5C9%2013.375%209.02778%2013.1736%209.08333%2012.8958L4.14583%209.875C3.92361%2010.0694%203.67361%2010.2222%203.39583%2010.3333C3.11806%2010.4444%202.81944%2010.5%202.5%2010.5C1.80556%2010.5%201.21528%2010.2569%200.729167%209.77083C0.243056%209.28472%201.78814e-07%208.69444%201.78814e-07%208C1.78814e-07%207.30556%200.243056%206.71528%200.729167%206.22917C1.21528%205.74305%201.80556%205.5%202.5%205.5C2.81944%205.5%203.11806%205.55555%203.39583%205.66667C3.67361%205.77778%203.92361%205.93055%204.14583%206.125L9.08333%203.10417C9.05556%203.00694%209.03472%202.90972%209.02083%202.8125C9.00694%202.71528%209%202.61111%209%202.5C9%201.80556%209.24306%201.21528%209.72917%200.729166C10.2153%200.243055%2010.8056%20-7.15256e-07%2011.5%20-7.15256e-07C12.1944%20-7.15256e-07%2012.7847%200.243055%2013.2708%200.729166C13.7569%201.21528%2014%201.80556%2014%202.5C14%203.19444%2013.7569%203.78472%2013.2708%204.27083C12.7847%204.75694%2012.1944%205%2011.5%205C11.1806%205%2010.8819%204.94444%2010.6042%204.83333C10.3264%204.72222%2010.0764%204.56944%209.85417%204.375L4.91667%207.39583C4.94444%207.49306%204.96528%207.59028%204.97917%207.6875C4.99306%207.78472%205%207.88889%205%208C5%208.11111%204.99306%208.21528%204.97917%208.3125C4.96528%208.40972%204.94444%208.50694%204.91667%208.60417L9.85417%2011.625C10.0764%2011.4306%2010.3264%2011.2778%2010.6042%2011.1667C10.8819%2011.0556%2011.1806%2011%2011.5%2011C12.1944%2011%2012.7847%2011.2431%2013.2708%2011.7292C13.7569%2012.2153%2014%2012.8056%2014%2013.5C14%2014.1944%2013.7569%2014.7847%2013.2708%2015.2708C12.7847%2015.7569%2012.1944%2016%2011.5%2016ZM11.5%2014.5C11.7778%2014.5%2012.0139%2014.4028%2012.2083%2014.2083C12.4028%2014.0139%2012.5%2013.7778%2012.5%2013.5C12.5%2013.2222%2012.4028%2012.9861%2012.2083%2012.7917C12.0139%2012.5972%2011.7778%2012.5%2011.5%2012.5C11.2222%2012.5%2010.9861%2012.5972%2010.7917%2012.7917C10.5972%2012.9861%2010.5%2013.2222%2010.5%2013.5C10.5%2013.7778%2010.5972%2014.0139%2010.7917%2014.2083C10.9861%2014.4028%2011.2222%2014.5%2011.5%2014.5ZM2.5%209C2.77778%209%203.01389%208.90278%203.20833%208.70833C3.40278%208.51389%203.5%208.27778%203.5%208C3.5%207.72222%203.40278%207.48611%203.20833%207.29167C3.01389%207.09722%202.77778%207%202.5%207C2.22222%207%201.98611%207.09722%201.79167%207.29167C1.59722%207.48611%201.5%207.72222%201.5%208C1.5%208.27778%201.59722%208.51389%201.79167%208.70833C1.98611%208.90278%202.22222%209%202.5%209ZM11.5%203.5C11.7778%203.5%2012.0139%203.40278%2012.2083%203.20833C12.4028%203.01389%2012.5%202.77778%2012.5%202.5C12.5%202.22222%2012.4028%201.98611%2012.2083%201.79167C12.0139%201.59722%2011.7778%201.5%2011.5%201.5C11.2222%201.5%2010.9861%201.59722%2010.7917%201.79167C10.5972%201.98611%2010.5%202.22222%2010.5%202.5C10.5%202.77778%2010.5972%203.01389%2010.7917%203.20833C10.9861%203.40278%2011.2222%203.5%2011.5%203.5Z'%20fill='white'/%3e%3c/svg%3e",k="data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M3%2010H10V8.5H3V10ZM3%207.25H13V5.75H3V7.25ZM3%204.5H13V3H3V4.5ZM1.78814e-07%2016V1.5C1.78814e-07%201.08333%200.145833%200.729166%200.4375%200.437499C0.729167%200.145832%201.08333%20-7.15256e-07%201.5%20-7.15256e-07H14.5C14.9167%20-7.15256e-07%2015.2708%200.145832%2015.5625%200.437499C15.8542%200.729166%2016%201.08333%2016%201.5V11.5C16%2011.9167%2015.8542%2012.2708%2015.5625%2012.5625C15.2708%2012.8542%2014.9167%2013%2014.5%2013H3L1.78814e-07%2016ZM2.375%2011.5H14.5V1.5H1.5V12.375L2.375%2011.5ZM1.5%2011.5V1.5V11.5Z'%20fill='white'/%3e%3c/svg%3e",y="data:image/svg+xml,%3csvg%20width='14'%20height='14'%20viewBox='0%200%2014%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M1.5%2014C1.08333%2014%200.729167%2013.8542%200.4375%2013.5625C0.145834%2013.2708%201.19209e-07%2012.9167%201.19209e-07%2012.5C1.19209e-07%2012.0833%200.145834%2011.7292%200.4375%2011.4375C0.729167%2011.1458%201.08333%2011%201.5%2011C1.91667%2011%202.27083%2011.1458%202.5625%2011.4375C2.85417%2011.7292%203%2012.0833%203%2012.5C3%2012.9167%202.85417%2013.2708%202.5625%2013.5625C2.27083%2013.8542%201.91667%2014%201.5%2014ZM12%2014C12%2012.3333%2011.6806%2010.7778%2011.0417%209.33333C10.4167%207.875%209.5625%206.60417%208.47917%205.52083C7.39583%204.4375%206.125%203.58333%204.66667%202.95833C3.22222%202.31944%201.66667%202%201.19209e-07%202V-4.76837e-07C1.94444%20-4.76837e-07%203.75694%200.368055%205.4375%201.10417C7.13195%201.82639%208.61806%202.82639%209.89583%204.10417C11.1736%205.38194%2012.1736%206.86805%2012.8958%208.5625C13.6319%2010.2431%2014%2012.0556%2014%2014H12ZM7%2014C7%2013.0278%206.81944%2012.1181%206.45833%2011.2708C6.09722%2010.4236%205.59722%209.68056%204.95833%209.04167C4.31944%208.40278%203.57639%207.90278%202.72917%207.54167C1.88194%207.18056%200.972222%207%201.19209e-07%207V5C1.26389%205%202.4375%205.23611%203.52083%205.70833C4.60417%206.16667%205.55556%206.80556%206.375%207.625C7.19444%208.44444%207.83333%209.39583%208.29167%2010.4792C8.76389%2011.5625%209%2012.7361%209%2014H7Z'%20fill='white'/%3e%3c/svg%3e",L="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='24'%20height='24'%20rx='12'%20fill='%23242145'/%3e%3cpath%20d='M6.1321%2016V8.72727H9.00142C9.55066%208.72727%2010.0194%208.82552%2010.4077%209.02202C10.7983%209.21615%2011.0954%209.49195%2011.299%209.84943C11.505%2010.2045%2011.608%2010.6224%2011.608%2011.103C11.608%2011.5859%2011.5038%2012.0014%2011.2955%2012.3494C11.0871%2012.6951%2010.7853%2012.9602%2010.3899%2013.1449C9.99692%2013.3295%209.52107%2013.4219%208.96236%2013.4219H7.04119V12.1861H8.71378C9.00734%2012.1861%209.25118%2012.1458%209.44531%2012.0653C9.63944%2011.9848%209.78385%2011.8641%209.87855%2011.7031C9.97562%2011.5421%2010.0241%2011.3421%2010.0241%2011.103C10.0241%2010.8615%209.97562%2010.6579%209.87855%2010.4922C9.78385%2010.3265%209.63826%2010.201%209.44176%2010.1158C9.24763%2010.0282%209.0026%209.98438%208.70668%209.98438H7.66974V16H6.1321ZM10.0597%2012.6903L11.8672%2016H10.1697L8.40128%2012.6903H10.0597ZM16.1399%2010.8189C16.1115%2010.5324%2015.9896%2010.3099%2015.7741%2010.1513C15.5587%209.99266%2015.2663%209.91335%2014.897%209.91335C14.6461%209.91335%2014.4342%209.94886%2014.2614%2010.0199C14.0885%2010.0885%2013.956%2010.1844%2013.8636%2010.3075C13.7737%2010.4306%2013.7287%2010.5703%2013.7287%2010.7266C13.724%2010.8568%2013.7512%2010.9704%2013.8104%2011.0675C13.8719%2011.1645%2013.956%2011.2486%2014.0625%2011.3196C14.169%2011.3883%2014.2921%2011.4486%2014.4318%2011.5007C14.5715%2011.5504%2014.7206%2011.593%2014.8793%2011.6286L15.5327%2011.7848C15.8499%2011.8558%2016.1411%2011.9505%2016.4062%2012.0689C16.6714%2012.1873%2016.901%2012.3329%2017.0952%2012.5057C17.2893%2012.6785%2017.4396%2012.8821%2017.5462%2013.1165C17.6551%2013.3509%2017.7107%2013.6196%2017.7131%2013.9226C17.7107%2014.3677%2017.5971%2014.7536%2017.3722%2015.0803C17.1496%2015.4046%2016.8277%2015.6567%2016.4062%2015.8366C15.9872%2016.0142%2015.4818%2016.103%2014.8899%2016.103C14.3028%2016.103%2013.7914%2016.013%2013.3558%2015.8331C12.9226%2015.6532%2012.584%2015.3868%2012.3402%2015.0341C12.0987%2014.679%2011.9721%2014.2398%2011.9602%2013.7166H13.4482C13.4647%2013.9605%2013.5346%2014.1641%2013.6577%2014.3274C13.7831%2014.4884%2013.95%2014.6103%2014.1584%2014.6932C14.3691%2014.7737%2014.607%2014.8139%2014.8722%2014.8139C15.1326%2014.8139%2015.3587%2014.776%2015.5504%2014.7003C15.7446%2014.6245%2015.8949%2014.5192%2016.0014%2014.3842C16.108%2014.2493%2016.1612%2014.0942%2016.1612%2013.919C16.1612%2013.7557%2016.1127%2013.6184%2016.0156%2013.5071C15.9209%2013.3958%2015.7813%2013.3011%2015.5966%2013.223C15.4143%2013.1449%2015.1906%2013.0739%2014.9254%2013.0099L14.1335%2012.8111C13.5204%2012.6619%2013.0362%2012.4287%2012.6811%2012.1115C12.326%2011.7943%2012.1496%2011.367%2012.152%2010.8295C12.1496%2010.3892%2012.2668%2010.0045%2012.5036%209.67543C12.7427%209.34635%2013.0705%209.08949%2013.4872%208.90483C13.9039%208.72017%2014.3774%208.62784%2014.9077%208.62784C15.4474%208.62784%2015.9186%208.72017%2016.321%208.90483C16.7259%209.08949%2017.0407%209.34635%2017.2656%209.67543C17.4905%2010.0045%2017.6065%2010.3857%2017.6136%2010.8189H16.1399Z'%20fill='%23FFD02B'/%3e%3c/svg%3e",M="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='24'%20height='24'%20rx='12'%20fill='white'/%3e%3cpath%20d='M9.6%2016.5L5.6%2012.5L9.6%208.5L10.45%209.35L7.3%2012.5L10.45%2015.65L9.6%2016.5ZM14.4%2016.5L13.55%2015.65L16.7%2012.5L13.55%209.35L14.4%208.5L18.4%2012.5L14.4%2016.5Z'%20fill='%23242145'/%3e%3c/svg%3e";class E{constructor(){l(this,"element");this.element=this.createFooterElement()}getElement(){return this.element}createFooterElement(){const e=document.createElement("footer");return e.className="site-footer",e.innerHTML=`
      <div class="site-footer__container">
        <div class="site-footer__main">
          <div class="site-footer__brand">
            <a href="#" class="site-footer__logo-link">
              <img src="${g}" alt="MiniGames Logo" class="site-footer__logo" />
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
                <li><a href="#" class="site-footer__link">Library</a></li>
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
                  <img src="${w}" alt="Share icon" />
                </a>
                <a href="#" class="site-footer__social-btn" aria-label="Chat">
                  <img src="${k}" alt="Chat icon" />
                </a>
                <a href="#" class="site-footer__social-btn" aria-label="RSS Feed">
                  <img src="${y}" alt="RSS icon" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="site-footer__bottom">
          <span class="site-footer__copyright">© 2026 MiniGames. All rights reserved.</span>
          
          <a href="https://rs.school/courses/short-track" target="_blank" rel="noopener noreferrer" class="site-footer__credit-link">
            <img src="${L}" alt="RS School Logo" class="site-footer__rs-logo" />
            <span>RS School</span>
          </a>

          <a href="https://github.com/behruz-eshquvatov" target="_blank" rel="noopener noreferrer" class="site-footer__credit-link">
            <img src="${M}" alt="GitHub Logo" class="site-footer__github-logo" />
            <span>@behruz-eshquvatov</span>
          </a>

          <span class="site-footer__made-with">Designed with love</span>
        </div>
      </div>
    `,e}}class S{constructor(e={}){l(this,"element");l(this,"isMenuOpen",!1);l(this,"burgerButton");l(this,"mobileMenuOverlay");l(this,"callbacks");this.callbacks=e,this.element=this.createHeaderElement(),this.setupEventListeners()}getElement(){return this.element}createHeaderElement(){const e=document.createElement("header");e.className="site-header";const a=document.createElement("div");a.className="site-header__container";const t=document.createElement("a");t.href="/",t.className="site-header__logo",t.innerHTML=`
      <div class="site-header__logo-icon">
        <img src="${g}" alt="MiniGames Logo" class="site-header__logo-img" />
      </div>
      <span class="site-header__logo-text">MiniGames</span>
    `;const s=document.createElement("nav");s.className="site-header__nav",s.innerHTML=`
      <ul class="site-header__nav-list">
        <li class="site-header__nav-item">
          <a href="/" class="site-header__nav-link site-header__nav-link--active">Home</a>
        </li>
        <li class="site-header__nav-item">
          <a href="/" class="site-header__nav-link">Library</a>
        </li>
        <li class="site-header__nav-item">
          <a href="/" class="site-header__nav-link">Tournaments</a>
        </li>
        <li class="site-header__nav-item">
          <a href="/" class="site-header__nav-link">Community</a>
        </li>
      </ul>
    `;const o=document.createElement("button");o.className="btn btn--outline site-header__login-btn",o.textContent="Log In",o.addEventListener("click",()=>{var c,d;this.closeMobileMenu(),(d=(c=this.callbacks).onLoginClick)==null||d.call(c)});const n=document.createElement("button");n.className="btn btn--primary site-header__signup-btn",n.textContent="Sign Up",n.addEventListener("click",()=>{var c,d;this.closeMobileMenu(),(d=(c=this.callbacks).onSignUpClick)==null||d.call(c)});const r=document.createElement("div");r.className="site-header__nav-wrapper",r.append(s,o),this.burgerButton=document.createElement("button"),this.burgerButton.className="site-header__burger-btn",this.burgerButton.setAttribute("aria-label","Toggle menu"),this.burgerButton.innerHTML=`
      <span class="site-header__burger-icon">
        <span class="site-header__burger-line"></span>
        <span class="site-header__burger-line"></span>
        <span class="site-header__burger-line"></span>
      </span>
    `;const h=document.createElement("div");h.className="site-header__right-controls",h.append(r,n,this.burgerButton),a.append(t,h),e.append(a),this.mobileMenuOverlay=document.createElement("div"),this.mobileMenuOverlay.className="mobile-menu",this.mobileMenuOverlay.innerHTML=`
      <div class="mobile-menu__header">
        <a href="/" class="mobile-menu__logo">
          <div class="mobile-menu__logo-icon">
            <img src="${g}" alt="MiniGames Logo" class="mobile-menu__logo-img" />
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
          <li><a href="/" class="mobile-menu__nav-link mobile-menu__nav-link--active">Home</a></li>
          <li><a href="/" class="mobile-menu__nav-link">Library</a></li>
          <li><a href="/" class="mobile-menu__nav-link">Tournaments</a></li>
          <li><a href="/" class="mobile-menu__nav-link">Community</a></li>
        </ul>
        <div class="mobile-menu__actions">
          <button class="btn btn--outline-dark mobile-menu__login-btn">Log In</button>
          <button class="btn btn--primary mobile-menu__signup-btn">Sign Up</button>
        </div>
      </div>
    `;const u=this.mobileMenuOverlay.querySelector(".mobile-menu__close-btn");u&&u.addEventListener("click",()=>{this.closeMobileMenu()});const m=this.mobileMenuOverlay.querySelector(".mobile-menu__login-btn");m&&m.addEventListener("click",()=>{var c,d;this.closeMobileMenu(),(d=(c=this.callbacks).onLoginClick)==null||d.call(c)});const p=this.mobileMenuOverlay.querySelector(".mobile-menu__signup-btn");return p&&p.addEventListener("click",()=>{var c,d;this.closeMobileMenu(),(d=(c=this.callbacks).onSignUpClick)==null||d.call(c)}),e.append(this.mobileMenuOverlay),e}setupEventListeners(){this.burgerButton.addEventListener("click",()=>{this.toggleMobileMenu()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&this.isMenuOpen&&this.closeMobileMenu()})}toggleMobileMenu(){this.isMenuOpen?this.closeMobileMenu():this.openMobileMenu()}openMobileMenu(){this.isMenuOpen=!0,this.burgerButton.classList.add("site-header__burger-btn--open"),this.mobileMenuOverlay.classList.add("mobile-menu--open"),document.body.style.overflow="hidden"}closeMobileMenu(){this.isMenuOpen=!1,this.burgerButton.classList.remove("site-header__burger-btn--open"),this.mobileMenuOverlay.classList.remove("mobile-menu--open"),document.body.style.overflow=""}}const A=""+new URL("slider-card1-Bzcyczbo.jpg",import.meta.url).href,x=""+new URL("slider-card2-DljrohUL.jpg",import.meta.url).href,H=""+new URL("slider-card3-C7B0rePC.jpg",import.meta.url).href,B=""+new URL("slider-card4-KbzzF82b.jpg",import.meta.url).href,T=""+new URL("slider-card5-DTY_N_zq.jpg",import.meta.url).href,F="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.85%2017.825L12%2015.925L15.15%2017.85L14.325%2014.25L17.1%2011.85L13.45%2011.525L12%208.125L10.55%2011.5L6.9%2011.825L9.675%2014.25L8.85%2017.825ZM5.825%2022L7.45%2014.975L2%2010.25L9.2%209.625L12%203L14.8%209.625L22%2010.25L16.55%2014.975L18.175%2022L12%2018.275L5.825%2022Z'%20fill='%23FFD02B'/%3e%3c/svg%3e",N="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12%2021L10.55%2019.7C8.86667%2018.1834%207.475%2016.875%206.375%2015.775C5.275%2014.675%204.4%2013.6917%203.75%2012.825C3.1%2011.9417%202.64167%2011.1334%202.375%2010.4C2.125%209.66669%202%208.91669%202%208.15002C2%206.58336%202.525%205.27502%203.575%204.22502C4.625%203.17502%205.93333%202.65002%207.5%202.65002C8.36667%202.65002%209.19167%202.83336%209.975%203.20002C10.7583%203.56669%2011.4333%204.08336%2012%204.75003C12.5667%204.08336%2013.2417%203.56669%2014.025%203.20002C14.8083%202.83336%2015.6333%202.65002%2016.5%202.65002C18.0667%202.65002%2019.375%203.17502%2020.425%204.22502C21.475%205.27502%2022%206.58336%2022%208.15002C22%208.91669%2021.8667%209.66669%2021.6%2010.4C21.35%2011.1334%2020.9%2011.9417%2020.25%2012.825C19.6%2013.6917%2018.725%2014.675%2017.625%2015.775C16.525%2016.875%2015.1333%2018.1834%2013.45%2019.7L12%2021ZM12%2018.3C13.6%2016.8667%2014.9167%2015.6417%2015.95%2014.625C16.9833%2013.5917%2017.8%2012.7%2018.4%2011.95C19%2011.1834%2019.4167%2010.5084%2019.65%209.92503C19.8833%209.32503%2020%208.73336%2020%208.15002C20%207.15002%2019.6667%206.31669%2019%205.65003C18.3333%204.98336%2017.5%204.65003%2016.5%204.65003C15.7167%204.65003%2014.9917%204.87503%2014.325%205.32503C13.6583%205.75836%2013.2%206.31669%2012.95%207.00003H11.05C10.8%206.31669%2010.3417%205.75836%209.675%205.32503C9.00833%204.87503%208.28333%204.65003%207.5%204.65003C6.5%204.65003%205.66667%204.98336%205%205.65003C4.33333%206.31669%204%207.15002%204%208.15002C4%208.73336%204.11667%209.32503%204.35%209.92503C4.58333%2010.5084%205%2011.1834%205.6%2011.95C6.2%2012.7%207.01667%2013.5917%208.05%2014.625C9.08333%2015.6417%2010.4%2016.8667%2012%2018.3Z'%20fill='%23FF4B4B'/%3e%3c/svg%3e",v="data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M3.825%209L9.425%2014.6L8%2016L1.19209e-07%208L8%20-9.53674e-07L9.425%201.4L3.825%207H16V9H3.825Z'%20fill='%23242145'/%3e%3c/svg%3e";class R{constructor(){l(this,"element");this.element=this.createCarouselElement()}getElement(){return this.element}createCarouselElement(){const e=document.createElement("section");e.className="carousel-section";const a=[{title:"Tailside: Cozy Cafe Sim",rating:4.8,likes:"18.4K",image:H,widthType:"narrow"},{title:"ISLANDERS: New Shores",rating:4.9,likes:"54.2K",image:x,widthType:"normal"},{title:"Vacation Cafe Simulator",rating:4.8,likes:"28.7K",image:A,widthType:"wide"},{title:"Winter Burrow",rating:4.9,likes:"32.4K",image:B,widthType:"normal"},{title:"Shelve the Potions!",rating:4.7,likes:"21.3K",image:T,widthType:"narrow"}];return e.innerHTML=`
      <div class="carousel-section__container">
        <div class="carousel-section__header">
          <h2 class="carousel-section__title">
            <span class="carousel-section__title-pill"></span>
            New Games
          </h2>
          <div class="carousel-section__controls">
            <button class="carousel-section__control-btn carousel-section__control-btn--prev" aria-label="Previous slide">
              <img src='${v}' alt ='arrow'/>
            </button>
            <button class="carousel-section__control-btn carousel-section__control-btn--next" aria-label="Next slide">
              <img src='${v}' alt ='arrow'/>
            </button>
          </div>
        </div>

        <div class="carousel-section__track-wrapper">
          <div class="carousel-section__track">
            ${a.map(t=>`
              <div class="game-card game-card--${t.widthType}">
                <img src="${t.image}" alt="${t.title}" class="game-card__image" />
                <div class="game-card__overlay">
                  <div class="game-card__info">
                    <h3 class="game-card__title">${t.title}</h3>
                    <div class="game-card__meta">
                      <span class="game-card__rating">
                        <img src="${F}" alt="Rating star" class="game-card__star-icon" width="24" height="24" />
                        ${t.rating}
                      </span>
                      <span class="game-card__likes">
                        <img src="${N}" alt="Favorite heart" class="game-card__like-icon" width="24" height="24" />
                        ${t.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `,e}}const G=""+new URL("random-image-DsQZrXDY.png",import.meta.url).href,O="data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8%202V10M4.66667%205.33333L8%202L11.3333%205.33333M14%2010V12.6667C14%2013.0203%2013.8595%2013.3594%2013.6095%2013.6095C13.3594%2013.8595%2013.0203%2014%2012.6667%2014H3.33333C2.97971%2014%202.64057%2013.8595%202.39052%2013.6095C2.14048%2013.3594%202%2013.0203%202%2012.6667V10'%20stroke='%23242145'%20stroke-width='2'%20stroke-linecap='round'/%3e%3c/svg%3e";class D{constructor(){l(this,"element");this.element=this.createGameDevElement()}getElement(){return this.element}createGameDevElement(){const e=document.createElement("section");return e.className="game-dev-section",e.innerHTML=`
      <div class="game-dev-section__container">
        <div class="game-dev-section__image-wrapper">
          <img src="${G}" alt="Game Developer Desk Setup" class="game-dev-section__image" />
        </div>

        <div class="game-dev-card">
          <h2 class="game-dev-card__title">Are You a Game Developer?</h2>
          <p class="game-dev-card__description">
            Want to see your game on MiniGames? We're always looking for fun, engaging mini games to add to our platform. Submit your game and reach thousands of players!
          </p>
          <div class="game-dev-card__actions">
            <button class="game-dev-card__btn" aria-label="Submit Form">
              <img src="${O}" alt="Upload icon" class="game-dev-card__upload-icon" width="16" height="16" />
              Submit Form
            </button>
            <span class="game-dev-card__contact">or contact us at developers@minigames.com</span>
          </div>
        </div>
      </div>
    `,e}}class I{constructor(){l(this,"element");this.element=this.createHeroElement()}getElement(){return this.element}createHeroElement(){const e=document.createElement("section");return e.className="hero-section",e.innerHTML=`
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
    `,e}}const V=[{rank:1,playerName:"Alex_Pro99",gamesPlayed:142,totalScore:94250,streakDays:12,favoriteGameSlug:"heartopia",favoriteGameName:"Heartopia"},{rank:2,playerName:"CozyGamer_x",gamesPlayed:118,totalScore:81400,streakDays:8,favoriteGameSlug:"cat-mail-co",favoriteGameName:"Cat Mail Co."},{rank:3,playerName:"MatchMaster",gamesPlayed:98,totalScore:72110,streakDays:5,favoriteGameSlug:"tiny-glade",favoriteGameName:"Tiny Glade"},{rank:4,playerName:"BubblePop",gamesPlayed:87,totalScore:65900,streakDays:3,favoriteGameSlug:"whisper-of-the-house",favoriteGameName:"Whisper of the House"},{rank:5,playerName:"SudokuGod",gamesPlayed:74,totalScore:59320,streakDays:2,favoriteGameSlug:"cat-chess",favoriteGameName:"Cat Chess"}],U={data:V},q={1:"#FFD02B",2:"#A3E2C9",3:"#BCE3FF",4:"#FFC6FF",5:"#E6DFF5"};function P(i){const e=i.split("_");return e.length>=2?(e[0][0]+e[1][0]).toUpperCase():i.slice(0,2).toUpperCase()}function _(i,e){return e?`${(i/1e3).toFixed(1)}K`:i.toLocaleString("en-US")}class Z{constructor(){l(this,"element");this.element=this.createLeaderboardElement()}getElement(){return this.element}createLeaderboardElement(){const e=document.createElement("section");e.className="leaderboard-section";const a=U.data;return e.innerHTML=`
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
              ${a.map(t=>`
                <tr class="leaderboard-row leaderboard-row--rank-${t.rank}">
                  <td class="col-rank">
                    <span class="rank-badge rank-badge--${t.rank}">#${t.rank}</span>
                  </td>
                  <td class="col-player">
                    <div class="player-info">
                      <span class="player-avatar" style="background-color: ${q[t.rank]||"#E0EEF6"}">
                        ${P(t.playerName)}
                      </span>
                      <span class="player-name">${t.playerName}</span>
                    </div>
                  </td>
                  <td class="col-games">${t.gamesPlayed}</td>
                  <td class="col-score">
                    <span class="score-desktop">${_(t.totalScore,!1)}</span>
                    <span class="score-mobile">${_(t.totalScore,!0)}</span>
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
    `,e}}class z{constructor(e){l(this,"routes",[]);l(this,"rootElement");this.rootElement=e,window.addEventListener("popstate",()=>{this.handleRoute()})}addRoute(e){this.routes.push(e)}navigate(e){window.history.pushState({},"",e),this.handleRoute()}handleRoute(){const e=window.location.pathname,a=this.routes.find(t=>t.path===e);if(this.rootElement.innerHTML="",a)this.rootElement.append(a.render());else{const t=this.routes.find(s=>s.path==="*"||s.path==="/");t&&this.rootElement.append(t.render())}}}function j(){const i=document.querySelector("#app");if(!i)return;const e=new z(i);e.addRoute({path:"/",render:()=>{const a=document.createElement("div");a.className="app-container";const t=new C,s=new S({onLoginClick:()=>{t.open("login")},onSignUpClick:()=>{t.open("register")}});a.append(s.getElement());const o=document.createElement("main");o.className="main-content";const n=new I,r=new R,h=new Z,u=new D;o.append(n.getElement(),r.getElement(),h.getElement(),u.getElement());const m=new E;return a.append(o,m.getElement()),a}}),e.handleRoute()}document.addEventListener("DOMContentLoaded",()=>{j()});
