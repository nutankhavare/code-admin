const VehiclesPage = () => {

    const vehicles = [
        { id: 1, number: "KA01AB1234", driver: "Ravi", status: "Active" },
        { id: 2, number: "KA02CD5678", driver: "Amit", status: "Inactive" }
    ];

    return (
        <div className="page-body">

            <h2>Vehicles</h2>

            <table className="table">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Vehicle Number</th>
                        <th>Driver</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>

                    {vehicles.map((v) => (
                        <tr key={v.id}>
                            <td>{v.id}</td>
                            <td>{v.number}</td>
                            <td>{v.driver}</td>
                            <td>{v.status}</td>
                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default VehiclesPage;