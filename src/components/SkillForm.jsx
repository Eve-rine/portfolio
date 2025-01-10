import React, { useState } from 'react';
import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

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

export default SkillForm;

