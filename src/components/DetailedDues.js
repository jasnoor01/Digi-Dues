import React from 'react'

export default function DetailedDues() {

    return (
        <div>
            <table className="table mb-4 deplist">
                <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Designation</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>


                    <tr >
                        <td></td>
                        <td>row.Designation</td>
                        <td><span className="d-flex">

                            <button type="submit" className="btn btn-sm btn-danger">Delete</button>
                            <button type="button" className="btn btn-sm mx-2 btn-primary"   data-bs-toggle="modal" data-bs-target="#updep">
                                Update
                            </button>
                        </span>
                        </td>
                    </tr>
                         
                </tbody>
            </table>

        </div>
    )
}
