const fs = require('fs');
const csvParse = require('csv-parse');
const db = require('../m/db');
const { parseBrowsingLog } = require('../utils/parseBrowsing');

exports.handleUpload = async (req, res) => {
  const { userId } = req.params;
  const file = req.file;

  if (!file) return res.status(400).json({ msg: 'No file uploaded' });

  // Example for CSV: adjust as needed
  const content = fs.readFileSync(file.path, 'utf8');
  const keywords = await parseBrowsingLog(content); // returns {keyword,count}
  // store keywords in browsing_logs
  for (const entry of keywords) {
    await db.execute(
      'INSERT INTO browsing_logs (user_id, url, keyword, count) VALUES (?, ?, ?, ?)',
      [userId, entry.url, entry.keyword, entry.count]
    );
  }
  res.json({ msg: 'Logs uploaded successfully', keywords });
};
