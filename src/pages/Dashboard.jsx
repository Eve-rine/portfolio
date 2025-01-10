import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import  ProjectForm  from '../components/ProjectForm';
import  SkillForm  from '../components/SkillForm';

const Dashboard = () => {
    const [bio, setBio] = useState('');
    const [bioId, setBioId] = useState(null);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showSkillForm, setShowSkillForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [editingSkill, setEditingSkill] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const projectsDoc = await getDocs(collection(db, 'projects'));
        const skillsDoc = await getDocs(collection(db, 'skills'));

        const bioQuery = await getDocs(collection(db, 'bio'));

        if (!bioQuery.empty) {
            const bioDoc = bioQuery.docs[0];
            setBioId(bioDoc.id);
            setBio(bioDoc.data().about || '');
        }

        setProjects(projectsDoc.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setSkills(skillsDoc.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

            {/* Bio Section */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Update Bio</h2>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full h-32 p-2 border rounded"
                />
                <button
                    onClick={async () => {
                        const bioRef = doc(db, 'bio', bioId);
                        await updateDoc(bioRef, { content: bio });
                    
                        
                    }}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Save Bio
                </button>
            </section>

            {/* Projects Section */}
            <section className="mb-12">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Manage Projects</h2>
                    <button
                        onClick={() => setShowProjectForm(true)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                    >
                        Add Project
                    </button>
                </div>

                {showProjectForm && (
                    <div className="mb-6">
                        <ProjectForm
                            project={editingProject}
                            isEditing={!!editingProject}
                            onCancel={() => {
                                setShowProjectForm(false);
                                setEditingProject(null);
                            }}
                            onSave={() => {
                                setShowProjectForm(false);
                                setEditingProject(null);
                                fetchData();
                            }}
                        />
                    </div>
                )}

                <div className="grid grid-cols-1 gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white p-6 rounded-lg shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold">{project.title}</h3>
                                    <p className="text-gray-600 mt-2">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {project.technologies?.map((tech, index) => (
                                            <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => {
                                            setEditingProject(project);
                                            setShowProjectForm(true);
                                        }}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={async () => {
                                            if (window.confirm('Are you sure you want to delete this project?')) {
                                                await deleteDoc(doc(db, 'projects', project.id));
                                                fetchData();
                                            }
                                        }}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills Section */}
            <section className="mb-12">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Manage Skills</h2>
                    <button
                        onClick={() => setShowSkillForm(true)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                    >
                        Add Skill
                    </button>
                </div>

                {showSkillForm && (
                    <div className="mb-6">
                        <SkillForm
                            skill={editingSkill}
                            isEditing={!!editingSkill}
                            onCancel={() => {
                                setShowSkillForm(false);
                                setEditingSkill(null);
                            }}
                            onSave={() => {
                                setShowSkillForm(false);
                                setEditingSkill(null);
                                fetchData();
                            }}
                        />
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skills.map((skill) => (
                        <div key={skill.id} className="bg-white p-4 rounded-lg shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold">{skill.name}</h3>
                                    <p className="text-gray-600">{skill.level}</p>
                                    <p className="text-gray-500 text-sm">{skill.category}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => {
                                            setEditingSkill(skill);
                                            setShowSkillForm(true);
                                        }}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={async () => {
                                            if (window.confirm('Are you sure you want to delete this skill?')) {
                                                await deleteDoc(doc(db, 'skills', skill.id));
                                                fetchData();
                                            }
                                        }}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;