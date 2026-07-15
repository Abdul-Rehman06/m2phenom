$ErrorActionPreference = 'Stop'

$root = Resolve-Path (Join-Path $PSScriptRoot '..')
Set-Location $root

$gitStatus = git status --porcelain
if ($gitStatus) {
  Write-Host 'Working tree is not clean. Commit/stash first.' -ForegroundColor Red
  exit 1
}

$origin = (git config --get remote.origin.url).Trim()
if (-not $origin) {
  Write-Host 'Missing git remote "origin". Add origin first.' -ForegroundColor Red
  exit 1
}

npm run build
if ($LASTEXITCODE -ne 0) {
  node (Join-Path $root 'node_modules\typescript\bin\tsc') -b
  if ($LASTEXITCODE -ne 0) { exit 1 }
  node (Join-Path $root 'node_modules\vite\bin\vite.js') build
  if ($LASTEXITCODE -ne 0) { exit 1 }
}

$deployDir = Join-Path $root '.deploy-branch'
if (Test-Path $deployDir) {
  Remove-Item -Recurse -Force $deployDir
}
New-Item -ItemType Directory -Path $deployDir | Out-Null

Copy-Item -Path (Join-Path $root 'dist\*') -Destination $deployDir -Recurse -Force

Set-Location $deployDir
git init | Out-Null
$userName = (git -C $root config user.name).Trim()
$userEmail = (git -C $root config user.email).Trim()
if ($userName) { git config user.name $userName | Out-Null }
if ($userEmail) { git config user.email $userEmail | Out-Null }
git add -A
git commit -m ("Deploy " + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss')) | Out-Null
git branch -M deploy | Out-Null
git remote add origin $origin | Out-Null
git push -f origin deploy

Set-Location $root
Remove-Item -Recurse -Force $deployDir
