import os
import subprocess
import time
from PIL import Image

OUT_DIR = os.path.abspath("scratch/section_slides")
os.makedirs(OUT_DIR, exist_ok=True)

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
BASE_URL = "http://localhost:3000"

# Target slide aspect ratio: 1440 x 810 (16:9 widescreen presentation slide)
SLIDE_W = 1440
SLIDE_H = 810

# Definition of all section views across all pages
PAGES_CONFIG = [
    {
        "page_name": "Home",
        "url": f"{BASE_URL}/",
        "full_height": 4500,
        "sections": [
            {"title": "01_Home_Hero", "y_start": 0},
            {"title": "02_Home_What_Is_SEZ", "y_start": 720},
            {"title": "03_Home_Single_Window_Customs", "y_start": 1400},
            {"title": "04_Home_Duty_Free_Journey", "y_start": 2100},
            {"title": "05_Home_Core_Services_Bento", "y_start": 2850},
            {"title": "06_Home_Footer", "y_start": 3600},
        ]
    },
    {
        "page_name": "About",
        "url": f"{BASE_URL}/about",
        "full_height": 2700,
        "sections": [
            {"title": "07_About_Hero_Story", "y_start": 0},
            {"title": "08_About_Vision_Mission", "y_start": 800},
            {"title": "09_About_Values_Footer", "y_start": 1600},
        ]
    },
    {
        "page_name": "Services",
        "url": f"{BASE_URL}/services",
        "full_height": 3400,
        "sections": [
            {"title": "10_Services_Hero_Overview", "y_start": 0},
            {"title": "11_Services_Core_Pillars", "y_start": 800},
            {"title": "12_Services_Full_Grid_Footer", "y_start": 1600},
        ]
    },
    {
        "page_name": "Our_Expertise",
        "url": f"{BASE_URL}/our-expertise",
        "full_height": 3400,
        "sections": [
            {"title": "13_Expertise_Hero_Intro", "y_start": 0},
            {"title": "14_Expertise_Core_Bento", "y_start": 750},
            {"title": "15_Expertise_Interactive_Registry", "y_start": 1500},
            {"title": "16_Expertise_Devanagari_Footer", "y_start": 2350},
        ]
    },
    {
        "page_name": "IFSC",
        "url": f"{BASE_URL}/ifsc",
        "full_height": 2900,
        "sections": [
            {"title": "17_IFSC_Hero_GIFT_City", "y_start": 0},
            {"title": "18_IFSC_Incentives_Framework", "y_start": 800},
            {"title": "19_IFSC_Roadmap_Footer", "y_start": 1600},
        ]
    },
    {
        "page_name": "Our_Team",
        "url": f"{BASE_URL}/our-team",
        "full_height": 3000,
        "sections": [
            {"title": "20_Team_Hero_Leadership", "y_start": 0},
            {"title": "21_Team_Nandwani_Raman", "y_start": 750},
            {"title": "22_Team_Vikraman_Golas_Footer", "y_start": 1600},
        ]
    },
    {
        "page_name": "Contact",
        "url": f"{BASE_URL}/contact",
        "full_height": 1800,
        "sections": [
            {"title": "23_Contact_Form_Location", "y_start": 0},
            {"title": "24_Contact_Office_Footer", "y_start": 750},
        ]
    }
]

print("Capturing full pages and generating section slides...")

slides_list = []

for page in PAGES_CONFIG:
    temp_full_png = os.path.join(OUT_DIR, f"temp_{page['page_name']}.png")
    cmd = [
        CHROME_PATH,
        "--headless=new",
        f"--screenshot={temp_full_png}",
        f"--window-size={SLIDE_W},{page['full_height']}",
        "--virtual-time-budget=8000",
        "--run-all-compositor-stages-before-draw",
        "--hide-scrollbars",
        page["url"]
    ]
    print(f"Rendering {page['page_name']} ({page['url']})...")
    subprocess.run(cmd, capture_output=True, text=True)
    
    if not os.path.exists(temp_full_png):
        print(f"[FAIL] Could not render {page['page_name']}")
        continue

    full_img = Image.open(temp_full_png).convert("RGB")
    img_w, img_h = full_img.size

    for sec in page["sections"]:
        y1 = min(sec["y_start"], max(0, img_h - SLIDE_H))
        y2 = min(y1 + SLIDE_H, img_h)
        
        # Crop exactly to 16:9 slide
        slide_crop = full_img.crop((0, y1, SLIDE_W, y2))
        
        # If smaller than SLIDE_H, paste onto matching background
        if slide_crop.size != (SLIDE_W, SLIDE_H):
            canvas = Image.new("RGB", (SLIDE_W, SLIDE_H), (245, 245, 243))
            canvas.paste(slide_crop, (0, 0))
            slide_crop = canvas

        slide_file = os.path.join(OUT_DIR, f"{sec['title']}.png")
        slide_crop.save(slide_file, "PNG", quality=95)
        slides_list.append(slide_crop)
        print(f"  -> Generated Slide: {sec['title']} (y: {y1} - {y2})")

    # Clean up temp full screenshot
    if os.path.exists(temp_full_png):
        os.remove(temp_full_png)

PDF_OUT = os.path.abspath("Sampoorna_SEZ_Website_Showcase.pdf")

if slides_list:
    slides_list[0].save(
        PDF_OUT,
        "PDF",
        resolution=150.0,
        save_all=True,
        append_images=slides_list[1:]
    )
    print(f"\n[SUCCESS] Generated Section-by-Section Showcase PDF at: {PDF_OUT}")
    print(f"Total Slides / Sections in PDF: {len(slides_list)}")
    print(f"File size: {os.path.getsize(PDF_OUT) / (1024*1024):.2f} MB")
else:
    print("[ERROR] No slides generated.")
