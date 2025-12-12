# HandTalk Server Startup Script
Set-Location $PSScriptRoot
Write-Host "Starting HandTalk server..." -ForegroundColor Green
Write-Host ""
Write-Host "Open your browser to: http://localhost:8080" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""
npm run serve

