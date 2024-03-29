import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../../actions/userActions";
import { clearError, clearUserUpdated } from "../../slices/usersSlice";
import { toast } from "react-toastify";

function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const { id: userId } = useParams();

  const { loading, isUserUpdated, error, user } = useSelector(
    (state) => state.userState
  );
  const { user: authUser } = useSelector((state) => state.authState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    dispatch(updateUser(userId, formData));
  };

  useEffect(() => {
    if (isUserUpdated) {
      toast("User Updated successfully", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearUserUpdated()),
      });
      navigate("/admin/users");
      return;
    }
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    dispatch(getUser(userId));
  }, [isUserUpdated, error, dispatch]);
  useEffect(() => {
    if (user._id) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);
  return (
    <div>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div>
              <div className="wrapper my-5">
                <form
                  onSubmit={submitHandler}
                  className="shadow-lg"
                  encType="multipart/form-data"
                >
                  <h1 className="mb-4">Update User</h1>

                  <div className="form-group">
                    <label htmlFor="name_field">Name</label>
                    <input
                      type="text"
                      id="name_field"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="price_field">Email</label>
                    <input
                      type="text"
                      id="price_field"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category_field">Role</label>
                    <select
                      disabled={user._id === authUser._id}
                      className="form-control"
                      value={role}
                      id="category_field"
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>

                  <button
                    id="login_button"
                    type="submit"
                    disabled={loading}
                    className="btn btn-block py-3"
                  >
                    UPDATE
                  </button>
                </form>
              </div>
            </div>
          </Fragment>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
