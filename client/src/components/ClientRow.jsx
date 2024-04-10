
import { FaTrash } from 'react-icons/fa';
export default function ClientRow(props) {
  return (
    <tr>
      <td>{props.client.name}</td>
      <td>{props.client.email}</td>
      <td>{props.client.phone}</td>
      <td>
        <button className='btn btn-danger btn-sm'> <FaTrash/></button>
      </td>
    </tr>
  )
}
