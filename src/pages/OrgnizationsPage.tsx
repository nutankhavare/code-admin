const OrganizationsPage = () => {

    const orgs = [
        { id: 1, name: "ABC Logistics", type: "Transport", status: "Active" },
        { id: 2, name: "XYZ Fleet", type: "Fleet", status: "Active" }
    ];

    return (
        <div className="page-body">

            <h2>Organizations</h2>

            <table className="table">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>

                    {orgs.map((o) => (
                        <tr key={o.id}>
                            <td>{o.id}</td>
                            <td>{o.name}</td>
                            <td>{o.type}</td>
                            <td>{o.status}</td>
                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default OrganizationsPage;