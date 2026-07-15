$ErrorActionPreference = 'Stop'

$root = Resolve-Path (Join-Path $PSScriptRoot '..')
Set-Location $root

$gitStatus = git status --porcelain
if ($gitStatus) {
  Write-Host 'Working tree is not clean. Commit/stash first.' -ForegroundColor Red
  exit 1
}

npm run build

$tempDir = Join-Path $root '.deploy-tmp'
if (Test-Path $tempDir) {
  Remove-Item -Recurse -Force $tempDir
}
New-Item -ItemType Directory -Path $tempDir | Out-Null
Copy-Item -Path (Join-Path $root 'dist\*') -Destination $tempDir -Recurse -Force

$currentBranch = (git branch --show-current).Trim()
if (-not $currentBranch) {
  $currentBranch = 'main'
}

$deployExists = $false
git show-ref --verify --quiet refs/heads/deploy
if ($LASTEXITCODE -eq 0) { $deployExists = $true }

if ($deployExists) {
  git branch -D deploy
}

git checkout --orphan deploy
Get-ChildItem -Force | Where-Object { $_.Name -ne '.git' } | Remove-Item -Recurse -Force

Copy-Item -Path (Join-Path $tempDir '*') -Destination $root -Recurse -Force
Remove-Item -Recurse -Force $tempDir

git add -A
git commit -m ("Deploy " + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'))
git push -f origin deploy

git checkout $currentBranch
