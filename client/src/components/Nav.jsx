import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { asyncUserLogout } from "../store/Actions/userAction";

const Nav = () => {
  const [profileMenu, setProfileMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated , user} = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  // Effect to add/remove event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex shadow-[rgba(0,0,0,0.1)_-4px_9px_25px_-6px] py-2 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide sticky top-0 z-50">
      <div className="w-full flex flex-wrap items-center lg:gap-y-4 gap-y-6 gap-x-4 relative">
        <Link to="/">
          <img
            src="https://readymadeui.com/readymadeui-short.svg"
            alt="logo"
            className="w-9 h-9"
          />
        </Link>
        <div
          id="collapseMenu"
          onClick={toggleMenu} 
          style={{ display: isMenuOpen ? 'block' : 'none' }}
          className="max-lg:hidden lg:!flex lg:items-center lg:flex-1 max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50"
        >
          <button
            id="toggleClose"
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 fill-black"
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              />
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              />
            </svg>
          </button>
          <ul className="lg:ml-12 lg:flex lg:gap-x-8 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:px-8 max-lg:py-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li className="mb-6 hidden max-lg:block">
              <Link to="/">
                <img
                  src="https://readymadeui.com/readymadeui-short.svg"
                  alt="logo"
                  className="w-9 h-9"
                />
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-3 relative lg:after:absolute lg:after:bg-pink-500 lg:after:w-full lg:after:h-[3px] lg:after:block lg:after:-bottom-2 lg:after:transition-all lg:after:duration-300">
              <Link
                to="/"
                className="text-[#333] block text-sm font-semibold"
              >
                Men
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-3 relative lg:hover:after:absolute lg:after:bg-pink-500 lg:after:w-0 lg:hover:after:w-full lg:hover:after:h-[3px] lg:after:block lg:after:-bottom-2 lg:after:transition-all lg:after:duration-300">
              <Link
                to="/"
                className="text-[#333] block text-sm font-semibold"
              >
                Women
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-3 relative lg:hover:after:absolute lg:after:bg-pink-500 lg:after:w-0 lg:hover:after:w-full lg:hover:after:h-[3px] lg:after:block lg:after:-bottom-2 lg:after:transition-all lg:after:duration-300">
              <Link
                to="/"
                className="text-[#333] block text-sm font-semibold"
              >
                Kids
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-3 relative lg:hover:after:absolute lg:after:bg-pink-500 lg:after:w-0 lg:hover:after:w-full lg:hover:after:h-[3px] lg:after:block lg:after:-bottom-2 lg:after:transition-all lg:after:duration-300">
              <Link
                to="/"
                className="text-[#333] block text-sm font-semibold"
              >
                Home &amp; Living
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-3 relative lg:hover:after:absolute lg:after:bg-pink-500 lg:after:w-0 lg:hover:after:w-full lg:hover:after:h-[3px] lg:after:block lg:after:-bottom-2 lg:after:transition-all lg:after:duration-300">
              <Link
                to="/"
                className="text-[#333] block text-sm font-semibold"
              >
                Beauty
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-3 relative lg:hover:after:absolute lg:after:bg-pink-500 lg:after:w-0 lg:hover:after:w-full lg:hover:after:h-[3px] lg:after:block lg:after:-bottom-2 lg:after:transition-all lg:after:duration-300">
              <Link
                to="/"
                className="text-[#333] block text-sm font-semibold"
              >
                Studio
              </Link>
            </li>
          </ul>
          <div className="lg:mx-8 max-xl:hidden flex items-center bg-gray-100 px-4 h-10 rounded flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              className="cursor-pointer fill-gray-500 mr-4 inline-block w-[16px] h-16px"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
            <input
              type="text"
              placeholder="Search something..."
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>
        </div>
        <div className="flex items-center ml-auto">
          <ul className="flex space-x-4">
            <li
              id="profile-dropdown-toggle"
              className="relative px-1 after:absolute after:bg-pink-500 after:w-full after:h-[3px] after:block after:-bottom-2 after:left-0 after:transition-all after:duration-300"
            >
              <div
                onClick={() => setProfileMenu(!profileMenu)}
                className="flex flex-col justify-center items-center cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M337.711 241.3a16 16 0 0 0-11.461 3.988c-18.739 16.561-43.688 25.682-70.25 25.682s-51.511-9.121-70.25-25.683a16.007 16.007 0 0 0-11.461-3.988c-78.926 4.274-140.752 63.672-140.752 135.224v107.152C33.537 499.293 46.9 512 63.332 512h385.336c16.429 0 29.8-12.707 29.8-28.325V376.523c-.005-71.552-61.831-130.95-140.757-135.223zM446.463 480H65.537V376.523c0-52.739 45.359-96.888 104.351-102.8C193.75 292.63 224.055 302.97 256 302.97s62.25-10.34 86.112-29.245c58.992 5.91 104.351 50.059 104.351 102.8zM256 234.375a117.188 117.188 0 1 0-117.188-117.187A117.32 117.32 0 0 0 256 234.375zM256 32a85.188 85.188 0 1 1-85.188 85.188A85.284 85.284 0 0 1 256 32z"
                    data-original="#000000"
                  />
                </svg>
                <Link to="/auth/profile" className="text-xs font-semibold mt-1">Profile</Link>
              </div>
              {profileMenu && (
                <div
                  id="profile-dropdown-menu"
                  className="bg-white block z-20 shadow-lg py-6 px-6 sm:min-w-[320px] max-sm:min-w-[250px] max-sm:-right-32 absolute right-0 top-14"
                >
                  <h6 className="font-semibold text-sm">Welcome</h6>
                  <p className="text-sm text-gray-500 mt-1">
                   {isAuthenticated ? `Hi, ${user?.name}` : 'To access account and manage orders'}
                  </p>
                  <button
                  onClick={() => setProfileMenu(false)}
                    type="button"
                    className="bg-transparent border border-gray-300 hover:border-pink-500 px-4 py-2 mt-4 text-sm text-pink-500 font-semibold"
                  >
                 { isAuthenticated ? <span onClick={() => dispatch(asyncUserLogout())}>logout</span>  : <span> <Link to='/login'>LOGIN</Link> / <Link to='/register'>SIGNUP</Link></span>}
                  </button>
                  <hr className="border-b-0 my-4" />
                  <ul className="space-y-1.5">
                    <li>
                      <Link
                        to="/"
                        className="text-sm text-gray-500 hover:text-pink-500"
                      >
                        Order
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="text-sm text-gray-500 hover:text-pink-500"
                      >
                        Wishlist
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="text-sm text-gray-500 hover:text-pink-500"
                      >
                        Gift Cards
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="text-sm text-gray-500 hover:text-pink-500"
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                  <hr className="border-b-0 my-4" />
                  <ul className="space-y-1.5">
                    <li>
                      <Link
                        to="/"
                        className="text-sm text-gray-500 hover:text-pink-500"
                      >
                        Coupons
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="text-sm text-gray-500 hover:text-pink-500"
                      >
                        Saved Credits
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="text-sm text-gray-500 hover:text-pink-500"
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="text-sm text-gray-500 hover:text-pink-500"
                      >
                        Saved Addresses
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li className="relative px-1 after:absolute after:bg-pink-500 after:w-0 hover:after:w-full hover:after:h-[3px] after:block after:-bottom-2 after:left-0 after:transition-all after:duration-300">
              <div className="flex flex-col justify-center items-center cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 64 64"
                >
                  <path
                    d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                    data-original="#000000"
                  />
                </svg>
                <span className="text-xs font-semibold mt-1">Wishlist</span>
              </div>
            </li>
            <li className="relative px-1 after:absolute after:bg-pink-500 after:w-0 hover:after:w-full hover:after:h-[3px] after:block after:-bottom-2 after:left-0 after:transition-all after:duration-300">
              <Link to='/auth/cart' className="flex flex-col justify-center items-center cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 489 489"
                >
                  <path
                    d="m440.1 422.7-28-315.3c-.6-7-6.5-12.3-13.4-12.3h-57.6C340.3 42.5 297.3 0 244.5 0s-95.8 42.5-96.6 95.1H90.3c-7 0-12.8 5.3-13.4 12.3l-28 315.3c0 .4-.1.8-.1 1.2 0 35.9 32.9 65.1 73.4 65.1h244.6c40.5 0 73.4-29.2 73.4-65.1 0-.4 0-.8-.1-1.2zM244.5 27c37.9 0 68.8 30.4 69.6 68.1H174.9c.8-37.7 31.7-68.1 69.6-68.1zm122.3 435H122.2c-25.4 0-46-16.8-46.4-37.5l26.8-302.3h45.2v41c0 7.5 6 13.5 13.5 13.5s13.5-6 13.5-13.5v-41h139.3v41c0 7.5 6 13.5 13.5 13.5s13.5-6 13.5-13.5v-41h45.2l26.9 302.3c-.4 20.7-21.1 37.5-46.4 37.5z"
                    data-original="#000000"
                  />
                </svg>
                <span className="text-xs font-semibold mt-1">Bag</span>
              </Link>
            </li>
          </ul>
          <button  onClick={toggleMenu}  id="toggleOpen" className="lg:hidden ml-6">
            <svg
              className="w-8 h-8"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Nav;
