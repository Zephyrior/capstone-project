import api from "../../services/api";

export const SET_TOKEN = "SET_TOKEN";
export const setTokenAction = (token) => ({ type: SET_TOKEN, payload: token });

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
        .get(`/auth/user/${id}`, {
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

export const SET_BULLETINPOSTS = "SET_BULLETINPOSTS";
export const setBulletinPostsAction = (bulletinPosts) => ({ type: SET_BULLETINPOSTS, payload: bulletinPosts });

export const fetchBulletinPostsAction = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get("posts?page=0&size=10&createdAt=createdAt", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          dispatch(setBulletinPostsAction(response.data));
          console.log("Bulletin Posts response: ", response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
};

export const SET_CREATEBULLETIN = "SET_CREATEBULLETIN";
export const setCreateBulletinAction = (createBulletin) => ({ type: SET_CREATEBULLETIN, payload: createBulletin });

export const fetchCreateBulletinAction = (content, imageFile) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        let mediaUrl = null;

        if (imageFile) {
          const formData = new FormData();
          formData.append("file", imageFile);

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
          { content, mediaUrl },
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
