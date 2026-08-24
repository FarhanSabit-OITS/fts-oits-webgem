import re

with open("vercel/index.html", "r") as f:
    content = f.read()

old_auth = '''          if (recommendedProjects) {
            recommendedProjects.classList.remove('hidden');
            recommendedProjects.classList.add('flex');
            recommendedProjects.innerHTML = `
              <div class="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/50 w-full animate-fade-in text-left">
                 <h4 class="text-sm font-bold text-blue-800 dark:text-blue-300 mb-2">Recommended for your profile</h4>
                 <p class="text-xs text-blue-600 dark:text-blue-400 mb-4">Based on your professional background, these architectures fit your industry:</p>
                 <ul class="space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                   <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div> FinTech Scalable Ledger (Go/PostgreSQL)</li>
                   <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div> AI-Driven B2B Sales Dashboard (React/Next.js)</li>
                 </ul>
              </div>
            `;
          }'''

new_auth = '''          if (recommendedProjects) {
            recommendedProjects.classList.remove('hidden');
            recommendedProjects.classList.add('flex');
            
            // Skeleton Loader
            recommendedProjects.innerHTML = `
              <div class="p-6 rounded-2xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/50 w-full text-left animate-pulse flex flex-col gap-3">
                 <div class="h-4 bg-blue-200 dark:bg-blue-800 w-1/3 rounded-full"></div>
                 <div class="h-3 bg-blue-100 dark:bg-blue-900 w-2/3 rounded-full mb-2"></div>
                 <div class="h-3 bg-blue-100 dark:bg-blue-900 w-full rounded-full"></div>
                 <div class="h-3 bg-blue-100 dark:bg-blue-900 w-4/5 rounded-full"></div>
              </div>
            `;
            
            setTimeout(() => {
              recommendedProjects.innerHTML = `
                <div class="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/50 w-full animate-fade-in text-left">
                   <h4 class="text-sm font-bold text-blue-800 dark:text-blue-300 mb-2">Recommended for your profile</h4>
                   <p class="text-xs text-blue-600 dark:text-blue-400 mb-4">Based on your professional background, these architectures fit your industry:</p>
                   <ul class="space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                     <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div> FinTech Scalable Ledger (Go/PostgreSQL)</li>
                     <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div> AI-Driven B2B Sales Dashboard (React/Next.js)</li>
                   </ul>
                </div>
              `;
            }, 1200);
          }'''
          
content = content.replace(old_auth, new_auth)

with open("vercel/index.html", "w") as f:
    f.write(content)
