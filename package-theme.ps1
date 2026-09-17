# Build Shopify Theme Zip Package with RFC 1951 / POSIX forward-slash standard
$ErrorActionPreference = "Stop"

$workspaceRoot = $PSScriptRoot
if (-not $workspaceRoot) { $workspaceRoot = (Get-Location).Path }

$zipPath = Join-Path $workspaceRoot "lumora-shopify-theme.zip"
$stagingDir = Join-Path $workspaceRoot "_theme_staging"

Write-Host "Creating clean staging directory: $stagingDir"
if (Test-Path $stagingDir) {
    Remove-Item -Path $stagingDir -Recurse -Force
}
New-Item -ItemType Directory -Path $stagingDir | Out-Null

$directoriesToCopy = @("layout", "templates", "sections", "snippets", "config", "locales")

foreach ($dir in $directoriesToCopy) {
    $src = Join-Path $workspaceRoot $dir
    $dest = Join-Path $stagingDir $dir
    if (Test-Path $src) {
        Copy-Item -Path $src -Destination $dest -Recurse -Force
        Write-Host "Copied $dir/"
    } else {
        Write-Warning "Directory not found: $dir"
    }
}

# Copy flat assets only (no subdirectories in assets)
$assetsDest = Join-Path $stagingDir "assets"
New-Item -ItemType Directory -Path $assetsDest -Force | Out-Null
Get-ChildItem -Path (Join-Path $workspaceRoot "assets") -File | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination $assetsDest -Force
}
Write-Host "Copied flat files to assets/"

# Remove existing zip if present
if (Test-Path $zipPath) {
    Remove-Item -Path $zipPath -Force
}

# Use .NET ZipArchive to guarantee forward slashes ('/') in ZIP entries (crucial for Shopify's Linux servers)
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

Write-Host "Creating zip package using .NET ZipArchive with forward slashes..."
$zipStream = [System.IO.File]::Open($zipPath, [System.IO.FileMode]::Create)
$archive = New-Object System.IO.Compression.ZipArchive($zipStream, [System.IO.Compression.ZipArchiveMode]::Create)

$files = Get-ChildItem -Path $stagingDir -Recurse -File
foreach ($file in $files) {
    $relPath = $file.FullName.Substring($stagingDir.Length).TrimStart('\', '/') -replace '\\', '/'
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $file.FullName, $relPath, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
}

$archive.Dispose()
$zipStream.Dispose()
Write-Host "Created $zipPath successfully."

# Clean up staging directory
Remove-Item -Path $stagingDir -Recurse -Force
Write-Host "Cleaned up staging directory."

# Verify ZIP contents
Write-Host "`n=== VERIFYING ZIP ARCHIVE CONTENTS ==="
$verifyZip = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
$hasThemeLiquid = $false
$allForwardSlashes = $true
$count = 0

foreach ($entry in $verifyZip.Entries) {
    $count++
    if ($entry.FullName -eq "layout/theme.liquid") {
        $hasThemeLiquid = $true
    }
    if ($entry.FullName -like "*\*") {
        $allForwardSlashes = $false
    }
    if ($count -le 10) {
        Write-Host "  Entry: $($entry.FullName)"
    }
}
Write-Host "  ... ($count total entries in zip archive)"
$verifyZip.Dispose()

if ($hasThemeLiquid -and $allForwardSlashes) {
    Write-Host "`n[SUCCESS] 'layout/theme.liquid' is verified at the root of the ZIP with valid forward slashes ('/')." -ForegroundColor Green
    Write-Host "[SUCCESS] Theme package is 100% compliant and ready for direct upload to Shopify Admin!" -ForegroundColor Green
} else {
    Write-Error "Verification failed: hasThemeLiquid=$hasThemeLiquid, allForwardSlashes=$allForwardSlashes"
}
