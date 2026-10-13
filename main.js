// App icons around the Basebox logo. Empty slots give the grid breathing room.
const appIcons = [
  '', '', 'trello', '', 'airtable', '', '',
  '', 'airtable', '', 'notion', 'meet', 'dropbox', '',
  'linear', '', 'clickup', 'basebox', 'asana', '', 'teams',
  '', 'product-hunt', '', 'todoist', 'jira', '', '',
  '', 'loom', '', 'slack', '', 'whatsapp', ''
];

const appGrid = document.querySelector('#app-grid');

appIcons.forEach(function (name) {
  const tile = document.createElement('span');
  tile.className = 'app';
  tile.setAttribute('aria-hidden', 'true');

  if (name) {
    const image = document.createElement('img');
    image.src = 'images/' + name + '.svg';
    image.alt = '';
    tile.append(image);
  } else {
    tile.classList.add('empty');
  }

  if (name === 'basebox') tile.classList.add('center');
  appGrid.append(tile);
});

// Sample tasks for the dashboard preview. This is demo data.
const columns = ['To do', 'In progress', 'Planned', 'Completed'];
const tasks = [
  'Improve search results', 'Calendar integration',
  'Custom notifications', 'Export feedback',
  'Workspace themes', 'Public API access',
  'Better onboarding', 'Mobile dashboard'
];
const board = document.querySelector('#board');

function showBoard(offset = 0) {
  board.replaceChildren();

  columns.forEach(function (label, columnIndex) {
    const column = document.createElement('div');
    column.className = 'column';

    const heading = document.createElement('h4');
    heading.textContent = label + ' · ' + (columnIndex + 3);
    column.append(heading);

    for (let taskIndex = 0; taskIndex < 3; taskIndex++) {
      const card = document.createElement('div');
      card.className = 'task';

      const title = document.createElement('b');
      const index = (columnIndex * 2 + taskIndex + offset) % tasks.length;
      title.textContent = tasks[index];

      const description = document.createElement('p');
      description.textContent = 'A better experience for everyone in the workspace.';

      const tag = document.createElement('em');
      tag.textContent = '● Product improvement    ↑ ' + (12 + columnIndex * 4 + taskIndex);

      card.append(title, description, tag);
      column.append(card);
    }

    board.append(column);
  });
}
showBoard();

// Change the selected tab and refresh the sample cards.
const tabs = document.querySelectorAll('[data-tab]');
tabs.forEach(function (tab, index) {
  tab.addEventListener('click', function () {
    tabs.forEach(function (otherTab) {
      otherTab.classList.remove('active');
      otherTab.setAttribute('aria-selected', 'false');
    });

    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    document.querySelector('#board-title').textContent = tab.dataset.tab;
    showBoard(index);
  });
});

// Open and close the navigation on small screens.
const menuButton = document.querySelector('.menu');
const navigation = document.querySelector('.nav nav');
menuButton.addEventListener('click', function () {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
navigation.addEventListener('click', function () {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
});

// Explain demo buttons instead of pretending a real account was created.
const dialog = document.querySelector('dialog');
document.querySelectorAll('[data-demo]').forEach(function (button) {
  button.addEventListener('click', function () { dialog.showModal(); });
});
document.querySelectorAll('.dialog-close, .dialog-ok').forEach(function (button) {
  button.addEventListener('click', function () { dialog.close(); });
});
