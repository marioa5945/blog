import { resolve } from 'path';
const rimraf = require('rimraf');
const fs = require('fs');

const main = () => {
  const sourcePath = resolve('.', './data');
  let targetPath = resolve('.', './public/api');
  // markdown file list
  const mdList = fs
    .readdirSync(sourcePath)
    .filter((n: string) => n.split('.').pop() === 'md')
    .reverse();

  // delete old api
  rimraf.sync(targetPath);
  // create new api folder
  fs.mkdirSync(targetPath);

  // JSON of the directory
  const directory = mdList.map((n: string) => {
    return {
      id: n.replace('.md', ''),
    };
  });

  // Read the content of the markdown file
  for (let i = 0; i < mdList.length; i++) {
    const contentArry = fs.readFileSync(`${sourcePath}/${mdList[i]}`).toString().split('\n');

    // data handle
    let isContent = false;
    const contentArr: Array<string> = [];

    for (const str of contentArry) {
      if (str.slice(0, 1) === '#') {
        isContent = true;
      }

      if (isContent) {
        contentArr.push(str);
      } else {
        const value = /(.+): (.+)/.exec(str);
        if (value) {
          directory[i][value[1]] = value[2];
        }
      }
    }

    // Write to JSON file
    fs.writeFileSync(`${targetPath}/${mdList[i].replace('.md', '')}.json`, JSON.stringify(contentArr));
  }

  // Write to JSON file
  fs.writeFileSync(targetPath + '/directory.json', JSON.stringify(directory));

  completedTips(targetPath);
};

/**
 * Tips for completed
 * @param folderUrl
 */
const completedTips = (folderUrl: string) => {
  console.log('');
  console.log('==========================================');
  console.log('=');
  console.log('= Completed: ');
  console.log(`= ${folderUrl}`);
  console.log('=');
  console.log('==========================================');
  console.log('');
  console.log('');
};

main();
