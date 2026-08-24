import re

with open("vercel/index.html", "r") as f:
    content = f.read()

# Insert after Portfolio Grid, which ends with closing div of portfolio items.
old_portfolio_end = '''        </div>
      </section>

      <!-- Interactive FAQ Component (Dynamic Accordions & Structured data) -->'''

new_portfolio_end = '''        </div>
        
        <!-- Project Archive (Secondary Collapsed JSON Source) -->
        <div class="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800/60">
          <div class="flex items-center justify-between cursor-pointer group" onclick="toggleArchive()">
            <h4 class="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Project Archive</h4>
            <svg id="archive-chevron" class="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg>
          </div>
          <div id="archive-container" class="hidden flex-col gap-4 mt-6">
            <div id="archive-list" class="flex flex-col gap-3"></div>
            <button id="archive-load-btn" onclick="loadMoreArchive()" class="self-start mt-2 px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl focus-ring">Load More Data</button>
          </div>
        </div>

      </section>

      <!-- Interactive FAQ Component (Dynamic Accordions & Structured data) -->'''

if old_portfolio_end in content:
    content = content.replace(old_portfolio_end, new_portfolio_end)
else:
    print("Could not find portfolio end anchor")

with open("vercel/index.html", "w") as f:
    f.write(content)
