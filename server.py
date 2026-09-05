#!/usr/bin/env python3
"""
HoloCard Studio Backend Server with Playwright High-DPI Capture API
"""

import http.server
import socketserver
import json
import os
import sys
import subprocess
import tempfile
import base64
import urllib.parse

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class StudioHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_POST(self):
        if self.path == '/api/capture':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            try:
                payload = json.loads(post_data.decode('utf-8'))
                state = payload.get('state', {})
                card_html = payload.get('cardHtml', '')
                image_src = payload.get('imageSrc', '')
                
                # Check if playwright is available via python or npx
                # We render a dedicated high-DPI capture template
                capture_html = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }}
    .polaroid-card {{
      width: 330px;
      height: 410px;
      border-radius: 6px;
      box-shadow: 0 12px 36px rgba(0,0,0,0.25);
      padding: 16px 16px 0 16px;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      background-color: {self.get_paper_color(state.get('paper', 'white'))};
    }}
    .polaroid-body {{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }}
    .photo-pocket {{
      position: relative;
      width: 298px;
      height: 298px;
      background: #18181b;
      border-radius: {state.get('radius', 4)}px;
      overflow: hidden;
      box-shadow: inset 0 2px 5px rgba(0,0,0,0.4);
    }}
    .photo-pocket img {{
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      filter: brightness({state.get('brightness', 100)}%) contrast({state.get('contrast', 105)}%) saturate({state.get('saturation', 110)}%) sepia({state.get('warmth', 15)}%);
    }}
    .photo-vignette {{
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 5;
      box-shadow: inset 0 0 {int(state.get('vignette', 30) * 0.6)}px rgba(0,0,0,{state.get('vignette', 30) * 0.007});
    }}
    .film-glare {{
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 3;
      pointer-events: none;
      background: linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 30%, transparent 60%);
      mix-blend-mode: screen;
      opacity: {state.get('glareOpacity', 0.35)};
    }}
    .film-hologram {{
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 4;
      pointer-events: none;
      mix-blend-mode: screen;
      opacity: {state.get('holoOpacity', 0.45)};
      {self.get_holo_gradient(state.get('theme', 'rainbow'))}
    }}
    .polaroid-chin {{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 6px 8px;
      gap: 2px;
    }}
    .handwritten-caption {{
      font-family: 'Caveat', cursive;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-align: center;
      line-height: 1.1;
      transform: rotate(-0.5deg);
      color: {self.get_caption_color(state)};
    }}
    .handwritten-date {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 9.5px;
      color: #64748b;
      letter-spacing: 1px;
    }}
  </style>
</head>
<body>
  <div class="polaroid-card" id="captureTarget">
    <div class="polaroid-body">
      <div class="photo-pocket">
        <img src="{image_src}">
        <div class="film-glare"></div>
        <div class="film-hologram"></div>
        <div class="photo-vignette"></div>
      </div>
      <div class="polaroid-chin">
        <div class="handwritten-caption">{payload.get('caption', '')}</div>
        <div class="handwritten-date">{payload.get('date', '')}</div>
      </div>
    </div>
  </div>
</body>
</html>"""
                
                # Write temp html file
                temp_html = os.path.join(tempfile.gettempdir(), 'polaroid_capture.html')
                temp_png = os.path.join(tempfile.gettempdir(), 'polaroid_output.png')
                
                with open(temp_html, 'w', encoding='utf-8') as f:
                    f.write(capture_html)
                
                # Execute Playwright via python or npx
                playwright_script = f"""
const {{ chromium }} = require('playwright');
(async () => {{
  const browser = await chromium.launch({{ headless: true }});
  const page = await browser.newPage({{
    viewport: {{ width: 800, height: 800 }},
    deviceScaleFactor: 3
  }});
  await page.goto('file://{temp_html}', {{ waitUntil: 'networkidle' }});
  await page.waitForTimeout(300);
  const card = page.locator('#captureTarget');
  await card.screenshot({{ path: '{temp_png}', omitBackground: true }});
  await browser.close();
}})();
"""
                temp_js = os.path.join(tempfile.gettempdir(), 'capture_runner.js')
                with open(temp_js, 'w', encoding='utf-8') as f:
                    f.write(playwright_script)

                # Try executing with node
                result = subprocess.run(['node', temp_js], capture_output=True, text=True, timeout=10)
                
                if result.returncode == 0 and os.path.exists(temp_png):
                    with open(temp_png, 'rb') as f:
                        png_bytes = f.read()
                    
                    self.send_response(200)
                    self.send_header('Content-Type', 'image/png')
                    self.send_header('Content-Length', str(len(png_bytes)))
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(png_bytes)
                    return
                else:
                    raise Exception(f"Playwright execution output: {result.stderr or result.stdout}")

            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))
        else:
            self.send_error(404, "Not Found")

    def get_paper_color(self, paper):
        if paper == 'cream': return '#fef7ea'
        elif paper == 'pink': return '#fdf2f8'
        elif paper == 'black': return '#18181b'
        return '#fdfdfd'

    def get_caption_color(self, state):
        if state.get('paper') == 'black': return '#f4f4f5'
        return state.get('inkColor', '#1e293b')

    def get_holo_gradient(self, theme):
        if theme == 'sunset':
            return "background: linear-gradient(135deg, rgba(255,126,95,0.8) 0%, rgba(254,180,123,0.7) 50%, rgba(255,42,109,0.8) 100%);"
        elif theme == 'cyber':
            return "background: linear-gradient(135deg, rgba(0,240,255,0.8) 0%, rgba(255,0,85,0.8) 50%, rgba(0,255,102,0.8) 100%);"
        elif theme == 'golden':
            return "background: linear-gradient(135deg, rgba(255,215,0,0.9) 0%, rgba(255,235,160,0.6) 50%, rgba(218,165,32,0.9) 100%);"
        return "background: linear-gradient(135deg, rgba(255,0,128,0.7) 0%, rgba(255,140,0,0.7) 25%, rgba(64,224,208,0.7) 50%, rgba(123,104,238,0.7) 75%, rgba(255,0,128,0.7) 100%);"

if __name__ == '__main__':
    print(f"🚀 Starting HoloCard Studio Server with Playwright Capture on port {PORT}...")
    with socketserver.TCPServer(("", PORT), StudioHandler) as httpd:
        httpd.serve_forever()
