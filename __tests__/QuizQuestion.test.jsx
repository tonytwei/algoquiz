import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import QuizQuestion from '../src/components/QuizQuestion';

describe('QuizQuestion', () => {
  const mockQData = {
      "_id": "6587758c3acaa78878248734",
      "id": "217",
      "title": "Contains Duplicate",
      "difficulty": "easy",
      "topics": [
          "array"
      ],
      "sets": [
          "gdsc-array"
      ],
      "description": "Given an integer array 'nums', return 'true' if any value appears at least twice in the array, return 'false' if every element is distinct",
      "examples": [
          {
              "_id": "6648432ad9a3b666f76546fa",
              "input": "nums = [1,2,3,1]",
              "output": "true"
          },
          {
              "_id": "6648432ad9a3b666f76546fb",
              "input": "nums = [1,2,3,4]",
              "output": "false"
          }
      ],
      "constraints": [
          "1 <= nums.length <= 10^5",
          "-10^9 <= nums[i] <= 10^9"
      ],
      "questions": [
          {
              "_id": "6648432ad9a3b666f76546fc",
              "questionText": "What is the time complexity if we compare an element with every other element?",
              "answer": 3,
              "options": [
                  "O(1)",
                  "O(n)",
                  "O(nlogn)",
                  "O(n^2)"
              ]
          },
          {
              "_id": "6648432ad9a3b666f76546fd",
              "questionText": "What is the time complexity if we sort the array and then compare adjacent elements?",
              "answer": 2,
              "options": [
                  "O(1)",
                  "O(n)",
                  "O(nlogn)",
                  "O(n^2)"
              ]
          }
      ]
  };

  test('renders QuizQuestion component without crashing', () => {
    render(<QuizQuestion qData={mockQData} />);
  });

  test('renders description', () => {
    render(<QuizQuestion qData={mockQData} />);
    expect(screen.getByText(mockQData.description)).toBeInTheDocument();
  });

  test('renders examples', () => {
    render(<QuizQuestion qData={mockQData} />);
    mockQData.examples.forEach(example => {
      expect(screen.getByText(`Input: ${example.input}`)).toBeInTheDocument();
      expect(screen.getByText(`Output: ${example.output}`)).toBeInTheDocument();
    });
  });

  test('renders constraints', () => {
    render(<QuizQuestion qData={mockQData} />);
    mockQData.constraints.forEach(constraint => {
      expect(screen.getByText(constraint)).toBeInTheDocument();
    });
  });
});