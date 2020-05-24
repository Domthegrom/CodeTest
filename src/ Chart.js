import React, { useState, useEffect } from "react";
import "./App.css";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// building the object
const Chart = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  //How i am generating rows, pushing my data into the obj array and setting logic
  function GenerateRandomRows() {
    const rater = ["A", "B", "C", "D", "E"];
    const raterAnswerThree = ["Low", "Average", "High"];

    const raterAnswerFive = [
      "Bad",
      "Okay",
      "intermediate",
      "Great",
      "Exceptional",
    ];
    const obj = [];
    let i = 0;
    while (i < 10000) {
      const day = Math.floor(Math.max(1, Math.random() * 30));

      obj.push({
        taskId: i + 1,
        date: `10/${day}/05`,
        rate: rater[Math.floor(Math.random() * rater.length)],
        raterAnswerFive:
          raterAnswerFive[Math.floor(Math.random() * raterAnswerFive.length)],
        correctAnswerFive:
          raterAnswerFive[Math.floor(Math.random() * raterAnswerFive.length)],
        raterAnswerThree:
          raterAnswerThree[Math.floor(Math.random() * raterAnswerThree.length)],
        correctAnswerThree:
          raterAnswerThree[Math.floor(Math.random() * raterAnswerThree.length)],
      });
      i++;
    }

    setTableData(obj);
    return { loading };
  }

  const RandomRows = () => {
    GenerateRandomRows();
  };
  //Every time the page reloads it will run a loading screen using this useEffect
  useEffect(() => {
    GenerateRandomRows();
    setLoading(false);
  }, []);
  //Mapping through the useState and pulling out the data
  const row = tableData.map((data, i) => {
    //Step 2 logic
    const agreement3 =
      data.correctAnswerThree === data.raterAnswerThree ? "yes" : "no";
    const agreement5 =
      data.correctAnswerFive === data.raterAnswerFive ? "yes" : "no";
    return (
      <tr key={i}>
        <td style={{ backgroundColor: "grey" }}>{i + 2}</td>
        <td>{data.date}</td>
        <td>{data.rate}</td>
        <td>{data.correctAnswerThree}</td>
        <td>{data.correctAnswerFive}</td>
        <td>{data.raterAnswerThree}</td>
        <td>{data.raterAnswerFive}</td>
        <td>{i + 1}</td>
        <td>{agreement3}</td>
        <td>{agreement5}</td>
      </tr>
    );
  });

  return loading === true ? (
    <div className="center">Loading 10k rows of data...</div>
  ) : (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>
              <button onClick={RandomRows}>
                <img
                  alt="refresh"
                  style={{ height: 50, width: 50 }}
                  src="data:image/png;base64,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"
                />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ backgroundColor: "grey" }}>
            <td></td>
            <td>A</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
            <td>E</td>
            <td>F</td>
            <td>G</td>
            <td>H</td>
            <td>I</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "grey" }}>1</td>
            Date <td>Rater</td>
            <td>Correct Answer 3 Label</td>
            <td>Correct Answer 5 Label</td>
            <td>Rater Answer 3 Label</td>
            <td>Rater Answer 5 Label</td>
            <td>Task ID</td>
            <td> Answer 3 Agreement? </td>
            <td>Answer 5 Agreement?</td>
          </tr>
          {row}
        </tbody>
      </Table>
    </div>
  );
};
export default Chart;
