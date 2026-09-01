import os
import subprocess
import time
from PIL import Image

SCREENSHOTS_DIR = os.path.abspath("scratch/screenshots")
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
BASE_URL = "http://localhost:3000"

PAGES = [
    {
        "name": "01_Home_Page",
        "title": "Home Page",
        "url": f"{BASE_URL}/",
        "height": 4500,
        "width": 1440
    },
    {
        "name": "02_About_Page",
        "title": "About Us Page",
        "url": f"{BASE_URL}/about",
        "height": 2800,
        "width": 1440
    },
    {
        "name": "03_Services_Page",
        "title": "Services Page",
        "url": f"{BASE_URL}/services",
        "height": 3800,
        "width": 1440
    },
    {
        "name": "04_Our_Expertise_Page",
        "title": "Our Expertise Page",
        "url": f"{BASE_URL}/our-expertise",
        "height": 3600,
        "width": 1440
    },
    {
        "name": "05_IFSC_Page",
        "title": "IFSC Services Page",
        "url": f"{BASE_URL}/ifsc",
        "height": 3200,
        "width": 1440
    },
    {
        "name": "06_Our_Team_Page",
        "title": "Our Team Page",
        "url": f"{BASE_URL}/our-team",
        "height": 3200,
        "width": 1440
    },
    {
        "name": "07_Contact_Page",
        "title": "Contact Page",
        "url": f"{BASE_URL}/contact",
        "height": 1800,
        "width": 1440
    }
]

print("Starting screenshots capture...")

captured_files = []

for page in PAGES:
    output_png = os.path.join(SCREENSHOTS_DIR, f"{page['name']}.png")
    cmd = [
        CHROME_PATH,
        "--headless=new",
        f"--screenshot={output_png}",
        f"--window-size={page['width']},{page['height']}",
        "--virtual-time-budget=7000",
        "--run-all-compositor-stages-before-draw",
        "--hide-scrollbars",
        page["url"]
    ]
    print(f"Capturing: {page['title']} from {page['url']}...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(output_png) and os.path.getsize(output_png) > 1000:
        print(f"[OK] Successfully captured: {page['title']} ({os.path.getsize(output_png)} bytes)")
        captured_files.append((page, output_png))
    else:
        print(f"[FAIL] Failed to capture: {page['title']}")

print(f"\nTotal captured: {len(captured_files)} pages.")

# Now compile into high-quality multi-page PDF
pdf_pages = []

PAGE_WIDTH = 1440
PAGE_CHUNK_HEIGHT = 1920

for page_info, file_path in captured_files:
    img = Image.open(file_path).convert("RGB")
    w, h = img.size
    
    if h > PAGE_CHUNK_HEIGHT * 1.2:
        y = 0
        chunk_idx = 1
        while y < h:
            chunk_h = min(PAGE_CHUNK_HEIGHT, h - y)
            if chunk_h < 400 and len(pdf_pages) > 0:
                break
            cropped = img.crop((0, y, w, y + chunk_h))
            pdf_pages.append(cropped)
            y += int(PAGE_CHUNK_HEIGHT * 0.92)
            chunk_idx += 1
    else:
        pdf_pages.append(img)

OUTPUT_PDF = os.path.abspath("Sampoorna_SEZ_Website_Showcase.pdf")

if pdf_pages:
    pdf_pages[0].save(
        OUTPUT_PDF,
        "PDF",
        resolution=150.0,
        save_all=True,
        append_images=pdf_pages[1:]
    )
    print(f"\n[OK] Generated PDF successfully at: {OUTPUT_PDF}")
    print(f"Total PDF pages: {len(pdf_pages)}")
    print(f"File size: {os.path.getsize(OUTPUT_PDF) / (1024*1024):.2f} MB")
else:
    print("[ERROR] No images to compile into PDF")
