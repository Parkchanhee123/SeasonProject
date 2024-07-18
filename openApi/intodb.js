import fs from 'fs';
import mysql from 'mysql2/promise';

// MySQL 데이터베이스 연결 설정
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'hospital_data',
};

async function saveToDatabase(data) {
  const connection = await mysql.createConnection(dbConfig);

  try {
    const query = 'INSERT INTO hospitals (addr, XPos, YPos, clCd, clCdNm, cmdcGdrCnt, cmdcIntnCnt, cmdcResdntCnt, cmdcSdrCnt, detyGdrCnt, detyIntnCnt, detyResdntCnt, detySdrCnt, drTotCnt, emdongNm, estbDd, hospUrl, mdeptGdrCnt, mdeptIntnCnt, mdeptResdntCnt, mdeptSdrCnt, pnursCnt, postNo, sgguCd, sgguCdNm, sidoCd, sidoCdNm, telno, yadmNm, ykiho) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    for (const item of data) {
      const {
        addr = null,
        XPos = null,
        YPos = null,
        clCd = null,
        clCdNm = null,
        cmdcGdrCnt = null,
        cmdcIntnCnt = null,
        cmdcResdntCnt = null,
        cmdcSdrCnt = null,
        detyGdrCnt = null,
        detyIntnCnt = null,
        detyResdntCnt = null,
        detySdrCnt = null,
        drTotCnt = null,
        emdongNm = null,
        estbDd = null,
        hospUrl = null,
        mdeptGdrCnt = null,
        mdeptIntnCnt = null,
        mdeptResdntCnt = null,
        mdeptSdrCnt = null,
        pnursCnt = null,
        postNo = null,
        sgguCd = null,
        sgguCdNm = null,
        sidoCd = null,
        sidoCdNm = null,
        telno = null,
        yadmNm = null,
        ykiho = null
      } = item;

      await connection.execute(query, [
        addr, XPos, YPos, clCd, clCdNm, cmdcGdrCnt, cmdcIntnCnt, cmdcResdntCnt, cmdcSdrCnt,
        detyGdrCnt, detyIntnCnt, detyResdntCnt, detySdrCnt, drTotCnt, emdongNm, estbDd, hospUrl,
        mdeptGdrCnt, mdeptIntnCnt, mdeptResdntCnt, mdeptSdrCnt, pnursCnt, postNo, sgguCd,
        sgguCdNm, sidoCd, sidoCdNm, telno, yadmNm, ykiho
      ]);
    }

    console.log('Data has been saved to the database');
  } catch (error) {
    console.error('Error saving to database:', error);
  } finally {
    await connection.end();
  }
}

// JSON 파일을 읽습니다.
fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  
  try {
    const jsonData = JSON.parse(data);

    // 필요한 값을 추출합니다.
    const items = jsonData.response.body.items.item;

    // 각 병원의 데이터를 저장할 배열을 생성합니다.
    const hospitalData = items.map(item => ({
      addr: item.addr,
      XPos: parseFloat(item.XPos),
      YPos: parseFloat(item.YPos),
      clCd: item.clCd,
      clCdNm: item.clCdNm,
      cmdcGdrCnt: parseInt(item.cmdcGdrCnt, 10),
      cmdcIntnCnt: parseInt(item.cmdcIntnCnt, 10),
      cmdcResdntCnt: parseInt(item.cmdcResdntCnt, 10),
      cmdcSdrCnt: parseInt(item.cmdcSdrCnt, 10),
      detyGdrCnt: parseInt(item.detyGdrCnt, 10),
      detyIntnCnt: parseInt(item.detyIntnCnt, 10),
      detyResdntCnt: parseInt(item.detyResdntCnt, 10),
      detySdrCnt: parseInt(item.detySdrCnt, 10),
      drTotCnt: parseInt(item.drTotCnt, 10),
      emdongNm: item.emdongNm,
      estbDd: item.estbDd,
      hospUrl: item.hospUrl,
      mdeptGdrCnt: parseInt(item.mdeptGdrCnt, 10),
      mdeptIntnCnt: parseInt(item.mdeptIntnCnt, 10),
      mdeptResdntCnt: parseInt(item.mdeptResdntCnt, 10),
      mdeptSdrCnt: parseInt(item.mdeptSdrCnt, 10),
      pnursCnt: parseInt(item.pnursCnt, 10),
      postNo: item.postNo,
      sgguCd: item.sgguCd,
      sgguCdNm: item.sgguCdNm,
      sidoCd: item.sidoCd,
      sidoCdNm: item.sidoCdNm,
      telno: item.telno,
      yadmNm: item.yadmNm,
      ykiho: item.ykiho
    }));

    // 데이터베이스에 저장합니다.
    saveToDatabase(hospitalData);
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
});
