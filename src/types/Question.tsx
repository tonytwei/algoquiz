export type QFilter = {
  [key: string]: any;
  easy: Boolean;
  medium: Boolean;
  hard: Boolean;
  array: Boolean;
  twoPointers: Boolean;
  slidingWindow: Boolean;
  stack: Boolean;
  binarySearch: Boolean;
  linkedList: Boolean;
  trees: Boolean;
  heap: Boolean;
  backtracking: Boolean;
  graphs: Boolean;
  dynamicProgramming: Boolean;
  greedy: Boolean;
  set: String;
};

export type QAnswer = {
  answer: Number;
};

type QExample = {
  input: string;
  output: string;
};

type QQuestion = {
  questionText: string;
  answer: number;
  options: [string];
};

export type QData = {
  id: number;
  title: string;
  difficulty: string;
  topics: string[];
  sets: string[];
  description: string;
  examples: QExample[];
  constraints: string[];
  questions: QQuestion[];
};

export interface QListElem {
  id: string;
  title: string;
  difficulty: string;
  saved: boolean;
  completed: boolean;
}
