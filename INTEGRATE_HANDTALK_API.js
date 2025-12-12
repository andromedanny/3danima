// HandTalk API Integration Example
// This shows how to integrate HandTalk plugin into your existing app

// Option 1: Replace your current system with HandTalk
class HandTalkIntegration {
    constructor() {
        this.handtalk = null;
        this.isInitialized = false;
    }
    
    async init(containerId) {
        // Wait for HandTalk script to load
        if (typeof HandTalk === 'undefined') {
            console.error('HandTalk script not loaded. Add to HTML:');
            console.error('<script src="https://handtalk.me/plugin/script.js"></script>');
            return false;
        }
        
        // Initialize HandTalk
        this.handtalk = HandTalk.init({
            container: containerId,
            language: 'asl', // or 'bsl', 'libras'
            avatar: 'hugo' // or 'maya'
        });
        
        this.isInitialized = true;
        return true;
    }
    
    translate(text) {
        if (!this.isInitialized) {
            console.error('HandTalk not initialized');
            return;
        }
        
        // Translate text to sign language
        this.handtalk.translate(text);
    }
}

// Option 2: Hybrid - Use HandTalk API + Local Files
class HybridASLSystem {
    constructor() {
        this.handtalk = null;
        this.localAnimations = {};
        this.useAPI = true; // Toggle between API and local
    }
    
    async init(containerId) {
        // Try to initialize HandTalk
        if (typeof HandTalk !== 'undefined') {
            this.handtalk = HandTalk.init({
                container: containerId,
                language: 'asl'
            });
            this.useAPI = true;
        } else {
            console.warn('HandTalk not available, using local files');
            this.useAPI = false;
        }
        
        // Load local animations as fallback
        this.localAnimations = {
            'hello': 'assets/models/asl/hello.glb',
            // ... your existing animations
        };
    }
    
    async translate(text) {
        if (this.useAPI && this.handtalk) {
            // Use HandTalk API
            this.handtalk.translate(text);
        } else {
            // Use local files (your existing system)
            this.translateWithLocalFiles(text);
        }
    }
    
    translateWithLocalFiles(text) {
        // Your existing translation logic
        const signs = this.parseTextToSigns(text);
        this.playASLAnimations(signs);
    }
}

// Option 3: Integrate into your existing HandTalkApp
// Add this to your script.js:

/*
class HandTalkApp {
    // ... existing code ...
    
    async initHandTalkAPI() {
        // Load HandTalk script dynamically
        if (typeof HandTalk === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://handtalk.me/plugin/script.js';
            script.onload = () => {
                this.handtalkAPI = HandTalk.init({
                    container: 'avatarContainer',
                    language: this.currentLanguage
                });
            };
            document.head.appendChild(script);
        } else {
            this.handtalkAPI = HandTalk.init({
                container: 'avatarContainer',
                language: this.currentLanguage
            });
        }
    }
    
    async translate() {
        const text = this.textInput.value.trim();
        
        // Option: Use HandTalk API if available
        if (this.handtalkAPI && this.useHandTalkAPI) {
            this.handtalkAPI.translate(text);
            return;
        }
        
        // Otherwise use your existing system
        this.displaySignLanguage(text);
    }
}
*/

// Usage Example:
/*
const aslSystem = new HybridASLSystem();
await aslSystem.init('avatarContainer');
aslSystem.translate("Hello, how are you?");
*/

