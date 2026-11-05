"""Import the landmark photo zip produced by the source pack's download_images.py.
Usage: python3 scripts/import-landmarks.py <zip-or-dir>
Converts each photo to WebP variants under public/media/, registers it in data/images.json,
and writes a contact sheet to /home/claude/prr-preview/landmarks-contact.png for visual approval.
It does NOT set approved=true; do that per item in data/landmark-photos.json after viewing."""
import sys, os, json, zipfile, tempfile, glob
from PIL import Image, ImageOps, ImageDraw
src = sys.argv[1]; root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if src.endswith('.zip'):
    d = tempfile.mkdtemp(); zipfile.ZipFile(src).extractall(d); src = d
manifest = json.load(open(f'{root}/data/landmark-photos.json')); meta = json.load(open(f'{root}/data/images.json'))
byfile = {m['file']: m for m in manifest}; found = []
for f in glob.glob(f'{src}/**/*', recursive=True):
    base, ext = os.path.splitext(os.path.basename(f))
    if ext.lower() not in ('.webp', '.jpg', '.jpeg', '.png') or base not in byfile: continue
    # the downloader may emit -640/-1280 variants; take the largest per base
    found.append((base, f))
best = {}
for base, f in found:
    if base not in best or os.path.getsize(f) > os.path.getsize(best[base]): best[base] = f
for base, f in best.items():
    im = ImageOps.exif_transpose(Image.open(f)).convert('RGB')
    s = 1600 / max(im.size)
    if s < 1: im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    im.save(f'{root}/public/media/{base}.jpg', quality=85)
    widths = [w for w in (480, 800, 1200) if w < im.width] + [im.width]
    for w in widths:
        r = im if w == im.width else im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        r.save(f'{root}/public/media/{base}-{w}.webp', 'WEBP', quality=80)
    meta[base] = {'w': im.width, 'h': im.height, 'widths': widths}
json.dump(meta, open(f'{root}/data/images.json', 'w'), indent=1)
names = sorted(best); W = 300; cols = 4; rows = (len(names) + cols - 1) // cols
sheet = Image.new('RGB', (cols * W, rows * (W + 20)), 'white'); dr = ImageDraw.Draw(sheet)
for i, n in enumerate(names):
    t = Image.open(f'{root}/public/media/{n}-480.webp'); t.thumbnail((W - 8, W - 8)); x = (i % cols) * W; y = (i // cols) * (W + 20)
    sheet.paste(t, (x + 4, y + 4)); dr.text((x + 4, y + W + 2), n[:40], fill='black')
os.makedirs('/home/claude/prr-preview', exist_ok=True); sheet.save('/home/claude/prr-preview/landmarks-contact.png')
print(f'imported {len(best)}: {names}\nmissing from zip: {sorted(set(byfile) - set(best))}')
