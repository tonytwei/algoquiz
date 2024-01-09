"use client";
import { useState } from "react";
import {
  diffs,
  diffMap,
  topics,
  topicMap,
  sets,
  setMap,
} from "../types/Filter";

export default function QuizFilter(props: {
  showFilter: boolean;
  registerFilter: any;
  onSubmitFilter: any;
  handleSubmitFilter: any;
  resetFilter: any;
  setShowFilter: any;
}) {
  return (
    <div
      className={`${
        props.showFilter ? "absolute inset-0 bg-black/50 py-8 px-10" : ""
      }`}
    >
      <div
        className={`${
          props.showFilter
            ? "flex flex-col items-center gap-4"
            : "hidden md:block"
        }`}
      >
        <form
          id="filter"
          onSubmit={props.handleSubmitFilter(props.onSubmitFilter)}
          className={`flex flex-col bg-overlay rounded-md p-5 w-max h-min gap-4 text-white`}
        >
          <div>
            <h2 className="text-teal-300 text-xl">DIFFICULTY:</h2>
            {diffs.map((diff, index) => (
              <label
                key={index}
                htmlFor={diff}
                className="flex flex-row gap-3 items-center"
              >
                <input
                  type="checkbox"
                  {...props.registerFilter(`${diff}` as any)}
                  id={diff}
                  className="checkbox-square checkbox-unchecked checkbox-checked-green"
                />
                <label htmlFor={diff}>{diffMap.get(diff)}</label>
              </label>
            ))}
          </div>
          <div>
            <h2 className="text-teal-300 text-xl">TOPICS:</h2>
            {topics.map((topic, index) => (
              <label
                key={index}
                htmlFor={topic}
                className="flex flex-row gap-3 items-center"
              >
                <input
                  type="checkbox"
                  {...props.registerFilter(`${topic}` as any)}
                  id={topic}
                  className="checkbox-square checkbox-unchecked checkbox-checked-green"
                />
                <label htmlFor={topic}>{topicMap.get(topic)}</label>
              </label>
            ))}
          </div>
          <div>
            <h2 className="text-teal-300 text-xl">SET:</h2>
            <select
              {...props.registerFilter("set")}
              className="text-black w-full rounded-sm"
            >
              {sets.map((set, index) => (
                <option key={index} value={set}>
                  {setMap.get(set)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => props.resetFilter()}
              className="checkbox-unchecked w-full text-black py-1 px-2 text-sm rounded-md"
            >
              CLEAR FILTERS
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={() => props.setShowFilter(false)}
            className={`${
              props.showFilter ? "" : "hidden"
            } checkbox-unchecked w-min text-black py-1 px-2 text-sm rounded-md`}
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
