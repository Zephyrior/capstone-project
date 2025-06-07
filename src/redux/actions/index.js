import api from "../../services/api";
import imageCompression from "browser-image-compression";

export const SET_TOKEN = "SET_TOKEN";
export const setTokenAction = (token) => ({ type: SET_TOKEN, payload: token });

/* const getCurrentUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1])).sub;
  } catch (e) {
    console.error("Failed to decode token", e);
    return null;
  }
}; */

export const SET_USER = "SET_USER";
export const setUserAction = (user) => ({ type: SET_USER, payload: user });

export const fetchUserAction = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          dispatch(setUserAction(response.data));
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
};

export const SET_OTHERUSER = "SET_OTHERUSER";
export const setOtherUserAction = (user) => ({ type: SET_OTHERUSER, payload: user });

export const fetchOtherUserAction = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get(`/auth/id/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          dispatch(setOtherUserAction(response.data));
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
};

export const SET_PROFILEVIEWS = "SET_PROFILEVIEWS";
export const setProfileViewsAction = (profileViews) => ({ type: SET_PROFILEVIEWS, payload: profileViews });

export const fetchProfileViewsAction = (userId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token && userId) {
      api
        .get(`/profile-views/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          dispatch(setProfileViewsAction(response.data));
          console.log("profile view response", response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
};

export const SET_MYCIRCLES = "SET_MYCIRCLES";
export const setMyCirclesAction = (myCircles) => ({ type: SET_MYCIRCLES, payload: myCircles });

export const fetchMyCirclesAction = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get("/circles/mycircles", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          dispatch(setMyCirclesAction(response.data));
          console.log("My Circles response: ", response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
};

export const SET_MYSMALLCIRCLE = "SET_MYSMALLCIRCLE";
export const setMySmallCircleAction = (mySmallCircle) => ({ type: SET_MYSMALLCIRCLE, payload: mySmallCircle });

export const fetchMySmallCircleAction = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get("/circles/mycircles", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          dispatch(setMySmallCircleAction(response.data));
          console.log("My Small Circle response: ", response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
};

export const SET_OTHERSCIRCLE = "SET_OTHERSCIRCLE";
export const setOthersCircleAction = (userId, othersCircle) => ({ type: SET_OTHERSCIRCLE, payload: { userId, othersCircle } });

export const fetchOthersCircle = (userId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get(`/circles/usercircles?id=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          dispatch(setOthersCircleAction(userId, response.data));
          console.log("Others Cicle response: ", response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
};

export const SET_BULLETINPOSTS = "SET_BULLETINPOSTS";
export const APPEND_BULLETINPOSTS = "APPEND_BULLETINPOSTS";
export const appendBulletinPostsAction = (bulletinPosts) => ({ type: APPEND_BULLETINPOSTS, payload: bulletinPosts });
export const setBulletinPostsAction = (bulletinPosts) => ({ type: SET_BULLETINPOSTS, payload: bulletinPosts });

export const fetchBulletinPostsAction = (page = 0, append = false) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await api.get(`posts?page=${page}&size=10&sort=createdAt,desc`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched bulletin posts response: ", response.data);
        if (append) {
          dispatch(appendBulletinPostsAction(response.data));
        } else {
          dispatch(setBulletinPostsAction(response.data));
        }
      } catch (error) {
        console.error("Failed to fetch bulletin posts:", error);
      }
    }
  };
};

export const SET_CREATEBULLETIN = "SET_CREATEBULLETIN";
export const setCreateBulletinAction = (createBulletin, profileOwnerId) => ({ type: SET_CREATEBULLETIN, payload: createBulletin, profileOwnerId });

export const fetchCreateBulletinAction = (content, imageFile, profileOwnerId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        let mediaUrl = null;

        if (imageFile) {
          const compressedImage = await imageCompression(imageFile, {
            maxSizeMB: 1.5,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          });

          const formData = new FormData();
          formData.append("file", compressedImage);

          const uploadResponse = await api.post("/images/uploadme", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });
          mediaUrl = uploadResponse.data.url;
        }
        const postResponse = await api.post(
          "/posts",
          { content, mediaUrl, profileOwnerId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(setCreateBulletinAction(postResponse.data));
        console.log("Created post: ", postResponse.data);
      } catch (error) {
        console.log("Error creating post: ", error);
      }
    }
  };
};

export const DELETE_BULLETINPOST = "DELETE_BULLETINPOST";
export const setDeleteBulletinPostAction = (postId) => ({ type: DELETE_BULLETINPOST, payload: postId });

export const deleteBulletinPostAction = (postId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await api.delete(`/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setDeleteBulletinPostAction(postId));
        console.log("Deleted post response: ", response.data);
        return true;
      } catch (error) {
        console.error("Error deleting post: ", error);
      }
    }
  };
};

export const SET_BULLETINCOMMENTS = "SET_BULLETINCOMMENTS";
export const setBulletinCommentsAction = (postId, bulletinComment) => ({ type: SET_BULLETINCOMMENTS, payload: { postId, bulletinComment } });

