# How to Check What Signs Are Available in the Repository

## 🔍 Direct Method: Check the Repository

### Step 1: Go to the Repository
**Link:** https://github.com/StudioGalt/Sign-Language-Mocap-Archive/tree/main/SG%20ASL%20Dictionary

### Step 2: Browse the Folders
The repository is organized by sign name. Look for folders named:
- `SG ASL Good Morning [date]` or similar
- `SG ASL Good Night [date]` or similar  
- `SG ASL Good Evening [date]` or similar
- `SG ASL Good Afternoon [date]` or similar

### Step 3: Check Folder Names
Signs might be named differently:
- "Good Morning" might be "Morning" or "GM"
- "Good Night" might be "Night" or "GN"
- "Good Evening" might be "Evening" or "GE"

---

## 📋 Signs You're Looking For

Based on your code, you need:
- ✅ **Good Morning** - Check for: "Good Morning", "Morning", "GM"
- ✅ **Good Afternoon** - Check for: "Good Afternoon", "Afternoon"
- ✅ **Good Night** - Check for: "Good Night", "Night", "GN"
- ❓ **Good Evening** - Check for: "Good Evening", "Evening", "GE"

---

## 🔎 How to Search the Repository

### Method 1: GitHub Search (Easiest)
1. Go to: https://github.com/StudioGalt/Sign-Language-Mocap-Archive
2. Click the search bar at the top
3. Type: `good morning` or `good night` or `good evening`
4. Filter by: "In this repository"
5. Check results

### Method 2: Browse Folders
1. Go to: https://github.com/StudioGalt/Sign-Language-Mocap-Archive/tree/main/SG%20ASL%20Dictionary
2. Scroll through all folders
3. Look for folder names containing:
   - "morning"
   - "night"
   - "evening"
   - "afternoon"

### Method 3: Use GitHub's File Finder
1. Press `T` on the repository page
2. Type: "morning" or "night" or "evening"
3. See all files/folders with that name

---

## ⚠️ If Signs Are NOT Available

### Option 1: Use Individual Words
If "Good Morning" isn't available, you might find:
- "Good" (separate sign)
- "Morning" (separate sign)

**Solution:** Combine them in your code:
```javascript
// Play "good" then "morning" sequentially
'good morning': ['good', 'morning'], // Play both signs
```

### Option 2: Check Alternative Names
The repository might use:
- "GM" instead of "Good Morning"
- "GN" instead of "Good Night"
- "GE" instead of "Good Evening"

### Option 3: Use Similar Signs
- "Hello" can work for greetings
- "Good" + "Morning" separately
- "Good" + "Night" separately

### Option 4: Create Your Own
If not available:
1. Use Mixamo for generic "greeting" animations
2. Adapt them to ASL signs
3. Or record your own motion capture

---

## 📝 What to Do Once You Find Them

### If Found:
1. Download the FBX file from `FBX/Game Ready/` folder
2. Convert to GLB: https://products.aspose.app/3d/conversion/fbx-to-gltf
3. Save as: `assets/models/asl/good-morning.glb` (or appropriate name)
4. Your code already references them, so they should work!

### If NOT Found:
1. Check if individual words exist ("good", "morning", "night")
2. Update your code to play them sequentially
3. Or use placeholder animations until you find/create them

---

## 🎯 Quick Checklist

- [ ] Check repository for "Good Morning"
- [ ] Check repository for "Good Afternoon"  
- [ ] Check repository for "Good Night"
- [ ] Check repository for "Good Evening"
- [ ] Check for individual words: "Good", "Morning", "Night", "Evening"
- [ ] If found: Download and convert to GLB
- [ ] If not found: Use alternatives or create your own

---

## 💡 Pro Tip

**The repository is actively updated.** New signs are added regularly. Check back periodically or:
- Star the repository to get notifications
- Check the "Releases" section for updates
- Look at commit history to see what's been added recently

---

**Remember:** Even if exact phrases aren't available, you can often combine individual word signs to create the phrase!

