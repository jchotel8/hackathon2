import React, { useRef, useState } from "react";
import { fetchAPI, postAPI, uploadPhoto } from "../lib/api";
import Card from "./card";

const Form = ({}) => {
  const categoryRef = useRef();
  const companyRef = useRef();
  const projectRef = useRef();
  const descriptionRef = useRef();
  const contentRef = useRef();
  const pictureRef = useRef();
  const writerRef = useRef();

  return (
    <div>
      <h2>CREATE A NEW PROPOSAL</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="uk-child-width-1-2@m uk-grid-match" data-uk-grid>
          <label>Company</label>
          <input type="text" name="company" ref={companyRef} />
          <label>Project</label>
          <input type="text" name="project" ref={projectRef} />
          <label>Description</label>
          <input type="text" name="description" ref={descriptionRef} />
          <label>Content</label>
          <input type="text" name="content" ref={contentRef} />
          <label>Picture</label>
          <input type="file" name="picture" ref={pictureRef} />
          <label>Writer</label>
          <select value={writerRef} ref={writerRef}>
            <option value="18">Thomas</option>
            <option value="17">Sasha</option>
          </select>
        </div>
        {/* <input type="submit" name="description" /> */}
      </form>
      {/* <div>
        <div>{this.state.value}</div>
        <button onClick={this.buttonClicked}>Click</button>
      </div>
      <h2>my value is : {form.value}</h2> */}
      <button
        onClick={async (e) => {
          e.preventDefault();

          // const test = uploadPhoto(pictureRef.current.value);
          // console.log("********");
          // console.log(test);
          // console.log("********");
          const newArticle = await postAPI("/articles", {
            title: projectRef.current.value,
            company: companyRef.current.value,
            description: descriptionRef.current.value,
            content: contentRef.current.value,
            status: "published",
            category: 4,
            slug: projectRef.current.value.trim(),
            publishedAt: "2020-07-16T10:00:00.000Z",
            writer: writerRef,
          });
        }}
      >
        SUBMIT
      </button>
    </div>
  );
};

export default Form;
