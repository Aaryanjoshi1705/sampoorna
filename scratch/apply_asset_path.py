import re
import os

files_to_patch = [
    ("app/page.tsx", "./utils/assetPath"),
    ("app/about/ClientAbout.tsx", "../utils/assetPath"),
    ("app/components/HeroCanvas.tsx", "../utils/assetPath"),
    ("app/components/VisionMissionReveal.tsx", "../utils/assetPath"),
    ("app/our-expertise/ExpertiseClient.tsx", "../utils/assetPath"),
    ("app/our-expertise/page.tsx", "../utils/assetPath"),
    ("app/our-team/TeamClient.tsx", "../utils/assetPath"),
    ("app/services/ClientServices.tsx", "../utils/assetPath"),
    ("app/services/ServicesClient.tsx", "../utils/assetPath"),
]

for file_path, import_path in files_to_patch:
    if not os.path.exists(file_path):
        continue
    
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Remove misplaced imports
    content = content.replace(f'import assetPath from "{import_path}";\n', '')

    # Ensure "use client" is line 1 if present, and import is placed properly
    if content.startswith('"use client";'):
        content = '"use client";\n\n' + f'import assetPath from "{import_path}";\n' + content[len('"use client";'):].lstrip()
    elif content.startswith("'use client';"):
        content = "'use client';\n\n" + f'import assetPath from "{import_path}";\n' + content[len("'use client';"):].lstrip()
    else:
        content = f'import assetPath from "{import_path}";\n' + content

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Fixed use client & import in {file_path}")

print("Done!")
