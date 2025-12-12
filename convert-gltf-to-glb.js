#!/usr/bin/env node

/**
 * Local GLTF to GLB Converter
 * 
 * This script converts GLTF files to GLB format locally,
 * bypassing online converter file size limits.
 * 
 * Usage:
 *   node convert-gltf-to-glb.js [input.gltf] [output.glb]
 * 
 * Example:
 *   node convert-gltf-to-glb.js "assets/models/asl/SG ASL Hello 2024-6-9 No Mesh Mixamo.gltf" "assets/models/asl/hello.glb"
 */

import { NodeIO } from '@gltf-transform/core';
import { dedup, flatten, resample, simplify } from '@gltf-transform/functions';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('GLTF to GLB Converter');
    console.log('');
    console.log('Usage:');
    console.log('  node convert-gltf-to-glb.js <input.gltf> [output.glb]');
    console.log('');
    console.log('Examples:');
    console.log('  node convert-gltf-to-glb.js "assets/models/asl/SG ASL Hello 2024-6-9 No Mesh Mixamo.gltf"');
    console.log('  node convert-gltf-to-glb.js input.gltf output.glb');
    process.exit(1);
}

const inputPath = resolve(__dirname, args[0]);
const outputPath = args[1] 
    ? resolve(__dirname, args[1])
    : inputPath.replace(/\.gltf$/i, '.glb');

console.log('Converting GLTF to GLB...');
console.log(`Input:  ${inputPath}`);
console.log(`Output: ${outputPath}`);
console.log('');

try {
    // Initialize GLTF Transform
    const io = new NodeIO();
    
    // Read the GLTF file
    console.log('Reading GLTF file...');
    const document = await io.read(inputPath);
    
    // Optional: Apply optimizations (can be commented out if you want to preserve everything)
    console.log('Applying optimizations...');
    await document.transform(
        // dedup(),      // Remove duplicate data
        // flatten(),    // Flatten scene graph
        // resample(),   // Resample animations
        // simplify(),  // Simplify meshes (if any)
    );
    
    // Write as GLB
    console.log('Writing GLB file...');
    await io.write(outputPath, document);
    
    console.log('');
    console.log('✅ Conversion successful!');
    console.log(`   Output file: ${outputPath}`);
    
} catch (error) {
    console.error('');
    console.error('❌ Conversion failed:');
    console.error(error.message);
    if (error.stack) {
        console.error('');
        console.error('Stack trace:');
        console.error(error.stack);
    }
    process.exit(1);
}

