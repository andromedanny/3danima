// Hear Me in Signs Website Application
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
        // Map words/phrases to GLB file paths
        // All FBX files should be converted to GLB format (like hello.glb)
        // GLB files are placed in: assets/models/asl/
        this.aslAnimations = {
            // Phrases (longest first for proper matching)
            'between you and me': 'assets/models/asl/betweenyouandme.glb',
            'between me and them': 'assets/models/asl/betweenmeandthem.glb',
            'belong to them': 'assets/models/asl/belongtothem.glb',
            'belong to me': 'assets/models/asl/belongtome.glb',
            'new year resolution': 'assets/models/asl/newyearresolution.glb',
            'back and forth': 'assets/models/asl/backandforth.glb',
            'ask for it': 'assets/models/asl/askforit.glb',
            'ask around': 'assets/models/asl/askaround.glb',
            'ask away': 'assets/models/asl/askaway.glb',
            'at once': 'assets/models/asl/atonce.glb',
            'at last': 'assets/models/asl/atlast.glb',
            'as well': 'assets/models/asl/aswell.glb',
            'my name is': 'assets/models/asl/mynameis.glb',
            'new year': 'assets/models/asl/newyear2025.glb',
            'turn off': 'assets/models/asl/turnoff.glb',
            'back away': 'assets/models/asl/backaway.glb',
            'back up': 'assets/models/asl/backup.glb',
            'bad breath': 'assets/models/asl/badbreath.glb',
            'bad mouthing': 'assets/models/asl/badmouthing.glb',
            'been a while': 'assets/models/asl/beenawhile.glb',
            'been there': 'assets/models/asl/beenthere.glb',
            'best friend': 'assets/models/asl/bestfriend.glb',
            
            // Numbers (0-10) - GLB files are in the main asl/ folder
            '0': 'assets/models/asl/0.glb',
            '1': 'assets/models/asl/1.glb',
            '2': 'assets/models/asl/2.glb',
            '3': 'assets/models/asl/3.glb',
            '4': 'assets/models/asl/4.glb',
            '5': 'assets/models/asl/5.glb',
            '6': 'assets/models/asl/6.glb',
            '7': 'assets/models/asl/7.glb',
            '8': 'assets/models/asl/8.glb',
            '9': 'assets/models/asl/9.glb',
            '10': 'assets/models/asl/10.glb',
            
            // Letters (A-Z) - using GLB files from main folder
            'a': 'assets/models/asl/A.glb',
            'b': 'assets/models/asl/B.glb',
            'c': 'assets/models/asl/C.glb',
            'd': 'assets/models/asl/D.glb',
            'e': 'assets/models/asl/E.glb',
            'f': 'assets/models/asl/F.glb',
            'g': 'assets/models/asl/G.glb',
            'h': 'assets/models/asl/H.glb',
            'i': 'assets/models/asl/I.glb',
            'j': 'assets/models/asl/J.glb',
            'k': 'assets/models/asl/K.glb',
            'l': 'assets/models/asl/L.glb',
            'm': 'assets/models/asl/M.glb',
            'n': 'assets/models/asl/N.glb',
            'o': 'assets/models/asl/O.glb',
            'p': 'assets/models/asl/P.glb',
            'q': 'assets/models/asl/Q.glb',
            'r': 'assets/models/asl/R.glb',
            's': 'assets/models/asl/S.glb',
            't': 'assets/models/asl/T.glb',
            'u': 'assets/models/asl/U.glb',
            'v': 'assets/models/asl/V.glb',
            'w': 'assets/models/asl/W.glb',
            'x': 'assets/models/asl/X.glb',
            'y': 'assets/models/asl/Y.glb',
            'z': 'assets/models/asl/Z.glb',
            
            // Individual words
            'hello': 'assets/models/asl/hello.glb',
            'my': 'assets/models/asl/my.glb',
            'please': 'assets/models/asl/please.glb',
            'mynameis': 'assets/models/asl/mynameis.glb',
            'another': 'assets/models/asl/another.glb',
            'anybody': 'assets/models/asl/anybody.glb',
            'anymore': 'assets/models/asl/anymore.glb',
            'anyone': 'assets/models/asl/anyone.glb',
            'anything': 'assets/models/asl/anything.glb',
            'anytime': 'assets/models/asl/anytime.glb',
            'anywhere': 'assets/models/asl/anywhere.glb',
            'apart': 'assets/models/asl/apart.glb',
            'apparently': 'assets/models/asl/apparently.glb',
            'around': 'assets/models/asl/around.glb',
            'as': 'assets/models/asl/as.glb',
            'aside': 'assets/models/asl/aside.glb',
            'ask': 'assets/models/asl/ask.glb',
            'asleep': 'assets/models/asl/asleep.glb',
            'everyone': 'assets/models/asl/everyone.glb',
            'this': 'assets/models/asl/this.glb',
            'where': 'assets/models/asl/where.glb',
            'which': 'assets/models/asl/which.glb',
            'you': 'assets/models/asl/you.glb',
            'baby': 'assets/models/asl/baby.glb',
            'beauty': 'assets/models/asl/beauty.glb',
            'became': 'assets/models/asl/became.glb',
            'because': 'assets/models/asl/because.glb',
            'bedtime': 'assets/models/asl/bedtime.glb',
            'been': 'assets/models/asl/been.glb',
            'before': 'assets/models/asl/before.glb',
            'begin': 'assets/models/asl/begin.glb',
            'behalf': 'assets/models/asl/behalf.glb',
            'behind': 'assets/models/asl/behind.glb',
            'belong': 'assets/models/asl/belong.glb',
            'below': 'assets/models/asl/below.glb',
            'beside': 'assets/models/asl/beside.glb',
            'best': 'assets/models/asl/best.glb',
            'better': 'assets/models/asl/better.glb',
            'between': 'assets/models/asl/between.glb',
            'beware': 'assets/models/asl/beware.glb',
            'bye': 'assets/models/asl/bye.glb'
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
        this.camera.position.set(0, 5.0, 4.5);
        this.camera.lookAt(0, 4.0, 0);

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
        if (!path || typeof THREE === 'undefined') {
            return;
        }

        // Determine file type and use appropriate loader
        const fileExtension = path.toLowerCase().split('.').pop();
        let loader;
        let isFBX = false;

        if (fileExtension === 'fbx') {
            if (typeof THREE.FBXLoader === 'undefined') {
                console.error('FBXLoader not loaded. Please include FBXLoader.js');
                return;
            }
            loader = new THREE.FBXLoader();
            isFBX = true;
        } else if (fileExtension === 'glb' || fileExtension === 'gltf') {
            if (typeof THREE.GLTFLoader === 'undefined') {
                console.error('GLTFLoader not loaded. Please include GLTFLoader.js');
                return;
            }
            loader = new THREE.GLTFLoader();
        } else {
            console.error('Unsupported file format. Use .fbx, .glb, or .gltf');
            return;
        }
        
        loader.load(
            path,
            (result) => {
                console.log(`✅ Model loaded: ${path}`);
                console.log('Result type:', result.constructor.name);
                
                // Remove placeholder
                if (this.model) {
                    this.scene.remove(this.model);
                }

                // Handle both FBX and GLTF/GLB formats
                let scene;
                let animations = [];

                if (isFBX) {
                    // FBX format - result is already a THREE.Group or THREE.Object3D
                    scene = result;
                    console.log('FBX scene children:', scene.children.length);
                    
                    // Check if scene has any meshes (character model)
                    let hasMeshes = false;
                    scene.traverse((child) => {
                        if (child instanceof THREE.Mesh) {
                            hasMeshes = true;
                            console.log('Found mesh:', child.name);
                        }
                    });
                    
                    if (!hasMeshes) {
                        console.warn('⚠️ FBX file has no meshes! This might be a "No Mesh" version.');
                        console.warn('💡 Solution: Use "Mesh" version or convert to GLB format.');
                    }
                    
                    // FBX animations are stored in the mixer differently
                    // Check if there are animations in the FBX file
                    if (result.animations && result.animations.length > 0) {
                        animations = result.animations;
                        console.log(`Found ${animations.length} animation(s) in result.animations`);
                    } else {
                        // Sometimes FBX animations are in children
                        result.traverse((child) => {
                            if (child.animations && child.animations.length > 0) {
                                animations.push(...child.animations);
                                console.log(`Found ${child.animations.length} animation(s) in child: ${child.name}`);
                            }
                        });
                    }
                } else {
                    // GLTF/GLB format
                    scene = result.scene;
                    console.log('GLB/GLTF scene children:', scene.children.length);
                    if (result.animations && result.animations.length > 0) {
                        animations = result.animations;
                        console.log(`Found ${animations.length} animation(s)`);
                    }
                }

                // Check if scene is empty
                if (!scene || scene.children.length === 0) {
                    console.error('❌ Loaded scene is empty!');
                    console.error('This might be a "No Mesh" FBX file. Try converting to GLB or using a "Mesh" version.');
                    if (!this.model) {
                        this.createPlaceholderAvatar();
                    }
                    return;
                }

                this.model = scene;
                
                // Ensure model is visible
                this.model.visible = true;
                
                // Make sure all children are visible too
                this.model.traverse((child) => {
                    child.visible = true;
                });
                
                this.scene.add(this.model);
                console.log('✅ Model added to scene');

                // Center and scale FIRST (before rotation)
                const box = new THREE.Box3().setFromObject(this.model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                
                console.log('Model size:', size);
                console.log('Model center:', center);
                console.log('Max dimension:', maxDim);
                
                if (maxDim > 0) {
                    // Check if this is a fingerspelling model (numbers/letters) vs word model
                    // Numbers are single digits (0-10) and letters are A-Z
                    const fileName = path.split('/').pop();
                    const isFingerspelling = /^[A-Z0-9]\.glb$/i.test(fileName) || /^\d+\.glb$/i.test(fileName);
                    
                    // Use same scaling and positioning approach for ALL models (including "hello")
                    // This ensures consistent rendering regardless of file format differences
                    // Reduced scale to make avatar smaller
                    const scale = 4 / maxDim;
                    this.model.scale.set(scale, scale, scale);
                    
                    // Standard positioning - center model at origin
                    // All models (hello, numbers, letters) use the same positioning logic
                    this.model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
                    
                    console.log('✅ Model scaled and positioned (uniform for all models)');
                    console.log('Final position:', this.model.position);
                    console.log('Final scale:', this.model.scale);
                    console.log('Model center (before scaling):', center);
                    console.log('Model size (before scaling):', size);
                    
                    // Adjust camera to look at the model's actual position
                    const modelY = this.model.position.y;
                    
                    // Position camera - use same position for all models (hello, numbers, letters)
                    // All models now use the same camera position for consistency
                    this.camera.position.set(0, modelY + 4.0, 4.5);
                    this.camera.lookAt(0, modelY + 2.5, 0);
                    console.log('✅ Camera positioned uniformly for all models');
                    console.log('Camera positioned at:', this.camera.position);
                    console.log('Camera looking at:', new THREE.Vector3(0, modelY + (isFingerspelling ? 1.5 : 4.0), 0));
                    
                    // Reset rotations first
                    this.model.rotation.x = 0;
                    this.model.rotation.y = 0;
                    this.model.rotation.z = 0;
                    
                    // isFingerspelling and fileName are already declared above, reuse them
                    
                    if (isFingerspelling) {
                        // Numbers and letters - use default orientation (no rotation)
                        // Reverted rotation changes - keep models in their original orientation
                        this.model.rotation.x = 0;
                        this.model.rotation.y = 0;
                        this.model.rotation.z = 0;
                        
                        console.log('🔢🔤 Fingerspelling model - using default orientation (no rotation)');
                        console.log('Model rotation:', this.model.rotation);
                    } else {
                        // Word models like "hello" are already correct
                        console.log('✅ Word model - using default orientation');
                    }
                    
                    console.log('Model rotation:', this.model.rotation);
                    console.log('Is fingerspelling:', isFingerspelling);
                    
                    // Additional debug: Check if meshes are visible
                    let visibleMeshCount = 0;
                    this.model.traverse((child) => {
                        if (child.isMesh) {
                            if (child.visible) visibleMeshCount++;
                            console.log(`Mesh: ${child.name}, visible: ${child.visible}, position:`, child.position);
                        }
                    });
                    console.log(`Visible meshes: ${visibleMeshCount}`);
                } else {
                    console.warn('⚠️ Model has zero size - might be empty');
                    console.warn('This could mean the GLB file has no geometry');
                }

                // Debug: Log model visibility and structure
                console.log('Model visible:', this.model.visible);
                console.log('Model children count:', this.model.children.length);
                console.log('Model position:', this.model.position);
                console.log('Model rotation:', this.model.rotation);
                
                // Check if model has meshes
                let meshCount = 0;
                this.model.traverse((child) => {
                    if (child.isMesh) {
                        meshCount++;
                        console.log(`Mesh ${meshCount}:`, child.name, 'visible:', child.visible, 'position:', child.position);
                    }
                });
                console.log(`Total meshes found: ${meshCount}`);
                
                if (meshCount === 0) {
                    console.error('❌ No meshes found in model! The GLB file might be empty or corrupted.');
                    console.error('File path:', path);
                }
                
                // Fix rotation - TEMPORARILY DISABLED to test if model shows up
                // If model shows but is upside down, we'll re-enable with correct axis
                // const isFingerspelling = path.includes('/glb/') || /^[A-Z0-9]\.glb$/i.test(path.split('/').pop());
                // if (isFingerspelling) {
                //     this.model.rotation.y = Math.PI;
                //     console.log('✅ Applied rotation correction');
                // }

                // Setup animations
                if (animations.length > 0) {
                    console.log(`✅ Setting up ${animations.length} animation(s)`);
                    this.mixer = new THREE.AnimationMixer(this.model);
                    animations.forEach((clip) => {
                        const action = this.mixer.clipAction(clip);
                        action.setLoop(THREE.LoopOnce); // Play once, no loop
                        this.animations[clip.name] = action;
                    });
                    // Play first animation
                    if (animations.length > 0) {
                        this.playAnimation(animations[0].name);
                        console.log(`✅ Playing animation: ${animations[0].name}`);
                    }
                } else {
                    console.warn('⚠️ No animations found in the model');
                }
            },
            (progress) => {
                if (progress.lengthComputable) {
                    const percent = (progress.loaded / progress.total * 100).toFixed(2);
                    console.log(`Loading: ${percent}%`);
                }
            },
            (error) => {
                console.error('❌ Error loading model:', error);
                console.error('File path:', path);
                console.error('Error details:', error.message || error);
                
                // Create placeholder as fallback if load fails
                if (!this.model) {
                    console.log('Creating placeholder avatar as fallback');
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

