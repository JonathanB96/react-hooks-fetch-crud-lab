import React from "react";
import QuestionItem from "./QuestionItem.js"

function QuestionList({list}) {
  

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{list.map((item)=>{
        return <QuestionItem key={item.id} question = {item}/>      
      })}</ul>
    </section>
  );
}

export default QuestionList;
