import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData(id) {
  // const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

export async function generateMetadata({ params }) {
  const post = await getData(params.id);
  return {
    title: post.title,
    description: post.desc,
  };
}

const BlogPost = async ({ params }) => {
  const data = await getData(params.id);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>
            {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia
            aspernatur iure, sunt eaque assumenda natus ipsum quidem laboriosam
            nostrum veritatis ut. Dignissimos accusamus quis voluptatem,
            architecto velit tempore itaque necessitatibus. */}
            {data.title}
          </h1>
          <p className={styles.desc}>{data.desc}</p>
          <div className={styles.author}>
            <Image
              // src="https://images.pexels.com/photos/3130810/pexels-photo-3130810.jpeg"
              src={data.img}
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{data.username}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            // src="https://images.pexels.com/photos/2103127/pexels-photo-2103127.jpeg"
            src={data.img}
            alt=""
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
          {/* Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Necessitatibus tempore sed delectus maxime inventore officiis, eum
          nostrum sint laborum libero et placeat distinctio unde facere repellat
          maiores ut nisi expedita? Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Pariatur autem nisi voluptatibus velit dicta omnis
          quaerat vel harum modi laudantium provident sapiente, minima error
          doloribus debitis quasi enim alias. Nulla. Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Possimus non amet dolore at molestiae
          officiis iure necessitatibus assumenda quia, neque iusto consectetur
          corrupti inventore laboriosam, iste accusamus dolores cumque eaque? */}
          {data.content}
        </p>
      </div>
    </div>
  );
};

export default BlogPost;
