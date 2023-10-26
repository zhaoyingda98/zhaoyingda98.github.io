function loadData(file, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', file, true);  // 直接使用文件名
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200 || xhr.status == 0) {
        const data = JSON.parse(xhr.responseText);
        callback(data);
      } else {
        console.error('Failed to load file ' + file);
      }
    }
  };
  xhr.send(null);
}

function search() {
  loadData('listA.json', function (listA) {
    loadData('listC.json', function (listC) {
      const inputWord = document.getElementById("inputWord").value;
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = "";

      let listB = [];
      for (const key in listA) {
        if (listA[key].includes(inputWord)) {
          listB = listA[key];
          break;
        }
      }

      if (listB.length === 0) {
        resultDiv.innerHTML = "未找到相关字词。";
        return;
      }

      listB.forEach(word => {
        const entry = listC.find(item => item.字 === word);
        if (entry) {
          const entryDiv = document.createElement("div");
          entryDiv.innerHTML = `
            <h3>${entry.字}</h3>
            <p><strong>书名:</strong> ${entry.書名}</p>
            <p><strong>部件:</strong> ${entry.部件}</p>
            <p><strong>注文:</strong> ${entry.注文}</p>
            <p><strong>备注:</strong> ${entry.備註}</p>
          `;
          resultDiv.appendChild(entryDiv);
        }
      });
    });
  });
}
