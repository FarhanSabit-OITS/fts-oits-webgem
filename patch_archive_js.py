import re

with open("vercel/index.html", "r") as f:
    content = f.read()

# Insert javascript
old_script_start = '''<script>
      // Scroll Progress Bar'''
new_script_start = '''<script>
      // Project Archive Logic
      const mockArchiveData = [
        { title: "Legacy Telecom Gateway", date: "2024" },
        { title: "Distributed Payment Router", date: "2023" },
        { title: "Supply Chain Blockchain Network", date: "2023" },
        { title: "Real-time Flight Tracker API", date: "2022" },
        { title: "Automated Tax Calculator System", date: "2022" },
      ];
      let archiveIndex = 0;
      
      function toggleArchive() {
        const container = document.getElementById("archive-container");
        const chevron = document.getElementById("archive-chevron");
        if(container.classList.contains("hidden")) {
          container.classList.remove("hidden");
          container.classList.add("flex");
          chevron.classList.add("rotate-180");
          if (archiveIndex === 0) loadMoreArchive(); // Initial load
        } else {
          container.classList.add("hidden");
          container.classList.remove("flex");
          chevron.classList.remove("rotate-180");
        }
      }
      
      function loadMoreArchive() {
        const list = document.getElementById("archive-list");
        const btn = document.getElementById("archive-load-btn");
        
        // Loader skeleton for archive item
        const tempLoader = document.createElement("div");
        tempLoader.className = "flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 animate-pulse";
        tempLoader.innerHTML = `<div class="h-3 bg-slate-200 dark:bg-slate-700 w-1/3 rounded-full"></div><div class="h-3 bg-slate-200 dark:bg-slate-700 w-12 rounded-full"></div>`;
        list.appendChild(tempLoader);
        
        setTimeout(() => {
          tempLoader.remove();
          const itemsToLoad = 2;
          for(let i=0; i<itemsToLoad; i++) {
            if(archiveIndex >= mockArchiveData.length) break;
            const item = mockArchiveData[archiveIndex];
            const div = document.createElement("div");
            div.className = "flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 animate-fade-in";
            div.innerHTML = `<span class="text-xs font-bold text-slate-700 dark:text-slate-300">${item.title}</span><span class="text-[10px] font-mono text-slate-500">${item.date}</span>`;
            list.appendChild(div);
            archiveIndex++;
          }
          if(archiveIndex >= mockArchiveData.length) {
            btn.style.display = "none";
          }
        }, 800);
      }

      // Scroll Progress Bar'''
      
if old_script_start in content:
    content = content.replace(old_script_start, new_script_start)
else:
    print("Could not find script start anchor")

with open("vercel/index.html", "w") as f:
    f.write(content)
