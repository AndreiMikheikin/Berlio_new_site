import { syncNewsJson } from './syncNewsJson.js';

(async () => {
  try {
    await syncNewsJson();
    console.log('newsData.json создан успешно');
  } catch (err) {
    console.error('Ошибка:', err);
  }
})();
