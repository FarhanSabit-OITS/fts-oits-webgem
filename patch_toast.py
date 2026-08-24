import re

with open("vercel/index.html", "r") as f:
    content = f.read()

# Add scroll-progress container and toast container after body open
body_start = '<body class="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300" style="scroll-padding-top: 100px;">'
containers = '''
    <div id="scroll-progress-container" class="fixed top-0 left-0 w-full h-1 z-[70] bg-transparent pointer-events-none">
      <div id="scroll-progress-bar" class="h-full bg-blue-600 w-0 transition-all duration-75"></div>
    </div>
    <div id="toast-container" class="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none"></div>
'''
content = content.replace(body_start, body_start + containers)
if body_start not in content:
    # Try alternate body tag
    body_start2 = '<body class="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">'
    content = content.replace(body_start2, body_start2 + containers)

# Replace newsletter success HTML
newsletter_html = '''<div
              id="newsletter-success"
              class="hidden absolute inset-0 bg-slate-900 flex items-center justify-center rounded-3xl z-20"
            >
              <span class="text-sm font-mono font-bold text-green-400"
                >Subscribed successfully. Welcome to the frontier.</span
              >
            </div>'''
content = content.replace(newsletter_html, "")

with open("vercel/index.html", "w") as f:
    f.write(content)
