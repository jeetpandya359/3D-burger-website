import os
import cv2
import glob

def create_video_from_frames(frames_dir, output_mp4, fps=30):
    images = sorted(glob.glob(os.path.join(frames_dir, "*.jpg")))
    if not images:
        print(f"No images found in {frames_dir}")
        return
    
    first_frame = cv2.imread(images[0])
    height, width, layers = first_frame.shape
    
    # FourCC codec for web mp4 (H264 / mp4v)
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_mp4, fourcc, fps, (width, height))
    
    for img_path in images:
        frame = cv2.imread(img_path)
        out.write(frame)
        
    out.release()
    print(f"Successfully generated {output_mp4} ({len(images)} frames, {width}x{height})")

if __name__ == '__main__':
    base_dir = r"c:\Users\Jeet\Desktop\burger website"
    output_dir = os.path.join(base_dir, "public")
    os.makedirs(output_dir, exist_ok=True)
    
    print("Converting First Scene -> hero.mp4 ...")
    create_video_from_frames(os.path.join(base_dir, "first scene"), os.path.join(output_dir, "hero.mp4"))
    
    print("Converting Second Scene -> lift.mp4 ...")
    create_video_from_frames(os.path.join(base_dir, "second scene"), os.path.join(output_dir, "lift.mp4"))
    
    print("Converting Third Scene -> box.mp4 ...")
    create_video_from_frames(os.path.join(base_dir, "third scene"), os.path.join(output_dir, "box.mp4"))
    
    print("All videos converted successfully!")
