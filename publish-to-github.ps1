param(
  [ValidateSet('public', 'private')]
  [string]$Visibility = 'public',

  [string]$Repository = 'JeffreySanford/angular-signals-map-join'
)

$ErrorActionPreference = 'Stop'

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw 'GitHub CLI is not installed. Install it from https://cli.github.com/ and run this script again.'
}

gh auth status

if (-not (Test-Path '.git')) {
  git init -b main
  git add .
  git commit -m 'Create Angular signals Map join example'
}

$visibilityFlag = if ($Visibility -eq 'private') { '--private' } else { '--public' }

gh repo create $Repository $visibilityFlag --source . --remote origin --push

Write-Host "Published: https://github.com/$Repository"
