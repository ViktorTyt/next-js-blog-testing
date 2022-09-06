import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import blogStyles from "../styles/Blog.module.css";

const Blog: NextPage = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const changeTitle = (title: any) => {
    setTitle(title);
  };

  const changeAuthor = (author: any) => {
    setAuthor(author);
  };

  const changeContent = (content: any) => {
    setContent(content);
  };

  const savePost = () => {
    fetch("/api/add_post", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ title: title, author: author, content: content }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        loadPosts();
      })
      .catch((err) => console.log(err));
  };

  const loadPosts = () => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.posts);
        setPosts(data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <>
      <div className={blogStyles.blog__section}>
        <div className={blogStyles.blog__form}>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => {
              changeTitle(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Author"
            onChange={(e) => {
              changeAuthor(e.target.value);
            }}
          />
          <textarea
            placeholder="Content"
            onChange={(e) => {
              changeContent(e.target.value);
            }}
          ></textarea>
          <button onClick={savePost}>Save new post</button>
        </div>
        <h1>Blog</h1>

        <hr></hr>

        {posts.length > 0 &&
          posts.map(({ _id, title, author, content }) => (
            <>
              <ul>
                <li key={_id}>
                  <p>{title}</p>
                  <p>{author}</p>
                  <p>{content}</p>
                </li>
              </ul>
            </>
          ))}
      </div>
    </>
  );
};

export default Blog;
