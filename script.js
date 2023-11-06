async function search() {
  const inputWord = document.getElementById('inputWord').value.trim();

  if (!inputWord) {
    alert('请输入一个字进行查询。');
    return;
  }

  // 假设您已经把字典数据分割到多个文件
  const fileNames = [
    'dictionarydata1.json',
    'dictionarydata2.json',
    // ...其他分割后的文件名
  ];

  // 使用 Promise.all 来并行加载所有分割后的 JSON 文件
  const dictionaryParts = await Promise.all(
    fileNames.map(fileName =>
      fetch(fileName).then(response => response.json())
    )
  );

  // 合并所有分割后的数据到一个数组中
  const dictionary = dictionaryParts.flat();

  // 加载异体字数据
  const variants = await fetch('variantcharacters.json').then(response => response.json());

  let variantGroup;
  for (const group of Object.entries(variants)) {
    if (group[1].includes(inputWord)) {
      variantGroup = group[1];
      break;
    }
  }

  if (!variantGroup) {
    alert('未找到相关信息。');
    return;
  }

  // 初始化每本书的搜索结果容器
  const bookResults = {
    '名義': [],
    '字鏡': [],
    '類抄': [],
    '廣雅': [],
    '經典釋文': []
    // 如果有第六本书的话，在这里添加
  };

  // 对每一个异体字进行搜索
  for (const variant of variantGroup) {
    const entries = dictionary.filter(entry => entry.字頭.includes(variant));
    for (const entry of entries) {
      if (bookResults.hasOwnProperty(entry.書名)) {
        bookResults[entry.書名].push(entry);
      }
    }
  }

  // 为每本书创建表格并填充到对应的容器
  for (const bookName in bookResults) {
    const entries = bookResults[bookName];
    let tableHTML = entries.length > 0 ? createTable(bookName, entries) : '<p>无結果。</p>';
    // 在这里添加标题
    let titleHTML = `<h2 style="text-align: center;">${bookName}</h2>`;
    document.getElementById(`result-${bookName}`).innerHTML = tableHTML;
  }
}

// 创建表格的函数
function createTable(bookName, entries) {
  let tableHTML = `<h2>${bookName}</h2><table>`;
  tableHTML += '<tr><th>字頭</th><th>書名</th><th>部目</th><th>註文</th><th>備註</th></tr>';
  entries.forEach((entry, index) => {
    tableHTML += `<tr class="${index % 2 === 0 ? 'even' : 'odd'}"><td>${entry.字頭}</td><td>${entry.書名}</td><td>${entry.部目}</td><td>${entry.註文}</td><td>${entry.備註}</td></tr>`;
  });
  tableHTML += '</table>';
  return tableHTML;
}

// 监听输入框的键盘事件
document.getElementById('inputWord').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // 阻止默认的Enter键行为
    search(); // 调用search函数
  }
});
