import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const config = await readFile(new URL('../public/admin/config.yml', import.meta.url), 'utf8');
const schema = await readFile(new URL('../src/content.config.ts', import.meta.url), 'utf8');

// The `cover` pattern from the content schema, so the test follows any change to it.
function coverPattern() {
  const match = schema.match(/cover: z\.string\(\)\.regex\(\/(.*)\/,\s*'/);
  assert.ok(match, 'src/content.config.ts has no cover regex');
  return new RegExp(match[1]);
}

// The value of `key` in a flow mapping line such as `- { name: cover, public_folder: /x }`.
function option(line, key) {
  return line.match(new RegExp(`\\b${key}: ([^,}]+)`))?.[1].trim();
}

// Each collection's name and lines, from `  - name: <name>` to the next collection.
function collections() {
  const result = [];
  for (const line of config.split(/\r?\n/)) {
    const start = line.match(/^ {2}- name: (\S+)/);
    if (start) {
      result.push({ name: start[1], lines: [] });
    } else if (result.length > 0) {
      result.at(-1).lines.push(line);
    }
  }
  return result;
}

test('every collection with a cover field uploads to the folder the cover schema accepts', () => {
  const pattern = coverPattern();
  const globalMedia = config.match(/^media_folder: (.+)$/m)?.[1].trim();
  const globalPublic = config.match(/^public_folder: (.+)$/m)?.[1].trim();
  const withCover = collections().filter(({ lines }) => lines.some((line) => /\bname: cover\b/.test(line)));
  assert.ok(withCover.length > 0, 'no collection has a cover field');

  for (const { name, lines } of withCover) {
    const field = lines.find((line) => /\bname: cover\b/.test(line));
    const collectionMedia = lines.find((line) => /^ {4}media_folder: /.test(line))?.split(': ')[1].trim();
    const collectionPublic = lines.find((line) => /^ {4}public_folder: /.test(line))?.split(': ')[1].trim();
    const media = option(field, 'media_folder') ?? collectionMedia ?? globalMedia;
    const publicFolder = option(field, 'public_folder') ?? collectionPublic ?? globalPublic;

    assert.equal(publicFolder, `/assets/uploads/${name}`, `${name}: cover public_folder`);
    assert.equal(media, `/public/assets/uploads/${name}`, `${name}: cover media_folder`);
    assert.match(`${publicFolder}/example.webp`, pattern, `${name}: an uploaded cover fails the cover schema`);
  }
});
