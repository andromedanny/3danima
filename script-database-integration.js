// Database Integration Example for HandTalk App
// This shows how to modify your script.js to use MySQL database

// In your HandTalkApp class, modify setupASLAnimations():

async setupASLAnimations() {
    try {
        // Load signs from database
        const response = await fetch(`http://localhost/api/get-signs.php?language=${this.currentLanguage}`);
        
        if (!response.ok) {
            throw new Error('Failed to load signs from database');
        }
        
        const signs = await response.json();
        
        this.aslAnimations = signs;
        this.phraseKeys = Object.keys(this.aslAnimations).sort((a, b) => b.length - a.length);
        
        console.log(`✅ Loaded ${Object.keys(this.aslAnimations).length} signs from database`);
    } catch (error) {
        console.warn('⚠️ Database not available, using fallback signs:', error);
        // Fallback to hardcoded signs if database is unavailable
        this.aslAnimations = {
            'hello': 'assets/models/asl/hello.glb',
            'goodbye': 'assets/models/asl/goodbye.glb',
            'yes': 'assets/models/asl/yes.glb',
            'no': 'assets/models/asl/no.glb',
            'please': 'assets/models/asl/please.glb',
            'sorry': 'assets/models/asl/sorry.glb',
            'help': 'assets/models/asl/help.glb',
            'good': 'assets/models/asl/good.glb',
            'night': 'assets/models/asl/night.glb',
            'morning': 'assets/models/asl/morning.glb',
            'afternoon': 'assets/models/asl/afternoon.glb',
            'good morning': 'assets/models/asl/good-morning.glb',
            'good afternoon': 'assets/models/asl/good-afternoon.glb',
            'good night': 'assets/models/asl/good-night.glb',
            'how are you': 'assets/models/asl/how-are-you.glb',
            'thank you': 'assets/models/asl/thank-you.glb',
            'thank you very much': 'assets/models/asl/thank-you-very-much.glb',
        };
        this.phraseKeys = Object.keys(this.aslAnimations).sort((a, b) => b.length - a.length);
    }
}

// Add method to save translation history
async saveTranslation(userText, signs) {
    try {
        const response = await fetch('http://localhost/api/save-translation.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_text: userText,
                language: this.currentLanguage,
                signs_used: signs
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to save translation');
        }
        
        const result = await response.json();
        console.log('✅ Translation saved:', result);
    } catch (error) {
        console.warn('⚠️ Could not save translation to database:', error);
        // Fail silently - not critical for app functionality
    }
}

// Modify translate() method to save history:
translate() {
    const text = this.textInput.value.trim();
    
    if (!text) {
        this.signTextDisplay.innerHTML = '<p class="placeholder-text">Your translation will appear here</p>';
        this.signTextDisplay.classList.remove('active');
        this.translationInfo.textContent = '';
        return;
    }

    // Display translation
    this.displaySignLanguage(text);
    
    // Show translation info
    const languageName = this.getLanguageName();
    this.translationInfo.textContent = `Translating "${text}" to ${languageName}`;
    
    // Save to database (non-blocking)
    const signs = this.parseTextToSigns(text.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim());
    this.saveTranslation(text, signs);
}

// Modify displaySignLanguage() to get signs from database if needed:
// (The existing parseTextToSigns() will automatically use this.aslAnimations from database)

