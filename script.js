async function search() {
  // 获取用户输入的字
  const inputWord = document.getElementById('inputWord').value;

  // 从JSON文件加载字典和异体字数据
  const dictionary = await fetch('字典.json')
    .then(response => response.json());

  const variants = await fetch('異體字.json')
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
    document.getElementById('result').innerHTML = '未找到相关信息。';
    return;
  }

  // 在字典中查找每个异体字的释义，并在表格中显示结果
  let tableHTML = '<table border="1"><tr><th>字</th><th>書名</th><th>部件</th><th>注文</th><th>備註</th></tr>';
  const results = [];
  for (const variant of variantGroup) {
    const entries = dictionary.filter(entry => entry.字.includes(variant));
    for (const entry of entries) {
      // 如果结果中已经有相同的记录，则跳过
      if (!results.some(result => JSON.stringify(result) === JSON.stringify(entry))) {
        results.push(entry);
        tableHTML += `<tr><td>${entry.字}</td><td>${entry.書名}</td><td>${entry.部件}</td><td>${entry.注文}</td><td>${entry.備註}</td></tr>`;
      }
    }
  }
  tableHTML += '</table>';

  document.getElementById('result').style.display = 'block';
}
