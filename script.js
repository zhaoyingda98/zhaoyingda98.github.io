function loadData(file, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', file, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200 || xhr.status == 0) {
        const data = JSON.parse(xhr.responseText);
        callback(null, data);  // 第一个参数是错误信息，第二个参数是数据
      } else {
        console.error('Failed to load file ' + file);
        callback('Failed to load file ' + file);  // 将错误信息传递给回调函数
      }
    }
  };
  xhr.send(null);
}

function search() {
  loadData('listA.json', function (err, listA) {
    if (err) {
      console.error(err);
      return;
    }

    loadData('listC.json', function (err, listC) {
      if (err) {
        console.error(err);
        return;
      }

      const inputWord = document.getElementById("inputWord").value;
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = "";

      let listB = [];
      for (const key in listA) {
        if (listA[key].includes(inputWord)) {
          listB = listA[key];
        }
      }

      if (listB.length === 0) {
        resultDiv.innerHTML = "未找到相关字词。";
        return;
      }

      // 生成 listB 结束，接下来遍历 listB
      listB.forEach(word => {
        const entries = listC.filter(item => item.字 === word);
        entries.forEach(entry => {
          const entryDiv = document.createElement("div");
          entryDiv.innerHTML = `
            <h3>${entry.字}</h3>
            <p><strong>书名:</strong> ${entry.書名}</p>
            <p><strong>部件:</strong> ${entry.部件}</p>
            <p><strong>注文:</strong> ${entry.注文}</p>
            <p><strong>备注:</strong> ${entry.備註}</p>
          `;
          resultDiv.appendChild(entryDiv);
        });
      });
    });
  });
}
