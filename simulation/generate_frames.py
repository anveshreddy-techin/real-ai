"""
SkillGuard AI — Synthetic Classroom Frame & Detection Generator
Generates realistic simulated vocational training centre frames with trainees and equipment
"""
import os
import json
from PIL import Image, ImageDraw, ImageFont

def generate_classroom_frame(output_path: str, persons: int, desks: int, sewing_machines: int, projector: bool):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img = Image.new("RGB", (640, 480), color=(30, 41, 59))
    draw = ImageDraw.Draw(img)

    # Draw classroom floor & walls
    draw.rectangle([0, 0, 640, 100], fill=(15, 23, 42)) # Back wall
    draw.rectangle([0, 100, 640, 480], fill=(51, 65, 85)) # Workshop floor

    # Draw Whiteboard / Projector Screen
    draw.rectangle([220, 20, 420, 80], fill=(248, 250, 252), outline=(100, 116, 139), width=2)
    if projector:
        draw.text((250, 45), "PMKVY SKILL BATCH", fill=(15, 23, 42))

    # Draw Desks / Workbenches
    grid_x, grid_y = 6, 4
    spacing_x, spacing_y = 80, 70
    desk_count = 0
    person_drawn = 0

    for row in range(grid_y):
        for col in range(grid_x):
            if desk_count >= desks:
                break
            x = 80 + col * spacing_x
            y = 140 + row * spacing_y

            # Draw desk
            draw.rectangle([x, y, x + 60, y + 35], fill=(71, 85, 105), outline=(148, 163, 184), width=1)
            desk_count += 1

            # Draw person sitting if available
            if person_drawn < persons:
                # Head
                draw.ellipse([x + 20, y - 25, x + 40, y - 5], fill=(245, 158, 11))
                # Body / Torso
                draw.rectangle([x + 15, y - 5, x + 45, y + 25], fill=(37, 99, 235))
                person_drawn += 1

    # Draw sewing machines on left flank if required
    for s in range(sewing_machines):
        sy = 130 + s * 45
        if sy < 440:
            draw.rectangle([20, sy, 60, sy + 30], fill=(16, 185, 129), outline=(5, 150, 105), width=2)

    # Stamp privacy notice & telemetry info
    draw.text((10, 460), f"SkillGuard AI Live Frame | Trainees: {persons} | Desks: {desks} | Projector: {projector}", fill=(203, 213, 225))
    img.save(output_path, "JPEG", quality=85)

if __name__ == "__main__":
    out_dir = "/home/anvesh/Documents/sih26245/data/synthetic_frames"
    generate_classroom_frame(f"{out_dir}/gorakhpur_normal.jpg", persons=32, desks=35, sewing_machines=15, projector=True)
    generate_classroom_frame(f"{out_dir}/gorakhpur_ghost_fraud.jpg", persons=18, desks=20, sewing_machines=8, projector=False)
    generate_classroom_frame(f"{out_dir}/shimla_depleted.jpg", persons=8, desks=25, sewing_machines=0, projector=False)
    print("Classroom benchmark frames generated successfully.")
