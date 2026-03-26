import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import TravelStoryCard from "../../components/TravelStoryCard";
import { toast } from "react-toastify";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import AddEditTravelStory from "./AddEditTravelStory";
import "react-day-picker/style.css";
import ViewTravelStory from "./ViewTravelStory";
import EmptyWindow from "./EmptyWindow";
import { DayPicker } from "react-day-picker";

const Home = () => {
  const navigate = useNavigate();
  const url = "http://localhost:5000";
  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStories] = useState([]);

  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [openViewModel, setopenViewModel] = useState({
    isShown: false,
    data: null,
  });

  // get user Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/api/user/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // get all travel stories
  const getAllTravelStories = async () => {
    try {
      const response = await axiosInstance.get("/api/post/get-all-stories");
      if (response.data && response.data.stories) {
        setAllStories(response.data.stories);
      }
    } catch (error) {
      console.log("An Unexpeted error occured. Please tey again.");
      console.log(error);
    }
  };

  // Handel Edit Story Click
  const handelEdit = (data) => {
    setOpenAddEditModel({ isShown: true, type: "edit", data: data });
  };

  // Handel Travel Story Click
  const handelViewStory = (data) => {
    setopenViewModel({ isShown: true, data });
  };

  // Handel Update Favourite Click
  const updateIsFavourite = async (data) => {
    const storyId = data._id;

    try {
      const response = await axiosInstance.put(
        `/api/post/update-favourite/${storyId}`,
        {
          isFavourite: !data.isFavourite, // ⚡ THIS IS THE KEY
        },
      );

      if (response.data && response.data.story) {
        toast.success("Story Update Successfully");
        getAllTravelStories();
      }

      console.log(response.data);
    } catch (error) {
      console.log(
        "Error updating favourite:",
        error.response?.data || error.message,
      );
    }
  };

  // Handel Delete Story
  const deleteTravelStory = async (data) => {
    const storyId = data._id;

    try {
      const response = await axiosInstance.delete(
        `${url}/api/post/delete-story/${storyId}`,
      );

      if (response.data && !response.data.error) {
        toast.success("Story Delete Successfully");
        setopenViewModel((prev) => ({ ...prev, isShown: false }));
        getAllTravelStories();
      }
    } catch (error) {
      toast.error("Error Creating Story");
      console.log("Error on Deleting Story", error);
    }
  };

  useEffect(() => {
    getAllTravelStories();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className="container mx-auto py-10">
        <div className="flex gap-7">
          {/* Story Container */}
          <div className="flex-1 pl-7">
            {allStories.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {allStories.map((item) => {
                  return (
                    <TravelStoryCard
                      key={item._id}
                      item={item}
                      url={url}
                      onClick={() => handelViewStory(item)}
                      onFavouriteClick={() => updateIsFavourite(item)}
                    />
                  );
                })}
              </div>
            ) : (
              <EmptyWindow />
            )}
          </div>

          <div className="w-[320px] relative">
            <div className="bg-red-200 w-[320px] fixed top-0 bottom-0">f</div>
          </div>

          {/*Add and Edit Travel Story Model */}
          <Modal
            isOpen={openAddEditModel.isShown}
            onRequestClose={() => {}}
            style={{
              overlay: {
                backgroundColor: "rgba(0,0,0,0.2)",
                zIndex: 999,
              },
            }}
            appElement={document.getElementById("root")}
            className="model-box"
          >
            <AddEditTravelStory
              storyInfo={openAddEditModel.data || null}
              type={openAddEditModel.type}
              url={url}
              onClose={() => {
                setOpenAddEditModel({
                  isShown: false,
                  type: "add",
                  data: null,
                });
              }}
              getAllTravelStories={getAllTravelStories}
            />
          </Modal>

          {/* View Travel Story Model */}
          <Modal
            isOpen={openViewModel.isShown}
            onRequestClose={() => {}}
            style={{
              overlay: {
                backgroundColor: "rgba(0,0,0,0.2)",
                zIndex: 999,
              },
            }}
            appElement={document.getElementById("root")}
            className="model-box"
          >
            <ViewTravelStory
              url={url}
              storyInfo={openViewModel.data || null}
              onClose={() => {
                setopenViewModel((prev) => ({ ...prev, isShown: false }));
              }}
              onEditClick={() => {
                setopenViewModel((prev) => ({ ...prev, isShown: false }));
                handelEdit(openViewModel.data || null);
              }}
              onDeleteClick={() => {
                deleteTravelStory(openViewModel.data || null);
              }}
            />
          </Modal>

          {/* Add Button */}
          <button
            className="w-14 h-14 items-center flex justify-center rounded-full bg-cyan-300 hover:bg-cyan-400 fixed right-10 bottom-10 z-50"
            onClick={() => {
              setOpenAddEditModel({ isShown: true, type: "add", data: null });
            }}
          >
            <MdAdd className="text-[40px] text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
