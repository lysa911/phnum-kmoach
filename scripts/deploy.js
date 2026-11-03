import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function run(cmd, cwd = process.cwd()) {
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: 'inherit', cwd });
}

try {
  console.log('Building project...');
  run('npm run build');

  const distDir = path.resolve('dist');
  if (!fs.existsSync(distDir)) {
    throw new Error('dist directory does not exist after build');
  }

  const gitDir = path.join(distDir, '.git');
  if (fs.existsSync(gitDir)) {
    fs.rmSync(gitDir, { recursive: true, force: true });
  }

  console.log('Deploying dist to gh-pages branch...');
  run('git init', distDir);
  run('git checkout -B gh-pages', distDir);
  run('git add -A', distDir);
  run('git commit -m "deploy: update GitHub Pages build"', distDir);
  run('git remote add origin https://github.com/lysa911/phnum-kmoach.git', distDir);
  run('git push -f origin gh-pages', distDir);

  if (fs.existsSync(gitDir)) {
    fs.rmSync(gitDir, { recursive: true, force: true });
  }

  console.log('\n✅ Successfully deployed to GitHub Pages!');
  console.log('Live URL: https://lysa911.github.io/phnum-kmoach/\n');
} catch (error) {
  console.error('\n❌ Deployment failed:', error.message);
  process.exit(1);
}
