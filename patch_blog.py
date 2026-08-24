import re

with open("vercel/index.html", "r") as f:
    content = f.read()

# Add Skeleton Loader to blog container
old_blog_container = '''        <!-- Render Target for Blog JSON -->
        <div
          id="blog-list-container"
          class="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <!-- Rendered by JS -->
        </div>'''
new_blog_container = '''        <!-- Render Target for Blog JSON -->
        <div
          id="blog-list-container"
          class="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <!-- CSS-only Skeleton Loader -->
          <div class="p-6 rounded-2xl bg-slate-100 dark:bg-slate-800/50 animate-pulse h-[140px] flex flex-col justify-between">
            <div class="h-3 bg-slate-200 dark:bg-slate-700 w-1/4 rounded-full"></div>
            <div class="h-5 bg-slate-200 dark:bg-slate-700 w-3/4 rounded-full mt-2"></div>
            <div class="h-5 bg-slate-200 dark:bg-slate-700 w-1/2 rounded-full mt-2"></div>
            <div class="flex justify-between mt-auto">
              <div class="h-3 bg-slate-200 dark:bg-slate-700 w-1/4 rounded-full"></div>
              <div class="h-3 bg-slate-200 dark:bg-slate-700 w-1/4 rounded-full"></div>
            </div>
          </div>
          <div class="p-6 rounded-2xl bg-slate-100 dark:bg-slate-800/50 animate-pulse h-[140px] flex flex-col justify-between hidden md:flex">
            <div class="h-3 bg-slate-200 dark:bg-slate-700 w-1/4 rounded-full"></div>
            <div class="h-5 bg-slate-200 dark:bg-slate-700 w-3/4 rounded-full mt-2"></div>
            <div class="h-5 bg-slate-200 dark:bg-slate-700 w-1/2 rounded-full mt-2"></div>
            <div class="flex justify-between mt-auto">
              <div class="h-3 bg-slate-200 dark:bg-slate-700 w-1/4 rounded-full"></div>
              <div class="h-3 bg-slate-200 dark:bg-slate-700 w-1/4 rounded-full"></div>
            </div>
          </div>
        </div>'''
content = content.replace(old_blog_container, new_blog_container)

with open("vercel/index.html", "w") as f:
    f.write(content)
