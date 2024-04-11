import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { FaList } from 'react-icons/fa';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_CLIENTS } from '../queries/clientQueries';

export default function AddProjectModal() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('new');
    const [clientId, setClientId] = useState('');
    
    //get clients for select
    const { loading, error, data } = useQuery(GET_CLIENTS);


    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, status, clientId },
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] },
            });
        },
    })

    const onSubmit = (e) => {
        e.preventDefault();

        if(name === '' || description === '' || status === '') return alert('Please fill in all fields');

        addProject(name, description, status, clientId);

        setName('');
        setDescription('');
        setStatus('new');
        setClientId('');
    }

    if(loading) return null;

    if(error) return 'Something went wrong';


  return (
    <>  
        {!loading && !error && (
            <>
                <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
                    <FaList className='icon'/><span> Add Project</span>
                </button>

                <div className="modal fade" id="addProjectModal" tabIndex="-1" aria-labelledby="addProjectModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="addProjectModalLabel">Add a new project</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="name" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea  value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="description" > </textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Status</label>
                                <select value={status} onChange={(e) => setStatus(e.target.value)} id="status" className="form-select">
                                    <option value="new">Not Started</option>
                                    <option value="progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Client</label>
                                <select value={clientId} onChange={(e) => setClientId(e.target.value)} id="clientId" className="form-select">
                                    <option value="">Select Client</option>
                                    {data.clients.map( (client) => (
                                        <option key={client.id} value={client.id}>{client.name}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </>
        )}
    </>
  )
}
