import os
import subprocess
import time
from PIL import Image

OUT_DIR = os.path.abspath("scratch/full_pages")
os.makedirs(OUT_DIR, exist_ok=True)

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
BASE_URL = "http://localhost:3000"

PAGES = [
    {
        "name": "01_Home_Page",
        "title": "Home Page",
        "url": f"{BASE_URL}/",
        "width": 1440,
        "height": 4200
    },
    {
        "name": "02_About_Page",
        "title": "About Us",
        "url": f"{BASE_URL}/about",
        "width": 1440,
        "height": 2600
    },
    {
        "name": "03_Services_Page",
        "title": "Services",
        "url": f"{BASE_URL}/services",
        "width": 1440,
        "height": 3400
    },
    {
        "name": "04_Our_Expertise_Page",
        "title": "Our Expertise",
        "url": f"{BASE_URL}/our-expertise",
        "width": 1440,
        "height": 3200
    },
    {
        "name": "05_IFSC_Page",
        "title": "IFSC Services",
        "url": f"{BASE_URL}/ifsc",
        "width": 1440,
        "height": 2800
    },
    {
        "name": "06_Our_Team_Page",
        "title": "Our Team",
        "url": f"{BASE_URL}/our-team",
        "width": 1440,
        "height": 2900
    },
    {
        "name": "07_Contact_Page",
        "title": "Contact",
        "url": f"{BASE_URL}/contact",
        "width": 1440,
        "height": 1600
    }
]

print("Starting full-page capture of all website pages...")

captured_images = []

for p in PAGES:
    out_path = os.path.join(OUT_DIR, f"{p['name']}.png")
    cmd = [
        CHROME_PATH,
        "--headless=new",
        f"--screenshot={out_path}",
        f"--window-size={p['width']},{p['height']}",
        "--virtual-time-budget=8000",
        "--run-all-compositor-stages-before-draw",
        "--hide-scrollbars",
        p["url"]
    ]
    print(f"Rendering full page: {p['title']} ({p['url']})...")
    subprocess.run(cmd, capture_output=True, text=True)
    
    if os.path.exists(out_path) and os.path.getsize(out_path) > 1000:
        img = Image.open(out_path).convert("RGB")
        print(f"[OK] Captured {p['title']} - dimensions: {img.size}")
        captured_images.append(img)
    else:
        print(f"[FAIL] Could not capture {p['title']}")

PDF_PATH = os.path.abspath("Sampoorna_SEZ_Website_Showcase.pdf")

if captured_images:
    # Save each complete uninterrupted page into the PDF
    captured_images[0].save(
        PDF_PATH,
        "PDF",
        resolution=150.0,
        save_all=True,
        append_images=captured_images[1:]
    )
    print(f"\n[OK] Successfully created showcase PDF at: {PDF_PATH}")
    print(f"Total pages in PDF: {len(captured_images)}")
    print(f"File size: {os.path.getsize(PDF_PATH) / (1024*1024):.2f} MB")
else:
    print("[ERROR] No pages captured.")
