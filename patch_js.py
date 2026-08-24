import re

with open("vercel/index.html", "r") as f:
    content = f.read()

# Add Toast function and scroll progress logic at the beginning of the <script> block
script_start = '<script>'
new_js = '''<script>
      // Scroll Progress Bar
      window.addEventListener('scroll', () => {
        const scrollPx = document.documentElement.scrollTop || document.body.scrollTop;
        const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollPx / winHeightPx) * 100;
        const progressBar = document.getElementById("scroll-progress-bar");
        if(progressBar) progressBar.style.width = scrolled + "%";
      }, { passive: true });

      // Generic Toast System
      function showToast(message, type = "success") {
        const container = document.getElementById("toast-container");
        if (!container) return;
        const toast = document.createElement("div");
        toast.className = "px-4 py-3 rounded-xl shadow-xl border text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-2 transform translate-y-4 opacity-0 transition-all duration-300";
        
        if (type === "success") {
          toast.classList.add("bg-green-50", "dark:bg-green-900/90", "border-green-200", "dark:border-green-900/50", "text-green-700", "dark:text-green-400");
          toast.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg> <span>${message}</span>`;
        } else {
          toast.classList.add("bg-blue-50", "dark:bg-blue-900/90", "border-blue-200", "dark:border-blue-900/50", "text-blue-700", "dark:text-blue-400");
          toast.innerHTML = `<span>${message}</span>`;
        }
        
        container.appendChild(toast);
        
        requestAnimationFrame(() => {
          toast.classList.remove("translate-y-4", "opacity-0");
        });
        
        setTimeout(() => {
          toast.classList.add("translate-y-4", "opacity-0");
          setTimeout(() => toast.remove(), 300);
        }, 3000);
      }
'''
content = content.replace(script_start, new_js, 1)

# Replace newsletter JS
old_newsletter = '''        newsletterForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const email = newsletterEmail.value;
          localStorage.setItem("oits_newsletter_email", email);
          newsletterSuccess.classList.remove("hidden");
          newsletterSuccess.style.opacity = "0";
          setTimeout(() => {
            newsletterSuccess.style.opacity = "1";
            newsletterSuccess.style.transition = "opacity 0.3s ease";
          }, 10);
        });'''
new_newsletter = '''        newsletterForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const email = newsletterEmail.value;
          localStorage.setItem("oits_newsletter_email", email);
          newsletterEmail.value = "";
          showToast("Subscribed successfully");
        });'''
content = content.replace(old_newsletter, new_newsletter)

# Update contact form submit
old_contact = '''          if (isNameValid && isEmailValid) {
            // Success handler (e.g., submit to backend)
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "SENT SUCCESSFULLY";
            submitBtn.classList.remove("animate-pulse");
            submitBtn.classList.add("bg-green-600");
            
            // Trigger Confetti Celebratory Animation
            if (typeof triggerSuccessConfetti === "function") {
               triggerSuccessConfetti();
            }

            setTimeout(() => {
              closeModal("quote-modal");
              submitBtn.textContent = originalText;
              submitBtn.classList.remove("bg-green-600");
              contactForm.reset();
            }, 2500);
          }'''
new_contact = '''          if (isNameValid && isEmailValid) {
            submitBtn.classList.remove("animate-pulse");
            contactForm.reset();
            showToast("Request submitted successfully");
            
            if (typeof triggerSuccessConfetti === "function") {
               triggerSuccessConfetti();
            }

            setTimeout(() => {
              closeModal("quote-modal");
            }, 1000);
          }'''
content = content.replace(old_contact, new_contact)

with open("vercel/index.html", "w") as f:
    f.write(content)
