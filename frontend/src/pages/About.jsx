import React from "react";
import { useAuth } from "../context/AuthProvider";

function About() {
  const { profile } = useAuth();
  console.log(profile);
  return (
    <div className="container mx-auto my-12 p-4 space-y-9">
      <h1 className="text-2xl font-bold mb-6">About</h1>
      <p>
        This is a{" "}
        <strong className="text-blue-800 font-semibold hover:scale-105 duration-500">
          {/* {profile?.user?.name} */}
        </strong>{" "}
        NIELIT Track Project is an advanced course management system designed and developed by our internship team at NIELIT. The platform enables administrators to create, update, and delete courses, while users can access structured course content seamlessly. The project leverages modern web technologies to provide a dynamic and user-friendly experience.
      </p>
      <h2 className="font-semibold text-blue-800 text-xl">
        Technical Expertise:
      </h2>
      <p>
        Front-End: Adept in modern JavaScript frameworks and libraries such as
        React.js, Angular, and Vue.js. Skilled in HTML5, CSS3, and responsive
        design principles to create intuitive and visually appealing interfaces.
        Back-End: Proficient in server-side technologies including Node.js,
        Express.js, and Django. Experienced with database management using SQL
        and NoSQL databases like MySQL, PostgreSQL, and MongoDB. DevOps:
        Knowledgeable in containerization and orchestration tools such as Docker
        and Kubernetes. Familiar with continuous integration and deployment
        (CI/CD) pipelines. Cloud Services: Experience with cloud platforms like
        AWS, Azure, and Google Cloud, enabling scalable and reliable application
        deployment.
      </p>
      <h2 className="font-semibold text-blue-800 text-xl">
      Technologies Used
      </h2>
      <p>
      The project is built using React.js, Express.js, Node.js, and MongoDB, ensuring a full-stack web development approach. The UI is designed with HTML, Tailwind CSS, and JavaScript, providing a responsive and modern interface. Additionally, we integrated Web3Form for handling forms and Cloudinary for efficient image storage. The application effectively utilizes React state management for smooth user interactions.
      </p>
      <br />
      <span>
       Along with the team, is committed to leveraging their expertise to build innovative and scalable solutions. From front-end interfaces to back-end logic, the team is passionate about delivering exceptional digital experiences that enhance learning and streamline course management.
      </span>
      <h2 className="font-semibold text-blue-800 text-xl">
      Meet the Minds Behind the Project
      </h2>
      <p>
      This project is a collaborative effort by  <strong> Avneesh, Dougoulen, Bhoomika, Aditya, Anjali, Esha, and Nikita </strong> part of our internship at NIELIT. Our goal was to build an intuitive and scalable platform that simplifies course management. We combined our skills in frontend and backend development to deliver a high-quality solution that enhances learning experiences.


      </p>
    </div>
  );
}

export default About;