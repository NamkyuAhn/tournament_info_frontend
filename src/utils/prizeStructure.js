// API rank keys ("1", "2-3") and editor rows use different representations.
export function prizeStructureToRows(data) {
  return Object.entries(data || {}).map(([rank, amount]) => {
    const [start, end = start] = rank.split("-");

    return {
      startRank: Number(start),
      endRank: Number(end),
      amount: String(amount),
    };
  });
}

export function prizeRowsToStructure(rows) {
  const structure = {};

  for (const { startRank, endRank, amount } of rows) {
    // Keep the existing form behavior: incomplete rows are not submitted.
    if (!startRank || !endRank || !amount) continue;

    const rank =
      startRank === endRank ? String(startRank) : `${startRank}-${endRank}`;
    structure[rank] = Number(amount);
  }

  return structure;
}