export const fetchBulletinCommentsAction = (postId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get(`/comments/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          dispatch(setBulletinCommentsAction(postId, response.data));
          console.log("Bulletin Comments response: ", response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
};

export const ADD_BULLETINCOMMENTS = "ADD_BULLETINCOMMENTS";
export const setAddBulletinCommentsAction = (postId, bulletinComment) => ({
  type: ADD_BULLETINCOMMENTS,
  payload: { postId, bulletinComment },
});

export const addBulletinCommentsAction = (newComment, postId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await api.post(
          "/comments",
          {
            content: newComment,
            postId: postId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(setAddBulletinCommentsAction(postId, response.data));
        console.log("Bulletin comment created:", response.data);
      } catch (error) {
        console.error("Error creating comment:", error);
      }
    }
  };
};

export const UPDATE_BULLETINCOMMENTS = "UPDATE_BULLETINCOMMENTS";
export const setUpdateBulletinCommentsAction = (bulletinComment) => ({ type: UPDATE_BULLETINCOMMENTS, payload: bulletinComment });

export const DELETE_BULLETINCOMMENTS = "DELETE_BULLETINCOMMENTS";
export const setDeleteBulletinCommentsAction = (bulletinComment) => ({ type: DELETE_BULLETINCOMMENTS, payload: bulletinComment });

export const SEARCH_USER = "SEARCH_USER";
export const setSearchUserAction = (searchUser) => ({ type: SEARCH_USER, payload: searchUser });

export const searchUserAction = (searchUser) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get(`/auth/find-users?name=${searchUser}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          dispatch(setSearchUserAction(response.data));
          console.log("Search user response: ", response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
};

export const SEARCH_USERID = "SEARCH_USERID";
export const setSearchUserById = (userId) => ({ type: SEARCH_USERID, payload: userId });

export const searchUserById = (userId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get(`/auth/id/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          dispatch(setSearchUserById(response.data));
          console.log("Search User By Id: ", response.data);
          return { payload: response.data };
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
};

export const SET_ADORE = "SET_ADORE";
export const setAdoreAction = (postId) => ({ type: SET_ADORE, payload: { postId } });

export const toggleAdore = (postId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await api.post(`/likes/${postId}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setAdoreAction(postId, response.data));
        console.log("Adore Response: ", response.data);
      } catch (error) {
        console.error("Error toggling like: ", error);
      }
    }
  };
};

export const SET_ADDCIRCLE = "SET_ADDCIRCLE";
export const setAddCircleAction = (receiverId, addCircle) => ({ type: SET_ADDCIRCLE, payload: { receiverId, addCircle } });

export const addCircleAction = (receiverId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await api.post(`/circles/addcircle/${receiverId}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setAddCircleAction(receiverId, response.data));
        console.log("Add Circle Response: ", response.data);
        dispatch(setCircleRelationshipAction(response.data.requester.id, response.data.receiver.id, response.data));
      } catch (error) {
        console.error("Error adding circle: ", error);
      }
    }
  };
};

export const SET_ACCEPTCIRCLE = "SET_ACCEPTCIRCLE";
export const setAcceptCircleAction = (requestId, requestCircle) => ({ type: SET_ACCEPTCIRCLE, payload: { requestId, requestCircle } });

export const acceptCircleAction = (requestId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await api.post(`/circles/acceptcircle/${requestId}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setAcceptCircleAction(requestId, response.data));
        console.log("Accept Circle Response: ", response.data);
        return response.data;
      } catch (error) {
        console.error("Error accepting circle: ", error);
      }
    }
  };
};

export const SET_CANCELCIRCLE = "SET_CANCELCIRCLE";
export const setCancelCircleAction = (circleId, cancelCircle) => ({ type: SET_CANCELCIRCLE, payload: { circleId, cancelCircle } });

export const cancelCircleAction = (circleId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await api.delete(`/circles/cancelcircle/${circleId}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setCancelCircleAction(circleId, response.data));
        console.log("Cancel Circle Response: ", response.data);
        return response.data;
      } catch (error) {
        console.error("Error cancelling circle: ", error);
      }
    }
  };
};

export const SET_DECLINECIRCLE = "SET_DECLINECIRCLE";
export const setDeclineCircleAction = (circleId, declineCircle) => ({ type: SET_DECLINECIRCLE, payload: { circleId, declineCircle } });

export const declineCircleAction = (circleId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await api.delete(`/circles/declinecircle/${circleId}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setDeclineCircleAction(circleId, response.data));
        console.log("Decline Circle Response: ", response.data);
        return response.data;
      } catch (error) {
        console.error("Error declining circle: ", error);
      }
    }
  };
};

export const SET_CIRCLERELATIONSHIP = "SET_CIRCLERELATIONSHIP";
export const setCircleRelationshipAction = (userId1, userId2, circleRelationship) => ({
  type: SET_CIRCLERELATIONSHIP,
  payload: { userId1, userId2, circleRelationship },
});

export const fetchCircleRelationshipAction = (userId1, userId2) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get(`/circles/circle/${userId1}/${userId2}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          dispatch(setCircleRelationshipAction(userId1, userId2, response.data));
          console.log("Circle Relationship response: ", response);
          return response.data;
        })
        .catch((error) => {
          console.error("Error fetching circle relationship: ", error);
        });
    }
  };
};
