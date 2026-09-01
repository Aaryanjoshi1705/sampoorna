import os
import re

found_links = []
for root, dirs, files in os.walk("app"):
    for file in files:
        if file.endswith((".tsx", ".ts")):
            p = os.path.join(root, file)
            with open(p, "r", encoding="utf-8") as f:
                lines = f.readlines()
            for i, line in enumerate(lines):
                if '<a ' in line and 'href="/' in line:
                    found_links.append((p, i + 1, line.strip().encode("ascii", "ignore").decode()))

for item in found_links:
    print(f"{item[0]}:{item[1]} -> {item[2]}")
