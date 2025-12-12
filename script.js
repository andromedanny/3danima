// HandTalk Website Application
class HandTalkApp {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.currentLanguage = 'asl';
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.model = null;
        this.mixer = null;
        this.currentAction = null;
        this.animations = {};
        this.aslAnimations = {}; // Map of words/phrases to GLB file paths
        this.init();
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.initSpeechRecognition();
        this.setupSmoothScroll();
        this.setupASLAnimations();
        this.initThreeJS();
    }

    setupASLAnimations() {
        // Map words/phrases to GLB file paths in assets/models/asl/
        // Add your GLB files here as you download them
        this.aslAnimations = {
            // Phrases
            'good morning': 'assets/models/asl/good-morning.glb',
            'good afternoon': 'assets/models/asl/good-afternoon.glb',
            'good night': 'assets/models/asl/good-night.glb',
            'how are you': 'assets/models/asl/how-are-you.glb',
            'thank you': 'assets/models/asl/thank-you.glb',
            'thank you very much': 'assets/models/asl/thank-you-very-much.glb',
            
            // Individual words
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
            // Add more as you get files...
        };
        
        // Sort phrases by length (longest first) for proper matching
        this.phraseKeys = Object.keys(this.aslAnimations).sort((a, b) => b.length - a.length);
    }

    initThreeJS() {
        if (typeof THREE === 'undefined') {
            console.warn('Three.js not loaded. Using placeholder animations.');
            return;
        }

        if (!this.avatarCanvas) {
            console.warn('Avatar canvas not found.');
            return;
        }

        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1e293b);

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            50,
            this.avatarCanvas.clientWidth / this.avatarCanvas.clientHeight,
            0.1,
            1000
        );
        // Camera positioned to show head and upper body - focus on head area
        this.camera.position.set(0, 2.0, 3.5);
        this.camera.lookAt(0, 1.5, 0);

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.avatarCanvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(this.avatarCanvas.clientWidth, this.avatarCanvas.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        // Default avatar removed - avatar will only appear when user types text

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());

        // Start animation loop
        this.animate();
    }

    loadDefaultAvatar() {
        // Load hello.glb as default avatar
        const defaultModelPath = 'assets/models/asl/hello.glb';
        
        // Try to load the default model
        this.loadModel(defaultModelPath);
        
        // If loading fails, create placeholder as fallback
        // (fallback is handled in loadModel's error callback)
    }

    createPlaceholderAvatar() {
        const group = new THREE.Group();

        // Head
        const headGeometry = new THREE.SphereGeometry(0.2, 32, 32);
        const headMaterial = new THREE.MeshStandardMaterial({ color: 0xfbbf24 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.6;
        group.add(head);

        // Body
        const bodyGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.6, 32);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 1.1;
        group.add(body);

        // Arms
        const armGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 16);
        const leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
        leftArm.position.set(-0.3, 1.2, 0);
        leftArm.rotation.z = 0.3;
        group.add(leftArm);

        const rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
        rightArm.position.set(0.3, 1.2, 0);
        rightArm.rotation.z = -0.3;
        group.add(rightArm);

        this.model = group;
        this.scene.add(this.model);
        this.animatePlaceholder();
    }

    animatePlaceholder() {
        if (!this.model) return;
        const time = Date.now() * 0.001;
        const arms = this.model.children.filter(child => child.position.x !== 0);
        arms.forEach((arm, i) => {
            arm.rotation.z = (i === 0 ? 0.3 : -0.3) + Math.sin(time) * 0.2;
        });
    }

    loadModel(path) {
        if (!path || typeof THREE === 'undefined' || typeof THREE.GLTFLoader === 'undefined') {
            return;
        }

        const loader = new THREE.GLTFLoader();
        
        loader.load(
            path,
            (gltf) => {
                // Remove placeholder
                if (this.model) {
                    this.scene.remove(this.model);
                }

                this.model = gltf.scene;
                this.scene.add(this.model);

                // Center and scale
                const box = new THREE.Box3().setFromObject(this.model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 6 / maxDim; // Larger avatar

                this.model.scale.multiplyScalar(scale);
                this.model.position.sub(center.multiplyScalar(scale));
                // Position model much lower in the view
                this.model.position.y = -2.5;

                // Setup animations
                if (gltf.animations && gltf.animations.length > 0) {
                    this.mixer = new THREE.AnimationMixer(this.model);
                    gltf.animations.forEach((clip) => {
                        const action = this.mixer.clipAction(clip);
                        action.setLoop(THREE.LoopOnce); // Play once, no loop
                        this.animations[clip.name] = action;
                    });
                    // Play first animation
                    if (gltf.animations.length > 0) {
                        this.playAnimation(gltf.animations[0].name);
                    }
                }
            },
            (progress) => {
                console.log(`Loading: ${(progress.loaded / progress.total * 100).toFixed(2)}%`);
            },
            (error) => {
                console.error('Error loading model:', error);
                // Create placeholder as fallback if load fails
                if (!this.model) {
                    this.createPlaceholderAvatar();
                }
            }
        );
    }

    playAnimation(animationName) {
        if (!this.mixer || !this.animations[animationName]) return;

        if (this.currentAction) {
            this.currentAction.fadeOut(0.3);
        }

        this.currentAction = this.animations[animationName];
        // Set animation speed to 50% (slower)
        this.currentAction.setEffectiveTimeScale(0.5);
        this.currentAction.setLoop(THREE.LoopOnce); // Ensure no loop
        this.currentAction.reset().fadeIn(0.3).play();
    }

    onWindowResize() {
        if (!this.camera || !this.renderer || !this.avatarCanvas) return;

        this.camera.aspect = this.avatarCanvas.clientWidth / this.avatarCanvas.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.avatarCanvas.clientWidth, this.avatarCanvas.clientHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.mixer) {
            this.mixer.update(0.016);
        } else {
            this.animatePlaceholder();
        }

        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    setupElements() {
        this.textInput = document.getElementById('textInput');
        this.translateBtn = document.getElementById('translateBtn');
        this.voiceBtn = document.getElementById('voiceBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.startBtn = document.getElementById('startBtn');
        this.signTextDisplay = document.getElementById('signTextDisplay');
        this.translationInfo = document.getElementById('translationInfo');
        this.voiceStatus = document.getElementById('voiceStatus');
        this.languageSelect = document.getElementById('languageSelect');
        this.signLanguageBadge = document.getElementById('signLanguageBadge');
        this.avatarContainer = document.getElementById('avatarContainer');
        this.avatarCanvas = this.avatarContainer?.querySelector('.avatar-3d');
    }

    setupEventListeners() {
        // Translation
        this.translateBtn.addEventListener('click', () => this.translate());
        this.voiceBtn.addEventListener('click', () => this.toggleVoiceInput());
        this.clearBtn.addEventListener('click', () => this.clear());
        
        // Language selection
        this.languageSelect.addEventListener('change', (e) => {
            this.currentLanguage = e.target.value;
            this.updateLanguageBadge();
        });

        // Start button - scroll to translator
        this.startBtn.addEventListener('click', () => {
            document.getElementById('translator').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            setTimeout(() => this.textInput.focus(), 500);
        });

        // Keyboard shortcuts
        this.textInput.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.translate();
            }
        });

        // Auto-translate on input (debounced)
        let debounceTimer;
        this.textInput.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                if (this.textInput.value.trim()) {
                    this.translate();
                }
            }, 1000);
        });

        // Mobile menu toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Navigation smooth scroll
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId.startsWith('#')) {
                    const target = document.querySelector(targetId);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

    setupSmoothScroll() {
        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    if (navLink) {
                        navLink.classList.add('active');
                    }
                }
            });
        });
    }

    initSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onstart = () => {
                this.isListening = true;
                this.voiceBtn.classList.add('listening');
                this.voiceStatus.classList.remove('hidden');
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.textInput.value = transcript;
                this.translate();
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.stopListening();
                if (event.error === 'no-speech') {
                    alert('No speech detected. Please try again.');
                } else if (event.error === 'not-allowed') {
                    alert('Microphone access denied. Please enable microphone permissions.');
                }
            };

            this.recognition.onend = () => {
                this.stopListening();
            };
        } else {
            this.voiceBtn.style.display = 'none';
            console.warn('Speech recognition not supported in this browser');
        }
    }

    toggleVoiceInput() {
        if (this.isListening) {
            this.stopListening();
            if (this.recognition) {
                this.recognition.stop();
            }
        } else {
            if (this.recognition) {
                this.recognition.start();
            } else {
                alert('Speech recognition is not available in your browser.');
            }
        }
    }

    stopListening() {
        this.isListening = false;
        this.voiceBtn.classList.remove('listening');
        this.voiceStatus.classList.add('hidden');
    }

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
    }

    displaySignLanguage(text) {
        this.signTextDisplay.classList.add('active');
        
        // Normalize text
        const normalizedText = text.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        
        // Parse into signs
        const signs = this.parseTextToSigns(normalizedText);
        
        // Display signs
        const signWords = signs.map(sign => {
            return `<span class="sign-word">${sign}</span>`;
        }).join('');

        this.signTextDisplay.innerHTML = signWords || '<p class="placeholder-text">Processing...</p>';

        // Play 3D animations
        this.playASLAnimations(signs);
    }

    parseTextToSigns(text) {
        const signs = [];
        let remainingText = text;
        
        // Match phrases first (longest first)
        while (remainingText.length > 0) {
            let matched = false;
            
            for (const phrase of this.phraseKeys) {
                if (remainingText.startsWith(phrase + ' ') || remainingText === phrase) {
                    signs.push(phrase);
                    remainingText = remainingText.substring(phrase.length).trim();
                    matched = true;
                    break;
                }
            }
            
            // If no phrase matched, try single word
            if (!matched) {
                const words = remainingText.split(/\s+/);
                const firstWord = words[0];
                if (firstWord && this.aslAnimations.hasOwnProperty(firstWord)) {
                    signs.push(firstWord);
                    remainingText = remainingText.substring(firstWord.length).trim();
                } else if (firstWord) {
                    signs.push(firstWord);
                    remainingText = remainingText.substring(firstWord.length).trim();
                } else {
                    break;
                }
            }
        }
        
        return signs;
    }

    playASLAnimations(signs) {
        if (!signs || signs.length === 0) return;

        let delay = 0;
        const animationDuration = 2000; // 2 seconds per sign

        signs.forEach((sign) => {
            const cleanSign = sign.toLowerCase().trim();
            
            setTimeout(() => {
                // Check if we have a GLB file for this sign
                if (this.aslAnimations[cleanSign]) {
                    this.loadModel(this.aslAnimations[cleanSign]);
                } else {
                    // Use placeholder animation
                    this.animatePlaceholder();
                }
            }, delay);

            delay += animationDuration;
        });
    }


    getLanguageName() {
        const languages = {
            'asl': 'American Sign Language',
            'bsl': 'British Sign Language',
            'libras': 'Libras (Brazilian Sign Language)'
        };
        return languages[this.currentLanguage] || 'Sign Language';
    }

    updateLanguageBadge() {
        const names = {
            'asl': 'ASL',
            'bsl': 'BSL',
            'libras': 'Libras'
        };
        this.signLanguageBadge.textContent = names[this.currentLanguage] || 'ASL';
    }

    clear() {
        this.textInput.value = '';
        this.signTextDisplay.innerHTML = '<p class="placeholder-text">Your translation will appear here</p>';
        this.signTextDisplay.classList.remove('active');
        this.translationInfo.textContent = '';
        
        if (this.isListening && this.recognition) {
            this.recognition.stop();
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new HandTalkApp();
    window.handTalkApp = app;
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape to clear
    if (e.key === 'Escape' && document.activeElement === document.getElementById('textInput')) {
        window.handTalkApp?.clear();
    }
    
    // Alt+V for voice input
    if (e.altKey && e.key === 'v') {
        e.preventDefault();
        window.handTalkApp?.toggleVoiceInput();
    }
});

