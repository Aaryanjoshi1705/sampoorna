import re
import random

with open('app/our-expertise/ExpertiseClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add next/image import
if 'import Image from "next/image";' not in content:
    content = content.replace('import Link from "next/link";', 'import Link from "next/link";\nimport Image from "next/image";')

images = [
    '"/images/corporate.jpg"',
    '"/images/port.jpg"',
    '"/images/network.jpg"',
    '"/images/interior.jpg"'
]

# 2. Update CORE_SERVICES
# Find the CORE_SERVICES array block
core_match = re.search(r'(const CORE_SERVICES = \[)(.*?)(];)', content, re.DOTALL)
if core_match:
    core_block = core_match.group(2)
    # inject image: ... before },
    new_core_block = re.sub(r'(size: ".*?",\s*)}', lambda m: f'{m.group(1)}\n    image: {random.choice(images)},\n  }}', core_block)
    content = content[:core_match.start(2)] + new_core_block + content[core_match.end(2):]

# 3. Update REGISTRY
registry_match = re.search(r'(const REGISTRY = \[)(.*?)(];)', content, re.DOTALL)
if registry_match:
    registry_block = registry_match.group(2)
    new_registry_block = re.sub(r'(content: \(\s*<BulletList.*?\/>\s*\),\s*)}', lambda m: f'{m.group(1)}\n    image: {random.choice(images)},\n  }}', registry_block, flags=re.DOTALL)
    content = content[:registry_match.start(2)] + new_registry_block + content[registry_match.end(2):]

# 4. Update BentoCard
bento_card_insert = """
      {/* Background Image Layer */}
      {service.image && (
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-luminosity group-hover:opacity-[0.08] transition-opacity duration-700">
          <Image src={service.image} alt={service.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--paper)]" />
        </div>
      )}
"""
if "Background Image Layer" not in content:
    content = content.replace(
        '{/* Mouse Tracking Glow Layer */}',
        bento_card_insert + '\n      {/* Mouse Tracking Glow Layer */}'
    )

# 5. Update RegistryTimelineNode
registry_card_insert = """
        {/* Banner Image */}
        {service.image && (
          <div className="relative w-full h-48 md:h-64 mb-10 rounded-xl overflow-hidden shadow-inner border border-[var(--line)]">
            <Image src={service.image} alt={service.title} fill className="object-cover hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--paper)]/80 to-transparent mix-blend-overlay pointer-events-none" />
          </div>
        )}
"""
if "Banner Image" not in content:
    content = content.replace(
        '<div className="flex items-center gap-3 mb-6">',
        registry_card_insert + '\n        <div className="flex items-center gap-3 mb-6">'
    )


with open('app/our-expertise/ExpertiseClient.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated ExpertiseClient.tsx successfully.")
