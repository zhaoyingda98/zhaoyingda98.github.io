const listA = {
  "a00001": ["一", "𠤪", "弌", "⿹戈一", "壹"],
  "a00002": ["丁", "𠆤"],
  "a00003": ["七", "柒"],
  "a00004": ["三", "弎", "參", "叁", "叄"],
  "a00005": ["下", "丅", "𠄟"],
  "a00006": ["丈", "𠀋", "支"],
  "a00007": ["上", "丄", "二"],
  "a00008": ["丑", "𠃠", "丒"]
};

const listC = [
  {"字": "一", "書名": "名義", "部件": "一部", "注文": "於逸反。少也，初也，同也。〔弌：古文。〕", "備註": "有埋字B。G01首"},
  {"字": "弌", "書名": "名義", "部件": "一部", "注文": "弌：古文。", "備註": "埋字B。"},
  {"字": "天", "書名": "名義", "部件": "一部", "注文": "泰堅反。顛也，顯也，君也。〔𠀡：古文。〕〔𠀘：古文。〕〔兲：古文。〕〔𠕹：古文。〕", "備註": "有埋字B。泰：原作秦。"},
  {"字": "𠀡", "書名": "名義", "部件": "一部", "注文": "𠀡：古文。", "備註": "埋字B。"}
];

function search() {
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
}
