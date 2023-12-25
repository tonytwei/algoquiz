"use client";

export default function QuizList(props: {
  saved: [String];
  completed: [String];
}) {
  return (
    <div className="absolute inset-0 bg-black/50 flex flex-col w-vw h-vh items-center gap-4">
      <table>
        <thead>
          <tr>
            <th>Saved</th>
            <th>Completed</th>
            <th>Problem</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {}
          <tr>
            {/* <td><input type="checkbox" name="saved" value="questionID"></td>
                <td><input type="checkbox" name="completed" value="questionID"></td> */}
            <td>Title</td>
            <td>Difficulty</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
