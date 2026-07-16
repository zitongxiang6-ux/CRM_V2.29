$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$previewUrl = "http://127.0.0.1:5173/"

function Test-PreviewServer {
  try {
    $response = Invoke-WebRequest -Uri $previewUrl -UseBasicParsing -TimeoutSec 2
    return $response.StatusCode -eq 200
  } catch {
    return $false
  }
}

if (-not (Test-PreviewServer)) {
  Start-Process `
    -FilePath "cmd.exe" `
    -ArgumentList "/c", "npm.cmd run dev -- --port 5173" `
    -WorkingDirectory $projectRoot `
    -WindowStyle Hidden

  $ready = $false
  for ($attempt = 0; $attempt -lt 30; $attempt += 1) {
    Start-Sleep -Milliseconds 500
    if (Test-PreviewServer) {
      $ready = $true
      break
    }
  }

  if (-not $ready) {
    throw "Preview server did not start. Run npm.cmd install, then try again."
  }
}

Start-Process -FilePath $previewUrl
