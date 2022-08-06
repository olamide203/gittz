import React, { useState, useRef, useEffect } from "react";
import { Link2Icon } from "@radix-ui/react-icons";
import { FaGithub } from "react-icons/fa";
import { BsCheckCircle, BsTwitter } from "react-icons/bs";
import { CgCloseO } from "react-icons/cg";
import useSWRImmutable, { useSWRConfig } from "swr";
import useCheckRepoIsStarred from "../../Hooks/useCheckRepoIsStarred";
import fetcher from "../../libs/fetcher";
import Toast from "./Toast";
import Tooltip from "../Tooltip";

function Repository({ item, mutateKey }) {
  const { mutate } = useSWRConfig();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({ content: "", color: "" });
  const timerRef = useRef(0);
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  // fetch language colors
  const { data: languageColors, error } = useSWRImmutable(
    "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json"
  );

  // check if repo is starred
  const { isStarred, mutate: mutateStarred } = useCheckRepoIsStarred(item);

  // console.log(checkRepoIsStarred.status);

  const showToast = (message) => {
    // set open state to false
    setOpen(false);
    // update the toast message
    setMessage(message);
    // set open state to true
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setOpen(true);
    }, 100);
  };

  const toggleStarred = async () => {
    let init, value;
    let url = `/user/starred/${item.owner.login}/${item.name}`;
    if (!isStarred) {
      init = {
        method: "PUT",
        credentials: "include",
      };
      value = true;
    } else {
      init = {
        method: "DELETE",
        credentials: "include",
      };
      value = false;
    }
    try {
      // send request to the api to update the data
      await fetcher(url, init);
      // update the local data immediately and revalidate
      await mutate(mutateKey);
      await mutateStarred({ isStarred: value });
      // show toast
      showToast({
        content: (
          <>
            <BsCheckCircle className="inline text-lg" /> '{item.name}' has been{" "}
            {`${value ? "starred" : "unstarred"}`}{" "}
          </>
        ),
        color: "green",
      });
    } catch (error) {
      showToast({
        content: (
          <>
            <CgCloseO className="inline text-lg" /> Network error occured !
          </>
        ),
        color: "red",
      });
    }
  };

  const shareRepo = () => {
    const url = encodeURI(
      `https://twitter.com/intent/tweet?text=introducing ${
        item.name
      } 🎉 🚀\n\n${item.description}\n\n${
        item.homepage ? item.homepage : ""
      }\n ${item.html_url}\n\n&hashtags=${item.topics.toString()}`
    );
    window.open(url, "_blank");
  };
  return (
    <div className="grid bg-neutral p-4 rounded gap-4 shadow">
      <h3 className="text-md break-all">{item.name}</h3>
      {item.description && <p className="text-sm">{item.description}</p>}
      {item.topics.length > 0 && (
        <div className="flex flex-row gap-2 flex-wrap w-full">
          {item.topics
            .filter((topic) => {
              return topic.length <= 20;
            })
            .slice(0, 3)
            .map((topic, index) => (
              <div
                key={index}
                className="badge badge-lg bg-blue-600 text-white border-none h-fit"
              >
                <span className="">{topic}</span>
              </div>
            ))}
        </div>
      )}
      <div className="mt-4">
        {item.homepage && (
          <a
            href={item.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-circle bg-blue-600 text-white mr-2 mb-2"
          >
            <Link2Icon className="text-xl" />{" "}
          </a>
        )}
        {item.html_url && (
          <a
            href={item.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-circle bg-blue-600 text-white mr-2 mb-2"
          >
            <FaGithub className="text-xl" />{" "}
          </a>
        )}
        <button
          className="btn rounded-3xl bg-blue-600 text-white capitalize"
          onClick={shareRepo}
        >
          <BsTwitter className="text-xl mr-2" /> share
        </button>
      </div>
      <div className="grid items-end">
        <div className="grid grid-flow-col grid-cols-auto items-center">
          <div
            className="badge badge-sm mr-1"
            style={{
              backgroundColor: `${
                languageColors && languageColors[item.language]?.color
              }`,
            }}
          ></div>
          <span className="text-white inline-grid">{item.language}</span>
          <Tooltip
            element={
              <div className="rating">
                <input
                  type="radio"
                  name={item.name}
                  className="mask mask-star-2 checked:bg-orange-400"
                  checked={isStarred || false}
                  onClick={toggleStarred}
                  readOnly
                />
              </div>
            }
            tip={`${isStarred ? "unstar repo" : "star repo"}`}
            side="left"
          />
          <span className="ml-1">
            {new Intl.NumberFormat("en-US", {
              notation: "compact",
            }).format(item.stargazers_count)}
          </span>
        </div>
      </div>
      <Toast
        content={message.content}
        open={open}
        onOpenChange={setOpen}
        color={message.color}
      />
    </div>
  );
}
export default Repository;
