// Script to process downloaded Sign Language Mocap Archive
// Extracts FBX files from Game Ready folders and prepares them for conversion

import { readdir, stat, copyFile, mkdir } from 'node:fs/promises';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname as dirnamePath } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirnamePath(__filename);

// Configuration
const REPO_PATH = join(__dirname, 'Sign-Language-Mocap-Archive', 'SG ASL Dictionary');
const OUTPUT_PATH = join(__dirname, 'assets', 'models', 'asl', 'fbx-files');
const TARGET_FOLDER = 'FBX/Game Ready';

// Sign name mapping (to convert folder names to lowercase-hyphen format)
function normalizeSignName(folderName) {
    // Remove "SG ASL" prefix and date suffix
    let name = folderName
        .replace(/^SG ASL /i, '')
        .replace(/\s+\d{4}-\d{1,2}-\d{1,2}\s+Upload$/i, '')
        .trim();
    
    // Convert to lowercase with hyphens
    name = name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    
    return name;
}

async function findFBXFiles(dir, depth = 0) {
    const files = [];
    
    try {
        const entries = await readdir(dir, { withFileTypes: true });
        
        for (const entry of entries) {
            const fullPath = join(dir, entry.name);
            
            if (entry.isDirectory()) {
                // Check if we're in the Game Ready folder
                if (entry.name === 'Game Ready' && dir.endsWith('FBX')) {
                    // Found Game Ready folder, look for FBX files
                    const gameReadyFiles = await readdir(fullPath);
                    for (const file of gameReadyFiles) {
                        if (file.toLowerCase().endsWith('.fbx')) {
                            files.push({
                                source: join(fullPath, file),
                                name: file,
                                signName: normalizeSignName(basename(dirname(dir)))
                            });
                        }
                    }
                } else if (depth < 5) {
                    // Recursively search (limit depth to avoid going too deep)
                    const subFiles = await findFBXFiles(fullPath, depth + 1);
                    files.push(...subFiles);
                }
            }
        }
    } catch (error) {
        console.warn(`Could not read directory ${dir}:`, error.message);
    }
    
    return files;
}

async function processRepository() {
    console.log('🔍 Processing Sign Language Mocap Archive...\n');
    
    // Check if repo exists
    try {
        await stat(REPO_PATH);
    } catch (error) {
        console.error(`❌ Repository not found at: ${REPO_PATH}`);
        console.error('   Please extract the downloaded ZIP to this location:');
        console.error(`   ${REPO_PATH}`);
        console.error('\n   Or update REPO_PATH in this script to match your extraction location.');
        process.exit(1);
    }
    
    // Create output directory
    await mkdir(OUTPUT_PATH, { recursive: true });
    
    // Find all FBX files in Game Ready folders
    console.log('📂 Searching for FBX files in Game Ready folders...');
    const fbxFiles = await findFBXFiles(REPO_PATH);
    
    if (fbxFiles.length === 0) {
        console.log('❌ No FBX files found in Game Ready folders.');
        console.log('   Make sure you extracted the repository to:');
        console.log(`   ${REPO_PATH}`);
        process.exit(1);
    }
    
    console.log(`\n✅ Found ${fbxFiles.length} FBX files!\n`);
    
    // Copy files to output directory with normalized names
    console.log('📋 Files found:');
    const fileMap = new Map();
    
    for (const file of fbxFiles) {
        const normalizedName = file.signName || normalizeSignName(file.name);
        const outputName = `${normalizedName}.fbx`;
        const outputPath = join(OUTPUT_PATH, outputName);
        
        // Handle duplicates
        if (fileMap.has(normalizedName)) {
            console.log(`   ⚠️  Duplicate: ${normalizedName} (skipping)`);
            continue;
        }
        
        fileMap.set(normalizedName, file.source);
        
        try {
            await copyFile(file.source, outputPath);
            console.log(`   ✅ ${normalizedName}.fbx`);
        } catch (error) {
            console.error(`   ❌ Failed to copy ${file.name}:`, error.message);
        }
    }
    
    console.log(`\n📦 Copied ${fileMap.size} files to: ${OUTPUT_PATH}`);
    console.log('\n📝 Next steps:');
    console.log('   1. Convert FBX files to GLB format');
    console.log('   2. Place GLB files in: assets/models/asl/');
    console.log('   3. Update script.js with the new signs');
    console.log('\n💡 Tip: Use online converter or your convert-gltf-to-glb.js script');
    console.log('   Online: https://products.aspose.app/3d/conversion/fbx-to-gltf');
    
    // Generate a summary file
    const summary = {
        totalFiles: fileMap.size,
        files: Array.from(fileMap.keys()).sort(),
        outputPath: OUTPUT_PATH,
        generatedAt: new Date().toISOString()
    };
    
    const fs = await import('fs');
    fs.writeFileSync(
        join(OUTPUT_PATH, 'summary.json'),
        JSON.stringify(summary, null, 2)
    );
    
    console.log(`\n📄 Summary saved to: ${join(OUTPUT_PATH, 'summary.json')}`);
}

// Run the script
processRepository().catch(console.error);

