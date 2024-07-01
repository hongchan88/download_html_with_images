import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import cheerio from 'cheerio';

// URL to download recursively
const url = 'https://guides.atelier.co/en/';

// Directory to save the files
const downloadDir = path.resolve('./', 'guides.atelier.co');
const imageDir = path.join(downloadDir, '/images');

// Ensure directories exist
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir);
}
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir);
}

// Function to download a file using wget recursively
function downloadRecursively(url) {
  return new Promise((resolve, reject) => {
    const wgetCommand = `wget -m -p -E -k ${url}`;
    exec(wgetCommand, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        // return; // Comment this line out to allow resolving even with stderr output
      }
      resolve(`Downloaded ${url} to`);
    });
  });
}

// Function to process HTML files and update image URLs
function processHtmlFiles(directory) {
  const files = fs.readdirSync(directory);
  console.log(files, 'files');
  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processHtmlFiles(filePath); // Recursively process subdirectories
    } else if (path.extname(file) === '.html') {
      const htmlContent = fs.readFileSync(filePath, 'utf-8');
      const $ = cheerio.load(htmlContent);

      $('img').each((i, img) => {
        const src = $(img).attr('src');
        console.log(src, 'src');
        const wgetCommand = `wget ${src.split('?')[0]} -P ${imageDir}`;
        exec(wgetCommand, (error, stdout, stderr) => {
          if (error) {
            console.log(`Error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`Stderr: ${stderr}`);
            // return; // Comment this line out to allow resolving even with stderr output
          }
          console.log(`Downloaded ${url} to ${imageDir}`);
        });
        if (src && src.startsWith('http')) {
          const imgName = path.basename(src.split('?')[0]);
          const localPath = path.join(imageDir, imgName);
          console.log(imgName, 'imgName');
          console.log(localPath, 'localPath');
          $(img).attr('src', localPath);
          const closestAnchor = $(img).closest('a');
          if (
            closestAnchor.length > 0 ||
            path.extname(closestAnchor.attr('href') !== '.html')
          ) {
            closestAnchor.attr('href', localPath);
          }
        }
      });

      fs.writeFileSync(filePath, $.html(), 'utf-8');
      console.log(`Updated HTML: ${filePath}`);
    }
  });
}

// Main function to download and process HTML files
async function main() {
  try {
    // await downloadRecursively(url);
    // console.log(`Downloaded recursively from ${url}`);
    processHtmlFiles(downloadDir);
  } catch (error) {
    console.error(error);
  }
}

main();
