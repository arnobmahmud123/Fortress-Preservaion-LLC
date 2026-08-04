import os
import glob

old_src = "old-static/src"
app_dir = "src/app"

files = glob.glob(os.path.join(old_src, "*.html"))
for file in files:
    filename = os.path.basename(file)
    name = filename.replace(".html", "")
    
    if name == "blog":
        continue # we will build a dynamic blog page next
        
    with open(file, "r") as f:
        html_content = f.read()
        
    # Extract just the body content to put in the page
    # A simple hack for React: replace class= with className= and fix self-closing tags
    react_html = html_content.replace('class="', 'className="')
    react_html = react_html.replace('for="', 'htmlFor="')
    react_html = react_html.replace('<!--', '{/*').replace('-->', '*/}')
    # Remove head/html/body wrappers manually, or just use dangerouslySetInnerHTML
    
    # We will use dangerouslySetInnerHTML for a perfect 1:1 replica without fighting JSX syntax errors
    
    # Create route directory
    route_dir = app_dir if name == "index" else os.path.join(app_dir, name)
    os.makedirs(route_dir, exist_ok=True)
    
    page_content = f"""
export default function {name.title()}Page() {{
  return (
    <div dangerouslySetInnerHTML={{{{ __html: \`{html_content.replace('`', '\\`').replace('$', '\\$')}\` }}}} />
  )
}}
"""
    with open(os.path.join(route_dir, "page.tsx"), "w") as f:
        f.write(page_content)
        
print("Migration script generated components.")
