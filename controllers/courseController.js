const db = require('../m/db');

exports.recommendCourses = async (req, res) => {
  const { userId } = req.params;
  // Step 1: Get keywords from browsing_logs for this user, order by count DESC
  const [logs] = await db.execute('SELECT keyword, count FROM browsing_logs WHERE user_id=?', [userId]);
  const keywords = logs.map(l => l.keyword);
  // Step 2: Find courses whose tags/description/title match most of those keywords (simple relevance)
  // This is your AI logic! Score and recommend.
  let q = 'SELECT *, (';
  keywords.forEach((kw, i) => {
    q += `LOCATE('${kw}', tags)+LOCATE('${kw}', title)+LOCATE('${kw}', description)`;
    if (i < keywords.length - 1) q += ' + ';
  });
  q += ') AS score FROM courses ORDER BY score DESC LIMIT 5';
  const [courses] = await db.execute(q);
  res.json({ recommendations: courses });
};
