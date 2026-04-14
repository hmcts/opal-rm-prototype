$ErrorActionPreference = 'Stop'

$sourceDir = $PSScriptRoot
$runDir = Join-Path $env:TEMP 'opal-rm-prototype-run'

Write-Host "Syncing prototype to $runDir ..."
robocopy $sourceDir $runDir /MIR /XD .git .tmp .codex-run | Out-Null

Push-Location $runDir

try {
  if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    throw "npm is not available. Install Node.js first, then rerun this script."
  }

  if (-not (Test-Path 'node_modules')) {
    Write-Host 'Installing dependencies ...'
    & npm install --offline=false --strict-ssl=false
  }

  Write-Host 'Starting prototype at http://localhost:3000 ...'
  $env:USE_HTTPS = 'false'
  $env:NODE_ENV = 'development'
  & npm run dev
}
finally {
  Pop-Location
}
