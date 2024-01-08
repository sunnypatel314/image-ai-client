import React from "react";

import { download } from "../assets";
import { downloadImage } from "../utils";
import { FaTrash } from "react-icons/fa";

const Card = ({ _id, name, prompt, photo, postId, user, allPosts }) => {
  const confirmDeletion = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmation) {
      deletePost();
    }
  };
  const deletePost = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/post/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.status);
      if (response.status == 204) {
        console.log("Successfully deleted:");
        window.location.reload();
      } else {
        alert("Something went wrong. Post was not deleted.");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={photo}
        alt={prompt}
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <div
            className="outline-none bg-transparent border-none flex 
            flex-row justify-center items-center space-x-3"
          >
            <button type="button" onClick={() => downloadImage(_id, photo)}>
              <img
                src={download}
                alt="download"
                className="w-6 h-6 object-contain invert"
              />
            </button>
            {user == name && (
              <FaTrash
                onClick={confirmDeletion}
                className="w-6 h-6 text-white bg-transparent hover:text-red-500 hover:cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
