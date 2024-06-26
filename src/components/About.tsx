import React from 'react';
import Typed from 'react-typed';
import TagSphere from './Spear';

const About: React.FC = () => {
  return (
    <section id="about">
      <div className="container mx-auto flex px-10 py-20 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            Hi, I'm Duleep. <br />
            A{' '}
            <Typed
              className="text-green-600"
              strings={['Web Developer', 'Full Stack Dev', 'Software Engineer', 'Gamer']}
              typeSpeed={100}
              backSpeed={50}
              loop
            />
          </h1>
          <p className="mb-8 leading-relaxed">
            I Like building Amazing Apps, I Enjoy working on Complex Projects and learning from them, whether it's with a team or on my own. <br />
            <br />
            I'm always interested in a Challenge, so be sure to reach out to me if you have one. <br />
          </p>
          <div className="flex justify-center">
            <a href="#contact" className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">
              Contact Me
            </a>
            <a href="#skills" className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
              Know My Skill Set
            </a>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 sm:w-1/2 w-5/6">
          <TagSphere radius={250} />
        </div>
      </div>
    </section>
  );
};

export default About;
