import { useState, useEffect } from "react";
import bgDesktopDark from "./assests/images/bg-desktop-dark.jpg";
import bgDesktopLight from "./assests/images/bg-desktop-light.jpg";
import bgMobileDark from "./assests/images/bg-mobile-dark.jpg";
import bgMobileLight from "./assests/images/bg-mobile-light.jpg";
import iconCheck from "./assests/images/icon-check.svg";
import iconCross from "./assests/images/icon-cross.svg";
import iconMoon from "./assests/images/icon-moon.svg";
import iconSun from "./assests/images/icon-sun.svg";

export default function App() {
  const [itemsinput, setItemsinput] = useState("");
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filter, setFilter] = useState("all");

  function handleSubmit(e) {
    e.preventDefault();
    if (itemsinput.trim()) {
      setTodos([...todos, itemsinput]);
      setCompleted([...completed, false]);
      setItemsinput("");
    }
  }

  function handleDeleteTodo(index) {
    setTodos(todos.filter((_, i) => i !== index));
    setCompleted(completed.filter((_, i) => i !== index));
  }

  const toggleCompletion = (index) => {
    setCompleted(
      completed.map((status, i) => (i === index ? !status : status))
    );
  };

  function toggleTheme() {
    setIsDarkMode(!isDarkMode);
  }

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove("active");
      document.body.classList.add("whiteactive");
    } else {
      document.body.classList.add("active");
      document.body.classList.remove("whiteactive");
    }
  }, [isDarkMode]);

  const filteredTodos = todos.filter((_, index) => {
    if (filter === "active") return !completed[index];
    if (filter === "completed") return completed[index];
    return true;
  });

  const filteredCompleted = completed.filter((status, index) => {
    if (filter === "active") return !completed[index];
    if (filter === "completed") return completed[index];
    return true;
  });

  const clearCompleted = () => {
    setTodos(todos.filter((_, index) => !completed[index]));
    setCompleted(completed.filter((status) => !status));
  };
  return (
    <div className="App flex justify-center md:mt-20 mt-10 w-screen">
      <BackgroundImgs isDarkMode={isDarkMode} />
      <div className=" md:w-1/3">
        <SunMoon toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <FirstInput
          handleSubmit={handleSubmit}
          itemsinput={itemsinput}
          setItemsinput={setItemsinput}
          isDarkMode={isDarkMode}
        />
        <AllInputs
          todos={filteredTodos}
          completed={filteredCompleted}
          toggleCompletion={toggleCompletion}
          handleDeleteTodo={handleDeleteTodo}
          isDarkMode={isDarkMode}
          setFilter={setFilter}
          filter={filter}
          clearCompleted={clearCompleted}
        />
      </div>
    </div>
  );
}

function BackgroundImgs({ isDarkMode }) {
  return (
    <div className="absolute -z-10 top-0">
      {isDarkMode ? (
        <img
          src={bgDesktopLight}
          alt={bgDesktopLight}
          className="md:block hidden w-screen"
        />
      ) : (
        <img
          src={bgDesktopDark}
          alt={bgDesktopDark}
          className="md:block hidden w-screen"
        />
      )}
      {isDarkMode ? (
        <img
          src={bgMobileLight}
          alt="Mobile Background"
          className="md:hidden block w-screen"
        />
      ) : (
        <img
          src={bgMobileDark}
          alt="Mobile Background"
          className="md:hidden block w-screen"
        />
      )}
    </div>
  );
}

function SunMoon({ toggleTheme, isDarkMode }) {
  return (
    <div className="flex md:items-center items-center justify-between">
      <div className="text-white text-3xl font-bold tracking-[12px] ">TODO</div>
      <div className="cursor-pointer" onClick={toggleTheme}>
        {isDarkMode ? (
          <img src={iconMoon} alt={iconMoon} className="" />
        ) : (
          <img src={iconSun} alt={iconSun} />
        )}
      </div>
    </div>
  );
}

function FirstInput({ handleSubmit, itemsinput, setItemsinput, isDarkMode }) {
  return (
    <form className="relative w-full md:mt-12 mt-4" onSubmit={handleSubmit}>
      <input
        type="text"
        value={itemsinput}
        onChange={(e) => setItemsinput(e.target.value)}
        placeholder="Create a new todo"
        className={`w-full bg-veryDarkDesaturatedBlue outline-none text-black  rounded-md pl-12 pr-10 py-2 ${
          isDarkMode ? "bg-white text-black" : "bg-gray-800 text-white"
        }
        }`}
      />
      <button
        id="add-button"
        type="submit"
        className="right-0 absolute left-4 top-1/2 transform -translate-y-1/2 border-2 border-gray-500 rounded-full hover:border-blue-500 w-5 h-5 flex items-center justify-center"
      ></button>
    </form>
  );
}

