#!/usr/bin/env node
'use strict'

/*
 * Build the example and deploy it to the `gh-pages` branch.
 *
 * The example source lives in `example/` on the default branch. Webpack
 * compiles it into `example/build.js` (plus `example/build.js.LICENSE.txt`).
 * This script pushes those generated files, together with `example/index.html`,
 * to the root of the `gh-pages` branch so GitHub Pages can serve them.
 *
 * The `gh-pages` branch is created on first run and force-pushed on every run,
 * so it only ever contains the latest build output.
 *
 * Usage: npm run deploy-gh-pages
 */

const { execFileSync } = require('child_process')
const fs = require('fs')
const os = require('os')
const path = require('path')

const root = path.resolve(__dirname, '..')
const exampleDir = path.join(root, 'example')
const branch = 'gh-pages'
const files = ['index.html', 'build.js', 'build.js.LICENSE.txt']
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm'

function run(cmd, args, opts = {}) {
  try {
    execFileSync(cmd, args, { stdio: 'inherit', ...opts })
  } catch (err) {
    fail(`Command failed: ${cmd} ${args.join(' ')}`)
  }
}

function read(cmd, args, opts = {}) {
  try {
    return execFileSync(cmd, args, { encoding: 'utf8', ...opts }).trim()
  } catch (err) {
    return ''
  }
}

function gitConfig(key) {
  return read('git', ['config', '--get', key], { cwd: root })
}

function fail(message) {
  console.error(`✖ ${message}`)
  process.exit(1)
}

// 1. Build the example (regenerates example/build.js and its license file).
console.log('➜ Building example...')
run(npmCmd, ['run', 'build-example'], { cwd: root })

for (const file of files) {
  const src = path.join(exampleDir, file)
  if (!fs.existsSync(src)) {
    fail(`Expected build output not found: example/${file}`)
  }
}

// 2. Assemble the site in a temporary git repository and force-push it to gh-pages.
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'react-rater-gh-pages-'))

try {
  console.log(`➜ Preparing ${branch} branch in ${tmp}`)

  for (const file of files) {
    fs.copyFileSync(path.join(exampleDir, file), path.join(tmp, file))
  }

  run('git', ['init', '-q'], { cwd: tmp })
  run('git', ['checkout', '-q', '--orphan', branch], { cwd: tmp })

  const origin = gitConfig('remote.origin.url')
  if (!origin) {
    fail('No "origin" remote found. Add one before deploying.')
  }
  run('git', ['remote', 'add', 'origin', origin], { cwd: tmp })

  const name = gitConfig('user.name') || 'react-rater deploy script'
  const email = gitConfig('user.email') || 'deploy@localhost'

  run('git', ['add', '-A'], { cwd: tmp })
  run('git', [
    '-c', `user.name=${name}`,
    '-c', `user.email=${email}`,
    'commit', '-q', '-m', `Deploy example (${new Date().toISOString()})`,
  ], { cwd: tmp })
  run('git', ['push', '-q', '--force', 'origin', `${branch}:${branch}`], { cwd: tmp })

  console.log(`✔ Deployed ${files.join(', ')} to ${branch}.`)
} finally {
  fs.rmSync(tmp, { recursive: true, force: true })
}
