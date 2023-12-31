"use client";
import { diffMap, diffColorMap } from "@/types/Filter";
import { useRouter } from "next/navigation";
import { QListElem } from "@/types/Question";

export default function QuizList(props: {
  qList: QListElem[];
  setShowList: any;
}) {
  const router = useRouter();

  return (
    <div className="absolute inset-0 bg-black/50 flex flex-col w-vw h-vh items-center py-8 gap-4">
      <table className="bg-overlay font-normal rounded-md">
        <thead>
          <tr className="font-normal">
            <th className="py-2 px-4">Saved</th>
            <th className="py-2 px-4">Completed</th>
            <th className="py-2 px-4">Problem</th>
            <th className="py-2 px-4">Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {props.qList.map((question) => {
            let diffColor: string = diffColorMap.get(question.difficulty)!;
            return (
              <tr
                key={question.id}
                onClick={() => router.push(`/quiz/${question.id}`)}
                className="h-10 cursor-pointer hover:bg-gray-300 hover:bg-opacity-20 border-t-2 border-gray-400"
              >
                <td>
                  <div className="h-full w-full flex items-center justify-center">
                    <input
                      type="checkbox"
                      disabled={true}
                      checked={question.saved}
                      className="checkbox-square checkbox-unchecked checkbox-checked-yellow"
                    />
                  </div>
                </td>
                <td>
                  <div className="h-full w-full flex items-center justify-center">
                    <input
                      type="checkbox"
                      disabled={true}
                      checked={question.completed}
                      className="checkbox-square checkbox-unchecked checkbox-checked-green"
                    />
                  </div>
                </td>
                <td className="text-left">{question.title}</td>
                <td className={`${diffColor} text-center`}>
                  {diffMap.get(question.difficulty)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={() => props.setShowList(false)}
          className="checkbox-unchecked w-min text-black py-1 px-2 text-sm rounded-md"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}
