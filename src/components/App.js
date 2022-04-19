import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const[list, setList] = useState([])
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  });


  useEffect(()=>{
    fetch('http://localhost:4000/questions')
    .then(res=>(res.json()))
    .then(data=>{
      setList(data)
    })
  })

  function handleChange(event) {
    // setFormData({
    //   ...formData,
    //   [event.target.name]: event.target.value,
    // });
  }

  
  function handleSubmit(event) {
    event.preventDefault();
    const newFormData = { prompt: event.target.prompt.value,
      answer1:  event.target.answer1.value,
      answer2:  event.target.answer2.value,
      answer3:  event.target.answer3.value,
      answer4:  event.target.answer4.value,
      correctIndex: 0,}
    setFormData(newFormData)


    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    })
    .then(res=>res.json())
    .then(data=>{
      setList({...data, newFormData})})

    console.log(formData);
  }
  



  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm handleSubmit={handleSubmit} 
      handleChange={handleChange} formData = {formData}/> 
      : <QuestionList list={list}/>}
    </main>
  );
}

export default App;
