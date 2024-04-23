import { encoded, translations } from './data.js'

function decode(data, translations) {
  const decodedData = data.map(item => {
    const newItem = { ...item }
    for (const key in newItem) {
      if (key.endsWith('Id') && !['groupId', 'service', 'formatSize', 'ca'].includes(key)) {
        newItem[key] = translations[newItem[key]] || newItem[key];
      }
    }
    return newItem;
  })

  const uniqueIds = new Set()

  for (const item of data){
    for (const key in item) {
      if (key.endsWith('Id') && !['groupId'].includes(key) && item[key]) {
        uniqueIds.add(item[key]);
      }
    }
  }

  return { decodedData, uniqueIds };
}

const { decodedData, uniqueIds } = decode(encoded, translations);
console.log("Расшифровка полей:", decodedData);
console.log("Уникальных id:", [...uniqueIds].sort((a, b) => a - b));
