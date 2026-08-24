import re

with open("vercel/index.html", "r") as f:
    content = f.read()

old_call = "window.renderBlogFeed();"
new_call = "setTimeout(() => window.renderBlogFeed(), 1500);"

content = content.replace(old_call, new_call)

with open("vercel/index.html", "w") as f:
    f.write(content)
