import pages from './pages';
import('./styles.css');

const pageNames = ['login', 'main', 'profile'];

document.addEventListener('click', () => {
  const pageName = getRandomElement(pageNames);
  pages.openPage(pageName);
});
function getRandomElement(array) {
  if (!array.length) {
    return null;
  }

  const index = Math.round(Math.random() * (array.length - 1));

  return array[index];
};
