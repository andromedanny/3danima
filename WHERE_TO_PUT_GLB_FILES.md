# Where to Put GLB/GLTF Files

## 📁 Folder Structure

Place your GLB/GLTF files in this folder:

```
3danima/
└── assets/
    └── models/
        └── asl/
            ├── hello.glb
            ├── good-morning.glb
            ├── thank-you.glb
            ├── yes.glb
            ├── no.glb
            └── ... (more GLB files)
```

## 🎯 Quick Steps

### Step 1: Create the Folder (if it doesn't exist)
The folder structure is already created! Just navigate to:
```
assets/models/asl/
```

### Step 2: Place Your GLB Files
1. Download or convert your GLB files
2. Place them directly in: `assets/models/asl/`
3. Use lowercase names with hyphens (e.g., `good-morning.glb`)

### Step 3: Update the Code
Open `script.js` and find the `setupASLAnimations()` method. Add your file paths:

```javascript
this.aslAnimations = {
    'hello': 'assets/models/asl/hello.glb',
    'good morning': 'assets/models/asl/good-morning.glb',
    'thank you': 'assets/models/asl/thank-you.glb',
    // Add more as you get files...
};
```

## 📝 File Naming Convention

**Use lowercase with hyphens:**
- ✅ `good-morning.glb`
- ✅ `thank-you.glb`
- ✅ `how-are-you.glb`
- ❌ `GoodMorning.glb` (avoid capitals)
- ❌ `good_morning.glb` (use hyphens, not underscores)

## 🔄 How It Works

1. **User types text** → "Hello, how are you?"
2. **Code parses text** → Finds matching phrases/words
3. **Code looks up file** → Checks `aslAnimations` object
4. **Code loads GLB** → From `assets/models/asl/` folder
5. **3D animation plays** → In the avatar display area

## ✅ Example

If you have a file: `assets/models/asl/hello.glb`

Add to `script.js`:
```javascript
'hello': 'assets/models/asl/hello.glb',
```

Then when user types "hello", it will automatically load and play that animation!

## 🚀 Quick Test

1. Place a test file: `assets/models/asl/test.glb`
2. Add to code: `'test': 'assets/models/asl/test.glb',`
3. Type "test" in the website
4. Animation should play!

## 📦 Getting GLB Files

1. **From Sign Language Mocap Archive:**
   - Download FBX files
   - Convert to GLB using: https://products.aspose.app/3d/conversion/fbx-to-gltf
   - Place in `assets/models/asl/`

2. **From Mixamo:**
   - Download character + animation
   - Export as GLB
   - Place in `assets/models/asl/`

3. **From other sources:**
   - Any GLB file works!
   - Just place in `assets/models/asl/`
   - Update the code with the file path

## 💡 Tips

- **Start small**: Add 2-3 files first to test
- **Test each file**: Make sure they load correctly
- **Check console**: Browser console shows loading errors
- **File size**: Large files may load slowly - optimize if needed

That's it! Just drop your GLB files in `assets/models/asl/` and update the code! 🎉

