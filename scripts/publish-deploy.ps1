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

$deployDir = Join-Path $root '.deploy-branch'
if (Test-Path $deployDir) {
  Remove-Item -Recurse -Force $deployDir
}
New-Item -ItemType Directory -Path $deployDir | Out-Null

Copy-Item -Path (Join-Path $root 'dist\*') -Destination $deployDir -Recurse -Force

Set-Location $deployDir
git init | Out-Null
git add -A
git commit -m ("Deploy " + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss')) | Out-Null
git branch -M deploy | Out-Null
git remote add origin $origin | Out-Null
git push -f origin deploy

Set-Location $root
Remove-Item -Recurse -Force $deployDir