function AllInputs({
  todos,
  completed,
  toggleCompletion,
  handleDeleteTodo,
  isDarkMode,
  setFilter,
  filter,
  clearCompleted,
}) {
  const itemsLeft = completed.filter((status) => !status).length;
  return (
    <div>
      <ul
        className={`1mt-6 shadow-xl mt-4  rounded-t-md max-h-[284px] overflow-y-auto  ${
          isDarkMode ? "scroll-container-light" : "scroll-container-dark"
        }`}
      >
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`bg-veryDarkDesaturatedBlue hover:bg-opacity-95 transition-all duration-500 ease-in-out hover:text-opacity-100 text-left p-2 border-b border-gray-50 text-opacity-100 border-opacity-30 group
           ${
             isDarkMode
               ? "bg-white text-black hover:bg-gray-200 border-gray-500"
               : "bg-gray-800 text-white hover:bg-gray-700"
           }`}
          >
            <div className="flex items-center gap-4 justify-between">
              <div
                className="flex gap-4"
                onClick={() => toggleCompletion(index)}
              >
                <button className="border  border-gray-500 rounded-full hover:border-blue-500 w-5 h-5 flex items-center justify-center">
                  {completed[index] && (
                    <div className="bg-gradient-to-tl from-linear2 to-linear1 rounded-full w-5 h-5 flex justify-center items-center p-1">
                      <img
                        src={iconCheck}
                        alt="Check Icon"
                        className="h-full w-full"
                      />
                    </div>
                  )}
                </button>
                <span
                  className={`${
                    completed[index]
                      ? "line-through text-gray-400 text-opacity-40"
                      : ""
                  }`}
                >
                  {todo}
                </span>
              </div>
              <button
                onClick={() => handleDeleteTodo(index)}
                className="hover:opacity-75"
              >
                <img
                  src={iconCross}
                  alt="Delete Icon"
                  className="w-4 h-4 opacity-0 group-hover:opacity-100"
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div
        className={`flex mt-0 p-2 rounded-b-md ${
          isDarkMode
            ? "bg-white border-b border-gray-300 text-black"
            : "bg-veryDarkDesaturatedBlue text-veryDarkGrayishBlueDark"
        }`}
      >
        <span>{itemsLeft} items left</span>
        <div className="flex gap-4 ml-auto">
          <span
            onClick={() => setFilter("all")}
            className={`cursor-pointer md:block hidden hover:text-gray-400 ${
              filter === "all" ? "text-brightBlue  hover:text-brightBlue" : ""
            }`}
          >
            All
          </span>
          <span
            onClick={() => setFilter("active")}
            className={`cursor-pointer md:block hidden hover:text-gray-400 ${
              filter === "active"
                ? "text-brightBlue  hover:text-brightBlue"
                : ""
            }`}
          >
            Active
          </span>
          <span
            onClick={() => setFilter("completed")}
            className={`cursor-pointer md:block hidden hover:text-gray-400 ${
              filter === "completed"
                ? "text-brightBlue  hover:text-brightBlue"
                : ""
            }`}
          >
            Completed
          </span>
          <span
            onClick={clearCompleted}
            className="cursor-pointer hover:text-gray-400"
          >
            Clear Completed
          </span>
        </div>
      </div>
      <div
        className={`flex mt-6 md:hidden justify-around p-2 rounded-b-md ${
          isDarkMode
            ? "bg-white border-b border-gray-300 text-black"
            : "bg-veryDarkDesaturatedBlue text-veryDarkGrayishBlueDark"
        }`}
      >
        <span
          onClick={() => setFilter("all")}
          className={`cursor-pointer block md:hidden hover:text-gray-400 ${
            filter === "all" ? "text-brightBlue  hover:text-brightBlue" : ""
          }`}
        >
          All
        </span>
        <span
          onClick={() => setFilter("active")}
          className={`cursor-pointer block md:hidden hover:text-gray-400 ${
            filter === "active" ? "text-brightBlue  hover:text-brightBlue" : ""
          }`}
        >
          Active
        </span>
        <span
          onClick={() => setFilter("completed")}
          className={`cursor-pointer block md:hidden hover:text-gray-400 ${
            filter === "completed"
              ? "text-brightBlue  hover:text-brightBlue"
              : ""
          }`}
        >
          Completed
        </span>
      </div>
    </div>
  );
}
