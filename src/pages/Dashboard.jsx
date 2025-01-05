import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const ProjectForm = ({ project, onCancel, onSave, isEditing }) => {
    const [title, setTitle] = useState(project?.title || '');
    const [description, setDescription] = useState(project?.description || '');
    const [image, setImage] = useState(project?.image || '');
    const [technologies, setTechnologies] = useState(project?.technologies?.join(', ') || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const projectData = {
            title,
            description,
            image,
            technologies: technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
            updatedAt: new Date()
        };

        try {
            if (isEditing && project.id) {
                await updateDoc(doc(db, 'projects', project.id), projectData);
            } else {
                await addDoc(collection(db, 'projects'), {
                    ...projectData,
                    createdAt: new Date()
                });
            }
            onSave();
            if (!isEditing) {
                setTitle('');
                setDescription('');
                setImage('');
                setTechnologies('');
            }
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    rows="3"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Technologies (comma-separated)</label>
                <input
                    type="text"
                    value={technologies}
                    onChange={(e) => setTechnologies(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="React, Firebase, Tailwind CSS"
                />
            </div>
            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    {isEditing ? 'Update Project' : 'Add Project'}
                </button>
            </div>
        </form>
    );
};

const SkillForm = ({ skill, onCancel, onSave, isEditing }) => {
    const [name, setName] = useState(skill?.name || '');
    const [level, setLevel] = useState(skill?.level || 'Intermediate');
    const [category, setCategory] = useState(skill?.category || 'Frontend');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const skillData = {
            name,
            level,
            category,
            updatedAt: new Date()
        };

        try {
            if (isEditing && skill.id) {
                await updateDoc(doc(db, 'skills', skill.id), skillData);
            } else {
                await addDoc(collection(db, 'skills'), {
                    ...skillData,
                    createdAt: new Date()
                });
            }
            onSave();
            if (!isEditing) {
                setName('');
                setLevel('Intermediate');
                setCategory('Frontend');
            }
        } catch (error) {
            console.error('Error saving skill:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Skill Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Level</label>
                <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <option>Frontend</option>
                    <option>Backend</option>
                    <option>Database</option>
                    <option>DevOps</option>
                    <option>Tools</option>
                </select>
            </div>
            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    {isEditing ? 'Update Skill' : 'Add Skill'}
                </button>
            </div>
        </form>
    );
};

const Dashboard = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [bio, setBio] = useState('');
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showSkillForm, setShowSkillForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [editingSkill, setEditingSkill] = useState(null);

    useEffect(() => {
        if (auth.currentUser) {
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        const bioDoc = await getDocs(collection(db, 'bio'));
        const projectsDoc = await getDocs(collection(db, 'projects'));
        const skillsDoc = await getDocs(collection(db, 'skills'));

        setBio(bioDoc.docs[0]?.data()?.content || '');
        setProjects(projectsDoc.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setSkills(skillsDoc.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            fetchData();
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    if (!auth.currentUser) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to Dashboard
                    </h2>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}
                    <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <input
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        );
    }

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
                        const bioRef = doc(db, 'bio', 'main');
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