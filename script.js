async function search() {
  // 获取用户输入的字
  const inputWord = document.getElementById('inputWord').value;

  // 从JSON文件加载字典和异体字数据
  const dictionary = await fetch('dictionarydata.json')
    .then(response => response.json());

  const variants = await fetch('variantcharacters.json')
    .then(response => response.json());

  // 查找包含输入字的异体字组
  let variantGroup;
  for (const group of Object.entries(variants)) {
    if (group[1].includes(inputWord)) {
      variantGroup = group[1];
      break;
    }
  }

  // 如果找不到异体字组，显示错误消息
  if (!variantGroup) {
    document.getElementById('result').innerHTML = '未找到相關信息。';
    return;
  }

  // 在字典中查找每个异体字的释义，并在表格中显示结果
  let tableHTML = '<table><tr><th>字頭</th><th>書名</th><th>部目</th><th>註文</th><th>備註</th></tr>';
  const results = [];
  for (const variant of variantGroup) {
    const entries = dictionary.filter(entry => entry.字頭.includes(variant));
    for (const entry of entries) {
      // 如果结果中已经有相同的记录，则跳过
      if (!results.some(result => JSON.stringify(result) === JSON.stringify(entry))) {
        results.push(entry);
      }
    }
  }

  // 对结果按照书名优先级排序
  const order = ['名義', '字鏡', '類抄', '廣雅', '經典釋文'];
  results.sort((a, b) => {
    const indexA = order.indexOf(a.書名);
    const indexB = order.indexOf(b.書名);
    return (indexA === -1 ? order.length : indexA) - (indexB === -1 ? order.length : indexB);
  });

  // 将排序后的结果添加到表格
  for (const entry of results) {
    tableHTML += `<tr><td>${entry.字頭}</td><td>${entry.書名}</td><td>${entry.部目}</td><td>${entry.註文}</td><td>${entry.備註}</td></tr>`;
  }
  tableHTML += '</table>';

  document.getElementById('result').innerHTML = tableHTML;
}
// 监听输入框的键盘事件
document.getElementById('inputWord').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // 阻止默认的Enter键行为
    search(); // 调用search函数
  }
});
