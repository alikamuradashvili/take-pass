$root = Split-Path -Parent $PSScriptRoot
$vitePackage = Join-Path $root "node_modules\vite"

Set-Location $root

if (-not (Test-Path $vitePackage)) {
    Write-Host "Installing npm dependencies..."
    npm install

    if ($LASTEXITCODE -ne 0) {
        throw "npm install failed with exit code $LASTEXITCODE"
    }
}

node ".\scripts\dev-runner.mjs"
