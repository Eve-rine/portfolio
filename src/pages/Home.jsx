import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const Home = () => {
  const [bio, setBio] = useState('');
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const bioDoc = await getDocs(collection(db, 'bio'));
      const projectsDoc = await getDocs(collection(db, 'projects'));
      const skillsDoc = await getDocs(collection(db, 'skills'));

      if (!bioDoc.empty) {
        console.log('biodata', bioDoc.docs[0]?.data()?.about || 'No bio available');
        setBio(bioDoc.docs[0]?.data()?.about || '');
      } else {
        console.warn('No bio document found');
      }
      setProjects(projectsDoc.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setSkills(skillsDoc.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Evrine Minayo</h1>
        <p className="text-xl text-gray-600">Software Engineer</p>
        <div className="mt-6 text-gray-700">{bio}</div>
      </div>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold">{skill.name}</h3>
              <p className="text-gray-600">{skill.level}</p>
              <p className="text-gray-500 text-sm">{skill.category}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* <img 
                src={project.image || '/api/placeholder/400/200'} 
                alt={project.title} 
                className="w-full h-48 object-cover"
              /> */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;