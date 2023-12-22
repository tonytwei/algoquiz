export interface QFilter {
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
}

export interface QAnswer {
    answer: Number
}

type QExample = {
    input: string
    output: string
}

type QQuestion = {
    questionText: string
    answer: number
    options: [string]
}

export type QData = {
    id: number
    title: string
    difficulty: string
    topcs: [string]
    sets: [string]
    description: string
    examples: [QExample]
    constraints: [string]
    questions: [QQuestion]
}

export const diffColorMap = new Map<string, string>([
    ["easy", "text-[#89ff8d]"],
    ["medium", "text-[#ffd23e]"],
    ["hard", "text-[#F44336]"],
])