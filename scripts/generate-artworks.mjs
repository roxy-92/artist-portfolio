
import { readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const source = 'public/images/portfolio';
const destination = 'src/app/artworks.generated.json';

const categories = {
  bg: 'background',
  character_design: 'character-design',
  illustration: 'illustration',
  manga: 'manga',
};

const artworks = [];

for (const [folder, category] of Object.entries(categories)) {
  const files = await readdir(join(source, folder), {
    withFileTypes: true,
  });

  const images = files
    .filter(file =>
      file.isFile() &&
      /\.(jpg|jpeg|png|webp|gif|avif)$/i.test(file.name)
    )
    .map(file => file.name)
    .sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true })
    );

  for (const filename of images) {
    artworks.push({
      id: `${folder}/${filename}`,
      title: filename
        .replace(/\.[^.]+$/, '')
        .replace(/[_-]/g, ' '),
      image: `images/portfolio/${folder}/${encodeURIComponent(filename)}`,
      category,
    });
  }
}

await writeFile(
  destination,
  JSON.stringify(artworks, null, 2) + '\n'
);

console.log(`Generated ${artworks.length} artworks.`);
