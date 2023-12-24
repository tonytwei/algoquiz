"use client";
import { NextRequest, NextResponse } from "next/server";

export default function Header(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  // TODO: continue header
  return (
    <div>
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
          <tr>
            <td>
              <input type="checkbox" name="saved" value="questionID" />
            </td>
            <td>
              <input type="checkbox" name="completed" value="questionID" />
            </td>
            <td>Title</td>
            <td>Difficulty</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
