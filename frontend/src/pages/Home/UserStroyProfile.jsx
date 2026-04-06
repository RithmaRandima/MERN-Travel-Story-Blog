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
import placeholderImage from "../../assets/placeholder-image.jpg";
import {
  FaFacebookF,
  FaGooglePlusG,
  FaInstagram,
  FaX,
  FaYoutube,
} from "react-icons/fa6";

const UserStroyProfile = () => {
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
      console.log(response.data);
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
            {/* {allStories.length > 0 ? (
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
            )} */}

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
          </div>

          <div className="w-[260px] relative">
            <div className="bg-red200 w-[260px] right-3 pt-3 fixed top-16 bottom-0 ">
              {/* image Container */}
              <div className="relative w-full h-[200px] bg-white shadow-[1px_1px_5px_rgba(0,0,0,0.4)] rounded-[3px] hover:scale-105 cursor-pointer transition ">
                <img
                  src={placeholderImage}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-center font-extrabold text-white text-[20px] py-2 uppercase tracking-[4px]">
                  Read Our Story
                </div>
              </div>

              {/* social Container */}
              <div className="relative w-full h-fit bg-white shadow-[1px_1px_5px_rgba(0,0,0,0.4)] rounded-[10px] pb-5 pt-2 mt-4">
                <h1 className="text-center font-bold text-[23px] ">
                  Get Social
                </h1>

                <div className="w-full mt-2 flex items-center justify-center gap-4">
                  <FaInstagram className="text-[25px] hover:scale-110 transition opacity-70 hover:opacity-100" />
                  <FaFacebookF className="text-[20px] hover:scale-110 transition opacity-70 hover:opacity-100" />
                  <FaYoutube className="text-[24px] hover:scale-110 transition opacity-70 hover:opacity-100" />
                  <FaX className="text-[18px] hover:scale-110 transition opacity-70 hover:opacity-100" />
                  <FaGooglePlusG className="text-[25px] hover:scale-110 transition opacity-70 hover:opacity-100" />
                </div>
              </div>

              {/* subscribe Container */}
              <div className="relative w-full h-fit pb-3 bg-white shadow-[1px_1px_5px_rgba(0,0,0,0.4)] rounded-[3px] pt-4 mt-4">
                <h1 className="text-center font-bold text-[23px] ">
                  Subscribe Now
                </h1>

                <div className="p-2 text-center">
                  <p className="text-gray-500">
                    Join 10,000 others who get our weekly emails!
                  </p>
                  <button className="bg-[#10B981] rounded-[3px] mt-3 hover:bg-[#059669] text-[#D1FAE5] font-semibold text-[14px] py-2">
                    5 Secrets To Stress-Free Travel Planning
                  </button>
                </div>
              </div>
            </div>
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

export default UserStroyProfile;
