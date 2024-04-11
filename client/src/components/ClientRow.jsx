
import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';
/**
 * Generates a table row for a client with name, email, phone, and a delete button.
 *
 * @param {object} props - The properties object containing client information.
 * @return {JSX.Element} The table row element representing the client.
 */
export default function ClientRow(props) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: props.client.id },
    refetchQueries: [{ query: GET_CLIENTS }],
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: { clients: clients.filter((client) => client.id !== deleteClient.id) },
    //   });
    // }
  })

  return (
    <tr>
      <td>{props.client.name}</td>
      <td>{props.client.email}</td>
      <td>{props.client.phone}</td>
      <td>
        <button className='btn btn-danger btn-sm' onClick={deleteClient}> <FaTrash/></button>
      </td>
    </tr>
  )
}
