import os
from PIL import Image, ImageDraw

def convert_black_to_transparent(img_path, output_path):
    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    
    # Scan from the edges to find the bounding box of non-black pixels.
    left, top, right, bottom = width, height, 0, 0
    for y in range(height):
        for x in range(width):
            r, g, b, a = img.getpixel((x, y))
            # If not black (using a threshold of 15 to be safe from compression artifacts)
            if r > 15 or g > 15 or b > 15:
                if x < left: left = x
                if x > right: right = x
                if y < top: top = y
                if y > bottom: bottom = y
                
    print(f"{img_path} content bounding box: left={left}, top={top}, right={right}, bottom={bottom}")
    
    w_box = right - left + 1
    h_box = bottom - top + 1
    size = min(w_box, h_box)
    
    cx = left + w_box // 2
    cy = top + h_box // 2
    
    half = size // 2
    # Ensure it's a square crop
    cropped = img.crop((cx - half, cy - half, cx - half + size, cy - half + size))
    
    cropped_w, cropped_h = cropped.size
    mask = Image.new("L", (cropped_w, cropped_h), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, cropped_w, cropped_h), fill=255)
    
    final_img = Image.new("RGBA", (cropped_w, cropped_h))
    final_img.paste(cropped, (0, 0), mask=mask)
    
    # Save as PNG
    final_img.save(output_path, "PNG")
    print(f"Saved circular transparent image to {output_path}")

os.makedirs('assets', exist_ok=True)
convert_black_to_transparent('assets/luz.jpg', 'assets/luz.png')
convert_black_to_transparent('assets/mauricio.jpg', 'assets/mauricio.png')
