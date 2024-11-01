import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Add content to the database
export const putDb = async (content) => {
  console.error('adding content to the database');
  const db = await openDB('jate', 1);
  const existingContent = await db.getAll('jate');

  if (existingContent.length) {
    // Update the latest entry
    const id = existingContent[existingContent.length - 1].id;
    await db.put('jate', { id, content });
  } else {
    // Add a new entry if none exists
    await db.add('jate', { content });
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('fetching content from the database');
  const db = await openDB('jate', 1);
  const allContent = await db.getAll('jate');
  return allContent.length ? allContent : null; // Return null if no content
};

// Load and display content in the editor
const loadContent = async () => {
  const contentArray = await getDb();
  if (contentArray.length) {
    const latestContent = contentArray[contentArray.length - 1];
    document.getElementById('editor').value = latestContent.content;
  } else {
    console.log('No content found in the database');
  }
};

// Initialize the database when the script runs
initdb();

// Load content when the DOM is ready
document.addEventListener('DOMContentLoaded', loadContent);

// Automatically save content as the user types
document.getElementById('editor').addEventListener('input', async () => {
  const content = document.getElementById('editor').value;
  await putDb(content);
});