import urllib.request

slugs = {
    'Python': 'python',
    'Game Maker Lang': 'gamemaker',
    'Bootstrap': 'bootstrap',
    'Flask': 'flask',
    'SQL Lite': 'sqlite',
    'WebRTC': 'webrtc',
    'Firebase': 'firebase',
    'ElectronJS': 'electron',
    'Bash': 'gnubash',
    'Powershell': 'powershell',
    'Foundry TTS': 'foundryvirtualtabletop',
    'Genkit': 'google' # Fallback
}

out = ''
for name, slug in slugs.items():
    try:
        req = urllib.request.Request(f'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/{slug}.svg', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            svg = response.read().decode('utf-8')
            path_start = svg.find('<path')
            path_end = svg.rfind('</svg>')
            inner = svg[path_start:path_end].strip()
            out += f"{name}:\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\n  {inner}\n</svg>\n\n"
    except Exception as e:
        out += f"{name}: ERROR {e}\n\n"

with open('icons.txt', 'w', encoding='utf-8') as f:
    f.write(out)
print('Done')
