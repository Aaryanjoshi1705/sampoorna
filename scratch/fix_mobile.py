import re

with open('app/our-expertise/ExpertiseClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Hide ScrollLine on mobile to prevent distortion
content = content.replace(
    'className="-z-0 opacity-80"',
    'className="hidden md:block -z-0 opacity-80"'
)

# 2. Hide Ghost Entry Number on mobile to prevent text overflow
content = content.replace(
    'className="pointer-events-none absolute -bottom-6 right-4 font-display text-[8rem]',
    'className="hidden md:block pointer-events-none absolute -bottom-6 right-4 font-display text-[8rem]'
)

# 3. Adjust DotMatrix grid gap for mobile
content = content.replace(
    'gap-[3px] sm:gap-[5px] md:gap-[8px]',
    'gap-[1px] sm:gap-[3px] md:gap-[8px]'
)

# 4. Make timeline icon stack nicely on mobile
content = content.replace(
    'className="relative md:w-32 shrink-0 flex flex-col items-center justify-start pt-2"',
    'className="relative w-full md:w-32 shrink-0 flex flex-col items-center md:items-start justify-start pt-0 md:pt-2 mb-4 md:mb-0"'
)

# 5. Fix card layout spacing on mobile
content = content.replace(
    'className="relative flex flex-col md:flex-row gap-8 md:gap-16 scroll-mt-32 pt-16 pb-16 z-10"',
    'className="relative flex flex-col md:flex-row gap-6 md:gap-16 scroll-mt-32 pt-10 md:pt-16 pb-10 md:pb-16 z-10"'
)

# 6. Ensure Bento Grid is fully mobile compliant
# It already is (grid-cols-1 md:grid-cols-2)

with open('app/our-expertise/ExpertiseClient.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Mobile fixes applied.")
