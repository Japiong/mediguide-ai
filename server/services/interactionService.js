const db = require('../db');

const checkInteractions = async (drugIds) => {
  if (!drugIds || drugIds.length < 2) {
    return { interactions: [], message: 'Select at least 2 drugs to check interactions.' };
  }

  const ids = drugIds.map(Number).filter(n => !isNaN(n));

  if (ids.length < 2) {
    return { interactions: [], message: 'Invalid drug IDs provided.' };
  }

  // Get all pairwise interactions
  const result = await db.query(
    `SELECT
       i.id,
       i.severity,
       i.description,
       d1.id as drug1_id,
       d1.name as drug1_name,
       d2.id as drug2_id,
       d2.name as drug2_name
     FROM interactions i
     JOIN drugs d1 ON i.drug1_id = d1.id
     JOIN drugs d2 ON i.drug2_id = d2.id
     WHERE
       (i.drug1_id = ANY($1) AND i.drug2_id = ANY($1))
     ORDER BY
       CASE i.severity
         WHEN 'severe' THEN 1
         WHEN 'moderate' THEN 2
         WHEN 'mild' THEN 3
       END`,
    [ids]
  );

  // Also get the drug names for the input IDs
  const drugNames = await db.query(
    `SELECT id, name FROM drugs WHERE id = ANY($1)`,
    [ids]
  );

  return {
    interactions: result.rows,
    drugs: drugNames.rows,
    hasSevere: result.rows.some(r => r.severity === 'severe'),
    hasModerate: result.rows.some(r => r.severity === 'moderate'),
    summary: summarizeInteractions(result.rows)
  };
};

const summarizeInteractions = (interactions) => {
  if (interactions.length === 0) return 'No known interactions found between the selected drugs.';
  const severe = interactions.filter(i => i.severity === 'severe').length;
  const moderate = interactions.filter(i => i.severity === 'moderate').length;
  const mild = interactions.filter(i => i.severity === 'mild').length;
  const parts = [];
  if (severe > 0) parts.push(`${severe} severe`);
  if (moderate > 0) parts.push(`${moderate} moderate`);
  if (mild > 0) parts.push(`${mild} mild`);
  return `Found ${interactions.length} interaction(s): ${parts.join(', ')}.`;
};

module.exports = { checkInteractions };
