import assert from "node:assert/strict";
import { test } from "node:test";
import {
  prizeRowsToStructure,
  prizeStructureToRows,
} from "../src/utils/prizeStructure.js";

test("converts individual ranks and ranges to editor rows", () => {
  assert.deepEqual(prizeStructureToRows({ 1: 1000, "2-3": 500 }), [
    { startRank: 1, endRank: 1, amount: "1000" },
    { startRank: 2, endRank: 3, amount: "500" },
  ]);
});

test("missing API data produces an empty list", () => {
  for (const value of [undefined, null, {}]) {
    assert.deepEqual(prizeStructureToRows(value), []);
  }
});

test("serializes complete rows without changing the API representation", () => {
  const structure = { 1: 1000, "2-3": 500 };
  assert.deepEqual(
    prizeRowsToStructure(prizeStructureToRows(structure)),
    structure,
  );
});

test("incomplete rows are omitted", () => {
  assert.deepEqual(
    prizeRowsToStructure([
      { startRank: "", endRank: 1, amount: "100" },
      { startRank: 1, endRank: "", amount: "100" },
      { startRank: 1, endRank: 1, amount: "" },
    ]),
    {},
  );
});

test("preserves the existing distinction between numeric and string zero", () => {
  assert.deepEqual(
    prizeRowsToStructure([
      { startRank: 1, endRank: 1, amount: 0 },
      { startRank: 2, endRank: 2, amount: "0" },
    ]),
    { 2: 0 },
  );
});

test("later duplicate ranks overwrite earlier amounts", () => {
  assert.deepEqual(
    prizeRowsToStructure([
      { startRank: 1, endRank: 1, amount: "100" },
      { startRank: 1, endRank: 1, amount: "200" },
    ]),
    { 1: 200 },
  );
});

test("does not mutate editor rows", () => {
  const row = Object.freeze({ startRank: 1, endRank: 2, amount: "100" });
  assert.deepEqual(prizeRowsToStructure(Object.freeze([row])), { "1-2": 100 });
});
