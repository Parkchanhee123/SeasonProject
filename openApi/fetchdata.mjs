// 필요한 모듈을 가져옵니다.
import fetch from 'node-fetch';
import fs from 'fs';
import { parseString } from 'xml2js';

// 데이터를 가져올 URL을 설정합니다.
const url = 'https://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList?ServiceKey=nJLW%2F%2FXYbfpdA3ySLUbZCDDjx%2BCLWT69X%2BHHZnXAZ%2Bmi0895toD%2F4GjZ1xbW4PW1AxBG0Kye06Qim0Jbo7Z4Jg%3D%3D&pageNo=1&numOfRows=100&zipCd=06';

// fetch 함수를 사용하여 데이터를 가져옵니다.
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(xmlData => {
    // XML 데이터를 JSON으로 변환합니다.
    parseString(xmlData, { explicitArray: false }, (err, result) => {
      if (err) {
        throw err;
      }
      // 변환된 JSON 데이터를 파일로 저장합니다.
      fs.writeFile('data.json', JSON.stringify(result, null, 2), (err) => {
        if (err) {
          throw err;
        }
        console.log('Data has been saved to data.json');
      });
    });
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
