$root = Split-Path -Parent $PSScriptRoot

function Stop-PortProcess {
    param(
        [int]$Port
    )

    $lines = netstat -ano | Select-String ":$Port"
    foreach ($line in $lines) {
        $parts = ($line.ToString() -replace "\s+", " ").Trim().Split(" ")
        if ($parts.Length -lt 5) {
            continue
        }

        $state = $parts[3]
        $processId = $parts[4]
        if ($state -ne "LISTENING") {
            continue
        }

        if ($processId -match "^\d+$" -and [int]$processId -gt 0) {
            taskkill /PID $processId /T /F | Out-Null
        }
    }
}

Stop-PortProcess -Port 8080

Set-Location $root
& (Join-Path $PSScriptRoot "start-app.ps1")
