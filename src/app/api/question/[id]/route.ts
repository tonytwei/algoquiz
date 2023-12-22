import { NextResponse, NextRequest } from 'next/server';

const sampleData = {
  "id": 76,
  "title": "76. Minimum Window Substring",
  "difficulty": "hard",
  "topics": [
    "array",
    "twoPointers",
    "slidingWindow"
  ],
  "sets" : [],
  "description": "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string \"\".\n\nThe testcases will be generated such that the answer is unique.",
  "examples": [
    {
      "input": "s = \"ADOBECODEBANC\", t = \"ABC\"",
      "output": "\"BANC\""
    },
    {
      "input": "s = \"a\", t = \"a\"",
      "output": "\"a\""
    },
    {
      "input": "s = \"a\", t = \"aa\"",
      "output": "\"\""
    }
  ],
  "constraints": [
    "m == s.length",
    "n == t.length",
    "1 <= m, n <= 105",
    "s and t consist of uppercase and lowercase English letters."
  ],
  "questions": [
    {
      "questionText": "Question 1",
      "answer": 1,
      "options": ["0","1","2","3"]
    },
    {
      "questionText": "Question 2",
      "answer": 2,
      "options": ["0","1","2","3"]
    }
  ]
}


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id
  console.log("/app/api/question/" + id)
  
  return NextResponse.json(sampleData, { status: 200 })
  // return NextResponse.json({
  //   id: id,
  //   title: "TITLE",
  //   difficulty: "DIFFICULTY"
  // }, { status: 200 })
}