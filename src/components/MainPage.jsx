import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const MainPage = () => {
  const [classes, setClasses] = useState(() => {
    const savedClasses = localStorage.getItem("classes");
    return savedClasses
      ? JSON.parse(savedClasses)
      : [{ id: "class330", title: "3:30 pm" }];
  });

  useEffect(() => {
    localStorage.setItem("classes", JSON.stringify(classes));
  }, [classes]);

  const handleAddClass = () => {
    const newClassTime = prompt("Enter the class time/name (e.g., 4:30 pm):");
    if (newClassTime) {
      const newClass = {
        id: `class${newClassTime.replace(/[^0-9]/g, "")}`,
        title: newClassTime,
      };
      setClasses([...classes, newClass]);
    }
  };

  const handleDeleteClass = (classId) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      setClasses(classes.filter((c) => c.id !== classId));
      localStorage.removeItem(`students_${classId}`);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <h1 className="font-bold text-5xl">Dani Marquez Dashboard</h1>
      <h1 className="font-semibold text-3xl">Your Classes</h1>
      <div className="flex gap-5 flex-wrap">
        {classes.map((classItem) => (
          <div key={classItem.id} className="flex flex-col items-center gap-2">
            <Link
              to={`/class/${classItem.id}`}
              state={{ title: classItem.title }}
              className="rounded-md border bg-pink-500 text-white p-2 text-2xl min-w-32 text-center hover:bg-pink-800"
            >
              {classItem.title}
            </Link>
            <button
              onClick={() => handleDeleteClass(classItem.id)}
              className="rounded-md border bg-red-500 text-white px-2 py-1 text-sm hover:bg-red-800"
            >
              Delete
            </button>
          </div>
        ))}

        <button
          onClick={handleAddClass}
          className="rounded-md border bg-green-500 text-white p-2 hover:bg-black"
        >
          + Add New Class
        </button>
      </div>
    </div>
  );
};
