import os

target_char = chr(8217)
root_dir = r"e:\My projects\2026Portfolio\src"

for subdir, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.css', '.js')):
            filepath = os.path.join(subdir, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    if target_char in content:
                        print(f"Found smart quote in: {filepath}")
            except Exception as e:
                pass
