{\rtf1\ansi\ansicpg936\cocoartf2757
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw8400\paperh11900\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 function searchWord() \{\
    var word = document.getElementById('word').value;\
    // \uc0\u22312 \u36825 \u37324 \u21457 \u36865 \u35831 \u27714 \u33719 \u21462 \u23383 \u20856 \u25968 \u25454 \u65292 \u28982 \u21518 \u23558 \u32467 \u26524 \u26174 \u31034 \u22312 #result\u20803 \u32032 \u20013 \
    // \uc0\u31034 \u20363 \u65306 \u21487 \u20197 \u20351 \u29992 Fetch API\u21457 \u36865 GET\u35831 \u27714 \
    fetch('dictionary.json')\
        .then(response => response.json())\
        .then(data => \{\
            var resultElement = document.getElementById('result');\
            if (data[word]) \{\
                resultElement.innerHTML = `<strong>$\{word\}:</strong> $\{data[word]\}`;\
            \} else \{\
                resultElement.innerHTML = 'Word not found in the dictionary.';\
            \}\
        \})\
        .catch(error => \{\
            console.error('Error:', error);\
        \});\
\}\
}