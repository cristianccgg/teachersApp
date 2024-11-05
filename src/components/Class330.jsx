import Header from "./Header";
import Emojis from "./Emojis";
import GoBackBtn from "./GoBackBtn";
import ClearBtn from "./ClearBtn";
import ClassTitle from "./ClassTitle";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Class330() {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents
      ? JSON.parse(savedStudents)
      : [
          {
            id: 1,
            studentName: "MATHIAS",
            droppedEmojis: {},
            showClockEmoji: false,
            showCameraEmoji: false,
            selectedOptions1: [],
            selectedOptions2: [],
            previousTopics: "",
          },
        ];
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const addNewStudent = () => {
    setStudents((prevStudents) => [
      ...prevStudents,
      {
        id: Date.now(),
        studentName: "NEW STUDENT",
        droppedEmojis: {},
        showClockEmoji: false,
        showCameraEmoji: false,
        selectedOptions1: [],
        selectedOptions2: [],
        previousTopics: "",
      },
    ]);
  };

  const handleClearAll = () => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => ({
        ...student,
        droppedEmojis: {},
        showClockEmoji: false,
        showCameraEmoji: false,
        selectedOptions1: [],
        selectedOptions2: [],
        previousTopics: "",
      }))
    );
  };

  const handleDrop = (event, dropzoneId, studentId) => {
    event.preventDefault();
    const emoji = event.dataTransfer.getData("text/plain");
    if (emoji) {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === studentId
            ? {
                ...student,
                droppedEmojis: {
                  ...student.droppedEmojis,
                  [dropzoneId]: [
                    ...(student.droppedEmojis[dropzoneId] || []),
                    emoji,
                  ],
                },
              }
            : student
        )
      );
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleEmojiClick = (dropzoneId, index, studentId) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              droppedEmojis: {
                ...student.droppedEmojis,
                [dropzoneId]: student.droppedEmojis[dropzoneId].filter(
                  (_, i) => i !== index
                ),
              },
            }
          : student
      )
    );
  };

  const handleSelectChange1 = (value, studentId) => {
    if (value) {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === studentId && !student.selectedOptions1.includes(value)
            ? {
                ...student,
                selectedOptions1: [...student.selectedOptions1, value],
              }
            : student
        )
      );
    }
  };

  const handleSelectChange2 = (value, studentId) => {
    if (value) {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === studentId && !student.selectedOptions2.includes(value)
            ? {
                ...student,
                selectedOptions2: [...student.selectedOptions2, value],
              }
            : student
        )
      );
    }
  };

  const handleOptionRemove = (option, studentId, isFirstDropdown) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              [isFirstDropdown ? "selectedOptions1" : "selectedOptions2"]:
                student[
                  isFirstDropdown ? "selectedOptions1" : "selectedOptions2"
                ].filter((item) => item !== option),
            }
          : student
      )
    );
  };

  const removeLastStudent = () => {
    setStudents((prevStudents) =>
      prevStudents.length > 1 ? prevStudents.slice(0, -1) : prevStudents
    );
  };

  const location = useLocation();
  const title = location.state?.title || "Clase sin título";

  return (
    <div>
      <GoBackBtn />
      <ClassTitle title={title} />

      <Header />
      <div className="flex gap-5">
        <table className="border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">NOMBRE</th>
              <th className="border border-gray-400 px-4 py-2">⏰</th>
              <th className="border border-gray-400 px-4 py-2">📹</th>
              <th className="border border-gray-400 px-4 py-2">
                PARTICIPACIÓN
              </th>
              <th className="border border-gray-400 px-4 py-2">
                MEJORES AREAS
              </th>
              <th className="border border-gray-400 px-4 py-2">
                AREAS A MEJORAR
              </th>
              <th className="border border-gray-400 px-4 py-2">
                TEMAS ANTERIORES A PRACTICAR
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="child w-fit">
                <td className="border border-gray-400">
                  <div className="flex items-center">
                    {isEditing === student.id ? (
                      <input
                        className="editable-name px-2"
                        value={student.studentName}
                        onChange={(e) => {
                          setStudents((prevStudents) =>
                            prevStudents.map((s) =>
                              s.id === student.id
                                ? { ...s, studentName: e.target.value }
                                : s
                            )
                          );
                        }}
                        onBlur={() => setIsEditing(false)}
                        autoFocus
                      />
                    ) : (
                      <span
                        className="cursor-pointer px-2"
                        onClick={() => setIsEditing(student.id)}
                      >
                        {student.studentName}
                      </span>
                    )}
                    {student.showClockEmoji && (
                      <span className="text-2xl">⏰</span>
                    )}
                    {student.showCameraEmoji && (
                      <span className="text-2xl">📹</span>
                    )}
                  </div>
                </td>
                <td className="border border-gray-400 px-4">
                  <input
                    type="checkbox"
                    checked={student.showClockEmoji}
                    onChange={(e) => {
                      setStudents((prevStudents) =>
                        prevStudents.map((s) =>
                          s.id === student.id
                            ? { ...s, showClockEmoji: e.target.checked }
                            : s
                        )
                      );
                    }}
                  />
                </td>
                <td className="border border-gray-400 px-4">
                  <input
                    type="checkbox"
                    checked={student.showCameraEmoji}
                    onChange={(e) => {
                      setStudents((prevStudents) =>
                        prevStudents.map((s) =>
                          s.id === student.id
                            ? { ...s, showCameraEmoji: e.target.checked }
                            : s
                        )
                      );
                    }}
                  />
                </td>
                <td
                  className="dropzone w-full h-20 flex flex-col justify-center items-start border border-gray-200 px-4 py-2"
                  onDrop={(e) => handleDrop(e, "dropzone1", student.id)}
                  onDragOver={handleDragOver}
                >
                  <div className="flex gap-2">
                    {(student.droppedEmojis["dropzone1"] || []).map(
                      (emoji, index) => (
                        <span
                          key={index}
                          className="text-2xl cursor-pointer"
                          onClick={() =>
                            handleEmojiClick("dropzone1", index, student.id)
                          }
                          dangerouslySetInnerHTML={{ __html: emoji }}
                        />
                      )
                    )}
                  </div>
                </td>
                <td className="selected-options border border-gray-400 text-xs">
                  <div className="flex items-center">
                    <select
                      className="dropdown border border-gray-300 w-5"
                      onChange={(e) =>
                        handleSelectChange1(e.target.value, student.id)
                      }
                    >
                      <option value=""></option>
                      <option value="fluidez">fluidez</option>
                      <option value="compresion">compresion</option>
                      <option value="gramatica">gramatica</option>
                      <option value="entonacion">entonacion</option>
                      <option value="pronunciacion">pronunciacion</option>
                      <option value="vocabulario">vocabulario</option>
                    </select>
                    <div className="flex gap-1 ml-2">
                      {student.selectedOptions1.map((option, index) => (
                        <span
                          key={index}
                          className="option-tag border rounded-md p-1"
                          onClick={() =>
                            handleOptionRemove(option, student.id, true)
                          }
                        >
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="selected-options border border-gray-400 text-xs">
                  <div className="flex items-center">
                    <select
                      className="dropdown border border-gray-300 w-5"
                      onChange={(e) =>
                        handleSelectChange2(e.target.value, student.id)
                      }
                    >
                      <option value=""></option>
                      <option value="fluidez">fluidez</option>
                      <option value="compresion">compresion</option>
                      <option value="gramatica">gramatica</option>
                      <option value="entonacion">entonacion</option>
                      <option value="pronunciacion">pronunciacion</option>
                      <option value="vocabulario">vocabulario</option>
                    </select>
                    <div className="flex gap-1 ml-2">
                      {student.selectedOptions2.map((option, index) => (
                        <span
                          key={index}
                          className="option-tag border rounded-md p-1"
                          onClick={() =>
                            handleOptionRemove(option, student.id, false)
                          }
                        >
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="border border-gray-400 px-4">
                  <textarea
                    className="w-full  "
                    value={student.previousTopics}
                    onChange={(e) => {
                      setStudents((prevStudents) =>
                        prevStudents.map((s) =>
                          s.id === student.id
                            ? { ...s, previousTopics: e.target.value }
                            : s
                        )
                      );
                    }}
                    placeholder="Temas anteriores a practicar"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Emojis />
      </div>

      <div className="flex gap-5 mt-5 justify-between w-96">
        <div className="flex gap-5">
          <button
            onClick={addNewStudent}
            className=" bg-blue-500 text-white px-4 py-2 rounded text-nowrap"
          >
            Add New Student
          </button>
          <button
            onClick={removeLastStudent}
            className=" bg-red-500 text-white px-4 py-2 rounded text-nowrap"
          >
            Remove Last Row
          </button>
        </div>
        <ClearBtn onClick={handleClearAll} />
      </div>
    </div>
  );
}

export default Class330;
