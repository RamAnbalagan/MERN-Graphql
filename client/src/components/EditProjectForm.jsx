import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { FaEdit } from 'react-icons/fa';
import { UPDATE_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECT } from '../queries/projectQueries';

export default function EditProjectForm({ project }) {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState(project.status);

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id }}],
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (name === '' || description === '' || status === '') {
            return alert('Please fill in all fields');
        }
        console.log('status is' + status);
        updateProject({ variables: { id: project.id, name, description, status } });
    }

    const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id: project.id } });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="mt-5">
            <h3>Edit Project</h3>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="name" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="description"></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} id="status" className="form-select">
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
