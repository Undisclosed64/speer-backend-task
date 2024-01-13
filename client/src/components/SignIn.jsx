import { MdOutlineStickyNote2 } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FeedbackDisplay } from "./FeedbackDisplay";
import { TailSpin } from "react-loader-spinner";

export const SignIn = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_SCRIBE_BASE_URL;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    if (data.email === "" || data.password === "") {
      setErr("Please fill in the input fields");
      setTimeout(() => {
        setErr(null);
      }, 1500);
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${baseURL}/api/auth/login`, data);
      // console.log(res.data);
      localStorage.setItem("accessToken", res.data.accessToken);
      navigate("/");
    } catch (err) {
      // console.log(err);
      setErr(err.response.data.msg);
      setTimeout(() => {
        setErr(null);
      }, 1500);
    } finally {
      setLoading(false);
    }
  };
  const signInAsDemoUser = async () => {
    const demoUserCredentials = {
      email: "johndoe@gmail.com",
    };

    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${baseURL}/api/auth/login`,
        demoUserCredentials
      );
      // console.log(res.data);
      localStorage.setItem("accessToken", res.data.accessToken);
      navigate("/");
    } catch (err) {
      // console.error(err);
      setErr("Failed to sign in as demo user");
      setTimeout(() => {
        setErr(null);
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page flex h-screen w-screen">
      <div className="left  w-1/3">
        {/* video credits: Dribble */}

        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster=".../assets/poster.png"
        >
          <source
            src="https://cdn.dribbble.com/uploads/48226/original/b8bd4e4273cceae2889d9d259b04f732.mp4?1689028949"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="right w-1/2 mx-auto">
        <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8">
          <div className="sm:w-full sm:max-w-md">
            <MdOutlineStickyNote2 className="text-blue mx-auto h-16 w-auto mb-6" />
            <h2 className="text-center text-3xl font-bold text-gray-900 mb-10">
              Sign in to your account
            </h2>

            <form
              className="space-y-6"
              method="POST"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border border-gray-300 py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring focus:border-indigo-600 text-sm"
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md border border-gray-300 py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring focus:border-indigo-600 text-sm"
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                {loading ? (
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none"
                  >
                    <TailSpin
                      height="20"
                      width="20"
                      color="white"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="oval-loading"
                    />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none"
                  >
                    Sign in
                  </button>
                )}
              </div>
            </form>

            <div className="mt-4 text-center text-[#3d3d4e]">
              <p className="text-sm">
                Don't have an account?
                <Link className="ml-2 underline" to={`/sign-up`}>
                  Sign up
                </Link>
              </p>
              <p className="mt-2 text-sm">
                Or
                {loading ? (
                  <button
                    className="ml-2 font-semibold focus:outline-none"
                    onClick={() => signInAsDemoUser()}
                  >
                    Signing you in...
                  </button>
                ) : (
                  <button
                    className="ml-2 font-semibold focus:outline-none"
                    onClick={() => signInAsDemoUser()}
                  >
                    Sign in as demo user
                  </button>
                )}
              </p>
            </div>
          </div>
        </div>
        {err ? <FeedbackDisplay error={err} /> : ""}
      </div>
    </div>
  );
};
