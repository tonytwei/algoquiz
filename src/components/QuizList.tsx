"use client";
import { diffMap, diffColorMap } from "@/types/Filter";
import { useRouter } from "next/navigation";
import { QListElem } from "@/types/Question";

export default function QuizList(props: {
  qList: QListElem[];
  useOverlay: boolean;
  setShowList: any;
  updateUserSaved: any;
  updateUserCompleted: any;
}) {
  const router = useRouter();

  return (
    <div
      className={`text-white flex flex-col w-vw h-vh items-center gap-4
      ${props.useOverlay ? "fixed inset-0 bg-black/50" : ""}`}
    >
      <table className="bg-overlay font-normal rounded-md">
        <thead>
          <tr>
            <th className="py-2 px-4 font-normal hidden sm:table-cell">
              Saved
            </th>
            <th className="py-2 px-4 font-normal hidden sm:table-cell">
              Completed
            </th>
            <th className="py-2 px-4 font-normal">Problem</th>
            <th className="py-2 px-4 font-normal">Difficulty</th>
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
                <td className="hidden sm:table-cell">
                  <div className="h-full w-full flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={question.saved}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      onChange={(e) => {
                        props.updateUserSaved(e.target.checked, question.id);
                      }}
                      className="checkbox-square checkbox-unchecked checkbox-checked-yellow"
                    />
                  </div>
                </td>
                <td className="hidden sm:table-cell">
                  <div className="h-full w-full flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={question.completed}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      onChange={(e) => {
                        props.updateUserCompleted(
                          e.target.checked,
                          question.id,
                          false
                        );
                      }}
                      className="checkbox-square checkbox-unchecked checkbox-checked-green"
                    />
                  </div>
                </td>
                <td className="text-left pl-4 sm:pl-0">{question.title}</td>
                <td className={`${diffColor} text-center`}>
                  {diffMap.get(question.difficulty)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        className={`flex-col items-center ${
          props.useOverlay ? "flex" : "hidden"
        }`}
      >
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
